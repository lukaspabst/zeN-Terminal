import {
  ZenAlert,
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenIcon,
  ZenInput,
  type CapriPromptGuardResult,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '@zen-ui-capri/system';
import type { PromptStyle, ShellTarget, TerminalLogEntry } from '../types/terminal';
import { TerminalHudBanner } from './TerminalHudBanner';

export interface TerminalWorkbenchProps {
  readonly theme: ZenThemeId;
  readonly themeMeta: ZenThemeMetadata;
  readonly schemeName: string;
  readonly shellTarget: ShellTarget;
  readonly promptStyle: PromptStyle;
  readonly latticeEnabled: boolean;
  readonly shaderEnabled: boolean;
  readonly commandInput: string;
  readonly guardResult: CapriPromptGuardResult;
  readonly logs: readonly TerminalLogEntry[];
  readonly onChangeShellTarget: (target: ShellTarget) => void;
  readonly onChangeCommandInput: (value: string) => void;
  readonly onExecuteCommand: (rawCmd: string) => void;
  readonly onClearLogs: () => void;
  readonly onSelectTheme: (themeId: ZenThemeId) => void;
}

const QUICK_RUN_COMMANDS: readonly string[] = [
  'zen-ui',
  'zen-banner',
  'll',
  'zen-themes',
  'zen-theme kontur-flame',
  'zen-theme petrol-signal',
  'zen-theme daytrip-butter',
  'zen-theme blackwall-crimson',
  'zen-theme obsidian-gold',
  'zen-prompt netrunner-hud',
  'zen-wallpaper toggle',
  'zen-shader toggle',
  "capri-guard \"' OR 1=1; DROP TABLE users; --\"",
  'help',
];

export function TerminalWorkbench({
  theme,
  themeMeta,
  schemeName,
  shellTarget,
  promptStyle,
  latticeEnabled,
  shaderEnabled,
  commandInput,
  guardResult,
  logs,
  onChangeShellTarget,
  onChangeCommandInput,
  onExecuteCommand,
  onClearLogs,
  onSelectTheme,
}: TerminalWorkbenchProps) {
  const renderPromptPreview = (cmdText?: string) => {
    const cwdText =
      shellTarget === 'cmd'
        ? 'C:\\workspace\\zeN-Terminal'
        : '~/IdeaProjects/zeN-Terminal';

    if (promptStyle === 'minimal-1line') {
      return (
        <div className="zen-font-mono text-xs sm:text-sm flex items-center gap-2.5 flex-wrap">
          <span className="text-[var(--zen-accent-primary)] font-bold">◆</span>
          <span className="text-[var(--zen-ink-primary)] font-semibold">
            {cwdText}
          </span>
          <span className="text-[var(--zen-accent-secondary)]">⎇ main</span>
          <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
          {cmdText && (
            <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
          )}
        </div>
      );
    }

    if (promptStyle === 'netrunner-hud') {
      return (
        <div className="zen-font-mono text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2 py-0.5 bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] font-bold">
              ◆ zen
            </span>
            <span className="text-[var(--zen-ink-primary)] font-semibold">
              {cwdText}
            </span>
            <span className="text-[var(--zen-accent-secondary)]">⎇ main</span>
          </div>
          <div className="flex items-center gap-2 pl-1">
            <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
            {cmdText && (
              <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="zen-font-mono text-xs sm:text-sm flex items-center gap-2.5 flex-wrap">
        <span className="px-2 py-0.5 bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] font-bold">
          ◆ zen
        </span>
        <span className="text-[var(--zen-ink-primary)] font-semibold">
          {cwdText}
        </span>
        <span className="text-[var(--zen-accent-secondary)]">⎇ main</span>
        <span className="text-[var(--zen-accent-primary)] font-bold">❯</span>
        {cmdText && (
          <span className="text-[var(--zen-ink-primary)]">{cmdText}</span>
        )}
      </div>
    );
  };

  return (
    <ZenCard
      variant="selected"
      padding="none"
      className="overflow-hidden border border-[var(--zen-accent-border)] shadow-2xl"
    >
      <div className="px-3 pt-2 bg-[var(--zen-bg-elevated)] border-b border-[var(--zen-border-default)] flex flex-wrap items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Select preview terminal tab"
          className="flex items-center gap-1.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={shellTarget !== 'cmd'}
            onClick={() => onChangeShellTarget('powershell')}
            className={`zen-focus-ring px-3 py-1.5 rounded-t-xl zen-font-mono text-xs font-semibold transition-colors cursor-pointer border-t border-x ${
              shellTarget !== 'cmd'
                ? 'bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] border-[var(--zen-accent-border)]'
                : 'bg-transparent text-[var(--zen-ink-muted)] border-transparent hover:text-[var(--zen-ink-primary)]'
            }`}
          >
            ◆ zeN // PowerShell ×
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={shellTarget === 'cmd'}
            onClick={() => onChangeShellTarget('cmd')}
            className={`zen-focus-ring px-3 py-1.5 rounded-t-xl zen-font-mono text-xs font-semibold transition-colors cursor-pointer border-t border-x ${
              shellTarget === 'cmd'
                ? 'bg-[var(--zen-surface-active)] text-[var(--zen-accent-primary)] border-[var(--zen-accent-border)]'
                : 'bg-transparent text-[var(--zen-ink-muted)] border-transparent hover:text-[var(--zen-ink-primary)]'
            }`}
          >
            ◆ zeN // CMD ×
          </button>
        </div>
        <div className="flex items-center gap-1.5 pb-1.5">
          <ZenBadge tone="gold">{schemeName}</ZenBadge>
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
              <TerminalHudBanner
                theme={theme}
                themeMeta={themeMeta}
                schemeName={schemeName}
                shellTarget={shellTarget}
                promptStyle={promptStyle}
                latticeEnabled={latticeEnabled}
                shaderEnabled={shaderEnabled}
                onSelectTheme={onSelectTheme}
              />
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
              onChange={(e) => onChangeCommandInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onExecuteCommand(commandInput);
                }
              }}
              placeholder="Try: zen-ui | ll | zen-themes | zen-theme kontur-flame | zen-shader on"
            />
          </div>
          <div className="flex items-end gap-2">
            <ZenButton
              variant="primary"
              size="md"
              mono
              onClick={() => onExecuteCommand(commandInput)}
              iconLeft={<ZenIcon name="terminal" size="xs" />}
            >
              Run
            </ZenButton>
            <ZenButton
              variant="secondary"
              size="md"
              mono
              onClick={onClearLogs}
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
          {QUICK_RUN_COMMANDS.map((presetCmd) => (
            <ZenButton
              key={presetCmd}
              variant="ghost"
              size="sm"
              mono
              onClick={() => onExecuteCommand(presetCmd)}
            >
              {presetCmd}
            </ZenButton>
          ))}
        </div>
      </div>
    </ZenCard>
  );
}
