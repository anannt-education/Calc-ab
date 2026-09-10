import type { ItemPublic } from "../types";
import { ITEMS_A } from "./items-a";
import { ITEMS_B } from "./items-b";

export const ITEMS: ItemPublic[] = [...ITEMS_A, ...ITEMS_B];
export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

export const DIAGNOSTIC_ITEM_IDS = ITEMS.filter((i) => i.pool === "diagnostic").map((i) => i.id);

export const MOCK_DRILL_BY_PART: Record<string, string[]> = {
  IA: ["mock-ia-1", "mock-ia-2", "mock-ia-3", "mock-ia-4"],
  IB: ["mock-ib-1", "mock-ib-2"],
  IIA: ["frq-tank"],
  IIB: ["frq-limit"],
};
