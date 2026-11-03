# `zeN-Terminal` // Windows PowerShell, Windows Terminal & CMD Theme Engine (`@zen-ui/system`)

**`zeN-Terminal`** brings all 8 `@zen-ui/system` (`CAPRI // CAPRICORN`) dark and light themes directly into **Windows PowerShell (`$PROFILE`)**, **Windows Terminal (`settings.json`)**, and **Windows `cmd.exe`**—paired with an interactive web workbench built on `@zen-ui/system`.

---

## 1. Install into Windows PowerShell & Windows Terminal

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\powershell\install-zen-terminal.ps1 -Theme blackwall-crimson -ConfigureCmd
```

Or via npm:

```powershell
npm run install:terminal
```

### Built-In PowerShell Commands (After Installation)
- `zen-themes` — List all 8 `@zen-ui/system` themes with TrueColor swatches (`blackwall-crimson`, `obsidian-gold`, `neon-emerald`, `midnight-cobalt`, `atelier-paper`, `nordic-snow`, `kyoto-matcha`, `cyber-daylight`).
- `zen-theme <theme-id>` — Switch both your live PowerShell `$PROFILE` prompt/PSReadLine colors AND Windows Terminal `settings.json` color scheme simultaneously.
- `capri-guard "<payload>"` — Scan any string or CLI input for SQL/NoSQL injection (`' OR 1=1`), XSS (`<script>`), or Prompt Injection (`Ignore previous instructions`).
- `zen-banner` — Render the `zeN-Terminal // CAPRI` telemetry banner.

### Uninstall / Restore Backup
```powershell
powershell -ExecutionPolicy Bypass -File .\powershell\uninstall-zen-terminal.ps1
```

---

## 2. Interactive `zeN-Terminal` Web Workbench

```powershell
npm install
npm run dev
```
