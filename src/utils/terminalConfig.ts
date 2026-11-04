import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  capri,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '@zen-ui-capri/system';
import {
  WINDOWS_TERMINAL_SCHEMES,
  getWindowsTerminalSchemeName,
  type PromptStyle,
  type ShellTarget,
  type TerminalLogEntry,
} from '../types/terminal';

export const HLSL_SHADER_PREVIEW = `Texture2D shaderTexture;
SamplerState samplerState;

cbuffer PixelShaderSettings {
  float  Time;
  float  Scale;
  float2 Resolution;
  float4 Background;
};

float4 main(float4 pos : SV_POSITION, float2 tex : TEXCOORD) : SV_TARGET {
  float4 color = shaderTexture.Sample(samplerState, tex);
  float headerMask = smoothstep(44.0, 58.0, tex.y * Resolution.y);
  float scanline = sin(tex.y * Resolution.y * 3.14159265) * 0.032 * headerMask;
  float2 uv = tex * (1.0 - tex.yx);
  float vig = lerp(1.0, pow(uv.x * uv.y * 15.0, 0.12), headerMask);
  color.rgb = saturate((color.rgb - scanline) * lerp(0.90, 1.03, vig));
  return color;
}`;

const BOX_WIDTH = 82;
const BOX_TOP = `╭${'─'.repeat(BOX_WIDTH)}╮`;
const BOX_DIV = `├${'─'.repeat(BOX_WIDTH)}┤`;
const BOX_BOT = `╰${'─'.repeat(BOX_WIDTH)}╯`;

function formatBoxRow(content: string): string {
  const normalized = content.length > BOX_WIDTH ? `${content.slice(0, BOX_WIDTH - 1)}…` : content;
  return `│${normalized.padEnd(BOX_WIDTH)}│`;
}

export function buildInstallCommand(
  shellTarget: ShellTarget,
  theme: ZenThemeId,
  promptStyle: PromptStyle
): string {
  const base = `powershell -ExecutionPolicy Bypass -File .\\powershell\\install-zen-terminal.ps1 -Theme ${theme} -PromptStyle ${promptStyle}`;
  return shellTarget === 'cmd' ? `${base} -ConfigureCmd` : base;
}

export function buildPsProfilePreview(
  theme: ZenThemeId,
  themeName: string,
  promptStyle: PromptStyle,
  latticeEnabled: boolean,
  shaderEnabled: boolean
): string {
  return `# Automatically injected into $PROFILE & CMD AutoRun by install-zen-terminal.ps1
if (Test-Path "$HOME\\.zen-terminal\\zen-profile.ps1") {
  . "$HOME\\.zen-terminal\\zen-profile.ps1"
}

# Launch full-screen interactive 16-theme TUI workbench in PowerShell or CMD:
zen-ui

# Switch active theme + Windows Terminal tab bar & 4K Blackwall Lattice wallpaper (${themeName}):
zen-theme ${theme}
zen-prompt ${promptStyle}
zen-wallpaper ${latticeEnabled ? 'on' : 'off'}
zen-shader ${shaderEnabled ? 'on' : 'off'}

# Render @zen-ui-capri/system v${ZEN_UI_VERSION} DataTable listing or scan payloads:
ll
capri-guard "SELECT * FROM users WHERE id = '1' OR '1'='1'"`;
}

