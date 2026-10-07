import { regions, site } from "@/lib/content";
import { InkField } from "./InkField";
import { Kinetic, Rise } from "./Kinetic";

/**
 * Asymmetric editorial hero: the argument sits left on a wide measure, the
 * generative ink drawing bleeds off the right. No centred stack, no glow.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-paper-300 pt-[4.25rem]">
      <div
        aria-hidden
        className="hairlines pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />

      {/*
        Ink drawing, bled off the right. The radial mask is essential: without
        it the field stops at a hard vertical edge that reads as a broken
        image rather than a drawing dissolving into the page.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-50 [mask-image:radial-gradient(75%_70%_at_78%_45%,black_15%,transparent_78%)] lg:w-[54%] lg:opacity-80"
      >
        <InkField />
      </div>

      <div className="relative mx-auto max-w-[86rem] px-5 pb-16 pt-14 sm:px-8 sm:pb-20 lg:pb-24 lg:pt-24">
        <div className="max-w-4xl">
          <Rise>
            <p className="label mb-9 max-w-md">
              <span className="text-ink-700">Vantage Market &amp; Digital Solutions LLC</span>
            </p>
          </Rise>

          <h1 className="font-display text-[2.7rem] font-bold leading-[0.98] text-ink-900 sm:text-[4.2rem] lg:text-[5.6rem]">
            <Kinetic
              lines={[
                "Growth is a system,",
                <>
                  not a <span className="italic text-steel-600">line item.</span>
                </>,
              ]}
            />
          </h1>

          <Rise delay={220}>
            <div className="mt-10 grid gap-8 border-t border-paper-400 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-12">
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-600 sm:text-[1.12rem]">
                Most businesses buy growth in pieces — an agency for ads, a freelancer for the
                site, a tool for the CRM. The gaps between those pieces are where the leads die.{" "}
                <span className="text-ink-900">
                  We build and run the whole path instead
                </span>
                : demand, conversion, instant AI response, CRM, and the reporting that proves
                which part paid.
              </p>

              <dl className="shrink-0 space-y-4 sm:w-44">
                <div>
                  <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-400">
                    Disciplines
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-ink-900">11</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-400">
                    Markets
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-ink-900">
                    {regions.length}
                  </dd>
                </div>
              </dl>
            </div>
          </Rise>

          <Rise delay={320}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <a
                href="#enquiry"
                className="group inline-flex items-center gap-3 bg-ink-900 px-7 py-4 text-[0.92rem] font-semibold text-paper-50 transition-colors duration-300 hover:bg-steel-700"
              >
                Request a growth audit
                <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="#path"
                className="rule-link inline-block py-1 text-[0.92rem] font-medium text-ink-700 hover:text-ink-900"
              >
                Follow the path from stranger to revenue
              </a>
            </div>
          </Rise>
        </div>
      </div>

      {/* Coverage ticker — states geography without stuffing the copy above. */}
      <div className="relative overflow-hidden border-t border-paper-300 bg-paper-200/60 py-3">
        <ul
          aria-label="Regions served"
          className="flex w-max items-center motion-safe:animate-ticker"
        >
          {[...regions, ...regions].map((region, i) => (
            <li
              key={`${region.id}-${i}`}
              aria-hidden={i >= regions.length}
              className="flex items-center gap-5 px-6 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-500"
            >
              {region.name}
              <span className="text-ink-400">{region.timezone}</span>
              {/* Separator as a fill, not a glyph — ember-500 is too light
                  to be legible as text on paper. */}
              <span aria-hidden className="size-1 rotate-45 bg-ember-500" />
            </li>
          ))}
        </ul>
        <span className="sr-only">
          {site.name} serves {regions.map((r) => r.name).join(", ")}.
        </span>
      </div>
    </section>
  );
}
