import { SITE_NAME, SITE_URL, COLLEGE_BOARD_LINE, STUDIO_LINE, absoluteUrl, BASE_PATH } from "./site";
import { FAQS } from "./faq-content";
import { FACULTY } from "./faculty";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description: `${COLLEGE_BOARD_LINE} ${STUDIO_LINE}`,
    email: "wecare@anannt.ae",
    telephone: "+971585853551",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 105, Bank Street Building, Burjuman Metro Exit 2",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["AE", "IN"],
    knowsAbout: ["AP Calculus AB", "limits", "derivatives", "integrals", "Fundamental Theorem of Calculus"],
  };
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Calculus AB self-study studio",
    description:
      "Independent, faculty-reviewed self-study for AP Calculus AB (May 2027). Two public lessons are open without an account. Not affiliated with College Board. Does not predict an official AP score.",
    url: `${SITE_URL}${BASE_PATH}`,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office 105, Bank Street Building, Burjuman Metro Exit 2",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
    educationalLevel: "High School",
    teaches: "Calculus AB — limits, differentiation, integration",
    inLanguage: "en",
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: "Calculus AB — May 2027 self-prep",
      courseMode: "online",
      location: `${SITE_URL}${BASE_PATH}`,
    },
  };
}

export function programJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Calculus AB 2027 self-prep",
    description:
      "Self-paced studio covering Calculus AB ideas with Anannt Concept Lens, Method Choice, Error Clinic, and Exam Review. Not an accredited degree and not a College Board programme.",
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