export function buildWindowsTerminalConfig(
  theme: ZenThemeId,
  themeMeta: ZenThemeMetadata,
  latticeEnabled: boolean,
  shaderEnabled: boolean
): string {
  const scheme = WINDOWS_TERMINAL_SCHEMES[theme];
  const schemeName = scheme.name;
  const defaults: Record<string, unknown> = {
    colorScheme: schemeName,
    icon: `~/.zen-terminal/icons/${theme}-ps.png`,
    suppressApplicationTitle: false,
    ...(latticeEnabled
      ? {
          backgroundImage: `~/.zen-terminal/wallpapers/${theme}-4k.png`,
          backgroundImageOpacity: 0.94,
          backgroundImageStretchMode: 'none',
          backgroundImageAlignment: 'topRight',
        }
      : {}),
    ...(shaderEnabled
      ? {
          'experimental.pixelShaderPath': '~/.zen-terminal/shaders/capri-crt.hlsl',
        }
      : {}),
    opacity: 94,
    useAcrylic: true,
    padding: '20, 18, 20, 18',
    cursorShape: 'bar',
    intenseTextStyle: 'all',
    font: { face: 'Cascadia Code', size: 10.5 },
  };

  return JSON.stringify(
    {
      theme: schemeName,
      tabWidthMode: 'titleLength',
      themes: [
        {
          name: schemeName,
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
        defaults,
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
      schemes: [scheme],
    },
    null,
    2
  );
}

export interface CommandEvaluationContext {
  readonly rawCommand: string;
  readonly activeTheme: ZenThemeId;
  readonly activeThemeMeta: ZenThemeMetadata;
  readonly shellTarget: ShellTarget;
  readonly latticeEnabled: boolean;
  readonly shaderEnabled: boolean;
}

export type CommandEvaluationEffect =
  | { readonly type: 'clear' }
  | { readonly type: 'reset-banner' }
  | { readonly type: 'append'; readonly entry: TerminalLogEntry; readonly setTheme?: ZenThemeId; readonly setPromptStyle?: PromptStyle; readonly setLattice?: boolean; readonly setShader?: boolean };

function isPromptStyle(value: string): value is PromptStyle {
  return (
    value === 'telemetry-2line' ||
    value === 'netrunner-hud' ||
    value === 'minimal-1line'
  );
}

export function evaluateTerminalCommand(
  ctx: CommandEvaluationContext
): CommandEvaluationEffect | null {
  const trimmed = ctx.rawCommand.trim();
  if (!trimmed) return null;

  const now = new Date().toTimeString().slice(0, 8);
  const id = `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const lower = trimmed.toLowerCase();

  if (lower === 'clear' || lower === 'cls') {
    return { type: 'clear' };
  }

  if (lower === 'zen-banner' || lower === 'zen-status') {
    return { type: 'reset-banner' };
  }

  if (lower === 'help' || lower === 'zen-help') {
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(` zeN-TERMINAL // COMMAND REFERENCE (@zen-ui-capri/system v${ZEN_UI_VERSION})`),
          BOX_DIV,
          formatBoxRow('  zen-ui / zen                Launch interactive 2-column TUI workbench'),
          formatBoxRow(`  zen-themes                  Display all ${ZEN_THEMES.length} Dark & Light polarity schemes`),
          formatBoxRow('  zen-theme <id>              Switch theme, WT tab row & 4K Lattice wallpaper'),
          formatBoxRow('  zen-prompt <style>          Switch prompt (telemetry-2line | netrunner-hud...)'),
          formatBoxRow('  zen-wallpaper <on|off>      Toggle 3840x2160 Blackwall Lattice background PNG'),
          formatBoxRow('  zen-shader <on|off>         Toggle GPU HLSL CRT scanline pixel shader'),
          formatBoxRow('  ll / zen-ls                 Render @zen-ui-capri/system DataTable directory view'),
          formatBoxRow('  capri-guard "<payload>"     Scan input for SQLi, XSS & Prompt Injection'),
          formatBoxRow('  zen-banner / zen-status     Render the 2-column Capri Telemetry HUD card'),
          BOX_BOT,
        ],
        tone: 'default',
        timestamp: now,
      },
    };
  }

  if (lower === 'zen-ui' || lower === 'zen') {
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(
            ` ◆ zeN-TERMINAL // WORKBENCH TUI v${ZEN_UI_VERSION}  [${ctx.activeThemeMeta.polarity.toUpperCase()} · ${ctx.activeThemeMeta.accentHex}]`
          ),
          BOX_DIV,
          formatBoxRow('  [Arrows/1-8] Live-Switch 16 Themes · [D] Counterpart Pair · [P] Prompt'),
          formatBoxRow('  [W] Toggle 4K Blackwall Lattice · [S] Toggle CRT Shader · [G] Capri Guard'),
          BOX_BOT,
        ],
        tone: 'accent',
        timestamp: now,
      },
    };
  }

  if (lower === 'll' || lower === 'zen-ls') {
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(' ZEN-DATATABLE // C:\\workspace\\zeN-Terminal                            (8 items)'),
          BOX_DIV,
          formatBoxRow('  TYPE      SIZE         MODIFIED            NAME'),
          BOX_DIV,
          formatBoxRow('  [DIR]             -   2026-11-25 02:56    powershell'),
          formatBoxRow('  [DIR]             -   2026-11-25 02:56    src'),
          formatBoxRow('  [EXEC]      68.4 KB   2026-11-25 02:56    zen-profile.ps1'),
          formatBoxRow('  [EXEC]       5.9 KB   2026-11-25 02:56    install-zen-terminal.ps1'),
          formatBoxRow('  [CODE]      12.1 KB   2026-11-25 02:56    App.tsx'),
          formatBoxRow('  [CODE]       1.0 KB   2026-11-25 02:56    package.json'),
          BOX_BOT,
        ],
        tone: 'default',
        timestamp: now,
      },
    };
  }

  if (lower.startsWith('zen-wallpaper')) {
    const arg = lower.replace('zen-wallpaper', '').trim();
    const nextState =
      arg === 'on' ? true : arg === 'off' ? false : !ctx.latticeEnabled;
    return {
      type: 'append',
      setLattice: nextState,
      entry: {
        id,
        command: trimmed,
        outputLines: [
          `◆ [BLACKWALL LATTICE BG] 3840x2160 procedural 4K wallpaper set to ${nextState ? 'ON' : 'OFF'} in Windows Terminal.`,
        ],
        tone: 'success',
        timestamp: now,
      },
    };
  }

  if (lower.startsWith('zen-shader')) {
    const arg = lower.replace('zen-shader', '').trim();
    const nextState =
      arg === 'on' ? true : arg === 'off' ? false : !ctx.shaderEnabled;
    return {
      type: 'append',
      setShader: nextState,
      entry: {
        id,
        command: trimmed,
        outputLines: [
          `◆ [GPU CRT PIXEL SHADER] Direct3D HLSL shader (capri-crt.hlsl) set to ${nextState ? 'ON' : 'OFF'} in Windows Terminal.`,
        ],
        tone: 'success',
        timestamp: now,
      },
    };
  }

  if (lower.startsWith('zen-prompt ')) {
    const targetStyle = lower.replace('zen-prompt ', '').trim();
    if (isPromptStyle(targetStyle)) {
      return {
        type: 'append',
        setPromptStyle: targetStyle,
        entry: {
          id,
          command: trimmed,
          outputLines: [
            `✔ [PROMPT TOPOLOGY] Active prompt style set to "${targetStyle}" across PowerShell & CMD.`,
          ],
          tone: 'success',
          timestamp: now,
        },
      };
    }
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          '✖ Unknown prompt style. Valid styles: telemetry-2line, netrunner-hud, minimal-1line',
        ],
        tone: 'danger',
        timestamp: now,
      },
    };
  }

  if (lower === 'zen-themes') {
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(
            ` @zen-ui-capri/system // ${ZEN_THEMES.length}-THEME POLARITY MATRIX (POWERSHELL, WT & CMD)`
          ),
          BOX_DIV,
          ...ZEN_THEMES.map((t, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const marker = t.id === ctx.activeTheme ? '● ACT' : `○ [${num}]`;
            const schemeName = getWindowsTerminalSchemeName(t.id);
            return formatBoxRow(
              `  ${marker.padEnd(7)} ██  ${t.id.padEnd(18)} ${schemeName.padEnd(27)} [${t.polarity.toUpperCase().padEnd(5)}] ${t.accentHex}`
            );
          }),
          BOX_BOT,
        ],
        tone: 'accent',
        timestamp: now,
      },
    };
  }

  if (lower.startsWith('zen-theme ')) {
    const targetId = lower.replace('zen-theme ', '').trim();
    const found = ZEN_THEMES.find((t) => t.id === targetId);
    if (found) {
      return {
        type: 'append',
        setTheme: found.id,
        entry: {
          id,
          command: trimmed,
          outputLines: [
            `◆ [CAPRI // ZEN-UI] ✔ Switched PowerShell, Windows Terminal & CMD to "${found.name}" (${found.polarity.toUpperCase()} · ${found.accentHex})`,
          ],
          tone: 'success',
          timestamp: now,
        },
      };
    }
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          `✖ Unknown theme "${capri.sanitizeForPrompt(targetId)}". Valid IDs: ${ZEN_THEMES.map((t) => t.id).join(', ')}`,
        ],
        tone: 'danger',
        timestamp: now,
      },
    };
  }

  if (lower.startsWith('capri-guard ')) {
    const payload = trimmed
      .slice('capri-guard '.length)
      .replace(/^["']|["']$/g, '');
    const scan = capri.scanPromptInjection(payload);
    if (scan.safe) {
      return {
        type: 'append',
        entry: {
          id,
          command: trimmed,
          outputLines: [
            '✔ [PASS // CAPRI GUARD] Payload verified clean (0 SQLi, XSS, or Prompt Injection vectors).',
          ],
          tone: 'success',
          timestamp: now,
        },
      };
    }
    const safeBuffer = capri.sanitizeForPrompt(payload).slice(0, 67);
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(' ✖ CAPRI GUARD // COMMAND INTERCEPTED BEFORE EXECUTION'),
          formatBoxRow(` Vectors : ${scan.threats.map((t) => t.category).join(' | ')}`),
          formatBoxRow(` Buffer  : ${safeBuffer}`),
          BOX_BOT,
        ],
        tone: 'danger',
        timestamp: now,
      },
    };
  }

  const autoScan = capri.scanPromptInjection(trimmed);
  if (!autoScan.safe) {
    return {
      type: 'append',
      entry: {
        id,
        command: trimmed,
        outputLines: [
          BOX_TOP,
          formatBoxRow(' ✖ CAPRI GUARD // COMMAND INTERCEPTED BEFORE EXECUTION'),
          formatBoxRow(` Vectors : ${autoScan.threats.map((t) => t.category).join(' | ')}`),
          BOX_BOT,
        ],
        tone: 'danger',
        timestamp: now,
      },
    };
  }

  return {
    type: 'append',
    entry: {
      id,
      command: trimmed,
      outputLines: [
        `✔ Executed in ${ctx.shellTarget === 'cmd' ? 'CMD.EXE (WriteConsoleW)' : 'PowerShell'} [${ctx.activeThemeMeta.name}] · 12ms · ExitCode: 0`,
      ],
      tone: 'default',
      timestamp: now,
    },
  };
}
