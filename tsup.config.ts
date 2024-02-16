import { defineConfig } from "tsup";

export default defineConfig(options => {
    if (!Array.isArray(options.entry)) {
        throw new Error("Invalid entry");
    }
    const install = options.entry.includes("src/install.mts");
    return {
        dts: !install,
        sourcemap: true,
        format: install ? "esm" : ["esm", "cjs"],
        minifySyntax: true,
        minifyWhitespace: true
    };
});
