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
    name: "Anannt AP Calculus AB",
    description:
      "Independent, faculty-reviewed preparation for AP Calculus AB (2027 hybrid digital format). Understand the idea, apply it independently, explain your reasoning, and show that you can still do it later. Not affiliated with College Board. No score guarantees.",
    url: SITE_URL,
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
      name: "Anannt AP Calculus AB — May 2027 preparation",
      courseMode: "online",
      location: SITE_URL,
    },
  };
}

export function programJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Anannt AP Calculus AB 2027 preparation",
    description:
      "Self-paced academic programme covering the AP Calculus AB framework with Anannt Concept Lens, Method Choice, Error Clinic, Reasoning Studio, and Exam Review. Not an accredited degree and not a College Board programme.",
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
    name: "Anannt AP Calculus AB faculty reviewers",
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
