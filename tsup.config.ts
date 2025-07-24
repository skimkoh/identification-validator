import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"], // adjust this to your main file
	format: ["esm", "cjs"],
	dts: true, // generate .d.ts types
	splitting: false, // no code splitting for libraries
	sourcemap: true,
	clean: true, // clean dist/ before build
});
