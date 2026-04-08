import { brand, faqs, productCards } from "./site-data";

function normalizeSiteUrl(value) {
  if (!value) {
    return "https://www.revya.com";
  }

  const trimmed = value.trim().replace(/\/$/, "");

  if (/^https?:\/\//.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_ORIGIN = new URL(SITE_URL);

export const SITE_TITLE = "Revya | Clinician-Guided Online Weight-Loss Care";

export const SITE_DESCRIPTION =
  "Revya offers clinician-guided online weight-loss care with up-front program pricing, eligibility assessment, clinician review, discreet delivery, refills, and secure portal support.";

export const SOCIAL_IMAGE_ALT =
  "Revya clinician-guided online weight-loss care with GLP-1 treatment review and portal support";

export const PUBLIC_PAGES = [
  { key: "home", path: "/", changeFrequency: "weekly", priority: 1 },
  { key: "weightLoss", path: "/weight-loss", changeFrequency: "weekly", priority: 0.9 },
  { key: "pricing", path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { key: "welcome", path: "/welcome", changeFrequency: "monthly", priority: 0.7 },
  { key: "login", path: "/login", changeFrequency: "monthly", priority: 0.6 },
  { key: "dashboard", path: "/dashboard", changeFrequency: "weekly", priority: 0.6 },
  { key: "quiz", path: "/quiz", changeFrequency: "weekly", priority: 0.8 }
];

const PAGE_SEO = {
  home: {
    path: "/",
    title: SITE_TITLE,
    description:
      "Explore Revya for clinician-guided online weight-loss care with up-front program pricing, eligibility assessment, clinician review, discreet delivery, and ongoing portal support.",
    breadcrumbs: [{ name: "Home", path: "/" }]
  },
  weightLoss: {
    path: "/weight-loss",
    title: "Online Weight-Loss Care & GLP-1 Assessment | Revya",
    description:
      "Learn how Revya weight-loss care works, from online assessment and clinician review to program pricing, GLP-1 treatment options, discreet delivery, refills, and follow-up.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Weight Loss", path: "/weight-loss" }
    ]
  },
  pricing: {
    path: "/pricing",
    title: "Revya Program Pricing | Compare GLP-1 and Weight-Loss Treatment Options",
    description:
      "Explore Revya program pricing for clinician-guided GLP-1 and weight-loss treatments. See weekly and daily options, program fees, and what's included.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Programs & Pricing", path: "/pricing" }
    ]
  },
  welcome: {
    path: "/welcome",
    title: "Getting Started With Revya | Refills, Billing, Labs, and Portal Support",
    description:
      "Read the Revya getting started guide for appointments, refills, billing, dose progression, lab requests, and continuing care from another provider.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Welcome Guide", path: "/welcome" }
    ]
  },
  login: {
    path: "/login",
    title: "Revya Patient Login | Access Your Weight-Loss Care Portal",
    description:
      "Access the Revya patient portal to manage messages, appointments, refills, billing, documents, and follow-up for clinician-guided weight-loss care.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Login", path: "/login" }
    ]
  },
  dashboard: {
    path: "/dashboard",
    title: "Revya Patient Portal | Refills, Messages, Appointments, and Progress",
    description:
      "Preview the Revya patient portal for refill check-ins, follow-up visits, secure messages, billing details, document uploads, and progress tracking.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Dashboard", path: "/dashboard" }
    ]
  },
  quiz: {
    path: "/quiz",
    title: "Revya Assessment | Online Weight-Loss Eligibility Screening",
    description:
      "Complete the Revya assessment to review your goals, health history, and treatment preferences before clinician-guided GLP-1 weight-loss care and medical review.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Quiz", path: "/quiz" }
    ]
  },
  notFound: {
    path: "/404",
    title: "Page Not Found - Revya",
    description:
      "The page you requested could not be found. Explore Revya weight-loss care, start an online assessment, or access the patient portal.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Page Not Found", path: "/404" }
    ]
  }
};

const DEFAULT_KEYWORDS = [
  "Revya",
  "online weight loss program",
  "clinician guided weight loss",
  "GLP-1 telehealth",
  "medical weight loss online",
  "weight loss assessment online",
  "semaglutide online",
  "tirzepatide online",
  "patient portal weight loss care",
  "online GLP-1 assessment"
];

function buildSocialImages() {
  return [
    {
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: SOCIAL_IMAGE_ALT
    }
  ];
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_ORIGIN).toString();
}

export function getPageSeo(pageKey) {
  return PAGE_SEO[pageKey];
}

export function getPageMetadata(pageKey) {
  const page = PAGE_SEO[pageKey];

  return {
    title: page.title,
    description: page.description,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: page.path
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: brand.name,
      type: "website",
      images: buildSocialImages()
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [absoluteUrl("/twitter-image")]
    }
  };
}

function organizationReference() {
  return {
    "@id": `${absoluteUrl("/")}#organization`
  };
}

function pageReference(pagePath) {
  return {
    "@id": `${absoluteUrl(pagePath)}#webpage`
  };
}

export function buildMedicalOrganizationSchema() {
  return {
    "@type": "MedicalOrganization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: brand.name,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    email: brand.supportEmail,
    telephone: "+1-323-690-1564",
    address: {
      "@type": "PostalAddress",
      streetAddress: "131 Continental Dr. Ste 305",
      addressLocality: "Newark",
      addressRegion: "DE",
      postalCode: "19713",
      addressCountry: "US"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: brand.supportEmail,
      telephone: "+1-323-690-1564",
      areaServed: "US",
      availableLanguage: "English"
    }
  };
}

export function buildBreadcrumbSchema(items, currentPath) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(currentPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildMedicalWebPageSchema(pageKey) {
  const page = PAGE_SEO[pageKey];

  return {
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: brand.name,
      url: absoluteUrl("/")
    },
    about: organizationReference(),
    breadcrumb: {
      "@id": `${absoluteUrl(page.path)}#breadcrumb`
    }
  };
}

export function buildFaqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/weight-loss")}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

function parsePrice(priceText) {
  const match = priceText.match(/(\d+(?:\.\d+)?)/);
  return match ? match[1] : null;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function buildProductSchemas() {
  return productCards.map((product) => {
    const price = parsePrice(product.price);

    return {
      "@type": "Product",
      "@id": `${absoluteUrl("/weight-loss")}#product-${slugify(product.title)}`,
      name: `${brand.name} ${product.title}`,
      description: `${product.note}. Includes online eligibility assessment, clinician review, prescription access where appropriate, and ongoing Revya portal support.`,
      image: absoluteUrl(product.image),
      category: "Prescription weight loss program",
      brand: {
        "@type": "Brand",
        name: brand.name
      },
      url: absoluteUrl("/weight-loss"),
      ...(price
        ? {
            offers: {
              "@type": "Offer",
              price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: absoluteUrl("/weight-loss")
            }
          }
        : {})
    };
  });
}

export function buildPageSchema(pageKey, extras = []) {
  const page = PAGE_SEO[pageKey];

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildMedicalWebPageSchema(pageKey),
      buildBreadcrumbSchema(page.breadcrumbs, page.path),
      ...extras
    ]
  };
}
