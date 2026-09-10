import type { LessonVersion } from "../types";
import { LESSONS_A } from "./lessons-a";
import { LESSONS_B } from "./lessons-b";

export const LESSONS: LessonVersion[] = [...LESSONS_A, ...LESSONS_B];
export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
