// components/TopNavigation.jsx
import Link from "next/link";

export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="section-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-foreground"
        >
          CITE<span className="text-primary">.</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <Link href="#home" className="transition hover:text-primary">
            Home
          </Link>
          <Link href="#services" className="transition hover:text-primary">
            Services
          </Link>
          <Link href="#about" className="transition hover:text-primary">
            About
          </Link>
          <Link href="#technologies" className="transition hover:text-primary">
            Technologies
          </Link>
        </div>

        {/* CTA */}
        <Link href="contact" className="btn btn-primary text-sm">
          Let&apos;s Talk →
        </Link>
      </nav>
    </header>
  );
}