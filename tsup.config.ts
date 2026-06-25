import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // The stylesheet is copied verbatim to dist/styles.css so consumers can
  // `import "youtube-tiles-react/styles.css"`.
  loader: {
    ".css": "copy",
  },
  external: ["react", "react-dom"],
  // Use the classic JSX runtime so the output imports only the bare "react"
  // specifier (React.createElement) instead of "react/jsx-runtime". React 17
  // has no package "exports" map, so Node's native ESM loader (used by
  // Next.js 12 during page-data collection) cannot resolve the extensionless
  // "react/jsx-runtime" subpath. Classic runtime keeps us compatible.
  esbuildOptions(options) {
    options.jsx = "transform";
  },
});
