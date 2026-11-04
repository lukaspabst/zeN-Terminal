import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '@zen-ui-capri/system';
import type { PromptStyle, ShellTarget } from '../types/terminal';

export interface TerminalHudBannerProps {
  readonly theme: ZenThemeId;
  readonly themeMeta: ZenThemeMetadata;
  readonly schemeName: string;
  readonly shellTarget: ShellTarget;
  readonly promptStyle: PromptStyle;
  readonly latticeEnabled: boolean;
  readonly shaderEnabled: boolean;
  readonly onSelectTheme: (themeId: ZenThemeId) => void;
}

export function TerminalHudBanner({
  theme,
  themeMeta,
  schemeName,
  shellTarget,
  promptStyle,
  latticeEnabled,
  shaderEnabled,
  onSelectTheme,
}: TerminalHudBannerProps) {
  const shellLabel =
    shellTarget === 'cmd'
      ? 'CMD.EXE'
      : shellTarget === 'windows-terminal'
        ? 'WT // PS 7.5'
        : 'POWERSHELL';
  const wallState = latticeEnabled ? 'LATTICE ON' : 'LATTICE OFF';
  const shaderState = shaderEnabled ? 'SHADER ON' : 'SHADER OFF';
  const darkThemes = ZEN_THEMES.filter((item) => item.polarity === 'dark');
  const lightThemes = ZEN_THEMES.filter((item) => item.polarity === 'light');

  const commands: readonly { readonly cmd: string; readonly desc: string }[] = [
    { cmd: 'zen-ui', desc: 'Interactive TUI Workbench' },
    { cmd: 'zen-themes', desc: `${ZEN_THEMES.length}-Theme Matrix` },
    { cmd: 'zen-theme <id>', desc: 'Switch Theme Live' },
    { cmd: 'zen-prompt <id>', desc: 'Switch Prompt Style' },
    { cmd: 'capri-guard', desc: 'Scan SQLi / XSS / Prompt' },
    { cmd: 'll / zen-status', desc: 'DataTable & HUD' },
    { cmd: 'zen-wallpaper', desc: 'Toggle Blackwall Lattice' },
    { cmd: 'zen-shader', desc: 'Toggle CRT Shader' },
  ];

  const renderSwatchButton = (t: ZenThemeMetadata) => (
    <button
      key={t.id}
      type="button"
      onClick={() => onSelectTheme(t.id)}
      title={`Switch to ${t.name}`}
      aria-label={`Switch to ${t.name}`}
      className={`zen-focus-ring cursor-pointer transition-transform ${
        t.id === theme
          ? 'w-3.5 h-3.5 scale-110 ring-1 ring-[var(--zen-ink-primary)]'
          : 'w-3 h-2 opacity-85 hover:opacity-100'
      }`}
      style={{ backgroundColor: t.accentHex }}
    />
  );

  return (
    <div className="my-2 rounded-xl border border-[var(--zen-border-strong)] bg-[var(--zen-bg-canvas)]/90 overflow-hidden text-[11px] sm:text-xs zen-font-mono shadow-lg">
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
          @zen-ui-capri/system v{ZEN_UI_VERSION} · {shellLabel}
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

        <div className="md:col-span-8 space-y-1 text-[11px] sm:text-xs min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[var(--zen-ink-muted)]">SCHEME   : </span>
              <span className="font-bold text-[var(--zen-accent-primary)]">
                {schemeName}
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
              className="px-2 py-0.5 font-bold border border-[var(--zen-status-success)]/40"
              style={{
                backgroundColor:
                  'color-mix(in srgb, var(--zen-status-success) 16%, var(--zen-bg-canvas))',
                color: 'var(--zen-status-success)',
              }}
            >
              ● CAPRI GUARD: ARMED
            </span>
          </div>

          <div>
            <span className="text-[var(--zen-ink-muted)]">HOST SYS : </span>
            <span className="text-[var(--zen-ink-primary)]">WORKSTATION</span>
            <span className="text-[var(--zen-ink-muted)]"> · User: </span>
            <span className="text-[var(--zen-ink-primary)]">zen</span>
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
            <div className="flex items-center gap-1 flex-wrap">
              {darkThemes.map(renderSwatchButton)}
              <span
                className="w-px h-3 mx-0.5 bg-[var(--zen-border-strong)]"
                aria-hidden="true"
              />
              {lightThemes.map(renderSwatchButton)}
            </div>
            <span className="text-[var(--zen-ink-muted)]">
              ({ZEN_THEMES.length} Themes)
            </span>
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
        {commands.map((item) => (
          <div key={item.cmd} className="flex items-center gap-2 min-w-0">
            <span
              className="px-1.5 py-0.5 font-bold min-w-[7.8rem] inline-block bg-[var(--zen-surface-active)] shrink-0"
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
}
