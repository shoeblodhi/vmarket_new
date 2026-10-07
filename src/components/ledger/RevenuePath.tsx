"use client";

import { useEffect, useRef } from "react";
import { engineStages } from "@/lib/content";

const NODES = [
  { x: 20, y: 200 },
  { x: 400, y: 60 },
  { x: 800, y: 150 },
  { x: 1180, y: 40 },
];

/** Fraction of the drawn line at which each marker is considered reached. */
const MARKS = [0.04, 0.34, 0.63, 0.93];

const CURVE =
  "M20 200 C 200 200, 220 60, 400 60 S 620 190, 800 150 S 1010 40, 1180 40";

/**
 * The page's signature device: one continuous line from "stranger" to
 * "revenue", stroked in as the section scrolls.
 *
 * The diagram is **sticky** for the length of the section, so the line
 * finishes drawing while it is still on screen — otherwise the animation
 * completes only once the reader has scrolled past it and is never seen.
 *
 * No React state: scroll progress writes straight to DOM attributes, so a
 * scroll frame costs one style write rather than a full component re-render.
 *
 * Accessibility: the drawing is decorative and hidden. Every stage is also an
 * ordered list of real headings and prose below, which is what assistive tech
 * and crawlers read.
 */
export function RevenuePath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRefs = useRef<(SVGGElement | null)[]>([]);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    const applyReached = (progress: number) => {
      MARKS.forEach((mark, i) => {
        const reached = progress >= mark ? "true" : "false";
        markerRefs.current[i]?.setAttribute("data-reached", reached);
        stageRefs.current[i]?.setAttribute("data-reached", reached);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      applyReached(1);
      return;
    }

    path.style.strokeDashoffset = `${length}`;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();

      // Begin once the section's top has risen past three-quarters of the
      // viewport, and finish after roughly two-thirds of the section has
      // passed — comfortably before the sticky diagram unpins.
      const travelled = window.innerHeight * 0.75 - rect.top;
      const span = Math.max(rect.height * 0.62, 1);
      const progress = Math.min(Math.max(travelled / span, 0), 1);

      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      applyReached(progress);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Pinned while the stages scroll beneath it. Hidden below lg, where
          there is not enough height for a sticky diagram to earn its space. */}
      <div
        aria-hidden
        className="z-10 mb-4 hidden bg-paper-100 pb-10 pt-4 lg:sticky lg:top-[4.75rem] lg:block"
      >
        <svg viewBox="0 0 1200 250" className="w-full" fill="none">
          <path d={CURVE} stroke="var(--color-paper-400)" strokeWidth="1.5" />
          <path
            ref={pathRef}
            d={CURVE}
            stroke="var(--color-steel-600)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {NODES.map((node, i) => (
            <g
              key={engineStages[i].id}
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              data-reached="false"
              className="group"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="5"
                // `r` as a CSS property so it can transition; the r="5"
                // attribute above remains the fallback where it is unsupported.
                className="fill-paper-400 transition-all duration-500 [r:5px] group-data-[reached=true]:fill-ember-500 group-data-[reached=true]:[r:8px]"
              />
              <text
                x={node.x}
                y={node.y - 24}
                textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
                className="fill-ink-300 font-mono text-[13px] transition-colors duration-500 group-data-[reached=true]:fill-ink-900"
              >
                {engineStages[i].index} · {engineStages[i].title.toUpperCase()}
              </text>
            </g>
          ))}

          <text x="20" y="240" className="fill-ink-400 font-mono text-[11px]">
            STRANGER
          </text>
          <text x="1180" y="240" textAnchor="end" className="fill-ink-400 font-mono text-[11px]">
            REVENUE
          </text>
        </svg>
      </div>

      <ol className="grid gap-px overflow-hidden bg-paper-300 sm:grid-cols-2">
        {engineStages.map((stage, i) => (
          <li
            key={stage.id}
            ref={(el) => {
              stageRefs.current[i] = el;
            }}
            data-reached="false"
            className="group bg-paper-100 p-7 sm:p-9 lg:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs tracking-[0.18em] text-ink-400 transition-colors duration-500 group-data-[reached=true]:text-ember-700">
                {stage.index}
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-400">
                {stage.role}
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              {stage.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{stage.summary}</p>

            <ul className="mt-6 space-y-2 border-t border-paper-300 pt-5">
              {stage.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 text-[0.87rem] text-ink-600">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-steel-600" />
                  {capability}
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-400">
              {stage.metric.label}
              <span className="ml-2 font-sans text-sm font-semibold normal-case tracking-normal text-steel-700">
                {stage.metric.value}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
