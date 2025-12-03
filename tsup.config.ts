import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["react/index.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ["esm", "cjs"]
});
