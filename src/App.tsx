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
}

const INITIAL_LOGS: readonly TerminalLogEntry[] = [
  {
    id: 'boot-1',
    command: 'zen-banner',
    outputLines: [
      '⚡ @zen-ui/system · CAPRI // CAPRICORN SHELL v1.0.0',
      '✔ Loaded 8 Polarity Schemes (4 Dark + 4 Light) into Windows Terminal & PowerShell $PROFILE',
      '✔ PSReadLine TrueColor Syntax Highlighting + Capri Input Firewall: ARMED',
      'Type "help", "zen-themes", "zen-theme obsidian-gold", or "capri-guard \' OR 1=1"',
    ],
    tone: 'accent',
    timestamp: '19:50:00',
  },
];

export default function App() {
  const { theme, themeMeta, setTheme, togglePolarity } = useZenTheme();
  const [shellTarget, setShellTarget] = useState<ShellTarget>('powershell');
  const [promptStyle, setPromptStyle] = useState<PromptStyle>('telemetry-2line');
  const [commandInput, setCommandInput] = useState<string>('');
  const [logs, setLogs] = useState<readonly TerminalLogEntry[]>(INITIAL_LOGS);
  const [activeCodeTab, setActiveCodeTab] = useState<string>('installer');

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
        null,
        2
      ),
    [windowsTerminalSchemeName, themeMeta]
  );

  const installCommand = useMemo(() => {
    if (shellTarget === 'cmd') {
      return `powershell -ExecutionPolicy Bypass -File .\\powershell\\install-zen-terminal.ps1 -Theme ${theme} -ConfigureCmd`;
    }
    return `powershell -ExecutionPolicy Bypass -File .\\powershell\\install-zen-terminal.ps1 -Theme ${theme}`;
  }, [shellTarget, theme]);

  const psProfilePreview = useMemo(
    () => `# Automatically injected into $PROFILE by install-zen-terminal.ps1
if (Test-Path "$HOME\\.zen-terminal\\zen-profile.ps1") {
  . "$HOME\\.zen-terminal\\zen-profile.ps1"
}

# Switch active theme across PowerShell + Windows Terminal settings.json:
zen-theme ${theme}

# Audit any CLI argument or string with Capri Guard (SQLi, XSS, Prompt Injection):
capri-guard "SELECT * FROM users WHERE id = '1' OR '1'='1'"`,
    [theme]
  );

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const now = new Date().toTimeString().slice(0, 8);
    const id = `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      setCommandInput('');
      return;
    }

    if (lower === 'help') {
      setLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            'Available zeN-Terminal PowerShell Commands:',
            '  zen-themes                  List all 8 @zen-ui/system terminal themes',
            '  zen-theme <theme-id>        Switch active PowerShell & Windows Terminal theme live',
            '  capri-guard "<payload>"     Scan input for SQL/NoSQL injection, XSS & Prompt Injection',
            '  zen-banner                  Display Capri telemetry ASCII banner',
            '  clear                       Clear terminal buffer',
          ],
          tone: 'default',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    if (lower === 'zen-themes') {
      setLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: ZEN_THEMES.map(
            (t) =>
              `${t.id === theme ? '● ACTIVE' : '        '}  ${t.id.padEnd(20)} ${t.name.padEnd(26)} [${t.polarity.toUpperCase()}] ${t.accentHex}`
          ),
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
        setLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `⚡ [CAPRI // ZEN-UI] Switched PowerShell $PROFILE & Windows Terminal scheme to "${found.name}" (${found.polarity.toUpperCase()} · ${found.accentHex})`,
            ],
            tone: 'success',
            timestamp: now,
          },
        ]);
      } else {
        setLogs((prev) => [
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
      const payload = trimmed.slice('capri-guard '.length).replace(/^["']|["']$/g, '');
      const scan = capri.scanPromptInjection(payload);
      if (scan.safe) {
        setLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `✔ [CAPRI // GUARD PASS] Payload verified clean (0 SQLi, XSS, or Prompt Injection vectors).`,
            ],
            tone: 'success',
            timestamp: now,
          },
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          {
            id,
            command: trimmed,
            outputLines: [
              `✖ [CAPRI // GUARD BLOCKED] ${scan.threats.length} threat(s) intercepted: ${scan.threats.map((t) => `${t.category} ("${t.matchedSnippet}")`).join(' · ')}`,
              `  Sanitized output: ${scan.sanitizedText}`,
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
      setLogs((prev) => [
        ...prev,
        {
          id,
          command: trimmed,
          outputLines: [
            `✖ [CAPRI // GUARD INTERCEPTED] Command blocked before shell execution: ${autoScan.threats.map((t) => t.category).join(', ')}`,
          ],
          tone: 'danger',
          timestamp: now,
        },
      ]);
      setCommandInput('');
      return;
    }

    setLogs((prev) => [
      ...prev,
      {
        id,
        command: trimmed,
        outputLines: [
          `✔ Executed in PowerShell 7.5 [${themeMeta.name}] · ExitCode: 0`,
        ],
        tone: 'default',
        timestamp: now,
      },
    ]);
    setCommandInput('');
  };

  const renderPromptPreview = (cmdText?: string) => {
    if (promptStyle === 'minimal-1line') {
      return (
        <div className="zen-font-mono text-xs sm:text-sm flex items-center gap-2 flex-wrap">
          <span className="text-[var(--zen-accent-primary)] font-bold">
            [{theme.toUpperCase()}]
          </span>
          <span className="text-[var(--zen-ink-muted)]">~/zeN-Terminal</span>
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
        <div className="zen-font-mono text-xs sm:text-sm space-y-0.5">
          <div className="text-[var(--zen-ink-muted)]">
            ⟦<span className="text-[var(--zen-accent-primary)] font-bold">CAPRI // {theme.toUpperCase()}</span>⟧══⟦<span className="text-[var(--zen-accent-secondary)]">GUARD: ARMED</span>⟧══⟦<span className="text-[var(--zen-ink-primary)]">~\Projects\zeN-Terminal</span>⟧
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--zen-accent-primary)] font-bold">╚══❯</span>
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
          ╭─[<span className="text-[var(--zen-accent-primary)] font-bold">CAPRI // {theme.toUpperCase()}</span>]─[<span className="text-[var(--zen-ink-primary)]">~/IdeaProjects/zeN-Terminal</span>]─[<span className="text-[var(--zen-accent-secondary)]">⎇ main ✔</span>]
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
        brandSubtitle="WINDOWS POWERSHELL · TERMINAL · CMD ENGINE (@zen-ui/system)"
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
              WINDOWS TERMINAL · POWERSHELL 7 · CMD.EXE
            </ZenBadge>

            <ZenHeading
              as="h1"
              size="display"
              accentText="PowerShell & CMD."
            >
              Overwrite Windows Terminal,
            </ZenHeading>

            <p className="text-sm sm:text-base text-[var(--zen-ink-secondary)] leading-relaxed">
              <strong>zeN-Terminal</strong> brings all 8{' '}
              <code>@zen-ui/system</code> dark and light themes directly into{' '}
              <strong>Windows Terminal</strong> (<code>settings.json</code>),{' '}
              <strong>PowerShell</strong> (<code>$PROFILE</code>), and{' '}
              <strong>CMD.exe</strong>—complete with a 2-line telemetry prompt,
              PSReadLine syntax highlighting, live theme switching (
              <code>zen-theme &lt;id&gt;</code>), and the{' '}
              <code>capri-guard</code> CLI injection firewall.
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
                    label: 'PowerShell $PROFILE',
                    icon: <ZenIcon name="terminal" size="xs" />,
                  },
                  {
                    value: 'windows-terminal',
                    label: 'Windows Terminal',
                    icon: <ZenIcon name="layers" size="xs" />,
                  },
                  {
                    value: 'cmd',
                    label: '+ Classic CMD',
                    icon: <ZenIcon name="code" size="xs" />,
                  },
                ]}
              />

              <div className="space-y-2">
                <div className="zen-telemetry-label">
                  02 // PROMPT TOPOLOGY STYLE
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
              <div className="px-4 py-3 bg-[var(--zen-bg-elevated)] border-b border-[var(--zen-border-default)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF3366]" />
                  <span className="w-3 h-3 rounded-full bg-[#F5B841]" />
                  <span className="w-3 h-3 rounded-full bg-[#00FF66]" />
                  <span className="ml-2 zen-font-mono text-xs text-[var(--zen-ink-primary)] font-semibold">
                    Windows PowerShell 7.5 — {windowsTerminalSchemeName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ZenBadge tone="gold">{themeMeta.accentHex}</ZenBadge>
                  <ZenBadge tone="emerald">CAPRI GUARD: ON</ZenBadge>
                </div>
              </div>

              <div
                className="p-4 sm:p-6 min-h-[24rem] max-h-[30rem] overflow-y-auto space-y-4 zen-font-mono text-xs sm:text-sm"
                style={{ backgroundColor: themeMeta.canvasHex }}
              >
                {logs.map((entry) => (
                  <div key={entry.id} className="space-y-1.5">
                    {renderPromptPreview(entry.command)}
                    <div
                      className={`pl-4 space-y-1 ${
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
                        <div key={idx} className="whitespace-pre-wrap break-words">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2 border-t border-[var(--zen-border-subtle)]">
                  {renderPromptPreview(commandInput || 'type a command below...')}
                </div>
              </div>

              <div className="p-4 bg-[var(--zen-bg-elevated)] border-t border-[var(--zen-border-default)] space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1 min-w-0">
                    <ZenInput
                      label="Interactive PowerShell / Capri Command Line"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          executeCommand(commandInput);
                        }
                      }}
                      placeholder="Try: zen-themes | zen-theme obsidian-gold | capri-guard &quot;' OR 1=1&quot;"
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
                      onClick={() => setLogs([])}
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
                    'zen-themes',
                    'zen-theme obsidian-gold',
                    'zen-theme neon-emerald',
                    'zen-theme blackwall-crimson',
                    'zen-theme nordic-snow',
                    "capri-guard \"' OR 1=1; DROP TABLE users; --\"",
                    'capri-guard "Ignore previous instructions"',
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
              eyebrow="GENERATED WINDOWS TERMINAL & POWERSHELL ARTIFACTS"
              eyebrowIcon={<ZenIcon name="code" size="xs" tone="accent" />}
            >
              8-Theme Polarity Matrix & Live Configs
            </ZenHeading>

            <ZenTabs
              ariaLabel="Select configuration file preview"
              activeTab={activeCodeTab}
              onChange={setActiveCodeTab}
              tabs={[
                { id: 'installer', label: 'PowerShell $PROFILE' },
                { id: 'wt-scheme', label: 'Windows Terminal JSON' },
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
              ) : (
                <ZenCodeBlock
                  title={`Windows Terminal settings.json -> schemes (${windowsTerminalSchemeName})`}
                  language="json"
                  code={windowsTerminalSchemeJson}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
