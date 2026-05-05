/**
 * Removes opaque black mat from vestacare-partner.png via edge flood-fill.
 * Run: node scripts/process-vestacare-matte.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public/brand/vestacare-partner.png");

const MAX_BG = 42; // treat as background black mat (tweak if logo edges clip)

function idx(w, ch, x, y) {
  return (y * w + x) * ch;
}

function isBackground(r, g, b, a) {
  if (a < 8) return false;
  return r <= MAX_BG && g <= MAX_BG && b <= MAX_BG;
}

const img = sharp(inputPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = info.channels;
const buf = new Uint8Array(data);

const visited = new Uint8Array(w * h);
const q = [];

function tryPush(x, y) {
  if (x < 0 || x >= w || y < 0 || y >= h) return;
  const i = y * w + x;
  if (visited[i]) return;
  const o = idx(w, ch, x, y);
  const r = buf[o],
    g = buf[o + 1],
    b = buf[o + 2],
    a = buf[o + 3];
  if (!isBackground(r, g, b, a)) return;
  visited[i] = 1;
  q.push([x, y]);
}

for (let x = 0; x < w; x++) {
  tryPush(x, 0);
  tryPush(x, h - 1);
}
for (let y = 0; y < h; y++) {
  tryPush(0, y);
  tryPush(w - 1, y);
}

while (q.length) {
  const [x, y] = q.shift();
  const o = idx(w, ch, x, y);
  buf[o + 3] = 0;
  tryPush(x - 1, y);
  tryPush(x + 1, y);
  tryPush(x, y - 1);
  tryPush(x, y + 1);
}

// Remove residual near-black pixels adjacent to transparency (anti-fringe)
function neighborsTransparent(px, py) {
  let c = 0;
  for (const [dx, dy] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    const nx = px + dx,
      ny = py + dy;
    if (nx < 0 || nx >= w || ny < 0 || ny >= h) {
      c++;
      continue;
    }
    const o = idx(w, ch, nx, ny);
    if (buf[o + 3] < 32) c++;
  }
  return c;
}

for (let y = 1; y < h - 1; y++) {
  for (let x = 1; x < w - 1; x++) {
    const o = idx(w, ch, x, y);
    const r = buf[o],
      g = buf[o + 1],
      b = buf[o + 2];
    if (r <= 28 && g <= 28 && b <= 28 && buf[o + 3] > 200) {
      if (neighborsTransparent(x, y) >= 4) buf[o + 3] = 0;
    }
  }
}

const out = await sharp(buf, {
  raw: { width: w, height: h, channels: ch },
})
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(inputPath, out);
console.log("Wrote", inputPath, `${w}x${h}`);
