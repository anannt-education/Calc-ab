import { SITE_NAME, SITE_URL, TRUST_LINE, absoluteUrl } from "./site";
import { FAQS } from "./faq-content";
import { FACULTY } from "./faculty";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: TRUST_LINE,
    areaServed: ["IN", "AE"],
    knowsAbout: ["AP Calculus AB", "limits", "derivatives", "integrals", "Fundamental Theorem of Calculus"],
  };
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Calculus AB self-study",
    description:
      "Independent, faculty-reviewed self-study for Calculus AB (2027 hybrid digital format). Understand the idea, apply it independently, explain your reasoning. Not affiliated with College Board. No score predictions.",
    url: absoluteUrl("/"),
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: "High School",
    teaches: "AP Calculus AB — limits, differentiation, integration, differential equations, applications of integration",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: "Anannt Calculus AB — May 2027 self-study",
      courseMode: "online",
      location: absoluteUrl("/"),
    },
  };
}

export function programJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Anannt Calculus AB 2027 self-study",
    description:
      "Self-paced self-study covering the Calculus AB framework with Anannt Concept Lens, Method Choice, Error Clinic, Reasoning Studio, and Exam Review. Not an accredited degree and not a College Board programme.",
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
