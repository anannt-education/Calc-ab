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
    email: "wecare@anannt.ae",
    telephone: "+971585853551",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 105, Bank Street Building, Burjuman Metro Exit 2",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["AE", "IN"],
    knowsAbout: ["Calculus AB", "limits", "derivatives", "integrals", "Fundamental Theorem of Calculus"],
  };
}

export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Calculus AB self-prep",
    description:
      "Two public lessons for Calculus AB (May 2027): limit versus function value, then FTC accumulation. A self-study supplement from Anannt Education in Dubai. Not affiliated with the College Board. Does not predict an official AP score.",
    url: absoluteUrl("/"),
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
    teaches: "Calculus AB — limits and the Fundamental Theorem of Calculus",
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: "Calculus AB — two public lessons for May 2027",
      courseMode: "online",
      location: absoluteUrl("/"),
    },
  };
}

export function programJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Calculus AB self-prep studio",
    description:
      "Self-study supplement for Calculus AB. Two public lessons are open. The eight-unit map is still being written. It does not predict an official AP score.",
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
