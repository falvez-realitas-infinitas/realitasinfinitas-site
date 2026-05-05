/** One step in the five-choice flow — labels map to option pools below. */
export const STEP_IDS = [
  "world",
  "rule",
  "character",
  "problem",
  "twist",
] as const;

export type StepId = (typeof STEP_IDS)[number];

export type RealityPicks = Record<StepId, string>;
