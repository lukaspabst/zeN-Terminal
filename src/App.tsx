import { useMemo, useState } from 'react';
import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  ZenAmbientBackground,
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenCopyButton,
  ZenDropdown,
  ZenHeading,
  ZenIcon,
  ZenNavbar,
  ZenSegmentedControl,
  capri,
  useZenTheme,
  type ZenThemeId,
} from '@zen-ui-capri/system';
import { LegalModal } from './components/LegalModal';
import { TerminalWorkbench } from './components/TerminalWorkbench';
import { ThemeMatrixSection } from './components/ThemeMatrixSection';
import {
  getWindowsTerminalSchemeName,
  type PromptStyle,
  type ShellTarget,
  type TerminalLogEntry,
} from './types/terminal';
import {
  HLSL_SHADER_PREVIEW,
  buildInstallCommand,
  buildPsProfilePreview,
  buildWindowsTerminalConfig,
  evaluateTerminalCommand,
} from './utils/terminalConfig';

export default function App() {
  const { theme, themeMeta, setTheme, togglePolarity } = useZenTheme();
  const [shellTarget, setShellTarget] = useState<ShellTarget>('powershell');
  const [promptStyle, setPromptStyle] = useState<PromptStyle>('telemetry-2line');
  const [latticeEnabled, setLatticeEnabled] = useState<boolean>(true);
  const [shaderEnabled, setShaderEnabled] = useState<boolean>(false);
  const [commandInput, setCommandInput] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<string>('installer');
  const [imprintOpen, setImprintOpen] = useState<boolean>(false);
  const [customLogs, setCustomLogs] = useState<readonly TerminalLogEntry[]>([]);
  const [bannerCleared, setBannerCleared] = useState<boolean>(false);

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

  const logs = useMemo(
    () => (bannerCleared ? customLogs : [...initialLogs, ...customLogs]),
    [bannerCleared, initialLogs, customLogs]
  );

  const guardResult = useMemo(
    () => capri.scanPromptInjection(commandInput),
    [commandInput]
  );

  const schemeName = useMemo(
    () => getWindowsTerminalSchemeName(theme),
    [theme]
  );

  const windowsTerminalSchemeJson = useMemo(
    () =>
      buildWindowsTerminalConfig(
        theme,
        themeMeta,
        latticeEnabled,
        shaderEnabled
      ),
    [theme, themeMeta, latticeEnabled, shaderEnabled]
  );

  const installCommand = useMemo(
    () => buildInstallCommand(shellTarget, theme, promptStyle),
    [shellTarget, theme, promptStyle]
  );

  const psProfilePreview = useMemo(
    () =>
      buildPsProfilePreview(
        theme,
        themeMeta.name,
        promptStyle,
        latticeEnabled,
        shaderEnabled
      ),
    [theme, themeMeta.name, promptStyle, latticeEnabled, shaderEnabled]
  );

  const dropdownOptions = useMemo(
    () =>
      ZEN_THEMES.map((t) => ({
        value: t.id,
        label: t.name,
        description: `${t.polarity.toUpperCase()} · ${t.accentHex}`,
        icon: (
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0 border border-[var(--zen-border-control)]"
            style={{ backgroundColor: t.accentHex }}
          />
        ),
      })),
    []
  );

  const executeCommand = (rawCmd: string) => {
    const effect = evaluateTerminalCommand({
      rawCommand: rawCmd,
      activeTheme: theme,
      activeThemeMeta: themeMeta,
      shellTarget,
      latticeEnabled,
      shaderEnabled,
    });
    if (!effect) return;

    if (effect.type === 'clear') {
      setBannerCleared(true);
      setCustomLogs([]);
      setCommandInput('');
      return;
    }

    if (effect.type === 'reset-banner') {
      setBannerCleared(false);
      setCustomLogs([]);
      setCommandInput('');
      return;
    }

    if (effect.setTheme) setTheme(effect.setTheme);
    if (effect.setPromptStyle) setPromptStyle(effect.setPromptStyle);
    if (effect.setLattice !== undefined) setLatticeEnabled(effect.setLattice);
    if (effect.setShader !== undefined) setShaderEnabled(effect.setShader);

    setCustomLogs((prev) => [...prev, effect.entry]);
    setCommandInput('');
  };

  return (
    <div className="relative min-h-screen">
      <ZenAmbientBackground variant="blackwall-lattice" />

      <ZenNavbar
        brandTitle="zeN-Terminal"
        brandSubtitle={`WINDOWS TERMINAL · POWERSHELL · CMD ENGINE (@zen-ui-capri/system v${ZEN_UI_VERSION})`}
        actionsSlot={
          <>
            <div className="w-36 min-[390px]:w-44 sm:w-52">
              <ZenDropdown<ZenThemeId>
                ariaLabel="Select terminal theme"
                value={theme}
                onChange={setTheme}
                options={dropdownOptions}
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
              @ZEN-UI-CAPRI/SYSTEM v{ZEN_UI_VERSION} · {ZEN_THEMES.length} THEMES
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
              <strong>Windows Terminal</strong> (16 Dark &amp; Light window/tab
              chrome themes, procedural 4K <code>3840×2160</code>{' '}
              <code>blackwall-lattice</code> wallpapers, &amp; GPU HLSL CRT
              pixel shader), <strong>PowerShell</strong> (<code>$PROFILE</code>),
              and <strong>CMD.exe</strong> (native <code>WriteConsoleW</code>{' '}
              2-column Telemetry HUD) with an interactive 2-column TUI
              workbench (<code>zen-ui</code>), <code>ZenDataTable</code>{' '}
              directory view (<code>ll</code>), and real-time{' '}
              <code>Enter</code>-key <code>capri-guard</code> interception.
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
                  03 // WINDOWS TERMINAL GPU &amp; 4K WALLPAPER FX
                </div>
                <div className="flex flex-wrap gap-2">
                  <ZenButton
                    variant={latticeEnabled ? 'primary' : 'secondary'}
                    size="sm"
                    mono
                    onClick={() => setLatticeEnabled((v) => !v)}
                  >
                    4K Lattice BG: {latticeEnabled ? 'ON' : 'OFF'}
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

              <div className="p-3 rounded-2xl bg-[var(--zen-bg-canvas)] border border-[var(--zen-border-default)] space-y-2">
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
            <TerminalWorkbench
              theme={theme}
              themeMeta={themeMeta}
              schemeName={schemeName}
              shellTarget={shellTarget}
              promptStyle={promptStyle}
              latticeEnabled={latticeEnabled}
              shaderEnabled={shaderEnabled}
              commandInput={commandInput}
              guardResult={guardResult}
              logs={logs}
              onChangeShellTarget={setShellTarget}
              onChangeCommandInput={setCommandInput}
              onExecuteCommand={executeCommand}
              onClearLogs={() => {
                setBannerCleared(true);
                setCustomLogs([]);
              }}
              onSelectTheme={setTheme}
            />
          </div>
        </section>

        <ThemeMatrixSection
          theme={theme}
          themeMeta={themeMeta}
          schemeName={schemeName}
          activeCodeTab={activeCodeTab}
          psProfilePreview={psProfilePreview}
          windowsTerminalSchemeJson={windowsTerminalSchemeJson}
          hlslShaderPreview={HLSL_SHADER_PREVIEW}
          onChangeCodeTab={setActiveCodeTab}
          onSelectTheme={setTheme}
        />

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

      <LegalModal open={imprintOpen} onClose={() => setImprintOpen(false)} />
    </div>
  );
}
