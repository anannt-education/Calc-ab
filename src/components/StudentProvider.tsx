"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Attempt, LessonProgress, MistakeEntry, StudentState } from "@/lib/types";
import { applyAttempt } from "@/lib/mastery";
import { blankState, loadState, makeEvent, nowISO, saveState } from "@/lib/storage";
import { LESSON_BY_ID } from "@/lib/content/lessons";
import { ITEM_BY_ID } from "@/lib/content/items";
import { withBasePath } from "@/lib/site";

type StudentApi = {
  state: StudentState;
  ready: boolean;
  setState: (updater: (s: StudentState) => StudentState) => void;
  recordAttempt: (
    partial: Omit<Attempt, "id" | "submittedAt" | "policyVersion" | "itemFamilyId" | "skillId" | "sessionId"> & {
      skillId?: string;
      sessionId?: string;
    }
  ) => Attempt;
  openLesson: (lessonId: string) => void;
  markLesson: (lessonId: string, completion: LessonProgress["completion"], section?: string) => void;
  addMistake: (entry: Omit<MistakeEntry, "id">) => void;
  log: (name: Parameters<typeof makeEvent>[0], payload: Parameters<typeof makeEvent>[1]) => void;
  reset: () => void;
  lessonTitle: (id: string) => string;
};

const Ctx = createContext<StudentApi | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<StudentState>(blankState);
  const [ready, setReady] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const loaded = loadState();
    stateRef.current = loaded;
    setStateRaw(loaded);
    setReady(true);
  }, []);

  const setState = useCallback((updater: (s: StudentState) => StudentState) => {
    const next = updater(stateRef.current);
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
  }, []);

  const recordAttempt = useCallback<StudentApi["recordAttempt"]>((partial) => {
    const item = ITEM_BY_ID[partial.itemId];
    const attempt: Attempt = {
      id: `at-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      submittedAt: nowISO(stateRef.current),
      policyVersion: "anannt-ab-pilot-2027.1",
      itemFamilyId: item?.familyId ?? partial.itemId,
      skillId: partial.skillId ?? item?.skillId ?? "unknown",
      sessionId: partial.sessionId ?? `sess-${new Date().toISOString().slice(0, 10)}`,
      ...partial,
    };
    let next = applyAttempt(stateRef.current, attempt);
    if (attempt.context === "independent" && attempt.correct && !attempt.assisted) {
      next = { ...next, events: [...next.events, makeEvent("independent_check_passed", { itemId: attempt.itemId, correct: true })] };
    } else if (attempt.context === "lesson") {
      next = { ...next, events: [...next.events, makeEvent("lesson_check_submitted", { itemId: attempt.itemId })] };
    }
    if (attempt.hintLevel > 0) {
      next = { ...next, events: [...next.events, makeEvent("hint_used", { itemId: attempt.itemId, level: attempt.hintLevel })] };
    }
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
    return attempt;
  }, []);

  const openLesson = useCallback((lessonId: string) => {
    const s = stateRef.current;
    const existing = s.lessonProgress[lessonId];
    if (existing && s.currentContext.lessonId === lessonId) return;
    const lessonProgress = existing
      ? s.lessonProgress
      : {
          ...s.lessonProgress,
          [lessonId]: { lessonId, completion: "opened" as const, openedAt: nowISO(s) },
        };
    const next = {
      ...s,
      currentContext: { ...s.currentContext, lessonId, assessmentMode: "learning" as const },
      lessonProgress,
    };
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
  }, []);

  const markLesson = useCallback<StudentApi["markLesson"]>((lessonId, completion, section) => {
    const s = stateRef.current;
    const prev = s.lessonProgress[lessonId] ?? {
      lessonId,
      completion: "opened" as const,
      openedAt: nowISO(s),
    };
    const nextProg = { ...prev, completion, lastSection: section };
    if (completion === "studied") nextProg.studiedAt = nowISO(s);
    if (completion === "practised") nextProg.practisedAt = nowISO(s);
    if (completion === "independently_demonstrated") nextProg.independentAt = nowISO(s);
    if (completion === "retained") nextProg.retainedAt = nowISO(s);
    const next = { ...s, lessonProgress: { ...s.lessonProgress, [lessonId]: nextProg } };
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
  }, []);

  const addMistake = useCallback<StudentApi["addMistake"]>((entry) => {
    const next = { ...stateRef.current, mistakes: [{ ...entry, id: `ms-${Date.now()}` }, ...stateRef.current.mistakes] };
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
  }, []);

  const log = useCallback<StudentApi["log"]>((name, payload) => {
    const next = { ...stateRef.current, events: [...stateRef.current.events, makeEvent(name, payload)] };
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
    void fetch(withBasePath("/api/events"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, payload }),
    });
  }, []);

  const reset = useCallback(() => {
    const next = blankState();
    stateRef.current = next;
    setStateRaw(next);
    saveState(next);
  }, []);

  const api = useMemo<StudentApi>(
    () => ({
      state,
      ready,
      setState,
      recordAttempt,
      openLesson,
      markLesson,
      addMistake,
      log,
      reset,
      lessonTitle: (id) => LESSON_BY_ID[id]?.title ?? id,
    }),
    [state, ready, setState, recordAttempt, openLesson, markLesson, addMistake, log, reset]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStudent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStudent must be inside StudentProvider");
  return ctx;
}
