/**
 * Single source of truth for VMarket Digital's homepage copy and entity data.
 *
 * Everything here is consumed by both the rendered page and the JSON-LD /
 * llms.txt layer, so an edit propagates to the human-readable page, the
 * structured data, and the AI-readable summary at the same time. Future
 * service and location pages should import from here rather than re-typing
 * service names or region lists.
 *
 * Facts (address, mission, vision, tenure, industries, regions) are carried
 * over from the existing vmarket.digital site — do not invent metrics here.
 */

export const site = {
  legalName: "Vantage Market & Digital Solutions LLC",
  name: "VMarket Digital",
  url: "https://vmarket.digital",
  email: "contact@vmarket.digital",
  tagline: "Growth systems, engineered.",
  /** Used verbatim as the meta description and the llms.txt one-liner. */
  shortDescription:
    "VMarket Digital is a US-registered growth partner that builds complete digital growth systems — marketing, websites, apps, AI chat and voice agents, CRM automation, and analytics — for businesses across the USA, Canada, UK, Australia, the Middle East, and Africa.",
  mission:
    "To empower SMBs with accessible, affordable, and high-impact digital growth solutions that help them acquire customers faster, respond instantly, and scale consistently.",
  vision:
    "To become a global leader in digital transformation, enabling businesses to thrive by seamlessly integrating technology, marketing, and innovation.",
  address: {
    street: "745 Manitoba Ct",
    locality: "Tracy",
    region: "CA",
    postalCode: "95304",
    country: "US",
    countryName: "United States",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vantage-market-digital-solutions-llc",
    },
    { label: "Instagram", href: "https://www.instagram.com/vmarket.digital" },
    { label: "Facebook", href: "https://www.facebook.com/vmarket.digital" },
  ],
} as const;

export const nav = [
  { label: "Growth engine", href: "#growth-engine" },
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#process" },
  { label: "Regions", href: "#regions" },
  { label: "Answers", href: "#answers" },
] as const;

/* ------------------------------------------------------------------ */
/* Proof bar                                                           */
/* ------------------------------------------------------------------ */

