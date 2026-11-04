import { useState, useMemo } from 'react';
import {
  ZenAmbientBackground,
  ZenNavbar,
  ZenHeading,
  ZenCard,
  ZenButton,
  ZenCopyButton,
  ZenBadge,
  ZenInput,
  ZenDropdown,
  ZenSegmentedControl,
  ZenTabs,
  ZenCodeBlock,
  ZenAlert,
  ZenIcon,
  ZenModal,
  useZenTheme,
  ZEN_THEMES,
  capri,
  type ZenThemeId,
} from '@zen-ui/system';

type ShellTarget = 'powershell' | 'windows-terminal' | 'cmd';
type PromptStyle = 'telemetry-2line' | 'minimal-1line' | 'netrunner-hud';

interface TerminalLogEntry {
  readonly id: string;
  readonly command: string;
  readonly outputLines: readonly string[];
  readonly tone: 'default' | 'accent' | 'success' | 'danger';
  readonly timestamp: string;
  readonly isHudBanner?: boolean;
}

export default function App() {
  const { theme, themeMeta, setTheme, togglePolarity } = useZenTheme();
  const [shellTarget, setShellTarget] = useState<ShellTarget>('powershell');
  const [promptStyle, setPromptStyle] = useState<PromptStyle>('telemetry-2line');
  const [latticeEnabled, setLatticeEnabled] = useState<boolean>(true);
  const [shaderEnabled, setShaderEnabled] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<string>('installer');
  const [imprintOpen, setImprintOpen] = useState<boolean>(false);

  const initialLogs = useMemo<readonly TerminalLogEntry[]>(
    () => [
      {
        id: 'boot-1',
        command: 'zen-banner',
        outputLines: [],
        tone: 'accent',
        timestamp: '00:25:00',
        isHudBanner: true,
      },
    ],
    []
  );

  const [customLogs, setCustomLogs] = useState<readonly TerminalLogEntry[]>([]);
  const [bannerCleared, setBannerCleared] = useState<boolean>(false);

  const logs = useMemo(
    () => (bannerCleared ? customLogs : [...initialLogs, ...customLogs]),
    [bannerCleared, initialLogs, customLogs]
  );

  const guardResult = useMemo(
    () => capri.scanPromptInjection(commandInput),
    [commandInput]
  );

  const windowsTerminalSchemeName = useMemo(() => {
    if (theme === 'blackwall-crimson') return 'Capri // Blackwall Crimson';
    return `Zen // ${themeMeta.name}`;
  }, [theme, themeMeta.name]);

  const windowsTerminalSchemeJson = useMemo(
    () =>
      JSON.stringify(
        {
          theme: windowsTerminalSchemeName,
          tabWidthMode: 'titleLength',
          themes: [
            {
              name: windowsTerminalSchemeName,
              tab: {
                background: `${themeMeta.accentHex}2E`,
                unfocusedBackground: '#00000000',
                showCloseButton: 'always',
              },
              tabRow: {
                background: themeMeta.canvasHex,
                unfocusedBackground: themeMeta.canvasHex,
              },
              window: {
                applicationTheme: themeMeta.polarity,
                useMica: true,
              },
            },
          ],
          profiles: {
            defaults: {
              colorScheme: windowsTerminalSchemeName,
              icon: `~/.zen-terminal/icons/${theme}-ps.png`,
              suppressApplicationTitle: false,
              backgroundImage: `~/.zen-terminal/wallpapers/${theme}.png`,
              backgroundImageOpacity: 0.94,
              backgroundImageStretchMode: 'none',
              backgroundImageAlignment: 'topRight',
              ...(shaderEnabled
                ? {
                    'experimental.pixelShaderPath':
                      '~/.zen-terminal/shaders/capri-crt.hlsl',
                  }
                : {}),
              opacity: 94,
              useAcrylic: true,
              padding: '20, 18, 20, 18',
              cursorShape: 'bar',
              font: { face: 'Cascadia Code', size: 10.5 },
            },
            list: [
              {
                name: 'zeN // PowerShell',
                tabTitle: 'zeN // PowerShell',
                icon: `~/.zen-terminal/icons/${theme}-ps.png`,
                suppressApplicationTitle: false,
                commandline:
                  '%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NoLogo',
              },
              {
                name: 'zeN // CMD',
                tabTitle: 'zeN // CMD',
                icon: `~/.zen-terminal/icons/${theme}-cmd.png`,
                suppressApplicationTitle: false,
                commandline: '%SystemRoot%\\System32\\cmd.exe',
              },
            ],
          },
          schemes: [
            {
              name: windowsTerminalSchemeName,
              background: themeMeta.canvasHex,
              foreground: themeMeta.inkHex,
              cursorColor: themeMeta.accentHex,
              selectionBackground: themeMeta.secondaryHex,
              black: themeMeta.canvasHex,
              red: '#FF3366',
              green: '#00FF66',
              yellow: '#F5B841',
              blue: '#38BDF8',
              purple: themeMeta.accentHex,
              cyan: themeMeta.secondaryHex,
              white: themeMeta.inkHex,
            },
          ],
        },
        null,
        2
      ),
    [windowsTerminalSchemeName, themeMeta, theme, shaderEnabled]
  );

  const hlslShaderPreview = useMemo(
    () => `Texture2D shaderTexture;
SamplerState samplerState;

cbuffer PixelShaderSettings {
  float  Time;
  float  Scale;
  float2 Resolution;
  float4 Background;
};

float4 main(float4 pos : SV_POSITION, float2 tex : TEXCOORD) : SV_TARGET {
  float4 color = shaderTexture.Sample(samplerState, tex);
  float scanline = sin(tex.y * Resolution.y * 3.14159265) * 0.035;
  float2 uv = tex * (1.0 - tex.yx);
  float vig = pow(uv.x * uv.y * 15.0, 0.12);
  color.rgb = saturate((color.rgb - scanline) * lerp(0.88, 1.04, vig));
  return color;
}`,
    []
  );

  const installCommand = useMemo(() => {
    if (shellTarget === 'cmd') {
      return `powershell -ExecutionPolicy Bypass -File .\\powershell\\install-zen-terminal.ps1 -Theme ${theme} -PromptStyle ${promptStyle} -ConfigureCmd`;
    }
    return `powershell -ExecutionPolicy Bypass -File .\\powershell\\install-zen-terminal.ps1 -Theme ${theme} -PromptStyle ${promptStyle}`;
  }, [shellTarget, theme, promptStyle]);

  const psProfilePreview = useMemo(
    () => `# Automatically injected into $PROFILE & CMD AutoRun by install-zen-terminal.ps1
if (Test-Path "$HOME\\.zen-terminal\\zen-profile.ps1") {
  . "$HOME\\.zen-terminal\\zen-profile.ps1"
}

# Launch full-screen interactive TUI workbench inside PowerShell or CMD:
zen-ui

# Switch active theme + Windows Terminal tab bar & 1080p Blackwall Lattice wallpaper:
zen-theme ${theme}
zen-prompt ${promptStyle}
zen-wallpaper ${latticeEnabled ? 'on' : 'off'}
zen-shader ${shaderEnabled ? 'on' : 'off'}

# Render @zen-ui/system DataTable directory listing or scan payloads:
ll
capri-guard "SELECT * FROM users WHERE id = '1' OR '1'='1'"`,
    [theme, promptStyle, latticeEnabled, shaderEnabled]
  );

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const now = new Date().toTimeString().slice(0, 8);
    const id = `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setBannerCleared(true);
      setCustomLogs([]);
      setCommandInput('');
      return;
    }

    if (lower === 'zen-banner' || lower === 'zen-status') {
      setBannerCleared(false);
      setCustomLogs([]);
      setCommandInput('');
      return;
    }

    if (lower === 'help' || lower === 'zen-help') {
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            '╭──────────────────────────────────────────────────────────────────────────────────╮',
            '│ zeN-TERMINAL // COMMAND REFERENCE (@zen-ui/system · POWERSHELL & CMD)            │',
            '├──────────────────────────────────────────────────────────────────────────────────┤',
            '│  zen-ui / zen                Launch interactive full-screen TUI workbench        │',
            '│  zen-themes                  Display all 8 Dark & Light polarity schemes         │',
            '│  zen-theme <id>              Switch theme, WT tab row & 1080p Lattice wallpaper  │',
            '│  zen-prompt <style>          Switch prompt (telemetry-2line | netrunner-hud...)  │',
            '│  zen-wallpaper <on|off>      Toggle 1920x1080 Blackwall Lattice background PNG   │',
            '│  zen-shader <on|off>         Toggle GPU HLSL CRT scanline pixel shader           │',
            '│  ll / zen-ls                 Render @zen-ui/system DataTable directory view      │',
            '│  capri-guard "<payload>"     Scan input for SQLi, XSS & Prompt Injection         │',
            '│  zen-banner / zen-status     Render the 2-column Capri Telemetry HUD card        │',
            '╰──────────────────────────────────────────────────────────────────────────────────╯',
          ],
          tone: 'default',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower === 'zen-ui' || lower === 'zen') {
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            '╭──────────────────────────────────────────────────────────────────────────────────╮',
            `│ ◆ zeN-TERMINAL // INTERACTIVE WORKBENCH TUI (@zen-ui/system)  [${themeMeta.polarity.toUpperCase()} · ${themeMeta.accentHex}] │`,
            '├──────────────────────────────────────────────────────────────────────────────────┤',
            '│  [Up/Down/1-8] Live-Switch Theme · [P] Cycle Prompt Topology · [D] Polarity      │',
            '│  [W] Toggle 1080p Blackwall Lattice BG · [S] Toggle CRT Shader · [G] Capri Guard │',
            '╰──────────────────────────────────────────────────────────────────────────────────╯',
          ],
          tone: 'accent',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower === 'll' || lower === 'zen-ls') {
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            '╭──────────────────────────────────────────────────────────────────────────────────╮',
            '│ ZEN-DATATABLE // C:\\Users\\Lukas\\IdeaProjects\\zeN-Terminal             (8 items)  │',
            '├──────────────────────────────────────────────────────────────────────────────────┤',
            '│  TYPE      SIZE         MODIFIED            NAME                                 │',
            '├──────────────────────────────────────────────────────────────────────────────────┤',
            '│  [DIR]             -   2026-11-04 00:25    powershell                           │',
            '│  [DIR]             -   2026-11-04 00:25    src                                  │',
            '│  [EXEC]      44.2 KB   2026-11-04 00:25    zen-profile.ps1                      │',
            '│  [EXEC]       5.1 KB   2026-11-04 00:25    install-zen-terminal.ps1             │',
            '│  [CODE]      28.4 KB   2026-11-04 00:25    App.tsx                              │',
            '│  [CODE]       1.1 KB   2026-11-04 00:25    package.json                         │',
            '╰──────────────────────────────────────────────────────────────────────────────────╯',
          ],
          tone: 'default',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower.startsWith('zen-wallpaper')) {
      const arg = lower.replace('zen-wallpaper', '').trim();
      const nextState =
        arg === 'on' ? true : arg === 'off' ? false : !latticeEnabled;
      setLatticeEnabled(nextState);
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            `◆ [BLACKWALL LATTICE BG] 1920x1080 procedural wallpaper set to ${nextState ? 'ON' : 'OFF'} in Windows Terminal.`,
          ],
          tone: 'success',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower.startsWith('zen-shader')) {
      const arg = lower.replace('zen-shader', '').trim();
      const nextState =
        arg === 'on' ? true : arg === 'off' ? false : !shaderEnabled;
      setShaderEnabled(nextState);
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            `◆ [GPU CRT PIXEL SHADER] Direct3D HLSL shader (capri-crt.hlsl) set to ${nextState ? 'ON' : 'OFF'} in Windows Terminal.`,
          ],
          tone: 'success',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower.startsWith('zen-prompt ')) {
      const targetStyle = lower.replace('zen-prompt ', '').trim() as PromptStyle;
      if (
        targetStyle === 'telemetry-2line' ||
        targetStyle === 'netrunner-hud' ||
        targetStyle === 'minimal-1line'
      ) {
        setPromptStyle(targetStyle);
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `✔ [PROMPT TOPOLOGY] Active prompt style set to "${targetStyle}" across PowerShell & CMD.`,
            ],
            tone: 'success',
            timestamp: now,
          },
        ]);
      } else {
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              '✖ Unknown prompt style. Valid styles: telemetry-2line, netrunner-hud, minimal-1line',
            ],
            tone: 'danger',
            timestamp: now,
          },
        ]);
      }
      setCommandInput('');
      return;
    }

    if (lower === 'zen-themes') {
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            '╭──────────────────────────────────────────────────────────────────────────────────╮',
            '│ @zen-ui/system // 8-THEME POLARITY MATRIX (POWERSHELL, WINDOWS TERMINAL & CMD)   │',
            '├──────────────────────────────────────────────────────────────────────────────────┤',
            ...ZEN_THEMES.map(
              (t, idx) =>
                `│  ${t.id === theme ? '● ACTIVE' : `  ○ [${idx + 1}] `}   ██ ██ ██  ${t.id.padEnd(19)} ${t.name.padEnd(25)} [${t.polarity.toUpperCase().padEnd(5)}] ${t.accentHex} │`
            ),
            '╰──────────────────────────────────────────────────────────────────────────────────╯',
          ],
          tone: 'accent',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower.startsWith('zen-theme ')) {
      const targetId = lower.replace('zen-theme ', '').trim() as ZenThemeId;
      const found = ZEN_THEMES.find((t) => t.id === targetId);
      if (found) {
        setTheme(found.id);
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `◆ [CAPRI // ZEN-UI] ✔ Switched PowerShell, Windows Terminal & CMD to "${found.name}" (${found.polarity.toUpperCase()} · ${found.accentHex})`,
            ],
            tone: 'success',
            timestamp: now,
          },
        ]);
      } else {
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `✖ Unknown theme "${targetId}". Valid IDs: ${ZEN_THEMES.map((t) => t.id).join(', ')}`,
            ],
            tone: 'danger',
            timestamp: now,
          },
        ]);
      }
      setCommandInput('');
      return;
    }

    if (lower.startsWith('capri-guard ')) {
      const payload = trimmed
        .slice('capri-guard '.length)
        .replace(/^["']|["']$/g, '');
      const scan = capri.scanPromptInjection(payload);
      if (scan.safe) {
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              '✔ [PASS // CAPRI GUARD] Payload verified clean (0 SQLi, XSS, or Prompt Injection vectors).',
            ],
            tone: 'success',
            timestamp: now,
          },
        ]);
      } else {
        setCustomLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              '╭──────────────────────────────────────────────────────────────────────────────╮',
              '│ ✖ CAPRI GUARD // COMMAND INTERCEPTED BEFORE EXECUTION                        │',
              `│ Vectors : ${scan.threats.map((t) => t.category).join(' | ').padEnd(67)}│`,
              `│ Buffer  : ${payload.slice(0, 67).padEnd(67)}│`,
              '╰──────────────────────────────────────────────────────────────────────────────╯',
            ],
            tone: 'danger',
            timestamp: now,
          },
        ]);
      }
      setCommandInput('');
      return;
    }

    const autoScan = capri.scanPromptInjection(trimmed);
    if (!autoScan.safe) {
      setCustomLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            '╭──────────────────────────────────────────────────────────────────────────────╮',
            '│ ✖ CAPRI GUARD // COMMAND INTERCEPTED BEFORE EXECUTION                        │',
            `│ Vectors : ${autoScan.threats.map((t) => t.category).join(' | ').padEnd(67)}│`,
            '╰──────────────────────────────────────────────────────────────────────────────╯',
          ],
          tone: 'danger',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    setCustomLogs((prev) => [
      ...prev,
      {
        id,
        command: trimmed,
        outputLines: [
          `✔ Executed in ${shellTarget === 'cmd' ? 'CMD.EXE (WriteConsoleW)' : 'PowerShell'} [${themeMeta.name}] · 12ms · ExitCode: 0`,
        ],
        tone: 'default',
        timestamp: now,
      },
    ]);
    setCommandInput('');
  };

  const renderHudBannerCard = () => {
    const shellLabel =
      shellTarget === 'cmd'
        ? 'CMD.EXE'
        : shellTarget === 'windows-terminal'
          ? 'WT // PS 7.5'
          : 'POWERSHELL';
    const wallState = latticeEnabled ? 'LATTICE ON' : 'LATTICE OFF';
    const shaderState = shaderEnabled ? 'SHADER ON' : 'SHADER OFF';

    return (
      <div className="my-2 rounded-xl border border-[var(--zen-border-strong)] bg-[var(--zen-bg-root)]/85 overflow-hidden text-[11px] sm:text-xs zen-font-mono shadow-lg">
        <div className="px-3 py-1.5 border-b border-[var(--zen-border-default)] flex flex-wrap items-center gap-2">
          <span
            className="px-2 py-0.5 font-bold"
            style={{
              backgroundColor: themeMeta.accentHex,
              color: themeMeta.canvasHex,
            }}
          >
            ◆ zeN-TERMINAL // CAPRI SHELL
          </span>
          <span
            className="px-2 py-0.5 font-bold bg-[var(--zen-surface-active)]"
            style={{
              color: themeMeta.accentHex,
            }}
          >
            @zen-ui/system · {shellLabel}
          </span>
        </div>

        <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-center border-b border-[var(--zen-border-default)]">
          <div className="md:col-span-4 md:border-r md:border-[var(--zen-border-default)] pr-2 select-none leading-[1.15] whitespace-pre font-bold">
            <div style={{ color: themeMeta.accentHex }}>
              {' ███████╗███████╗███╗   ██╗'}
            </div>
            <div style={{ color: themeMeta.accentHex }}>
              {' ╚══███╝ ██╔════╝████╗  ██║'}
            </div>
            <div style={{ color: themeMeta.accentHex }}>
              {'   ███╝  █████╗  ██╔██╗ ██║'}
            </div>
            <div style={{ color: themeMeta.secondaryHex }}>
              {'  ███╝   ██╔══╝  ██║╚██╗██║'}
            </div>
            <div style={{ color: themeMeta.secondaryHex }}>
              {' ███████╗███████╗██║ ╚████║'}
            </div>
            <div style={{ color: themeMeta.secondaryHex }}>
              {' ╚══════╝╚══════╝╚═╝  ╚═══╝'}
            </div>
          </div>

          <div className="md:col-span-8 space-y-1 text-[11px] sm:text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[var(--zen-ink-muted)]">SCHEME   : </span>
                <span className="font-bold text-[var(--zen-accent-primary)]">
                  {windowsTerminalSchemeName}
                </span>
              </div>
              <span
                className="px-1.5 py-0.5 font-bold bg-[var(--zen-surface-active)]"
                style={{
                  color: themeMeta.accentHex,
                }}
              >
                {themeMeta.polarity.toUpperCase()} · {themeMeta.accentHex}
              </span>
            </div>

            <div>
              <span className="text-[var(--zen-ink-muted)]">TOPOLOGY : </span>
              <span className="font-bold text-[var(--zen-ink-primary)]">
                {promptStyle}
              </span>{' '}
              <span className="text-[var(--zen-ink-muted)]">
                ({wallState} · {shaderState})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[var(--zen-ink-muted)]">FIREWALL : </span>
              <span
                className="px-2 py-0.5 font-bold"
                style={{
                  backgroundColor: '#06301C',
                  color: '#00FF66',
                }}
              >
                ● CAPRI GUARD: ARMED
              </span>
            </div>

            <div>
              <span className="text-[var(--zen-ink-muted)]">HOST SYS : </span>
              <span className="text-[var(--zen-ink-primary)]">WORKSTATION</span>
              <span className="text-[var(--zen-ink-muted)]"> · User: </span>
              <span className="text-[var(--zen-ink-primary)]">Lukas</span>
              <span className="text-[var(--zen-ink-muted)]"> · </span>
              <span className="text-[var(--zen-accent-secondary)]">
                {shellLabel}
              </span>
            </div>

            <div>
              <span className="text-[var(--zen-ink-muted)]">MEMORY   : </span>
              <span className="text-[var(--zen-accent-secondary)]">
                [███░░░░░░░]
              </span>{' '}
              <span className="text-[var(--zen-ink-primary)]">
                25.1 / 95.1 GB (26%)
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[var(--zen-ink-muted)]">MATRIX   : </span>
              <div className="flex items-center gap-1.5">
                {ZEN_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    title={`Switch to ${t.name}`}
                    className={`cursor-pointer transition-transform ${
                      t.id === theme
                        ? 'w-3.5 h-3.5 scale-110 ring-1 ring-white/60'
                        : 'w-3.5 h-2 opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: t.accentHex }}
                  />
                ))}
              </div>
              <span className="text-[var(--zen-ink-muted)]">(8 Themes)</span>
            </div>
          </div>
        </div>

        <div className="px-3 py-1 border-b border-[var(--zen-border-default)] flex items-center gap-2">
          <span className="font-bold text-[var(--zen-accent-primary)]">
            ◆ WORKBENCH COMMANDS
          </span>
          <span className="text-[var(--zen-ink-muted)]">
            · HTTPS://TERMINAL.LPABST.DEV
          </span>
        </div>

        <div className="p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {[
            { cmd: 'zen-ui', desc: 'Interactive TUI Workbench' },
            { cmd: 'zen-themes', desc: '8-Theme Matrix' },
            { cmd: 'zen-theme <id>', desc: 'Switch Theme Live' },
            { cmd: 'zen-prompt <id>', desc: 'Switch Prompt Style' },
            { cmd: 'capri-guard', desc: 'Scan SQLi / XSS / Prompt' },
            { cmd: 'll / zen-status', desc: 'DataTable & HUD' },
            { cmd: 'zen-wallpaper', desc: 'Toggle Blackwall Lattice' },
            { cmd: 'zen-shader', desc: 'Toggle CRT Shader' },
          ].map((item) => (
            <div key={item.cmd} className="flex items-center gap-2">
              <span
                className="px-1.5 py-0.5 font-bold min-w-[7.8rem] inline-block bg-[var(--zen-surface-active)]"
                style={{
                  color: themeMeta.accentHex,
                }}
              >
                {item.cmd}
              </span>
              <span className="text-[var(--zen-ink-primary)] truncate">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPromptPreview = (cmdText?: string) => {
    const cwdText =
      shellTarget === 'cmd'
        ? 'C:\\Users\\Lukas\\IdeaProjects\\zeN-Terminal'
        : '~/IdeaProjects/zeN-Terminal';

    if (promptStyle === 'minimal-1line') {
      return (
        <div className="zen-font-mono text-xs sm:text-sm flex items-center gap-2 flex-wrap">
          <span className="text-[var(--zen-accent-primary)] font-bold">
            [{theme.toUpperCase()}]
          </span>
          <span className="text-[var(--zen-ink-primary)]">{cwdText}</span>
          <span className="text-[var(--zen-accent-secondary)]">⎇ main ✔</span>
          <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
          {cmdText && (
            <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
          )}
        </div>
      );
    }

    if (promptStyle === 'netrunner-hud') {
      return (
        <div className="zen-font-mono text-xs sm:text-sm space-y-0.5">
          <div className="text-[var(--zen-ink-muted)]">
            ╔══⟦
            <span className="px-1.5 py-0.5 bg-[var(--zen-accent-subtle)] text-[var(--zen-accent-primary)] font-bold">
              ◆ CAPRI // {theme.toUpperCase()}
            </span>
            ⟧══⟦
            <span className="text-[var(--zen-accent-secondary)]">
              ● GUARD: ARMED
            </span>
            ⟧══⟦
            <span className="text-[var(--zen-ink-primary)]">{cwdText}</span>
            ⟧══⟦
            <span className="text-[var(--zen-accent-secondary)]">⎇ main ✔</span>
            ⟧
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--zen-ink-muted)]">╚══</span>
            <span className="text-[var(--zen-accent-secondary)]">✔</span>
            <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
            {cmdText && (
              <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="zen-font-mono text-xs sm:text-sm space-y-0.5">
        <div className="text-[var(--zen-ink-muted)]">
          ╭─[
          <span className="px-1.5 py-0.5 bg-[var(--zen-accent-subtle)] text-[var(--zen-accent-primary)] font-bold">
            ◆ CAPRI // {theme.toUpperCase()}
          </span>
          ]─[
          <span className="text-[var(--zen-ink-primary)]">{cwdText}</span>
          ]─[
          <span className="text-[var(--zen-accent-secondary)]">⎇ main ✔</span>
          ]─[
          <span className="text-[var(--zen-accent-secondary)]">● GUARD</span>
          ]─[<span>12ms · 00:25:14</span>]
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--zen-ink-muted)]">╰─</span>
          <span className="text-[var(--zen-accent-secondary)]">✔</span>
          <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
          {cmdText && (
            <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      <ZenAmbientBackground variant="blackwall-lattice" />

      <ZenNavbar
        brandTitle="zeN-Terminal"
        brandSubtitle="WINDOWS TERMINAL · POWERSHELL · CMD ENGINE (@zen-ui/system)"
        actionsSlot={
          <>
            <div className="w-44 sm:w-52">
              <ZenDropdown<ZenThemeId>
                ariaLabel="Select terminal theme"
                value={theme}
                onChange={setTheme}
                options={ZEN_THEMES.map((t) => ({
                  value: t.id,
                  label: t.name,
                  badge: t.polarity.toUpperCase(),
                }))}
              />
            </div>

            <ZenButton
              variant="secondary"
              size="sm"
              mono
              aria-label="Toggle dark and light polarity"
              onClick={togglePolarity}
              iconLeft={
                <ZenIcon
                  name={themeMeta.polarity === 'dark' ? 'sun' : 'moon'}
                  size="xs"
                  tone="accent"
                />
              }
            >
              {themeMeta.polarity.toUpperCase()}
            </ZenButton>
          </>
        }
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-28 pb-20 space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <ZenBadge
              tone="gold"
              pulse
              icon={<ZenIcon name="terminal" size="xs" tone="accent" />}
            >
              WINDOWS TERMINAL · POWERSHELL · CMD.EXE
            </ZenBadge>

            <ZenHeading
              as="h1"
              size="display"
              accentText="PowerShell & CMD."
            >
              Overhaul Windows Terminal,
            </ZenHeading>

            <p className="text-sm sm:text-base text-[var(--zen-ink-secondary)] leading-relaxed">
              <strong>zeN-Terminal</strong> transforms{' '}
              <strong>Windows Terminal</strong> (custom window/tab chrome themes,
              procedural 1920×1080 <code>blackwall-lattice</code> wallpapers, &amp;
              GPU HLSL CRT pixel shader), <strong>PowerShell</strong> (
              <code>$PROFILE</code>), and <strong>CMD.exe</strong> (native{' '}
              <code>WriteConsoleW</code> 2-column Telemetry HUD)—complete with
              an in-terminal interactive TUI workbench (<code>zen-ui</code>),{' '}
              <code>ZenDataTable</code> directory view (<code>ll</code>), and
              real-time <code>Enter</code>-key <code>capri-guard</code>{' '}
              interception.
            </p>

            <ZenCard variant="static" padding="sm" className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  01 // SELECT TARGET SHELL
                </span>
                <ZenBadge tone="emerald">SAFE BACKUP INCLUDED</ZenBadge>
              </div>

              <ZenSegmentedControl<ShellTarget>
                ariaLabel="Select target Windows shell"
                size="sm"
                value={shellTarget}
                onChange={setShellTarget}
                items={[
                  {
                    value: 'powershell',
                    label: 'zeN // PowerShell',
                    icon: <ZenIcon name="terminal" size="xs" />,
                  },
                  {
                    value: 'windows-terminal',
                    label: 'Windows Terminal',
                    icon: <ZenIcon name="layers" size="xs" />,
                  },
                  {
                    value: 'cmd',
                    label: 'zeN // CMD.exe',
                    icon: <ZenIcon name="code" size="xs" />,
                  },
                ]}
              />

              <div className="space-y-2">
                <div className="zen-telemetry-label">
                  02 // PROMPT TOPOLOGY STYLE (ZEN-PROMPT)
                </div>
                <ZenSegmentedControl<PromptStyle>
                  ariaLabel="Select prompt layout style"
                  size="sm"
                  value={promptStyle}
                  onChange={setPromptStyle}
                  items={[
                    { value: 'telemetry-2line', label: '2-Line Telemetry' },
                    { value: 'netrunner-hud', label: 'Netrunner HUD' },
                    { value: 'minimal-1line', label: 'Minimal 1-Line' },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <div className="zen-telemetry-label">
                  03 // WINDOWS TERMINAL GPU &amp; WALLPAPER FX
                </div>
                <div className="flex flex-wrap gap-2">
                  <ZenButton
                    variant={latticeEnabled ? 'primary' : 'secondary'}
                    size="sm"
                    mono
                    onClick={() => setLatticeEnabled((v) => !v)}
                  >
                    1080p Lattice BG: {latticeEnabled ? 'ON' : 'OFF'}
                  </ZenButton>
                  <ZenButton
                    variant={shaderEnabled ? 'primary' : 'secondary'}
                    size="sm"
                    mono
                    onClick={() => setShaderEnabled((v) => !v)}
                  >
                    CRT HLSL Shader: {shaderEnabled ? 'ON' : 'OFF'}
                  </ZenButton>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--zen-bg-root)] border border-[var(--zen-border-default)] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="zen-telemetry-label text-[var(--zen-accent-secondary)]">
                    ONE-LINE POWERSHELL INSTALLER
                  </span>
                  <ZenCopyButton
                    value={installCommand}
                    label="COPY CMD"
                    copiedLabel="COPIED"
                    size="sm"
                  />
                </div>
                <code className="block zen-font-mono text-xs text-[var(--zen-ink-primary)] break-all">
                  {installCommand}
                </code>
              </div>
            </ZenCard>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <ZenCard
              variant="selected"
              padding="none"
              className="overflow-hidden border border-[var(--zen-accent-border)] shadow-2xl"
            >
              <div className="px-3 pt-2 bg-[var(--zen-bg-elevated)] border-b border-[var(--zen-border-default)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShellTarget('powershell')}
                    className={`px-3 py-1.5 rounded-t-xl zen-font-mono text-xs font-semibold transition-colors cursor-pointer border-t border-x ${
                      shellTarget !== 'cmd'
                        ? 'bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] border-[var(--zen-accent-border)]'
                        : 'bg-transparent text-[var(--zen-ink-muted)] border-transparent hover:text-[var(--zen-ink-primary)]'
                    }`}
                  >
                    ◆ zeN // PowerShell ×
                  </button>
                  <button
                    type="button"
                    onClick={() => setShellTarget('cmd')}
                    className={`px-3 py-1.5 rounded-t-xl zen-font-mono text-xs font-semibold transition-colors cursor-pointer border-t border-x ${
                      shellTarget === 'cmd'
                        ? 'bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] border-[var(--zen-accent-border)]'
                        : 'bg-transparent text-[var(--zen-ink-muted)] border-transparent hover:text-[var(--zen-ink-primary)]'
                    }`}
                  >
                    ◆ zeN // CMD ×
                  </button>
                </div>
                <div className="flex items-center gap-1.5 pb-1.5">
                  <ZenBadge tone="gold">{windowsTerminalSchemeName}</ZenBadge>
                  <ZenBadge tone="emerald">GUARD: ARMED</ZenBadge>
                </div>
              </div>

              <div
                className="relative p-4 sm:p-5 min-h-[26rem] max-h-[34rem] overflow-y-auto space-y-4 zen-font-mono text-[11px] sm:text-xs leading-relaxed"
                style={{
                  backgroundColor: themeMeta.canvasHex,
                  backgroundImage: latticeEnabled
                    ? `radial-gradient(circle at 85% 10%, ${themeMeta.accentHex}22 0%, transparent 45%), radial-gradient(circle at 12% 88%, ${themeMeta.secondaryHex}18 0%, transparent 45%), linear-gradient(to right, ${themeMeta.accentHex}14 1px, transparent 1px), linear-gradient(to bottom, ${themeMeta.accentHex}14 1px, transparent 1px)`
                    : undefined,
                  backgroundSize: latticeEnabled
                    ? '100% 100%, 100% 100%, 48px 48px, 48px 48px'
                    : undefined,
                }}
              >
                {shaderEnabled && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                )}

                {logs.map((entry) => (
                  <div key={entry.id} className="relative z-10 space-y-1.5">
                    {renderPromptPreview(entry.command)}
                    {entry.isHudBanner ? (
                      renderHudBannerCard()
                    ) : (
                      <div
                        className={`pl-2 space-y-0.5 overflow-x-auto ${
                          entry.tone === 'danger'
                            ? 'text-[var(--zen-status-danger)]'
                            : entry.tone === 'success'
                              ? 'text-[var(--zen-status-success)]'
                              : entry.tone === 'accent'
                                ? 'text-[var(--zen-accent-primary)]'
                                : 'text-[var(--zen-ink-secondary)]'
                        }`}
                      >
                        {entry.outputLines.map((line, idx) => (
                          <div key={idx} className="whitespace-pre">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="relative z-10 pt-2 border-t border-[var(--zen-border-subtle)]">
                  {renderPromptPreview(commandInput || 'type a command below...')}
                </div>
              </div>

              <div className="p-4 bg-[var(--zen-bg-elevated)] border-t border-[var(--zen-border-default)] space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1 min-w-0">
                    <ZenInput
                      label="Interactive zeN-Terminal Command Line (PowerShell & CMD)"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          executeCommand(commandInput);
                        }
                      }}
                      placeholder="Try: zen-ui | ll | zen-themes | zen-theme obsidian-gold | zen-shader on"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <ZenButton
                      variant="primary"
                      size="md"
                      mono
                      onClick={() => executeCommand(commandInput)}
                      iconLeft={<ZenIcon name="terminal" size="xs" />}
                    >
                      Run
                    </ZenButton>
                    <ZenButton
                      variant="secondary"
                      size="md"
                      mono
                      onClick={() => {
                        setBannerCleared(true);
                        setCustomLogs([]);
                      }}
                      iconLeft={<ZenIcon name="trash" size="xs" />}
                    >
                      Clear
                    </ZenButton>
                  </div>
                </div>

                {!guardResult.safe && (
                  <ZenAlert tone="danger" title="Capri Terminal Firewall Triggered">
                    Detected {guardResult.threats.map((t) => t.category).join(', ')} in command buffer.
                  </ZenAlert>
                )}

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="zen-telemetry-label mr-1">QUICK RUN:</span>
                  {[
                    'zen-ui',
                    'zen-banner',
                    'll',
                    'zen-themes',
                    'zen-theme obsidian-gold',
                    'zen-theme blackwall-crimson',
                    'zen-prompt netrunner-hud',
                    'zen-wallpaper toggle',
                    'zen-shader toggle',
                    "capri-guard \"' OR 1=1; DROP TABLE users; --\"",
                    'help',
                  ].map((presetCmd) => (
                    <ZenButton
                      key={presetCmd}
                      variant="ghost"
                      size="sm"
                      mono
                      onClick={() => executeCommand(presetCmd)}
                    >
                      {presetCmd}
                    </ZenButton>
                  ))}
                </div>
              </div>
            </ZenCard>
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-[var(--zen-border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <ZenHeading
              as="h2"
              size="section"
              eyebrow="GENERATED WINDOWS TERMINAL, WALLPAPER & SHADER ARTIFACTS"
              eyebrowIcon={<ZenIcon name="code" size="xs" tone="accent" />}
            >
              8-Theme Polarity Matrix &amp; Live Configs
            </ZenHeading>

            <ZenTabs
              ariaLabel="Select configuration file preview"
              activeTab={activeCodeTab}
              onChange={setActiveCodeTab}
              tabs={[
                { id: 'installer', label: 'PowerShell & CMD' },
                { id: 'wt-scheme', label: 'Windows Terminal JSON' },
                { id: 'wt-shader', label: 'CRT HLSL Shader' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ZEN_THEMES.map((t) => {
                const isSelected = t.id === theme;
                return (
                  <ZenCard
                    key={t.id}
                    variant="interactive"
                    selected={isSelected}
                    padding="sm"
                    onSelect={() => setTheme(t.id)}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                        {t.name}
                      </span>
                      <ZenBadge tone={t.polarity === 'dark' ? 'gold' : 'cyan'}>
                        {t.polarity.toUpperCase()}
                      </ZenBadge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-5 h-5 rounded-lg border border-white/20"
                        style={{ backgroundColor: t.canvasHex }}
                        title={`Canvas: ${t.canvasHex}`}
                      />
                      <span
                        className="w-5 h-5 rounded-lg border border-white/20"
                        style={{ backgroundColor: t.accentHex }}
                        title={`Accent: ${t.accentHex}`}
                      />
                      <span
                        className="w-5 h-5 rounded-lg border border-white/20"
                        style={{ backgroundColor: t.secondaryHex }}
                        title={`Secondary: ${t.secondaryHex}`}
                      />
                      <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
                        {t.id}
                      </span>
                    </div>
                  </ZenCard>
                );
              })}
            </div>

            <div className="lg:col-span-7 min-w-0">
              {activeCodeTab === 'installer' ? (
                <ZenCodeBlock
                  title={`~/.zen-terminal/zen-profile.ps1 (${themeMeta.name})`}
                  language="powershell"
                  code={psProfilePreview}
                />
              ) : activeCodeTab === 'wt-scheme' ? (
                <ZenCodeBlock
                  title={`Windows Terminal settings.json (${windowsTerminalSchemeName})`}
                  language="json"
                  code={windowsTerminalSchemeJson}
                />
              ) : (
                <ZenCodeBlock
                  title="~/.zen-terminal/shaders/capri-crt.hlsl"
                  language="hlsl"
                  code={hlslShaderPreview}
                />
              )}
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t border-[var(--zen-border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 zen-font-mono text-xs text-[var(--zen-ink-muted)]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Lukas Pabst</span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Sissach, CH</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://lpabst.dev"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              lpabst.dev
            </a>
            <a
              href="https://ui.lpabst.dev"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              ui.lpabst.dev
            </a>
            <a
              href="https://github.com/lukaspabst/zeN-Terminal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={() => setImprintOpen(true)}
              className="zen-focus-ring text-[var(--zen-accent-primary)] hover:underline cursor-pointer"
            >
              Imprint &amp; Privacy / Impressum
            </button>
          </div>
        </footer>
      </main>

      <ZenModal
        open={imprintOpen}
        onClose={() => setImprintOpen(false)}
        eyebrow="LEGAL NOTICE · SWITZERLAND & EU"
        title="Imprint & Privacy / Impressum & Datenschutz"
        subtitle="terminal.lpabst.dev · lpabst.dev"
        footer={
          <ZenButton
            variant="secondary"
            size="sm"
            mono
            onClick={() => setImprintOpen(false)}
          >
            Close / Schließen
          </ZenButton>
        }
      >
        <div className="space-y-4 text-sm text-[var(--zen-ink-secondary)] leading-relaxed">
          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              RESPONSIBLE FOR CONTENT / VERANTWORTLICH FÜR DEN INHALT
            </div>
            <p className="text-[var(--zen-ink-primary)] font-medium">
              Lukas Pabst
            </p>
            <p>4450 Sissach, Kanton Basel-Landschaft, Switzerland</p>
            <p className="mt-1">
              E-Mail:{' '}
              <a
                href="mailto:lukas.pabst@outlook.de"
                className="text-[var(--zen-accent-primary)] hover:underline"
              >
                lukas.pabst@outlook.de
              </a>
            </p>
          </div>

          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              PURPOSE / ZWECK DIESER WEBSITE
            </div>
            <p>
              Non-commercial open-source web workbench for <code>zeN-Terminal</code> (MIT License). / Nicht-kommerzielle Open-Source-Web-Workbench für <code>zeN-Terminal</code> (MIT-Lizenz).
            </p>
          </div>

          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              PRIVACY &amp; HOSTING (CH-nDSG / GDPR)
            </div>
            <p>
              Zero tracking cookies, zero analytics scripts, and no advertising trackers. Hosted on a dedicated Linux server at Hetzner Online GmbH (Germany/EU) behind Cloudflare DNS/TLS protection. Standard technical server logs (IP address, timestamp, requested path) are processed solely to ensure secure operation and mitigate abuse.
            </p>
          </div>
        </div>
      </ZenModal>
    </div>
  );
}
