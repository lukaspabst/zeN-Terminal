# `zeN-Terminal` // Windows Terminal, PowerShell & CMD Theme Engine (`@zen-ui-capri/system`)

**`zeN-Terminal`** transforms **Windows Terminal (`settings.json`)**, **Windows PowerShell (`$PROFILE`)**, and **Windows `cmd.exe`** into a full `@zen-ui-capri/system` (`CAPRI // CAPRICORN`) environment—complete with custom Windows Terminal window/tab chrome themes, procedurally generated 1920×1080 Blackwall Lattice ambient wallpapers, an optional GPU HLSL CRT pixel shader, a 2-column Telemetry HUD dashboard, 3 switchable prompt topologies, an in-terminal interactive TUI workbench (`zen-ui`), and real-time `Enter`-key CLI firewall protection (`capri-guard`).

---

## 1. Install into Windows PowerShell, Windows Terminal & CMD

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\powershell\install-zen-terminal.ps1 -Theme blackwall-crimson -PromptStyle telemetry-2line -ConfigureCmd
```

Or via npm:

```powershell
npm run install:terminal
```

### Built-In Commands (Available in BOTH PowerShell & CMD)
- `zen-ui` / `zen` — Launch the **full-screen interactive TUI workbench** inside PowerShell or CMD (`[Up/Down/1-8]` live-switch themes, `[P]` cycle prompt topology, `[D]` toggle dark/light polarity, `[W]` toggle Blackwall Lattice wallpaper, `[S]` toggle CRT pixel shader, `[G]` test Capri Guard).
- `zen-themes` — Display the 8-theme `@zen-ui-capri/system` polarity matrix card with 24-bit TrueColor swatches (`blackwall-crimson`, `obsidian-gold`, `neon-emerald`, `midnight-cobalt`, `atelier-paper`, `nordic-snow`, `kyoto-matcha`, `cyber-daylight`).
- `zen-theme <theme-id>` — Live-switch PowerShell `$PROFILE`, CMD AutoRun, Windows Terminal color scheme, Windows Terminal tab/window chrome theme, and the 1080p Blackwall Lattice wallpaper simultaneously.
- `zen-prompt <style>` — Switch prompt topology across PowerShell and CMD (`telemetry-2line`, `netrunner-hud`, or `minimal-1line`).
- `zen-wallpaper <on|off|toggle>` — Toggle the procedural 1920×1080 `@zen-ui-capri/system` Blackwall Lattice + radial ambient glow wallpaper in Windows Terminal.
- `zen-shader <on|off|toggle>` — Toggle the hardware-accelerated Direct3D HLSL CRT scanline pixel shader (`~/.zen-terminal/shaders/capri-crt.hlsl`).
- `ll` / `zen-ls` — Render directory contents inside a styled `@zen-ui-capri/system` `ZenDataTable` card.
- `capri-guard "<payload>" | on | off` — Scan strings for SQL/NoSQL injection (`' OR 1=1`), XSS (`<script>`), or Prompt Injection (`Ignore previous instructions`), or toggle real-time `Enter`-key interception in PowerShell.
- `zen-banner` / `zen-status` — Clear screen and render the 2-column `@zen-ui-capri/system` Telemetry HUD card.

### Uninstall / Restore Backup
```powershell
powershell -ExecutionPolicy Bypass -File .\powershell\uninstall-zen-terminal.ps1
```

---

## 2. Interactive `zeN-Terminal` Web Workbench (`https://terminal.lpabst.dev`)

```powershell
npm install
npm run dev
```
