import type { ReactNode } from "react";
import { Rise } from "./Kinetic";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  heading?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Document-style section: a numbered label rule, an optional display
 * heading on a narrow measure, then the content on the full grid.
 */
export function Section({
  id,
  index,
  label,
  heading,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      // Sections that supply their own visible heading label the landmark
      // with it; the rest fall back to the label text.
      {...(heading ? { "aria-labelledby": `${id}-heading` } : { "aria-label": label })}
      className={`scroll-mt-24 border-b border-paper-300 py-20 sm:py-24 lg:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Rise>
          <p className="label mb-10">
            <span className="text-ink-700">{index}</span>
            <span>{label}</span>
          </p>
        </Rise>

        {heading ? (
          <div className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
            <h2
              id={`${id}-heading`}
              className="font-display text-[2rem] font-bold leading-[1.06] text-ink-900 sm:text-[2.8rem] lg:text-[3.2rem]"
            >
              {heading}
            </h2>
            {intro && (
              <Rise delay={120}>
                <div className="max-w-md text-[0.98rem] leading-relaxed text-ink-600 lg:pt-3">
                  {intro}
                </div>
              </Rise>
            )}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
