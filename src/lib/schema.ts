import { faqs, keyAnswers, regions, services, site } from "./content";

/**
 * JSON-LD graph for the homepage.
 *
 * Built as a single `@graph` with cross-references by `@id` so search and
 * answer engines resolve VMarket Digital as one entity rather than several
 * unlinked blobs. Everything is derived from `content.ts` — the structured
 * data and the visible page cannot disagree.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const PAGE_ID = `${site.url}/#webpage`;

export function buildHomepageSchema() {
  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: ["Vantage Market & Digital Solutions", "VMarket"],
    url: site.url,
    email: site.email,
    description: site.shortDescription,
    slogan: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo-vmarket.svg`,
      caption: `${site.name} logo`,
    },
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: services.map((service) => service.name),
    // Flattened country list — answer engines match on country names, not
    // on our internal regional groupings.
    areaServed: regions.flatMap((region) =>
      region.countries.map((country) => ({ "@type": "Country", name: country })),
    ),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: ["English"],
      areaServed: regions.flatMap((region) => region.countries),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital growth services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.definition,
          provider: { "@id": ORG_ID },
          areaServed: regions.flatMap((region) => region.countries),
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };

  const webpage = {
    "@type": "WebPage",
    "@id": PAGE_ID,
    url: site.url,
    name: `${site.name} — Digital Growth Systems, AI Agents, CRM & Lead Generation`,
    description: site.shortDescription,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: `${site.url}/opengraph-image`,
    inLanguage: "en",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      ],
    },
  };

  // Both the AEO block and the FAQ accordion are visible on the page, which
  // is what FAQPage markup requires.
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    isPartOf: { "@id": PAGE_ID },
    mainEntity: [...keyAnswers, ...faqs].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.detail ? `${item.answer} ${item.detail}` : item.answer,
      },
    })),
  };

  const serviceList = {
    "@type": "ItemList",
    "@id": `${site.url}/#services`,
    name: "VMarket Digital services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.definition,
        serviceType: service.name,
        provider: { "@id": ORG_ID },
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage, faqPage, serviceList],
  };
}

/** Serialises JSON-LD with `<` escaped, per the Next.js JSON-LD guidance. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
