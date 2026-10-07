"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Thesis", href: "#thesis", index: "01" },
  { label: "The path", href: "#path", index: "02" },
  { label: "Capabilities", href: "#capabilities", index: "03" },
  { label: "Coverage", href: "#coverage", index: "04" },
  { label: "Answers", href: "#answers", index: "05" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        condensed
          ? "border-paper-300 bg-paper-100/92 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[86rem] items-center gap-8 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3 py-1" aria-label="VMarket Digital — home">
          <svg viewBox="0 0 100 100" aria-hidden className="size-5 text-steel-600">
            <path fill="currentColor" d="M0 9 L50 56 L100 9 L100 43 L50 90 L0 43 Z" />
            <path fill="currentColor" opacity=".4" d="M0 59 L33 91 L0 91 Z" />
            <path fill="currentColor" opacity=".4" d="M100 59 L67 91 L100 91 Z" />
          </svg>
          <span className="font-display text-[0.95rem] font-bold uppercase tracking-[0.12em] text-ink-900">
            VMarket
            <span className="ml-1.5 font-mono text-[0.62rem] font-normal tracking-[0.2em] text-ink-400">
              DIGITAL
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-baseline gap-1.5 py-1.5 text-[0.83rem] font-medium text-ink-600 transition-colors hover:text-ink-900"
                >
                  <span className="font-mono text-[0.62rem] text-ink-400 transition-colors group-hover:text-ember-700">
                    {link.index}
                  </span>
                  <span className="rule-link">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href="#enquiry"
            className="hidden bg-ink-900 px-5 py-2.5 text-[0.82rem] font-semibold text-paper-50 transition-colors duration-300 hover:bg-steel-700 sm:inline-flex"
          >
            Request a growth audit
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="ledger-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center border border-paper-400 text-ink-700 transition-colors hover:border-ink-900 lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="ledger-menu" className="border-t border-paper-300 bg-paper-100 px-5 pb-8 pt-3 lg:hidden">
          <nav aria-label="Mobile">
            <ul>
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-paper-300 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 text-lg font-medium text-ink-800"
                  >
                    <span className="font-mono text-[0.7rem] text-ink-400">{link.index}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center bg-ink-900 px-5 py-3.5 text-sm font-semibold text-paper-50"
          >
            Request a growth audit
          </a>
        </div>
      )}
    </header>
  );
}
