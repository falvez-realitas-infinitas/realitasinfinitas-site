/**
 * Pollinations.ai public image gateway (GET returning image bytes).
 *
 * URL shape: `https://image.pollinations.ai/prompt/{encodeURIComponent(prompt)}?width=&height=&seed=&nologo=`
 *
 * The marketing site prefers loading images via **`/api/reality-image`** proxy so browsers
 * do not hotlink Pollinations directly (referrer / CDN quirks caused `<img onError>` for some users).
 * Optional `POLLINATIONS_API_KEY` is applied only in that server route.
 *
 * Keep prompts reasonably short: long URL-encoded strings can hit proxy URL limits upstream.
 *
 * @see https://pollinations.ai — behavior may change without notice.
 */

const DEFAULT_MAX_CHARS = 280;

/** Visual style appended so the model yields illustration-like output, not screenshots of text. */
const PROMPT_STYLE_SUFFIX =
  ", surreal atmospheric digital art, cinematic soft light, abstract futuristic, gradient tones, no text, no letters, no typography";

export type PollinationsImageOptions = {
  /** Reuse for reproducibility; omit or change for “regenerate”. */
  seed?: number;
  /** Trim narrative before building the prompt (keeps URLs shorter). */
  maxChars?: number;
  width?: number;
  height?: number;
};

/**
 * Builds a full URL that returns an image when used as `<img src="…">`.
 * Query params: `width`, `height`, `seed`, `nologo=true` (hide watermark when supported).
 */
export function buildPollinationsImageUrl(
  narrativeForPrompt: string,
  options?: PollinationsImageOptions,
): string {
  const maxChars = options?.maxChars ?? DEFAULT_MAX_CHARS;
  const width = options?.width ?? 1024;
  const height = options?.height ?? 576;
  const seed =
    options?.seed ?? Math.floor(Math.random() * 2_147_483_647);

  const core = narrativeForPrompt.trim().slice(0, maxChars);
  const prompt = `${core}${PROMPT_STYLE_SUFFIX}`;

  const pathSegment = encodeURIComponent(prompt);
  const qs = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: "true",
  });

  return `https://image.pollinations.ai/prompt/${pathSegment}?${qs.toString()}`;
}
