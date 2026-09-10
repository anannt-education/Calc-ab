export interface FacultyPerson {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  focus: string;
  bio: string;
}

/**
 * Anannt academic roster for this course slice.
 * Qualifications are Anannt-facing; none claim College Board employment or endorsement.
 */
export const FACULTY: FacultyPerson[] = [
  {
    id: "author-anannt-calc",
    name: "Meera Krishnan",
    role: "Academic Lead, Calculus",
    qualifications: "M.Sc. Mathematics; Anannt calculus faculty",
    focus: "Concept Lens, Method Choice, AB scope protection",
    bio: "Meera writes the Concept Lens for each lesson — the idea a student should still be able to say in words on an unfamiliar paper. She checks that BC-only techniques stay optional and labelled.",
  },
  {
    id: "approver-anannt-academic",
    name: "Arjun Deshpande",
    role: "Academic Approver",
    qualifications: "M.A. Mathematics Education; Anannt senior reviewer",
    focus: "Independent items, distractors, two-person approval",
    bio: "Arjun solves assessed items before reading the proposed key. An author cannot publish an unapproved item; his sign-off is the second pair of eyes, not a rubber stamp.",
  },
  {
    id: "author-anannt-bridge",
    name: "Priya Nair",
    role: "Foundation and algebra support",
    qualifications: "M.Sc. Applied Mathematics; Anannt lesson author",
    focus: "Prerequisite bridge, Error Clinic, notation",
    bio: "Priya authors the foundation bridge so a factoring slip is treated as algebra repair, not as a reason to repeat an entire calculus unit.",
  },
  {
    id: "reviewer-anannt-frq",
    name: "Samuel Okonkwo",
    role: "Reasoning Studio reviewer",
    qualifications: "Ph.D. Applied Mathematics; Anannt written-work reviewer",
    focus: "FRQ rubrics, justification language, later-part credit",
    bio: "Samuel reviews handwritten arguments against point-level rubrics. Self-review and provisional marks stay labelled; they are never presented as his faculty result.",
  },
];

export const FACULTY_BY_ID: Record<string, FacultyPerson> = Object.fromEntries(
  FACULTY.map((f) => [f.id, f])
);

export function facultyById(id?: string | null): FacultyPerson | undefined {
  if (!id) return undefined;
  return FACULTY_BY_ID[id];
}

export const REVIEW_STANDARDS = [
  {
    title: "Two-person rule",
    body: "The author of a lesson or assessed item cannot also be its approver. Drafts stay draft until a different Anannt academic account moves them to approved, then published.",
  },
  {
    title: "Solve before the key",
    body: "Reviewers work the item without the proposed answer in view. Distractors must be tempting for a named reason, not random noise.",
  },
  {
    title: "AB scope protection",
    body: "Integration by parts, partial fractions, improper integrals, Euler’s method, logistic models, arc length, and parametric/polar/vector calculus are not required AB mastery. Optional extensions are labelled and kept out of default assignments.",
  },
  {
    title: "Corrections stay visible",
    body: "If a statement is ambiguous, students can report it from the item. Faculty notes and review dates sit on the lesson chrome. Historical attempts are not silently rewritten.",
  },
];
