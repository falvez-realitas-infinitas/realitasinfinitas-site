import type { RealityPicks } from "./types";

/**
 * Reality Builder — closing narrative templates (English + Spanish).
 *
 * Option pools store short labels that often start with “A/An/Un/Una…”. We glue them
 * into **complete sentences** by embedding those fragments after fixed connectors
 * (`set in…`, `There,…`, `where / en la que…`) instead of broken patterns like
 * “donde un bosque…” (no verb). The `embed()` helper lowercases only the first
 * character so phrases fit grammatically after colons or prepositions; main
 * character lines stay as written (proper noun style).
 */

/** Lowercase first character so a pool string fits after “in …”, “There, …”, etc. */
function embed(s: string): string {
  if (!s.length) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Four sentences; ends with a period. */
export function buildNarrativeEn(p: RealityPicks): string {
  return (
    `You invented a reality set in ${embed(p.world)}. ` +
    `There, ${embed(p.rule)}. ` +
    `${p.character} moves through a plot where ${embed(p.problem)}. ` +
    `One last curve — ${embed(p.twist)}.`
  );
}

/** Four sentences; parallel logic to EN; natural Spanish word order. */
export function buildNarrativeEs(p: RealityPicks): string {
  return (
    `Inventaste una realidad ambientada en ${embed(p.world)}. ` +
    `Allí, ${embed(p.rule)}. ` +
    `${p.character} atraviesa una historia en la que ${embed(p.problem)}. ` +
    `Un último giro: ${embed(p.twist)}.`
  );
}
