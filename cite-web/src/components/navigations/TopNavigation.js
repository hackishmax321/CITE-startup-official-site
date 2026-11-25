// components/TopNavigation.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRound, ArrowRight } from "lucide-react";
import AuthModal from "../forms/AuthModal";

export default function TopNavigation() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
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

          {/* Auth CTA */}
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="btn btn-primary group inline-flex items-center gap-2 text-sm"
          >
            <UserRound className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">Login / Sign Up</span>
            <span className="sm:hidden">Account</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultMode="login"
      />
    </>
  );
}