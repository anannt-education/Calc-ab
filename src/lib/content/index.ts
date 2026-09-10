import { COURSE, EXAM_BLUEPRINT } from "../exam-config";
import { FRQS } from "./frqs";
import { ITEMS } from "./items";
import { LESSONS } from "./lessons";
import { SKILLS, UNITS } from "./skills";

export { COURSE, EXAM_BLUEPRINT, POLICY_VERSION } from "../exam-config";
export { FRQS, FRQ_BY_ID, DEMO_FACULTY_SUBMISSION } from "./frqs";
export { ITEMS, ITEM_BY_ID, DIAGNOSTIC_ITEM_IDS, MOCK_DRILL_BY_PART } from "./items";
export { LESSONS, LESSON_BY_ID } from "./lessons";
export { SKILLS, SKILL_BY_ID, UNITS, UNIT_BY_ID } from "./skills";

export function coverageReport() {
  return SKILLS.filter((s) => s.abBcScope === "AB").map((skill) => {
    const lessons = LESSONS.filter((l) => l.skillIds.includes(skill.id) && l.status === "published");
    const assessments = ITEMS.filter((i) => i.skillId === skill.id && i.status === "published");
    const independent = assessments.filter((i) => i.pool === "independent");
    const remediation = lessons[0]?.id ?? skill.remediationLessonId;
    return {
      skillId: skill.id,
      title: skill.title,
      ced: `${skill.cedTopic} / ${skill.cedObjective} / ${skill.cedEK}`,
      teaching: lessons.map((l) => l.id),
      independent: independent.map((i) => i.id),
      remediation,
      ready: lessons.length > 0 && independent.length > 0 && Boolean(remediation),
    };
  });
}

export const CONTENT_META = {
  course: COURSE,
  blueprint: EXAM_BLUEPRINT,
  units: UNITS.length,
  lessons: LESSONS.length,
  items: ITEMS.length,
  frqs: FRQS.length,
};
