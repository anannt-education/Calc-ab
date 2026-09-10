import type { ItemPublic } from "../types";
import { ITEMS_1 } from "./items-1";
import { ITEMS_2 } from "./items-2";
import { ITEMS_3 } from "./items-3";
import { ITEMS_4 } from "./items-4";

export const ITEMS: ItemPublic[] = [...ITEMS_1, ...ITEMS_2, ...ITEMS_3, ...ITEMS_4];
export const ITEM_BY_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

export const DIAGNOSTIC_ITEM_IDS = ITEMS.filter((i) => i.pool === "diagnostic").map((i) => i.id);

export const MOCK_DRILL_BY_PART: Record<string, string[]> = {
  IA: ["mock-ia-1", "mock-ia-2", "mock-ia-3", "mock-ia-4"],
  IB: ["mock-ib-1", "mock-ib-2"],
  IIA: ["frq-tank"],
  IIB: ["frq-limit"],
};
