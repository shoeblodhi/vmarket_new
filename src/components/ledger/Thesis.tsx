import { differentiators } from "@/lib/content";
import { Kinetic, Rise } from "./Kinetic";

const BREAKS = [
  { at: "The ad works.", then: "The landing page takes six seconds to load." },
  { at: "The form is submitted.", then: "Nobody replies until Tuesday." },
  { at: "The call happens.", then: "It is never logged anywhere." },
  { at: "The quarter ends.", then: "No one can say which channel paid." },
];

export function Thesis() {
  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
      <div>
        <h2 className="font-display text-[2rem] font-bold leading-[1.06] text-ink-900 sm:text-[2.8rem]">
          <Kinetic
            lines={[
              "Nothing here is",
              <>
                broken. The <span className="italic text-steel-600">joins</span>
              </>,
              "are.",
            ]}
          />
        </h2>

        <Rise delay={160}>
          <p className="mt-8 max-w-md text-[1rem] leading-relaxed text-ink-600">
            Every failure below is a handoff between two vendors who were each doing their job
            correctly. That is why buying more of any single service rarely fixes it — and why
            we quote on the whole path rather than a slice of it.
          </p>
        </Rise>
      </div>

      <div>
        <ul className="border-t border-paper-300">
          {BREAKS.map((item, i) => (
            <Rise key={item.at} delay={i * 90}>
              <li className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-paper-300 py-6 sm:grid-cols-[auto_1fr_1fr] sm:items-baseline sm:gap-x-8">
                <span className="font-mono text-[0.68rem] text-ink-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.98rem] font-semibold text-ink-900">{item.at}</span>
                <span className="col-start-2 text-[0.95rem] text-ink-500 sm:col-start-3">
                  {item.then}
                </span>
              </li>
            </Rise>
          ))}
        </ul>

        <Rise delay={220}>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title}>
                <dt className="flex items-baseline gap-2.5 font-display text-[0.98rem] font-semibold text-ink-900">
                  <span aria-hidden className="size-1.5 shrink-0 translate-y-[-2px] bg-ember-500" />
                  {item.title}
                </dt>
                <dd className="mt-2 pl-4 text-[0.9rem] leading-relaxed text-ink-500">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>
    </div>
  );
}
