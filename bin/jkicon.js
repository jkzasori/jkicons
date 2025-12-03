#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const name = process.argv[2];
const category = process.argv[3] || "ui";

if (!name) {
  console.error("Uso: jkicon <nombre> [categoria]");
  process.exit(1);
}

const content = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

const dir = path.resolve(process.cwd(), "icons", category);
fs.mkdirSync(dir, { recursive: true });

const file = path.join(dir, `${name}.svg`);
if (fs.existsSync(file)) {
  console.log("El icono ya existe:", file);
  process.exit(1);
}

fs.writeFileSync(file, content);
console.log("Icono creado:", file);
