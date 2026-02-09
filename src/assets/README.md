# Media and Asset Guidelines

Use `src/assets/` for media that should be bundled by Vite.

- Import from JS/JSX: `import heroImg from "../assets/hero.jpg";`
- Vite fingerprints the file and optimizes the build output.
- Best for images used directly in components.

Use `public/media/` for media you want to reference by URL.

- Reference by absolute path: `/media/obol/hero.jpg`
- Files are copied as-is to the build output.
- Best for large files, external CMS parity, or hand-authored paths.

IPFS note:
- Both approaches work on IPFS.
- `public/` paths are stable and easy to reason about.
- `src/assets/` is safer for cache-busting and build optimization.
