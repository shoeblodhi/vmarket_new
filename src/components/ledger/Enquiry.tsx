"use client";

import { useState } from "react";
import { processSteps, regions, services, site } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Growth-audit enquiry.
 *
 * Posts JSON to `NEXT_PUBLIC_LEAD_ENDPOINT` when configured — point it at the
 * existing LeadConnector/CRM inbound webhook. With no endpoint set it opens a
 * prefilled mail draft rather than silently swallowing the enquiry.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

const FIELD =
  "w-full border-0 border-b border-paper-400 bg-transparent px-0 py-2.5 text-[0.95rem] text-ink-900 transition-colors placeholder:text-ink-400 focus:border-steel-600 focus:outline-none focus:ring-0";

const LABEL =
  "block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-500";

export function Enquiry() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot — invisible to people, irresistible to bots.
    if (data.company_website) return;

    setStatus("submitting");

    if (!ENDPOINT) {
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company || "—"}`,
        `Region: ${data.region}`,
        `Priority: ${data.interest}`,
        "",
        String(data.goal ?? ""),
      ].join("\n");

      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Growth audit request — ${data.company || data.name}`,
      )}&body=${encodeURIComponent(body)}`;

      setStatus("success");
      setMessage("Opening your email client with the details filled in.");
      return;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "homepage-growth-audit" }),
      });
      if (!response.ok) throw new Error(String(response.status));

      form.reset();
      setStatus("success");
      setMessage("Received. We'll come back to you within one business day.");
    } catch {
      setStatus("error");
      setMessage(`Something went wrong. Email us directly at ${site.email}.`);
    }
  };

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
      <div>
        <h2 className="font-display text-[2rem] font-bold leading-[1.06] text-ink-900 sm:text-[2.7rem]">
          Find out what your funnel is losing.
        </h2>
        <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ink-600">
          The growth audit is a diagnostic, not a pitch in disguise. We map your traffic,
          conversion points, and response times, then put the leaks in writing — yours to keep
          either way.
        </p>

        <ol className="mt-12 border-t border-paper-300">
          {processSteps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-paper-300 py-5">
              <span className="font-mono text-[0.68rem] text-ink-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-display text-[1rem] font-semibold text-ink-900">
                    {step.title}
                  </h3>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ember-700">
                    {step.week}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.89rem] leading-relaxed text-ink-500">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-400">
            Prefer email
          </p>
          <a
            href={`mailto:${site.email}`}
            className="rule-link mt-1.5 inline-block font-display text-lg font-semibold text-steel-700"
          >
            {site.email}
          </a>
          <address className="mt-5 text-[0.85rem] not-italic leading-relaxed text-ink-500">
            {site.legalName}
            <br />
            {site.address.street}, {site.address.locality}, {site.address.region}{" "}
            {site.address.postalCode}, {site.address.countryName}
          </address>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-paper-50 p-7 sm:p-10">
        <div className="grid gap-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="q-name" className={LABEL}>
                Your name <span className="text-ember-700">*</span>
              </label>
              <input id="q-name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="Jordan Ellis" />
            </div>
            <div>
              <label htmlFor="q-email" className={LABEL}>
                Work email <span className="text-ember-700">*</span>
              </label>
              <input id="q-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="jordan@company.com" />
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="q-company" className={LABEL}>
                Company
              </label>
              <input id="q-company" name="company" type="text" autoComplete="organization" className={FIELD} placeholder="Company name" />
            </div>
            <div>
              <label htmlFor="q-region" className={LABEL}>
                Where you operate
              </label>
              <select id="q-region" name="region" defaultValue={regions[0].name} className={FIELD}>
                {regions.map((region) => (
                  <option key={region.id} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="q-interest" className={LABEL}>
              Biggest priority
            </label>
            <select id="q-interest" name="interest" defaultValue="Not sure yet — audit first" className={FIELD}>
              <option>Not sure yet — audit first</option>
              {services.map((service) => (
                <option key={service.slug}>{service.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="q-goal" className={LABEL}>
              What would make the next 90 days a win?
            </label>
            <textarea id="q-goal" name="goal" rows={3} className={`${FIELD} resize-y`} placeholder="More qualified enquiries, faster response, a site that converts…" />
          </div>

          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company_website">Do not fill this in</label>
            <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 w-full bg-ink-900 px-6 py-4 text-[0.9rem] font-semibold text-paper-50 transition-colors duration-300 hover:bg-steel-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Request my growth audit"}
          </button>

          <p
            aria-live="polite"
            className={`min-h-[1.2rem] text-[0.84rem] ${
              status === "error" ? "text-ember-700" : "text-steel-700"
            }`}
          >
            {message}
          </p>

          <p className="text-[0.76rem] leading-relaxed text-ink-400">
            Used only to prepare and discuss your audit. No lists, no resale.
          </p>
        </div>
      </form>
    </div>
  );
}
