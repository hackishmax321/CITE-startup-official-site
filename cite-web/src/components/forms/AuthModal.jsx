"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import BrainCanvas from "../designs/login_design/BrainCanvas";
import './forms.css'
import GlowSparks from "../designs/hero_design/GlowSparks";

const EASE = [0.22, 1, 0.36, 1];

/**
 * <AuthModal open={open} onClose={() => setOpen(false)} defaultMode="login" />
 */
export default function AuthModal({ open, onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const panelRef = useRef(null);
  const firstFocusRef = useRef(null);
  const leftSideRef = useRef(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setStatus("");
      setMessage("");
      setShowPassword(false);
      setShowConfirm(false);
      setMouseX(0);
      setMouseY(0);
    }
  }, [open, defaultMode]);

  // Mouse tracking for brain model (relative to left panel)
  useEffect(() => {
    if (!open) return;
    const handleMouseMove = (e) => {
      if (!leftSideRef.current) return;
      const rect = leftSideRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouseX(Math.max(-1, Math.min(1, x)));
      setMouseY(Math.max(-1, Math.min(1, y)));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [open]);

  // Esc + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFocusRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setMessage("");

    const fd = new FormData(event.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    if (mode === "register" && payload.password !== payload.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Something went wrong.");

      setStatus("success");
      setMessage(result.message || (mode === "login" ? "Logged in!" : "Account created!"));
      event.currentTarget.reset();
      setTimeout(() => onClose?.(), 1200);
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop with blur */}
          <motion.button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-[#030B18]/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: EASE }}
            layout
            className="relative z-10 grid w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl md:grid-cols-2"
            style={{ background: "var(--surface)" }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/80 transition hover:bg-black/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ---------- LEFT: 3D Brain side ---------- */}
            <div
              ref={leftSideRef}
              className="relative hidden flex-col overflow-hidden rounded-l-3xl md:flex"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              }}
            >
              {/* Decorative blobs */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[var(--accent)]/30 blur-3xl"
              />

              {/* 3D Brain Canvas */}
              <div className="absolute inset-0 z-10">
                <BrainCanvas mouseX={mouseX} mouseY={mouseY} />
              </div>

              {/* Content overlay */}
              <div className="relative z-20 flex h-full flex-col justify-between p-8 pointer-events-none">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-black/20 text-white font-black">
                      ◆
                    </div>
                    <span className="text-lg font-bold tracking-tight text-[var(--on-primary)]">
                      CITE.
                    </span>
                  </div>

                  <h2 className="mt-10 text-3xl font-bold leading-tight text-[var(--on-primary)]">
                    {mode === "login"
                      ? "Welcome back to your dashboard."
                      : "Start your journey with us today."}
                  </h2>
                  <p className="mt-3 text-sm text-black/70">
                    {mode === "login"
                      ? "Sign in to manage your projects, messages, and reports."
                      : "Create a free account and get instant access to all features."}
                  </p>
                </div>

                {/* Mode switch on left */}
                <div className="mt-10 inline-flex self-start rounded-full border border-black/10 bg-black/10 p-1 text-xs font-semibold pointer-events-auto backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setStatus("");
                      setMessage("");
                    }}
                    className={`rounded-full px-4 py-1.5 transition ${
                      mode === "login"
                        ? "bg-[var(--on-primary)] text-[var(--primary)]"
                        : "text-[var(--on-primary)]/70 hover:text-[var(--on-primary)]"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setStatus("");
                      setMessage("");
                    }}
                    className={`rounded-full px-4 py-1.5 transition ${
                      mode === "register"
                        ? "bg-[var(--on-primary)] text-[var(--primary)]"
                        : "text-[var(--on-primary)]/70 hover:text-[var(--on-primary)]"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT: form side ---------- */}
            <motion.div
              layout
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex flex-col rounded-r-3xl p-6 sm:p-8"
              style={{ background: "var(--surface)" }}
            >
              {/* Mobile tabs */}
              <div className="mb-4 flex rounded-full border border-white/10 bg-[var(--surface-elevated)] p-1 text-xs font-semibold md:hidden">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 rounded-full px-4 py-2 transition ${
                    mode === "login"
                      ? "bg-[var(--primary)] text-[var(--on-primary)]"
                      : "text-white/60"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`flex-1 rounded-full px-4 py-2 transition ${
                    mode === "register"
                      ? "bg-[var(--primary)] text-[var(--on-primary)]"
                      : "text-white/60"
                  }`}
                >
                  Register
                </button>
              </div>

              <div className="mb-6">
                <h3 id="auth-title" className="text-2xl font-bold text-white">
                  {mode === "login" ? "Sign in" : "Create account"}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {mode === "login"
                    ? "Enter your credentials to continue."
                    : "Fill in your details to get started."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "register" && (
                    <motion.div
                      key="fullname"
                      layout
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <Field icon={<User className="h-4 w-4" />} label="Full name">
                        <input
                          ref={firstFocusRef}
                          name="name"
                          required
                          maxLength={80}
                          placeholder="Jane Doe"
                          className="auth-input"
                          autoComplete="name"
                          style={{paddingLeft: 40}}
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Field icon={<Mail className="h-4 w-4" />} label="Email">
                  <input
                    ref={mode === "login" ? firstFocusRef : undefined}
                    name="email"
                    type="email"
                    required
                    maxLength={150}
                    placeholder="you@example.com"
                    className="auth-input"
                    style={{paddingLeft: 40}}
                    autoComplete="email"
                  />
                </Field>

                <Field icon={<Lock className="h-4 w-4" />} label="Password">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      className="auth-input pr-10"
                      style={{paddingLeft: 40}}
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>

                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "register" && (
                    <motion.div
                      key="confirm"
                      layout
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <Field icon={<Lock className="h-4 w-4" />} label="Confirm password">
                        <div className="relative">
                          <input
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            required
                            minLength={8}
                            placeholder="••••••••"
                            className="auth-input pr-10"
                            style={{paddingLeft: 40}}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            aria-label={showConfirm ? "Hide password" : "Show password"}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/50 hover:text-white"
                          >
                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false} mode="popLayout">
                  {mode === "login" && (
                    <motion.div
                      key="remember"
                      layout
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 text-white/60">
                          <input type="checkbox" name="remember" className="auth-checkbox" />
                          Remember me
                        </label>
                        <a href="#" className="font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]">
                          Forgot password?
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[var(--on-primary)] transition disabled:opacity-60"
                  style={{ background: "var(--primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--primary-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)")}
                >
                  {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {message && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-center text-sm ${
                      status === "success" ? "text-[var(--primary)]" : "text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <p className="text-center text-xs text-white/50">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "register" : "login");
                      setStatus("");
                      setMessage("");
                    }}
                    className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
                  >
                    {mode === "login" ? "Register" : "Sign in"}
                  </button>
                </p>
              </form>

              {/* Decorative neuron image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-16 z-20 w-64 rotate-280 select-none sm:w-72 md:-top-7 md:-right-34 md:w-80"
              >
                <img
                  src="/images/neuron-2.png"
                  alt=""
                  className="h-auto w-full drop-shadow-[0_10px_30px_rgba(56,232,210,0.35)]"
                />
                <GlowSparks />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Small wrapper for labeled icon fields */
function Field({ icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/70">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/40">
          {icon}
        </span>
        {/* Apply left padding to ALL descendant inputs (works whether input is a direct
            child or nested inside a relative wrapper for the eye toggle). */}
        <div className="[&_input]:pl-10">{children}</div>
      </div>
    </label>
  );
}