export function randomize(buf: Uint8Array, p = 0.5) {
  for (let i = 0; i < buf.length; i++) buf[i] = Math.random() < p ? 1 : 0;
}

export type GolPatternId = "glider" | "lwss" | "gosper-gun" | "pulsar" | "acorn";

type PatternPoint = readonly [number, number];

const PATTERNS: Record<GolPatternId, PatternPoint[]> = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  lwss: [[1, 0], [4, 0], [0, 1], [0, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3]],
  "gosper-gun": [
    [24, 0], [22, 1], [24, 1],
    [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
    [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3],
    [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4],
    [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5],
    [10, 6], [16, 6], [24, 6], [11, 7], [15, 7], [12, 8], [13, 8],
  ],
  pulsar: [
    [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
    [0, 2], [5, 2], [7, 2], [12, 2], [0, 3], [5, 3], [7, 3], [12, 3],
    [0, 4], [5, 4], [7, 4], [12, 4], [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
    [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7], [0, 8], [5, 8], [7, 8], [12, 8],
    [0, 9], [5, 9], [7, 9], [12, 9], [0, 10], [5, 10], [7, 10], [12, 10],
    [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
  ],
  acorn: [[2, 0], [4, 1], [1, 2], [2, 2], [5, 2], [6, 2], [7, 2]],
};

export function stampPattern(board: Uint8Array, cols: number, rows: number, patternId: GolPatternId) {
  const pattern = PATTERNS[patternId];
  if (!pattern || !cols || !rows) return;

  const maxX = Math.max(...pattern.map(([x]) => x));
  const maxY = Math.max(...pattern.map(([, y]) => y));
  const originX = Math.floor((cols - maxX - 1) / 2);
  const originY = Math.floor((rows - maxY - 1) / 2);

  for (const [x, y] of pattern) {
    const boardX = originX + x;
    const boardY = originY + y;
    if (boardX >= 0 && boardX < cols && boardY >= 0 && boardY < rows) {
      board[boardY * cols + boardX] = 1;
    }
  }
}

export function step(
  current: Uint8Array,
  next: Uint8Array,
  cols: number,
  rows: number
): { deaths: number; rebirths: number } {
  let deaths = 0;
  let rebirths = 0;

  for (let y = 0; y < rows; y++) {
    const yOff = y * cols;
    for (let x = 0; x < cols; x++) {
      const i = yOff + x;

      let n = 0;
      const xm1 = x - 1,
        xp1 = x + 1;
      const ym1 = y - 1,
        yp1 = y + 1;

      if (ym1 >= 0) {
        const off = ym1 * cols;
        if (xm1 >= 0) n += current[off + xm1];
        n += current[off + x];
        if (xp1 < cols) n += current[off + xp1];
      }

      if (xm1 >= 0) n += current[yOff + xm1];
      if (xp1 < cols) n += current[yOff + xp1];

      if (yp1 < rows) {
        const off = yp1 * cols;
        if (xm1 >= 0) n += current[off + xm1];
        n += current[off + x];
        if (xp1 < cols) n += current[off + xp1];
      }

      const alive = current[i] === 1;
      const out = (alive ? n === 2 || n === 3 : n === 3) ? 1 : 0;

      next[i] = out;

      // Count transitions
      if (alive) {
        if (out === 0) deaths++;
      } else {
        if (out === 1) rebirths++;
      }
    }
  }

  return { deaths, rebirths };
}
