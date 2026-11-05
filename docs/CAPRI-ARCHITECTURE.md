---
project: "zeN-Terminal"
version: "1.0.0"
files: 8
loc: 3066
tags: [capri-docu, architecture]
---
# zeN-Terminal // CAPRI Architecture & AI Context Dossier
> **Executive Summary:** Local Windows Terminal / PowerShell / CMD cyber-shell overhaul (`install:terminal`) + interactive 3D terminal showcase web app (`https://terminal.lpabst.dev`) powered by `@zen-ui-capri/system`.
>
> *Generated automatically via `npx capri docu` (Zero build or browser runtime overhead)*

## 1. Project Identity & Stack Overview
- **Repository:** `zeN-Terminal` (`zen-terminal`)
- **Version:** `1.0.0`
- **Detected Stack:** React 19 · Three.js / WebGL · Vite · @zen-ui-capri/system (CAPRI) · TypeScript · PowerShell · Docker Containerized
- **Top-Level Subsystems:** `/docker`, `/powershell`, `/public`, `/src`
- **Container Readiness:** `docker-compose.yml` present

## 2. Codebase Metrics & Language Breakdown
- **Total Source Files Scanned:** 8
- **Total Lines of Code (LOC):** 3,066
- **File Extensions:** `.ps1` (3), `.tsx` (2), `.html` (1), `.css` (1), `.ts` (1)
- **Key Domain Symbols / Classes / Functions (2):** `ZenPrint`, `TerminalLogEntry`

## 4. Architecture & Subsystem Topology (`flowchart TD`)
```mermaid
flowchart TD
  Repo["zeN-Terminal v1.0.0"]
  Stack["Stack: React 19 · Three.js / WebGL · Vite · @zen-ui-capri/system (CAPRI) · TypeScript"]
  Repo --> Stack
  N0_docker["/docker"]
  Stack --> N0_docker
  N1_powershell["/powershell"]
  Stack --> N1_powershell
  N2_public["/public"]
  Stack --> N2_public
  N3_src["/src"]
  Stack --> N3_src
  Docker["Docker / Compose Runtime"]
  Repo -.->|"Containerized"| Docker
```

## 5. Key Domain Modules & Entrypoints Inventory
| Module Path | Lines | Extension |
| :--- | ---: | :--- |
| `powershell/zen-profile.ps1` | 1512 | `.ps1` |
| `src/App.tsx` | 1297 | `.tsx` |
| `powershell/install-zen-terminal.ps1` | 146 | `.ps1` |
| `powershell/uninstall-zen-terminal.ps1` | 46 | `.ps1` |
| `index.html` | 20 | `.html` |
| `src/main.tsx` | 15 | `.tsx` |
| `vite.config.ts` | 9 | `.ts` |

## 7. Available Build & Automation Scripts
- `npm run dev`: `vite --port 5185`
- `npm run build`: `tsc -b && vite build`
- `npm run preview`: `vite preview`
- `npm run install:terminal`: `powershell -ExecutionPolicy Bypass -File ./powershell/install-zen-terminal.ps1`

## 8. Capri AI Agent Protocol (Claude / Codex / Gemini / Antigravity)
- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui-capri/system` primitives and `<ZenIcon>` (40 vector glyphs) for UI views; keep action labels concise (`1-3 words`).
- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`< 900` lines), and `--zen-*` CSS tokens.
- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).
- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.
- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Run `npx capri docu --write` whenever architectural boundaries or modules change.
