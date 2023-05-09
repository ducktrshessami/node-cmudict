import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    clean: true,
    dts: true,
    sourcemap: true,
    format: ["cjs"],
    minifySyntax: true,
    minifyWhitespace: true
});
