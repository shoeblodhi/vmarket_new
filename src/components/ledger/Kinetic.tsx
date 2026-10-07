"use client";

import { useEffect, useRef, type ReactNode } from "react";

type KineticProps = {
  /** Each entry becomes one clipped line that rises into place. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
};

/**
 * Line-by-line kinetic type.
 *
 * The hidden state is applied by JS, not by CSS, and only after the observer
 * is attached — so if the bundle never runs, the headline is simply visible.
 * That ordering is the whole point: a headline is the page's most important
 * conversion asset and must not depend on hydration.
 */
export function Kinetic({
  lines,
  className = "",
  lineClassName = "",
  stagger = 90,
}: KineticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const masks = Array.from(root.querySelectorAll<HTMLElement>(".line-mask"));

    // Hide first, observe second — both inside the same frame, so the copy
    // never visibly flashes before it animates.
    masks.forEach((mask) => {
      mask.dataset.state = "pending";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        masks.forEach((mask, i) => {
          const child = mask.firstElementChild as HTMLElement | null;
          if (child) child.style.transitionDelay = `${i * stagger}ms`;
          mask.dataset.state = "shown";
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassName}`}>
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Fade-and-lift for blocks of supporting content. Same guarantee as Kinetic:
 * visible by default, hidden only once JS has taken responsibility for it.
 */
export function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.transition = `opacity .8s var(--ease-out-expo) ${delay}ms, transform .8s var(--ease-out-expo) ${delay}ms`;
    el.style.opacity = "0";
    el.style.transform = "translate3d(0, 18px, 0)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.style.opacity = "1";
        el.style.transform = "none";
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
