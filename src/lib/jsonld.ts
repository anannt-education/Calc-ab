import { SITE_NAME, SITE_URL, TRUST_LINE, absoluteUrl } from "./site";
import { FAQS } from "./faq-content";
import { FACULTY } from "./faculty";
import { NAP } from "./legal";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: TRUST_LINE,
    email: NAP.email,
    telephone: NAP.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressCountry: NAP.country,
    },
    areaServed: ["AE", "IN"],
    knowsAbout: ["Calculus AB", "limits", "Fundamental Theorem of Calculus"],
  };
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Calculus AB — two open lessons",
    description:
      "Independent Calculus AB self-prep on study.anannt.ae. Two public lessons (limit versus function value; FTC accumulation). The eight-unit map is still being written. Not affiliated with College Board.",
    url: SITE_URL,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: "https://study.anannt.ae",
      address: {
        "@type": "PostalAddress",
        streetAddress: NAP.street,
        addressLocality: NAP.city,
        addressCountry: NAP.country,
      },
    },
    educationalLevel: "High School",
    teaches: "Calculus AB — limits and accumulation (public lessons)",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: "Calculus AB — May 2027 planning",
      courseMode: "online",
      location: SITE_URL,
    },
  };
}

export function programJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Calculus AB self-prep — Anannt Study",
    description:
      "Self-study supplement for Calculus AB. Two lessons are public. This is not a College Board programme and does not predict an official AP score.",
    provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL },
    educationalProgramMode: "online",
    timeOfDay: "flexible",
    occupationalCategory: "Secondary education — examination preparation",
    url: absoluteUrl("/about"),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function facultyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Anannt Calculus AB faculty reviewers",
    itemListElement: FACULTY.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: p.name,
        jobTitle: p.role,
        worksFor: { "@type": "EducationalOrganization", name: SITE_NAME },
        description: `${p.qualifications}. ${p.focus}.`,
      },
    })),
  };
}
