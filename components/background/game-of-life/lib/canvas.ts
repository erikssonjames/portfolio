export function parsePx(v: string): number {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  r = Math.max(0, Math.min(r, Math.min(w, h) / 2));

  // @ts-ignore
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    // @ts-ignore
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

export function drawVignette(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // subtle edge darkening for depth
  const g = ctx.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.2, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.save();
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// --- Stable-ish hash random for "holes" that don't fully carpet the area
export function hash2(x: number, y: number, seed: number) {
  let h = x * 374761393 + y * 668265263 + seed * 69069;
  h = (h ^ (h >>> 13)) * 1274126177;
  return (h ^ (h >>> 16)) >>> 0;
}

export function rand01FromHash(h: number) {
  return (h & 0xfffffff) / 0xfffffff;
}

export function stampSparseDisc(opts: {
  board: Uint8Array;
  cols: number;
  rows: number;
  cx: number;
  cy: number;
  radius: number;
  density: number;
  seed: number;
  ringBias?: number;
}): { rebirths: number } {
  const { board, cols, rows, cx, cy, radius, density, seed, ringBias = 0.35 } = opts;
  const r2 = radius * radius;

  let rebirths = 0;

  for (let dy = -radius; dy <= radius; dy++) {
    const ny = cy + dy;
    if (ny < 0 || ny >= rows) continue;

    for (let dx = -radius; dx <= radius; dx++) {
      const nx = cx + dx;
      if (nx < 0 || nx >= cols) continue;

      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;

      const d = Math.sqrt(d2) / radius; // 0..1
      const falloff = 0.25 + 0.75 * d;

      const ring = ringBias > 0 ? Math.pow(Math.abs(d - 0.65) * 1.6, 2) : 0;
      const ringBoost = ringBias > 0 ? 1 - Math.min(1, ring) : 1;

      const p = density * falloff * (0.65 + 0.35 * ringBoost);

      const h = hash2(nx, ny, seed);
      const r = rand01FromHash(h);

      if (r < p) {
        const idx = ny * cols + nx;
        if (board[idx] === 0) {
          board[idx] = 1;
          rebirths++;
        }
      }
    }
  }

  return { rebirths };
}
export function stampExplosion(opts: {
  board: Uint8Array;
  cols: number;
  rows: number;
  cx: number;
  cy: number;
  baseRadius: number;
  seed: number;
}) {
  const { board, cols, rows, cx, cy, baseRadius, seed } = opts;

  stampSparseDisc({
    board,
    cols,
    rows,
    cx,
    cy,
    radius: baseRadius,
    density: 0.55,
    seed: seed ^ 0x9e3779b9,
    ringBias: 0.55,
  });

  stampSparseDisc({
    board,
    cols,
    rows,
    cx,
    cy,
    radius: Math.max(2, Math.round(baseRadius * 1.35)),
    density: 0.28,
    seed: seed ^ 0x85ebca6b,
    ringBias: 0.9,
  });

  const sparkCount = 14;
  const sparkR = Math.max(3, Math.round(baseRadius * 1.9));
  for (let i = 0; i < sparkCount; i++) {
    const h = hash2(i, seed, seed ^ 1234567);
    const a = rand01FromHash(h) * Math.PI * 2;
    const rr = Math.sqrt(rand01FromHash(h ^ 0xabc)) * sparkR;

    const sx = cx + Math.round(Math.cos(a) * rr);
    const sy = cy + Math.round(Math.sin(a) * rr);
    if (sx < 0 || sy < 0 || sx >= cols || sy >= rows) continue;

    stampSparseDisc({
      board,
      cols,
      rows,
      cx: sx,
      cy: sy,
      radius: 2,
      density: 0.55,
      seed: seed ^ (i * 1013904223),
      ringBias: 0.2,
    });
  }

  const core = [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  for (let k = 0; k < core.length; k++) {
    const [dx, dy] = core[k];
    const nx = cx + dx;
    const ny = cy + dy;
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
    const r = rand01FromHash(hash2(nx, ny, seed ^ 0xdeadbeef));
    if (r < 0.45) board[ny * cols + nx] = 0;
  }
}

export function parseRgb(cs: string): { r: number; g: number; b: number } | null {
  // supports "rgb(r,g,b)" and "rgba(r,g,b,a)"
  const m = cs.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return null;
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
}

export function rgbToStr(c: { r: number; g: number; b: number }) {
  return `rgb(${c.r},${c.g},${c.b})`;
}

export function mix(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}
