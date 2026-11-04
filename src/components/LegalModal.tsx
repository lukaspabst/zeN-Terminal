import { ZenButton, ZenModal } from '@zen-ui-capri/system';

export interface LegalModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function LegalModal({ open, onClose }: LegalModalProps) {
  return (
    <ZenModal
      open={open}
      onClose={onClose}
      eyebrow="LEGAL NOTICE · SWITZERLAND & EU"
      title="Imprint & Privacy / Impressum & Datenschutz"
      subtitle="terminal.lpabst.dev · lpabst.dev"
      footer={
        <ZenButton variant="secondary" size="sm" mono onClick={onClose}>
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
            Zero tracking cookies and no advertising trackers; anonymous, cookie-free page view telemetry is collected via Cloudflare Web Analytics. Hosted on a dedicated Linux server at Hetzner Online GmbH (Germany/EU) behind Cloudflare DNS/TLS protection. Standard technical server logs (IP address, timestamp, requested path) are processed solely to ensure secure operation and mitigate abuse.
          </p>
        </div>
      </div>
    </ZenModal>
  );
}
