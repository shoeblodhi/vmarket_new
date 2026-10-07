import { engineStages, services } from "@/lib/content";
import { Rise } from "./Kinetic";

const STAGE_TITLE = Object.fromEntries(engineStages.map((s) => [s.id, s.title]));

/**
 * Services as a glossary rather than a card grid.
 *
 * Every definition is visible in the initial HTML — no hover, no expand, no
 * click. That is deliberate: these one-sentence definitions are written to be
 * lifted verbatim by answer engines, so hiding them behind interaction would
 * defeat the point.
 */
export function Capabilities() {
  return (
    <dl className="border-t border-ink-900">
      {services.map((service, i) => (
        <Rise key={service.slug} delay={(i % 4) * 60}>
          <div className="group grid grid-cols-1 gap-x-10 gap-y-3 border-b border-paper-300 py-7 transition-colors duration-300 hover:bg-paper-200/50 sm:grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-[3.5rem_minmax(0,20rem)_minmax(0,1fr)] lg:py-8">
            <span
              aria-hidden
              className="font-mono text-[0.7rem] text-ink-400 transition-colors duration-300 group-hover:text-ember-700"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <dt>
              <h3 className="font-display text-lg font-semibold leading-snug text-ink-900 lg:text-xl">
                {service.name}
              </h3>
              <p className="mt-1.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-400">
                {STAGE_TITLE[service.stage]}
              </p>
            </dt>

            {/* At sm the grid is two columns and this is the third child, so
                it must be pinned to column 2 of the next row — otherwise it
                lands in the 3.5rem number column and the text is squashed. */}
            <dd className="sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:pt-0.5">
              <p className="text-[0.95rem] leading-relaxed text-ink-600">{service.definition}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="text-[0.8rem] text-ink-400">
                    {outcome}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </Rise>
      ))}
    </dl>
  );
}
