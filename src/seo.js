/**
 * SEO source of truth.
 *
 * Every page's title, description, canonical, Open Graph, Twitter card and
 * JSON-LD comes from here. The prerender script reads this at build time
 * and bakes it into each route's static HTML, so crawlers and AI engines
 * get everything without running JavaScript.
 *
 * Change business facts once, here. Do not scatter them across components.
 */

export const SITE = {
  url: "https://ronlenserdigital.com",
  name: "Ron Lenser Digital",
  legalName: "Ron Lenser Digital",
  founder: "Ron Lenser",
  phone: "+1-540-395-6493",
  phoneDisplay: "(540) 395-6493",
  email: "ron@ronlenserdigital.com",
  city: "Fredericksburg",
  region: "VA",
  regionLong: "Virginia",
  country: "US",
  lat: 38.3032,
  lng: -77.4605,
  ogImage: "/og.png",
  logo: "/icon-512.png",
  social: [
    "https://facebook.com/remakerony",
    "https://linkedin.com/in/ronlenser",
    "https://github.com/ronlenserdigital",
  ],
  hours: "Mo-Sa 08:00-19:00",
  areaServed: [
    "Fredericksburg",
    "Stafford",
    "Spotsylvania",
    "King George",
    "Caroline County",
    "Culpeper",
    "Orange",
    "Northern Virginia",
  ],
  services: [
    "Custom website design",
    "Web app development",
    "Internal tools and dashboards",
    "Business automation",
    "AI chatbot and AI phone answering",
    "Local SEO and Google Business Profile",
    "Logo and brand design",
  ],
};

/* Per route. Path is the key. `index: false` keeps a page out of search. */
export const PAGES = {
  "/": {
    title: "Ron Lenser Digital | Websites, Apps and Automations in Fredericksburg VA",
    description:
      "Custom websites, web apps and automations for Fredericksburg, Virginia businesses. Built with AI by one person, shipped in days, and you own everything. Fixed quote before work starts.",
    type: "website",
  },
  "/privacy": {
    title: "Privacy Policy | Ron Lenser Digital",
    description:
      "What ronlenserdigital.com collects, why, and what happens to it. Short version: the quote form, cookieless analytics, nothing sold.",
    type: "article",
    index: true,
  },
  "/terms": {
    title: "Terms of Service | Ron Lenser Digital",
    description:
      "Terms for working with Ron Lenser Digital. Fixed quotes, ownership of the finished work, payment, and what happens if either side walks away.",
    type: "article",
    index: true,
  },
  "/404": {
    title: "Page not found | Ron Lenser Digital",
    description: "That page does not exist. The site is one page, so everything is a scroll away.",
    type: "website",
    index: false,
  },
};

export function pageFor(path) {
  const clean = path.replace(/\/+$/, "") || "/";
  return { path: clean, ...(PAGES[clean] ?? PAGES["/404"]) };
}

/* The FAQ answers live in faq-section.jsx. They are imported here so the
   FAQPage schema and the visible accordion can never drift apart. */
import { LEFT, RIGHT } from "./components/ui/faq-section.jsx";

export function jsonLd(path) {
  const page = pageFor(path);
  const abs = (p) => SITE.url + p;

  const business = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": abs("/#business"),
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs(SITE.logo),
    image: abs(SITE.ogImage),
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    description: PAGES["/"].description,
    founder: { "@id": abs("/#ron") },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.lat, longitude: SITE.lng },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
    sameAs: SITE.social,
    knowsAbout: [
      "Web design",
      "Web development",
      "AI-assisted software development",
      "Business automation",
      "Local SEO",
      "Small business software",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SITE.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s, provider: { "@id": abs("/#business") } },
      })),
    },
  };

  const person = {
    "@type": "Person",
    "@id": abs("/#ron"),
    name: SITE.founder,
    jobTitle: "Founder",
    worksFor: { "@id": abs("/#business") },
    url: SITE.url,
    image: abs("/ron-portrait.jpg"),
    telephone: SITE.phone,
    email: SITE.email,
    sameAs: SITE.social,
    homeLocation: { "@type": "Place", name: `${SITE.city}, ${SITE.regionLong}` },
  };

  const website = {
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": abs("/#business") },
    inLanguage: "en-US",
  };

  const webpage = {
    "@type": "WebPage",
    "@id": abs(page.path === "/" ? "/#webpage" : page.path + "#webpage"),
    url: abs(page.path === "/" ? "/" : page.path),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": abs("/#website") },
    about: { "@id": abs("/#business") },
    inLanguage: "en-US",
  };

  const graph = [business, person, website, webpage];

  if (page.path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": abs("/#faq"),
      mainEntity: [...LEFT, ...RIGHT].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
        { "@type": "ListItem", position: 2, name: page.title.split(" | ")[0], item: abs(page.path) },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/* Head tags as a string. Used by the prerender script only. */
export function headHtml(path) {
  const page = pageFor(path);
  const url = SITE.url + (page.path === "/" ? "/" : page.path);
  const img = SITE.url + SITE.ogImage;
  const robots = page.index === false ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1";
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="author" content="${SITE.founder}" />`,
    `<meta name="geo.region" content="US-VA" />`,
    `<meta name="geo.placename" content="${SITE.city}" />`,
    `<meta name="geo.position" content="${SITE.lat};${SITE.lng}" />`,
    `<meta name="ICBM" content="${SITE.lat}, ${SITE.lng}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE.name}. Websites, apps and automations built with AI in Fredericksburg, Virginia." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(page.path))}</script>`,
  ].join("\n    ");
}
