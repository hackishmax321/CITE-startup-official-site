import Link from "next/link";
import CiteLogo from "../designs/logo_design/CiteLogo";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#technologies", label: "Tech" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com", label: "GitHub", icon: "GH" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "IN" },
  { href: "https://twitter.com", label: "Twitter", icon: "X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--footer-bg)]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="CITE Home"
              className="inline-block text-[var(--footer-fg)]"
            >
              <CiteLogo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Web &amp; 3D solutions built around your business. Modern
              technology, practical thinking, real results.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--footer-fg)]">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact / social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--footer-fg)]">
              Get in touch
            </h3>
            <a
              href="mailto:hello@smartdev.lk"
              className="mt-4 inline-block text-sm text-muted transition hover:text-primary"
            >
              info@cite.lk
            </a>

            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-xs font-bold text-muted transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © 2026 CITE – Web &amp; 3D Solutions. All rights reserved.
            </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-muted transition hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted transition hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#home"
              className="text-xs font-medium text-primary transition hover:text-accent"
            >
              Back to Top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}