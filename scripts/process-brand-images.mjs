/**
 * Generate app/icon.png from brand asset and remove FootX logo matte black.
 * Run from repo root: node scripts/process-brand-images.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function isBgPixel(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  return max < 55 && chroma < 22;
}

function floodTransparentRGBA(rgbBuffer, width, height, channels) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];

  const idxAt = (x, y) => y * width + x;

  const pushCorner = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = idxAt(x, y);
    if (visited[i]) return;
    const base = i * channels;
    const r = rgbBuffer[base];
    const g = rgbBuffer[base + 1];
    const b = rgbBuffer[base + 2];
    if (!isBgPixel(r, g, b)) return;
    visited[i] = 1;
    queue.push(i);
  };

  pushCorner(0, 0);
  pushCorner(width - 1, 0);
  pushCorner(0, height - 1);
  pushCorner(width - 1, height - 1);

  while (queue.length) {
    const i = queue.pop();
    const x = i % width;
    const y = (i / width) | 0;
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = idxAt(nx, ny);
      if (visited[ni]) continue;
      const base = ni * channels;
      const r = rgbBuffer[base];
      const g = rgbBuffer[base + 1];
      const b = rgbBuffer[base + 2];
      if (!isBgPixel(r, g, b)) continue;
      visited[ni] = 1;
      queue.push(ni);
    }
  }

  const out = Buffer.alloc(total * 4);
  for (let i = 0; i < total; i++) {
    const base = i * channels;
    const r = rgbBuffer[base];
    const g = rgbBuffer[base + 1];
    const b = rgbBuffer[base + 2];
    const o = i * 4;
    out[o] = r;
    out[o + 1] = g;
    out[o + 2] = b;
    out[o + 3] = visited[i] ? 0 : 255;
  }

  return out;
}

async function main() {
  const riSrc = path.join(ROOT, "public/brand/ri-icon.png");
  const footxSrc = path.join(ROOT, "public/footx-scheduler-logo.png");
  const iconOut = path.join(ROOT, "app/icon.png");
  const footxOut = path.join(ROOT, "public/footx-scheduler-logo.png");

  await sharp(riSrc)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(iconOut);

  const { data, info } = await sharp(footxSrc)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = floodTransparentRGBA(
    data,
    info.width,
    info.height,
    info.channels,
  );

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(footxOut);

  console.log("Wrote", iconOut);
  console.log("Wrote", footxOut);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
