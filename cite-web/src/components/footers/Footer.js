import Link from "next/link";

export default function Footer () {
    return (
        <footer className="border-t border-border bg-[var(--footer-bg)] px-6 py-8">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <Link
                href="/"
                className="text-xl font-extrabold tracking-tight text-[var(--footer-fg)]"
            >
                CITE<span className="text-primary">.</span>
            </Link>

            <p className="text-sm text-muted">
                © 2026 CITE – Web & 3D Solutions. All rights reserved.
            </p>

            <Link
                href="#home"
                className="text-sm font-medium text-primary transition hover:text-accent"
            >
                Back to Top ↑
            </Link>

            </div>

        </footer>
    )
}