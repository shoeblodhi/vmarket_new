import { faqs, keyAnswers } from "@/lib/content";
import { Rise } from "./Kinetic";

/**
 * Answer-engine block.
 *
 * Question as a real heading, answer as a self-contained paragraph directly
 * beneath it — the shape featured snippets and LLM answer engines extract
 * cleanly. Set on a wide measure with generous leading so it reads as an
 * editorial Q&A rather than an SEO appendix.
 */
export function Answers() {
  return (
    <div className="border-t border-ink-900">
      {keyAnswers.map((item, i) => (
        <Rise key={item.question} delay={(i % 2) * 70}>
          <article className="grid gap-x-12 gap-y-4 border-b border-paper-300 py-9 lg:grid-cols-[3.5rem_minmax(0,22rem)_minmax(0,1fr)] lg:py-11">
            <span aria-hidden className="font-mono text-[0.7rem] text-ember-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-semibold leading-snug text-ink-900 lg:text-[1.4rem]">
              {item.question}
            </h3>
            <div>
              <p className="text-[1rem] leading-relaxed text-ink-700">{item.answer}</p>
              {item.detail && (
                <p className="mt-3 border-l border-steel-300 pl-5 text-[0.9rem] leading-relaxed text-ink-500">
                  {item.detail}
                </p>
              )}
            </div>
          </article>
        </Rise>
      ))}
    </div>
  );
}

/**
 * Native `<details>` accordion — keyboard accessible, works with no JS, and
 * keeps answer text in the DOM for crawlers even while visually collapsed.
 */
export function Faq() {
  return (
    <div className="mx-auto max-w-3xl border-t border-paper-400">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-paper-300">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-[1.02rem] font-semibold text-ink-900 transition-colors group-hover:text-steel-700">
              {faq.question}
            </h3>
            <span
              aria-hidden
              className="mt-1 grid size-5 shrink-0 place-items-center text-ink-400 transition-transform duration-300 group-open:rotate-45 group-open:text-ember-700"
            >
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 1v10M1 6h10" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pr-8 text-[0.94rem] leading-relaxed text-ink-600">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
