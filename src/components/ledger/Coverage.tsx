"use client";

import { useEffect, useState } from "react";
import { regions } from "@/lib/content";

/** Local wall-clock time for an IANA zone, or null before hydration. */
function useLocalTimes() {
  const [times, setTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const read = () =>
      setTimes(
        Object.fromEntries(
          regions.map((region) => [
            region.id,
            new Intl.DateTimeFormat("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: region.ianaZone,
            }).format(new Date()),
          ]),
        ),
      );

    read();
    // Aligned to the next minute boundary so all five clocks tick together.
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      read();
      interval = setInterval(read, 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return times;
}

/** True when the zone's local time falls inside a normal working day. */
function isWorkingHours(time: string | undefined) {
  if (!time) return false;
  const hour = Number(time.slice(0, 2));
  return hour >= 8 && hour < 19;
}

/**
 * Coverage as an operational table rather than a map.
 *
 * The live clocks are the point: they make "we work your hours, not ours"
 * verifiable at a glance instead of a claim. Times render only after
 * hydration — server and client would otherwise disagree and mismatch.
 */
export function Coverage() {
  const times = useLocalTimes();

  return (
    <div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          VMarket Digital regional coverage, with current local time in each market
        </caption>
        <thead>
          <tr className="border-y border-ink-900">
            <th scope="col" className="py-3 pr-4 font-mono text-[0.64rem] font-medium uppercase tracking-[0.16em] text-ink-500">
              Region
            </th>
            <th scope="col" className="hidden py-3 pr-4 font-mono text-[0.64rem] font-medium uppercase tracking-[0.16em] text-ink-500 md:table-cell">
              Countries
            </th>
            <th scope="col" className="py-3 pr-4 font-mono text-[0.64rem] font-medium uppercase tracking-[0.16em] text-ink-500">
              Zone
            </th>
            <th scope="col" className="py-3 text-right font-mono text-[0.64rem] font-medium uppercase tracking-[0.16em] text-ink-500">
              Local time
            </th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => {
            const time = times?.[region.id];
            const working = isWorkingHours(time);
            return (
              <tr key={region.id} className="border-b border-paper-300 align-top">
                <th scope="row" className="py-6 pr-4 font-normal">
                  <span className="block font-display text-lg font-semibold text-ink-900">
                    {region.name}
                  </span>
                  <span className="mt-2 block max-w-md text-[0.88rem] leading-relaxed text-ink-500">
                    {region.copy}
                  </span>
                  <span className="mt-3 block text-[0.78rem] text-ink-400 md:hidden">
                    {region.countries.join(" · ")}
                  </span>
                </th>
                <td className="hidden py-6 pr-4 text-[0.85rem] leading-relaxed text-ink-500 md:table-cell md:w-48">
                  {region.countries.join(", ")}
                </td>
                <td className="whitespace-nowrap py-6 pr-4 font-mono text-[0.78rem] text-ink-500">
                  {region.timezone}
                </td>
                <td className="py-6 text-right">
                  <span className="block font-mono text-xl tabular-nums text-ink-900">
                    {time ?? "--:--"}
                  </span>
                  <span
                    className={`mt-1 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
                      working ? "text-steel-700" : "text-ink-400"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${working ? "bg-steel-600" : "bg-paper-400"}`}
                    />
                    {times ? (working ? "In hours" : "Out of hours") : "—"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <div key={region.id}>
            <h3 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink-400">
              {region.name} — priority markets
            </h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-600">
              {region.priorityMarkets.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
