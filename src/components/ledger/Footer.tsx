import { engineStages, industries, regions, services, site } from "@/lib/content";

const YEAR = new Date().getFullYear();

const COLUMNS = [
  { id: "capabilities", title: "Capabilities", href: "#capabilities", items: services.map((s) => s.name) },
  { id: "coverage", title: "Coverage", href: "#coverage", items: regions.map((r) => r.name) },
  { id: "path", title: "The path", href: "#path", items: engineStages.map((s) => `${s.index} · ${s.title}`) },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-900 bg-paper-200">
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 py-1" aria-label="VMarket Digital — back to top">
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

            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-ink-500">
              {site.legalName} builds and runs the whole path from demand to closed revenue —
              marketing, websites and apps, AI agents, CRM, and the reporting that proves it.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    rel="noopener noreferrer me"
                    target="_blank"
                    className="rule-link inline-block py-1 text-[0.83rem] text-ink-600 hover:text-ink-900"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.id} aria-labelledby={`footer-${column.id}`}>
                <h2
                  id={`footer-${column.id}`}
                  className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-400"
                >
                  {column.title}
                </h2>
                <ul className="mt-4">
                  {column.items.map((item) => (
                    <li key={item}>
                      <a
                        href={column.href}
                        className="rule-link inline-block py-1 text-[0.85rem] text-ink-600 hover:text-ink-900"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-paper-400 pt-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-400">
            Industries
          </p>
          <p className="mt-2 max-w-4xl text-[0.85rem] leading-relaxed text-ink-500">
            {industries.join(" · ")}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper-400 pt-6 text-[0.78rem] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.address.locality}, {site.address.region}, {site.address.countryName} — serving{" "}
            {regions.length} regions
          </p>
        </div>
      </div>
    </footer>
  );
}
