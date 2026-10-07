import { Answers, Faq } from "@/components/ledger/Answers";
import { Capabilities } from "@/components/ledger/Capabilities";
import { Coverage } from "@/components/ledger/Coverage";
import { Enquiry } from "@/components/ledger/Enquiry";
import { Hero } from "@/components/ledger/Hero";
import { RevenuePath } from "@/components/ledger/RevenuePath";
import { Section } from "@/components/ledger/Section";
import { Thesis } from "@/components/ledger/Thesis";
import { site } from "@/lib/content";
import { buildHomepageSchema, serializeJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildHomepageSchema()) }}
      />

      <Hero />

      <Section id="thesis" index="01" label="The thesis">
        <Thesis />
      </Section>

      <Section
        id="path"
        index="02"
        label="The path"
        heading={
          <>
            One line from stranger to revenue —{" "}
            <span className="text-ink-400">and we own every inch of it.</span>
          </>
        }
        intro={
          <p>
            Four stages, each accountable for a single number. Break one and the others stop
            paying for themselves — which is exactly what happens when they belong to four
            different suppliers.
          </p>
        }
      >
        <RevenuePath />
      </Section>

      <Section
        id="capabilities"
        index="03"
        label="Capabilities"
        heading="Eleven disciplines, one accountable team."
        intro={
          <p>
            Start with the constraint or hand over the whole system. Nothing gets built without a
            metric attached to it — and most businesses need three of these, not eleven.
          </p>
        }
      >
        <Capabilities />
      </Section>

      <Section
        id="coverage"
        index="04"
        label="Coverage"
        heading="We work your hours, not California's."
        intro={
          <p>
            {site.name} runs campaigns, AI agents, and support on each client&apos;s local
            calendar and currency. The clocks below are live.
          </p>
        }
      >
        <Coverage />
      </Section>

      <Section
        id="answers"
        index="05"
        label="Straight answers"
        heading={`What ${site.name} actually does.`}
        intro={
          <p>
            Direct answers to the questions people ask before getting in touch — written to be
            quoted rather than skimmed.
          </p>
        }
      >
        <Answers />
      </Section>

      <Section id="faq" index="06" label="Before you ask" heading="Frequently asked questions">
        <Faq />
      </Section>

      <Section id="enquiry" index="07" label="Start here" className="bg-paper-200/60">
        <Enquiry />
      </Section>
    </>
  );
}
