const fs = require("fs");
const path = require("path");
const svgr = require("@svgr/core").transform;
const svgo = require("svgo");

const ICONS = path.resolve(__dirname, "../icons");
const OUT = path.resolve(__dirname, "../react");

function walk(dir, arr = []) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, arr);
    else if (f.endsWith(".svg")) arr.push(p);
  });
  return arr;
}

(async () => {
  const files = walk(ICONS);

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");

    // No usar SVGO por ahora - está causando problemas con stroke-width
    const optimized = raw;

    const name = path.basename(file, ".svg")
      .replace(/(^\w|-\w)/g, c => c.replace("-", "").toUpperCase());

    const jsx = await svgr(optimized, {
      jsxRuntime: "automatic",
      expandProps: "start",
      svgo: false  // Desactivar SVGO en SVGR - ya está optimizado
    }, { componentName: name });

    const rel = path.relative(ICONS, file);
    const parts = rel.split(path.sep);
    const fileName = parts.pop();
    const folder = parts.join("/");

    const outDir = path.join(OUT, folder);
    fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, `${name}.tsx`);

    // Limpiar el JSX generado y agregar props correctamente
    let cleanJsx = jsx
      // Remover atributos width/height hardcoded del SVG principal solamente (no stroke-width, etc)
      .replace(/(<svg[^>]*)\swidth="[^"]*"/g, '$1')
      .replace(/(<svg[^>]*)\sheight="[^"]*"/g, '$1')
      // Remover atributos de color del SVG principal para que sean controlados por props
      .replace(/(<svg[^>]*)\sfill="[^"]*"/g, '$1')
      .replace(/(<svg[^>]*)\sstroke="[^"]*"/g, '$1')
      // Convertir atributos SVG de kebab-case a camelCase para React
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/stroke-dasharray=/g, 'strokeDasharray=')
      .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/fill-opacity=/g, 'fillOpacity=')
      .replace(/stroke-opacity=/g, 'strokeOpacity=')
      .replace(/clip-path=/g, 'clipPath=')
      .replace(/clip-rule=/g, 'clipRule=')
      // Normalizar espacios
      .replace(/\s+/g, ' ')
      .replace(/<svg\s+/, '<svg ');

    // Detectar si el SVG usa stroke en lugar de fill
    const usesStroke = optimized.includes('stroke=') && optimized.includes('fill="none"');

    // Detectar si el SVG ya tiene fill="currentColor" en elementos internos
    const hasInternalFill = optimized.includes('fill="currentColor"');

    // Detectar si tiene múltiples elementos sin fill (probablemente necesita stroke)
    const hasUnfilledElements = (optimized.match(/<(circle|rect|path|polygon)/g) || []).length > 1 &&
                                 !optimized.includes('fill=');

    // Construir atributos del SVG principal
    let svgAttrs = 'width={size} height={size}';
    let styleAttr = 'style={style}';

    if (usesStroke || hasUnfilledElements) {
      // Iconos que usan stroke o tienen elementos sin fill
      svgAttrs += ' stroke={color} fill="none"';
    } else if (!hasInternalFill) {
      // Iconos que usan fill en el SVG principal
      svgAttrs += ' fill={color}';
    } else {
      // Si tiene fill="currentColor" interno, pasar color via style
      styleAttr = 'style={{color, ...style}}';
    }

    svgAttrs += ` className={className} ${styleAttr} {...props}`;

    fs.writeFileSync(outPath, `
import React from "react";

export const ${name} = ({ size = 24, color = "currentColor", className = "", style = {}, ...props }) => (
  ${cleanJsx.replace(/<svg/, `<svg ${svgAttrs}`)}
);

export default ${name};
    `);
  }

  // index.ts por carpeta
  function generateIndexes(dir) {
    const files = fs.readdirSync(dir);

    const tsx = files.filter(f => f.endsWith(".tsx"));
    const subdirs = files.filter(f => fs.statSync(path.join(dir, f)).isDirectory());

    let index = "";

    // Exportar archivos .tsx
    for (const f of tsx) {
      const n = f.replace(".tsx", "");
      index += `export * from "./${n}";\n`;
    }

    // Exportar subdirectorios
    for (const sd of subdirs) {
      index += `export * from "./${sd}";\n`;
    }

    fs.writeFileSync(path.join(dir, "index.ts"), index);

    subdirs.forEach(sd => generateIndexes(path.join(dir, sd)));
  }

  generateIndexes(OUT);

  console.log("✔ Iconos generados.");
})();
