# zeN-Terminal (terminal.lpabst.dev) — Agent & Engineering Protocol (AGENTS.md)

## 1. Architecture & Subsystems

- **Living Brain Reference:** Read [`docs/CAPRI-ARCHITECTURE.md`](./docs/CAPRI-ARCHITECTURE.md) before modifying the web showcase or PowerShell terminal theme scripts.
- **Subsystems:**
  - `src/`: React 19 + Three.js (`@react-three/fiber`, `@react-three/postprocessing`) + `@zen-ui-capri/system` interactive 3D terminal showcase (`terminal.lpabst.dev`).
  - `powershell/`: Windows Terminal, PowerShell, and CMD theme installer (`install-zen-terminal.ps1`), uninstaller (`uninstall-zen-terminal.ps1`), and profile (`zen-profile.ps1`).
  - `docker/`: Nginx container packaging (`Dockerfile`, `nginx.conf`) for the web showcase.

## 2. TypeScript, UI & PowerShell Standards

- Keep source files modular (`<= 800` lines where practical) and free of explanatory code comments unless documenting a non-obvious WebGL or Windows Terminal host constraint.
- Enforce strict TypeScript: zero `any` or `as any`, prefer `unknown` with type guards and `readonly T[]`.
- Consume `@zen-ui-capri/system` components and `--zen-*` CSS tokens for UI controls; avoid hardcoded hex colors in UI styles and support `@media (prefers-reduced-motion: reduce)`.

## 3. Security & Public Repository Hygiene

- Sanitize untrusted terminal command inputs with Capri prompt-injection and XSS guards (`capri.sanitizeForPrompt()`).
- Never commit secrets, raw origin server IPs, or absolute local filesystem paths (`<drive>:/<user-home>/...`) in documentation, scripts, or web source files.

## 4. Verification

- Run `npm run build` (`tsc -b && vite build`) to verify TypeScript and production bundling.
- For local Windows Terminal setup, use `npm run install:terminal`.
