export function randomize(buf: Uint8Array, p = 0.5) {
  for (let i = 0; i < buf.length; i++) buf[i] = Math.random() < p ? 1 : 0;
}

export function step(current: Uint8Array, next: Uint8Array, cols: number, rows: number) {
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
      next[i] = (alive ? n === 2 || n === 3 : n === 3) ? 1 : 0;
    }
  }
}