export const proofStats = [
  {
    value: 4,
    suffix: "",
    label: "Connected growth stages",
    detail: "Attract, convert, respond, and compound in one accountable system.",
  },
  {
    value: 11,
    suffix: "",
    label: "Integrated service lines",
    detail: "Strategy through analytics, delivered by one accountable team.",
  },
  {
    value: 6,
    suffix: "",
    label: "Regions served",
    detail: "USA, Canada, UK, Australia, the Middle East, and Africa.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "AI lead response",
    detail: "Voice and chat agents can engage, qualify, and route around the clock.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* The growth engine — the four-stage system narrative                 */
/* ------------------------------------------------------------------ */

export type EngineStage = {
  id: string;
  index: string;
  title: string;
  role: string;
  summary: string;
  capabilities: string[];
  metric: { label: string; value: string };
};

export const engineStages: EngineStage[] = [
  {
    id: "attract",
    index: "01",
    title: "Attract",
    role: "Demand capture",
    summary:
      "SEO, paid media, and content that put your business in front of people already searching for what you sell — then keep the cost per qualified click falling.",
    capabilities: [
      "Technical SEO & local search",
      "Google Ads, Meta, LinkedIn, TikTok",
      "PPC, PPL and PPS models",
      "Content & social strategy",
    ],
    metric: { label: "Optimising for", value: "Qualified traffic" },
  },
  {
    id: "convert",
    index: "02",
    title: "Convert",
    role: "Owned surfaces",
    summary:
      "Fast, accessible websites, landing pages, and mobile apps engineered around a single job: turning attention into a booked call or a submitted form.",
    capabilities: [
      "Conversion-first web design",
      "Landing page systems",
      "iOS, Android & cross-platform apps",
      "E-commerce builds",
    ],
    metric: { label: "Optimising for", value: "Conversion rate" },
  },
  {
    id: "respond",
    index: "03",
    title: "Respond",
    role: "AI & automation",
    summary:
      "AI chat and voice agents answer, qualify, and book around the clock, so no enquiry waits for business hours and no lead goes cold in an inbox.",
    capabilities: [
      "Conversational AI chatbots",
      "AI voice agents & IVR",
      "Appointment booking automation",
      "AI lead qualification & scoring",
    ],
    metric: { label: "Optimising for", value: "Speed to lead" },
  },
  {
    id: "compound",
    index: "04",
    title: "Compound",
    role: "CRM & intelligence",
    summary:
      "One CRM holds every conversation across email, SMS, phone, and social; dashboards turn that history into the next decision instead of last month's report.",
    capabilities: [
      "Unified CRM & pipeline automation",
      "360° customer profiles",
      "Analytics & BI dashboards",
      "Predictive forecasting",
    ],
    metric: { label: "Optimising for", value: "Revenue per lead" },
  },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  /** One-sentence definition. Written to stand alone when quoted by an AI answer engine. */
  definition: string;
  outcomes: string[];
  stage: (typeof engineStages)[number]["id"];
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    definition:
      "Data-driven campaigns across search, social, and paid media that increase online visibility and drive qualified traffic to your business.",
    outcomes: ["Lower cost per acquisition", "Multi-channel reach", "Attribution you can audit"],
    stage: "attract",
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    definition:
      "Technical audits, on-page optimization, content strategy, link building, and local SEO that grow non-paid search visibility over time.",
    outcomes: ["Durable organic traffic", "Local map pack presence", "Answer-engine visibility"],
    stage: "attract",
  },
  {
    slug: "ppc-ppl-pps",
    name: "PPC, PPL & PPS Advertising",
    definition:
      "Pay-per-click, pay-per-lead, and pay-per-sale advertising managed against ROI targets rather than impressions.",
    outcomes: ["Predictable pipeline", "Budget tied to results", "Full-funnel tracking"],
    stage: "attract",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    definition:
      "Platform-specific strategy, content production, and community management across Facebook, Instagram, LinkedIn, X, TikTok, and Pinterest.",
    outcomes: ["Consistent brand presence", "Owned audience growth", "Social-sourced leads"],
    stage: "attract",
  },
  {
    slug: "web-development",
    name: "Website Design & Development",
    definition:
      "High-performance, mobile-first websites built for conversion, plus ongoing maintenance, security updates, and performance monitoring.",
    outcomes: ["Faster load times", "Higher form completion", "Zero-maintenance overhead"],
    stage: "convert",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    definition:
      "Native iOS and Android applications in Swift and Kotlin, plus cross-platform builds in React Native and Flutter.",
    outcomes: ["Direct customer channel", "Retention & repeat use", "One codebase, two stores"],
    stage: "convert",
  },
  {
    slug: "lead-generation",
    name: "Lead & Sales Generation",
    definition:
      "Inbound lead generation through content and optimized landing pages, paired with AI-powered qualification and predictive lead scoring.",
    outcomes: ["More booked calls", "Better lead quality", "Sales team focus"],
    stage: "convert",
  },
  {
    slug: "ai-agents",
    name: "AI Chat & Voice Agents",
    definition:
      "Conversational AI chatbots and AI voice assistants that handle customer support, qualify enquiries, and book appointments 24/7.",
    outcomes: ["Instant response, always on", "Support cost reduction", "Never miss an enquiry"],
    stage: "respond",
  },
  {
    slug: "custom-software",
    name: "Custom Software Development",
    definition:
      "Bespoke business applications, workflow automation, API development, and third-party system integrations.",
    outcomes: ["Manual work removed", "Systems that talk to each other", "Software that fits you"],
    stage: "respond",
  },
  {
    slug: "crm-solutions",
    name: "CRM Solutions",
    definition:
      "A unified communication platform across email, SMS, phone, and social, with 360-degree customer profiles and automated pipelines.",
    outcomes: ["One source of truth", "Automated follow-up", "Nothing falls through"],
    stage: "compound",
  },
  {
    slug: "analytics-bi",
    name: "Analytics & Business Intelligence",
    definition:
      "Data visualization dashboards and predictive analytics for sales forecasting, churn prediction, and demand planning.",
    outcomes: ["Decisions from evidence", "Forecasts you can staff to", "Board-ready reporting"],
    stage: "compound",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    week: "Week 1",
    title: "Growth audit",
    body: "We map your funnel end to end — traffic sources, conversion points, response times, and where revenue is leaking today. You get the findings whether or not we work together.",
  },
  {
    week: "Weeks 2–3",
    title: "System design",
    body: "We specify the stack: which channels, which pages, which automations, which CRM, and the exact metric each piece is accountable for.",
  },
  {
    week: "Weeks 3–6",
    title: "Build & launch",
    body: "Websites, campaigns, AI agents, and CRM workflows ship in parallel. Tracking goes in first, so every launch is measurable from day one.",
  },
  {
    week: "Ongoing",
    title: "Compound",
    body: "Weekly optimisation against the numbers. We scale what creates qualified pipeline and repair the stages that leak attention, response time, or revenue.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Geography                                                           */
/* ------------------------------------------------------------------ */

export type Region = {
  id: string;
  name: string;
  /** Continent-level grouping used for the schema.org areaServed list. */
  countries: string[];
  /** Display label, e.g. "GMT / BST". */
  timezone: string;
  /** IANA zone for the representative city — drives the live clocks. */
  ianaZone: string;
  copy: string;
  /** Seeds the future /locations/<slug> route tree. */
  priorityMarkets: string[];
};

export const regions: Region[] = [
  {
    id: "north-america",
    name: "North America",
    countries: ["United States", "Canada"],
    timezone: "PT / ET",
    ianaZone: "America/Los_Angeles",
    copy: "Our registered home market. Headquartered in California, working across US and Canadian time zones with teams in healthcare, real estate, immigration, and home services.",
    priorityMarkets: ["California", "Texas", "New York", "Florida", "Ontario", "British Columbia"],
  },
  {
    id: "uk-europe",
    name: "United Kingdom",
    countries: ["United Kingdom"],
    timezone: "GMT / BST",
    ianaZone: "Europe/London",
    copy: "UK engagements run on local business hours with GBP budgeting, UK-specific search intent, and campaign structures built for the UK regulatory environment.",
    priorityMarkets: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
  },
  {
    id: "middle-east",
    name: "Middle East",
    countries: ["United Arab Emirates", "Saudi Arabia", "Qatar"],
    timezone: "GST",
    ianaZone: "Asia/Dubai",
    copy: "Gulf market delivery with bilingual campaign support, Sunday-to-Thursday working weeks, and experience serving UAE-based service businesses.",
    priorityMarkets: ["Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Doha"],
  },
  {
    id: "australia",
    name: "Australia",
    countries: ["Australia", "New Zealand"],
    timezone: "AEST",
    ianaZone: "Australia/Sydney",
    copy: "APAC coverage for Australian and New Zealand businesses, with campaigns and AI agents scheduled to local trading hours rather than US ones.",
    priorityMarkets: ["Sydney", "Melbourne", "Brisbane", "Perth", "Auckland"],
  },
  {
    id: "africa",
    name: "Africa",
    countries: ["Nigeria", "Kenya", "South Africa", "Egypt"],
    timezone: "WAT / EAT / SAST",
    ianaZone: "Africa/Lagos",
    copy: "Growth systems for African markets where mobile-first traffic and WhatsApp-led conversation dominate — built for the way customers there actually buy.",
    priorityMarkets: ["Lagos", "Nairobi", "Johannesburg", "Cape Town", "Cairo"],
  },
];

export const industries = [
  "Healthcare",
  "Real estate",
  "Technology",
  "Immigration",
  "Home services",
  "E-commerce",
  "Professional services",
  "Education",
] as const;

/* ------------------------------------------------------------------ */
/* AEO — direct answers to high-intent questions                       */
/* ------------------------------------------------------------------ */

export type Answer = {
  question: string;
  /** Snippet-length: one or two sentences, self-contained, no pronouns pointing outside itself. */
  answer: string;
  detail?: string;
};

export const keyAnswers: Answer[] = [
  {
    question: "What does VMarket Digital do?",
    answer:
      "VMarket Digital builds complete digital growth systems for businesses. Rather than selling isolated services, the company connects marketing, websites, mobile apps, AI chat and voice agents, CRM automation, and analytics into one measurable engine that generates and converts leads.",
    detail:
      "The company operates as Vantage Market & Digital Solutions LLC, a US-registered firm headquartered in Tracy, California.",
  },
  {
    question: "Who is VMarket Digital for?",
    answer:
      "VMarket Digital works with small and medium-sized businesses that depend on a steady flow of inbound leads — including healthcare, real estate, immigration, home services, technology, professional services, and e-commerce companies.",
    detail:
      "Engagements suit businesses that already have demand but are losing it to slow response times, weak websites, or disconnected tools.",
  },
  {
    question: "What services does VMarket Digital offer?",
    answer:
      "VMarket Digital offers eleven integrated service lines: digital marketing, SEO, PPC/PPL/PPS advertising, social media marketing, website design and development, mobile app development, lead and sales generation, AI chat and voice agents, custom software development, CRM solutions, and analytics and business intelligence.",
  },
  {
    question: "How does VMarket Digital help businesses generate leads?",
    answer:
      "VMarket Digital generates leads by combining paid and organic demand capture with conversion-optimised landing pages, then routing every enquiry to an AI agent that responds instantly, qualifies the lead, and books it into a CRM pipeline.",
    detail:
      "Speed to lead is treated as the primary lever: an enquiry answered in seconds converts far more often than one answered the next business day.",
  },
  {
    question: "Does VMarket Digital build AI agents, CRM systems, websites, and apps?",
    answer:
      "Yes. VMarket Digital builds AI chat and voice agents, unified CRM systems, custom websites and e-commerce stores, and native and cross-platform mobile applications — all in-house and designed to operate as one connected system.",
  },
  {
    question: "Which regions does VMarket Digital serve?",
    answer:
      "VMarket Digital serves clients across the United States, Canada, the United Kingdom, Australia, the Middle East, and Africa, with delivery scheduled to each client's local business hours.",
    detail:
      "The company is headquartered in California and has delivered projects for clients in the USA, Canada, UK, and UAE.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs: Answer[] = [
  {
    question: "How quickly will we see results?",
    answer:
      "Timelines depend on the starting point and growth channel. VMarket Digital establishes measurement first, agrees the leading indicators for each engagement, and reports progress against qualified demand, response time, conversion, pipeline, and revenue—not vanity metrics.",
  },
  {
    question: "How is VMarket Digital different from a typical digital marketing agency?",
    answer:
      "A typical agency delivers one channel and hands off the rest. VMarket Digital builds and operates the whole path from click to closed deal — ads, website, AI response, CRM, and reporting — so accountability for the final outcome sits with one team.",
  },
  {
    question: "Do you actually build AI agents, or is it a reseller integration?",
    answer:
      "VMarket Digital builds functional AI chat and voice agents in-house, including natural-language handling, appointment booking, and lead qualification, rather than reselling a generic chatbot widget.",
  },
  {
    question: "Can you work with our existing website and CRM?",
    answer:
      "Yes. VMarket Digital audits the existing stack first and will improve and integrate what already performs, replacing only the components that are demonstrably holding back conversion.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is scoped per engagement after the initial growth audit, based on which parts of the system you need. Performance-based PPL and PPS models are available for lead generation work.",
  },
  {
    question: "Do you work with businesses outside the United States?",
    answer:
      "Yes. VMarket Digital serves clients across North America, the United Kingdom, Australia, the Middle East, and Africa, running campaigns and AI agents on each client's local business hours and currency.",
  },
  {
    question: "What happens in the free growth audit?",
    answer:
      "The growth audit maps your funnel end to end — traffic sources, conversion points, response times, and revenue leaks — and returns a written set of findings you keep whether or not you engage VMarket Digital.",
  },
];

/* ------------------------------------------------------------------ */
/* Differentiators                                                     */
/* ------------------------------------------------------------------ */

export const differentiators = [
  {
    title: "Real AI systems, not AI theatre",
    body: "Working chat and voice agents that qualify and book, deployed into your CRM — not a chatbot widget with a marketing page attached.",
  },
  {
    title: "Full-stack under one roof",
    body: "Strategy, websites, performance marketing, automation, and CRM from one accountable team. No agency-to-developer finger-pointing.",
  },
  {
    title: "Speed treated as strategy",
    body: "Response time is the highest-leverage variable in lead conversion, so it is engineered first rather than optimised last.",
  },
  {
    title: "Instrumented from day one",
    body: "Tracking, attribution, and dashboards ship before budget scales. You see what works while it is still cheap to change.",
  },
] as const;
