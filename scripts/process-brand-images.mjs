/**
 * Generate app/icon.png from brand asset and process FootX Scheduler logo for web.
 *
 * - Prefers public/brand/footx-scheduler-logo-source.png when present (canonical export).
 * - Removes exterior matte (near-black OR strict near-white canvas).
 * - Removes trapped near-black letter counters (o/d/e…).
 * - Softens neutral JPEG fringe next to transparency + supersamples to reduce stair-steps.
 *
 * Run from repo root: node scripts/process-brand-images.mjs
 */
import sharp from "sharp";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Legacy banner: black matte exterior. */
function isDarkExteriorPixel(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  return max < 55 && chroma < 22;
}

/**
 * Panel artwork: only flood truly bright neutrals so we do not bleed through gray rings
 * that isolate the white rounded card from the image corners.
 */
function isLightExteriorPixel(r, g, b) {
  const lum = luminance(r, g, b);
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return lum >= 247 && chroma <= 12;
}

/** Matte black inside letter counters — not 4-connected to corners. */
function isTrappedMatteBlack(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  return max <= 18 && chroma <= 12;
}

function cornerMeanLuminance(rgbBuffer, width, height, channels) {
  const px = (x, y) => {
    const i = (y * width + x) * channels;
    return luminance(rgbBuffer[i], rgbBuffer[i + 1], rgbBuffer[i + 2]);
  };
  const samples = [
    px(0, 0),
    px(width - 1, 0),
    px(0, height - 1),
    px(width - 1, height - 1),
  ];
  return samples.reduce((a, b) => a + b, 0) / samples.length;
}

function floodTransparentRGBA(rgbBuffer, width, height, channels, lightCanvas) {
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];
  const isExterior = lightCanvas ? isLightExteriorPixel : isDarkExteriorPixel;

  const idxAt = (x, y) => y * width + x;

  const pushCorner = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = idxAt(x, y);
    if (visited[i]) return;
    const base = i * channels;
    const r = rgbBuffer[base];
    const g = rgbBuffer[base + 1];
    const b = rgbBuffer[base + 2];
    if (!isExterior(r, g, b)) return;
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
      if (!isExterior(r, g, b)) continue;
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
    const exterior = visited[i];
    const trappedHole = !exterior && isTrappedMatteBlack(r, g, b);
    out[o + 3] = exterior || trappedHole ? 0 : 255;
  }

  return out;
}

function alphaAt(buf, width, height, x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return 0;
  return buf[(y * width + x) * 4 + 3];
}

/**
 * Reduce dull neutral JPEG halos and dirty panel outlines adjacent to transparency.
 */
function softenNeutralFringe(buf, width, height, iterations = 2) {
  for (let iter = 0; iter < iterations; iter++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const o = (y * width + x) * 4;
        const a = buf[o + 3];
        if (a === 0) continue;

        const neighborsTransparent = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].some(([dx, dy]) => alphaAt(buf, width, height, x + dx, y + dy) === 0);

        if (!neighborsTransparent) continue;

        const r = buf[o];
        const g = buf[o + 1];
        const b = buf[o + 2];
        const lum = luminance(r, g, b);
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);

        if (lum >= 168 && lum <= 252 && chroma <= 30) {
          const fade = Math.min(1, (lum - 168) / 84);
          buf[o + 3] = Math.max(0, Math.floor(a * (1 - fade * 0.88)));
          if (buf[o + 3] < 10) {
            buf[o] = buf[o + 1] = buf[o + 2] = buf[o + 3] = 0;
          }
        }
      }
    }
  }
}

async function main() {
  const riSrc = path.join(ROOT, "public/brand/ri-icon.png");
  const footxSource = path.join(
    ROOT,
    "public/brand/footx-scheduler-logo-source.png",
  );
  const footxFallback = path.join(ROOT, "public/footx-scheduler-logo.png");
  const footxSrc = existsSync(footxSource) ? footxSource : footxFallback;
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

  const cornerLum = cornerMeanLuminance(data, info.width, info.height, info.channels);
  const lightCanvas = cornerLum >= 235;

  const rgba = floodTransparentRGBA(
    data,
    info.width,
    info.height,
    info.channels,
    lightCanvas,
  );

  softenNeutralFringe(rgba, info.width, info.height, 2);

  const w = info.width;
  const h = info.height;

  const supersampled = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(Math.round(w * 2), Math.round(h * 2), {
      kernel: sharp.kernel.lanczos3,
    })
    .resize(w, h, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.85, m1: 1, m2: 0.55 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  await sharp(supersampled).png().toFile(footxOut);

  console.log("Wrote", iconOut);
  console.log(
    "Wrote",
    footxOut,
    `(FootX mode: ${lightCanvas ? "light canvas" : "dark matte"}, corners≈${cornerLum.toFixed(1)})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
