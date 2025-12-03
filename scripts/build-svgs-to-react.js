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

    const optimized = svgo.optimize(raw).data;

    const name = path.basename(file, ".svg")
      .replace(/(^\w|-\w)/g, c => c.replace("-", "").toUpperCase());

    const jsx = await svgr(optimized, {
      jsxRuntime: "automatic",
      expandProps: "start"
    }, { componentName: name });

    const rel = path.relative(ICONS, file);
    const parts = rel.split(path.sep);
    const fileName = parts.pop();
    const folder = parts.join("/");

    const outDir = path.join(OUT, folder);
    fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, `${name}.tsx`);

    fs.writeFileSync(outPath, `
import React from "react";

export const ${name} = ({ size = 24, color = "currentColor", className = "", style = {}, ...props }) => (
  ${jsx.replace(/<svg/, `<svg width={size} height={size} fill={color} className={className} style={style} {...props}`)}
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
