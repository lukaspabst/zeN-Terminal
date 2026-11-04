import { useMemo, useState } from 'react';
import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  ZenBadge,
  ZenCard,
  ZenCodeBlock,
  ZenHeading,
  ZenIcon,
  ZenSegmentedControl,
  ZenTabs,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '@zen-ui-capri/system';
import type { ThemePolarityFilter } from '../types/terminal';

export interface ThemeMatrixSectionProps {
  readonly theme: ZenThemeId;
  readonly themeMeta: ZenThemeMetadata;
  readonly schemeName: string;
  readonly activeCodeTab: string;
  readonly psProfilePreview: string;
  readonly windowsTerminalSchemeJson: string;
  readonly hlslShaderPreview: string;
  readonly onChangeCodeTab: (tabId: string) => void;
  readonly onSelectTheme: (themeId: ZenThemeId) => void;
}

export function ThemeMatrixSection({
  theme,
  themeMeta,
  schemeName,
  activeCodeTab,
  psProfilePreview,
  windowsTerminalSchemeJson,
  hlslShaderPreview,
  onChangeCodeTab,
  onSelectTheme,
}: ThemeMatrixSectionProps) {
  const [polarityFilter, setPolarityFilter] = useState<ThemePolarityFilter>('all');

  const darkCount = useMemo(
    () => ZEN_THEMES.filter((item) => item.polarity === 'dark').length,
    []
  );
  const lightCount = useMemo(
    () => ZEN_THEMES.filter((item) => item.polarity === 'light').length,
    []
  );

  const visibleThemes = useMemo(
    () =>
      polarityFilter === 'all'
        ? ZEN_THEMES
        : ZEN_THEMES.filter((item) => item.polarity === polarityFilter),
    [polarityFilter]
  );

  return (
    <section className="space-y-6 pt-8 border-t border-[var(--zen-border-subtle)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <ZenHeading
          as="h2"
          size="section"
          eyebrow={`GENERATED WINDOWS TERMINAL, WALLPAPER & SHADER ARTIFACTS · v${ZEN_UI_VERSION}`}
          eyebrowIcon={<ZenIcon name="code" size="xs" tone="accent" />}
        >
          {ZEN_THEMES.length}-Theme Polarity Matrix &amp; Live Configs
        </ZenHeading>

        <ZenTabs
          ariaLabel="Select configuration file preview"
          activeTab={activeCodeTab}
          onChange={onChangeCodeTab}
          tabs={[
            { id: 'installer', label: 'PowerShell & CMD' },
            { id: 'wt-scheme', label: 'Windows Terminal JSON' },
            { id: 'wt-shader', label: 'CRT HLSL Shader' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-4 min-w-0">
          <ZenSegmentedControl<ThemePolarityFilter>
            ariaLabel="Filter polarity themes"
            size="sm"
            value={polarityFilter}
            onChange={setPolarityFilter}
            items={[
              { value: 'all', label: `All (${ZEN_THEMES.length})` },
              { value: 'dark', label: `Dark (${darkCount})` },
              { value: 'light', label: `Light (${lightCount})` },
            ]}
          />

          <div
            key={polarityFilter}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch"
          >
            {visibleThemes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <ZenCard
                  key={t.id}
                  variant="interactive"
                  selected={isSelected}
                  padding="sm"
                  onSelect={() => onSelectTheme(t.id)}
                  className="h-full flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)] truncate">
                        {t.name}
                      </span>
                      <ZenBadge tone={t.polarity === 'dark' ? 'gold' : 'cyan'}>
                        {t.polarity.toUpperCase()}
                      </ZenBadge>
                    </div>
                    <p className="text-[11px] text-[var(--zen-ink-muted)] leading-snug line-clamp-2">
                      {t.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-1">
                    <span
                      className="w-5 h-5 rounded-lg border border-[var(--zen-border-control)] shrink-0"
                      style={{ backgroundColor: t.canvasHex }}
                      title={`Canvas: ${t.canvasHex}`}
                    />
                    <span
                      className="w-5 h-5 rounded-lg border border-[var(--zen-border-control)] shrink-0"
                      style={{ backgroundColor: t.accentHex }}
                      title={`Accent: ${t.accentHex}`}
                    />
                    <span
                      className="w-5 h-5 rounded-lg border border-[var(--zen-border-control)] shrink-0"
                      style={{ backgroundColor: t.secondaryHex }}
                      title={`Secondary: ${t.secondaryHex}`}
                    />
                    <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] truncate">
                      {t.id}
                    </span>
                  </div>
                </ZenCard>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 min-w-0 lg:sticky lg:top-24">
          {activeCodeTab === 'installer' ? (
            <ZenCodeBlock
              title={`~/.zen-terminal/zen-profile.ps1 (${themeMeta.name})`}
              language="powershell"
              code={psProfilePreview}
            />
          ) : activeCodeTab === 'wt-scheme' ? (
            <ZenCodeBlock
              title={`Windows Terminal settings.json (${schemeName})`}
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
  );
}
