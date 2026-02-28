"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { randomize, step } from "./lib/gol";
import { drawRoundedRect, drawVignette, mix, parseRgb, rgbToStr, stampSparseDisc } from "./lib/canvas";
import { useGol } from "./gol-context";

const GAP = 1;

type ClickEffect = { x: number; y: number; t: number };

type PaintState = {
  isDown: boolean;
  startedAt: number;
  lastPaintAt: number;
  pointerId: number | null;
  x: number;
  y: number;
};

export function GameOfLifeCanvas() {
  const { isPlaying, restartToken, randomizeToken, settings } = useGol();

  // latest settings in RAF loop
  const settingsRef = useRef(settings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRef = useRef<Uint8Array | null>(null);
  const nextRef = useRef<Uint8Array | null>(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef(0);
  const accRef = useRef(0);
  const effectsRef = useRef<ClickEffect[]>([]);
  const isPlayingRef = useRef(true);

  const aliveProbeRef = useRef<HTMLDivElement | null>(null);
  const deadProbeRef = useRef<HTMLDivElement | null>(null);
  const baseColorsRef = useRef({
    aliveCss: "rgb(253,224,71)",
    deadCss: "rgb(0,0,0)",
    radiusPx: 2,
  });

  // Hover helpers
  const lastHoverCellRef = useRef<{ x: number; y: number } | null>(null);

  // Pointer-hold paint state
  const paintRef = useRef<PaintState>({
    isDown: false,
    startedAt: 0,
    lastPaintAt: 0,
    pointerId: null,
    x: 0,
    y: 0,
  });

  // Theme mapping:
  // - classic uses your Tailwind-probed alive/dead
  // - mono is grayscale (alive becomes bright gray)
  // - neon shifts alive toward cyan/pink and darkens dead slightly
  const computeThemeColors = useCallback(() => {
    const s = settingsRef.current;
    const baseAlive = parseRgb(baseColorsRef.current.aliveCss) ?? { r: 253, g: 224, b: 71 };
    const baseDead = parseRgb(baseColorsRef.current.deadCss) ?? { r: 0, g: 0, b: 0 };

    if (s.theme === "classic") {
      return { alive: rgbToStr(baseAlive), dead: rgbToStr(baseDead) };
    }

    if (s.theme === "mono") {
      // luminance -> grayscale
      // const lumAlive = Math.round(0.2126 * baseAlive.r + 0.7152 * baseAlive.g + 0.0722 * baseAlive.b);
      const lumDead = Math.round(0.2126 * baseDead.r + 0.7152 * baseDead.g + 0.0722 * baseDead.b);

      // const alive = { r: lumAlive, g: lumAlive, b: lumAlive };
      const dead = { r: lumDead, g: lumDead, b: lumDead };

      // push alive brighter so it pops
      const aliveBoost = mix(dead, { r: 245, g: 245, b: 245 }, 0.9);
      return { alive: rgbToStr(aliveBoost), dead: rgbToStr(dead) };
    }

    // neon
    const neonA = { r: 34, g: 211, b: 238 }; // cyan-400-ish
    const neonB = { r: 244, g: 114, b: 182 }; // pink-400-ish
    const neonMix = mix(neonA, neonB, 0.45);

    const alive = mix(baseAlive, neonMix, 0.75);

    // dead: slightly lifted from pure black so neon glow shows nicer
    const deadLift = mix(baseDead, { r: 8, g: 8, b: 12 }, 0.6);

    return { alive: rgbToStr(alive), dead: rgbToStr(deadLift) };
  }, []);

  const rebuild = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = settingsRef.current;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const cols = Math.floor(width / s.cellSize) + 2;
    const rows = Math.floor(height / s.cellSize) + 2;
    dimsRef.current = { cols, rows };

    canvas.width = cols * s.cellSize;
    canvas.height = rows * s.cellSize;

    currentRef.current = new Uint8Array(cols * rows);
    nextRef.current = new Uint8Array(cols * rows);
    randomize(currentRef.current, s.randomFill);

    lastTRef.current = 0;
    accRef.current = 0;

    lastHoverCellRef.current = null;
    paintRef.current.isDown = false;


  }, []);

  const restart = useCallback(() => {
    const s = settingsRef.current;
    const { cols, rows } = dimsRef.current;
    if (!cols || !rows || !currentRef.current) return;
    randomize(currentRef.current, s.randomFill);
    lastTRef.current = 0;
    accRef.current = 0;
  }, []);

  const handlePointerMoveXY = (px: number, py: number) => {
    const canvas = canvasRef.current;
    const board = currentRef.current;
    if (!canvas || !board) return;

    const { cols, rows } = dimsRef.current;
    const s = settingsRef.current;

    if (s.disableBrush) return;

    paintRef.current.x = px;
    paintRef.current.y = py;

    const cx = Math.floor(px / s.cellSize);
    const cy = Math.floor(py / s.cellSize);

    if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;

    if (paintRef.current.isDown) {
      const now = performance.now();
      if (now - paintRef.current.lastPaintAt < 20) return;
      paintRef.current.lastPaintAt = now;

      const heldMs = now - paintRef.current.startedAt;
      const radius = Math.min(s.brushMaxRadius, 3 + Math.floor(heldMs / s.brushGrowthMs));
      const density = Math.max(0.18, s.brushDensity - radius * 0.03);

      stampSparseDisc({
        board,
        cols,
        rows,
        cx,
        cy,
        radius,
        density,
        seed: (now | 0) ^ (cx * 73856093) ^ (cy * 19349663),
        ringBias: 0.35,
      });

      return;
    }

    const last = lastHoverCellRef.current;
    if (last && last.x === cx && last.y === cy) return;
    lastHoverCellRef.current = { x: cx, y: cy };

    stampSparseDisc({
      board,
      cols,
      rows,
      cx,
      cy,
      radius: 2,
      density: 0.35,
      seed: (cx * 83492791) ^ (cy * 297657976),
      ringBias: 0.25,
    });
  };

  // Tailwind probe classes (so "classic" respects your Tailwind theme)
  const probeClasses = useMemo(
    () => ({
      dead: "bg-black",
      alive: "bg-yellow-300 rounded-sm",
    }),
    []
  );

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    rebuild();
  }, [settings.cellSize, rebuild]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const aliveProbe = aliveProbeRef.current;
    const deadProbe = deadProbeRef.current;
    if (!canvas || !aliveProbe || !deadProbe) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateBaseColorsFromProbes = () => {
      const aliveCS = getComputedStyle(aliveProbe);
      const deadCS = getComputedStyle(deadProbe);

      baseColorsRef.current = {
        aliveCss: aliveCS.backgroundColor,
        deadCss: deadCS.backgroundColor,
        radiusPx: Number.parseFloat(aliveCS.borderTopLeftRadius) || 2,
      };
    };

    updateBaseColorsFromProbes();

    const render = () => {
      const { cols, rows } = dimsRef.current;
      const board = currentRef.current;
      if (!board || cols === 0 || rows === 0) return;

      const s = settingsRef.current;
      const { alive, dead } = computeThemeColors();
      const radiusPx = baseColorsRef.current.radiusPx;

      const W = cols * s.cellSize;
      const H = rows * s.cellSize;

      // background
      ctx.save();
      ctx.fillStyle = dead;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // alive cells
      ctx.save();
      ctx.fillStyle = alive;
      ctx.shadowColor = alive;

      // a tiny bit more glow in neon, a bit less in mono, otherwise settings.glowStrength
      const themeGlowMul = s.theme === "neon" ? 1.25 : s.theme === "mono" ? 0.85 : 1;
      ctx.shadowBlur = Math.round(s.glowStrength * themeGlowMul);

      const inset = GAP;
      const w = s.cellSize - inset * 2;
      const h = s.cellSize - inset * 2;
      const r = Math.max(0, Math.min(radiusPx, w / 2, h / 2));

      for (let y = 0; y < rows; y++) {
        const rowOff = y * cols;
        const py = y * s.cellSize + inset;
        for (let x = 0; x < cols; x++) {
          if (board[rowOff + x] === 1) {
            const px = x * s.cellSize + inset;
            if (r > 0) drawRoundedRect(ctx, px, py, w, h, r);
            else ctx.fillRect(px, py, w, h);
          }
        }
      }

      // click ripple effect uses alive color too
      if (effectsRef.current.length) {
        ctx.save();

        for (const fx of effectsRef.current) {
          const p = fx.t / 450;
          const ease = 1 - Math.pow(1 - p, 3);
          const radius = 8 + ease * 80;

          ctx.globalAlpha = (1 - p) * 0.7;
          ctx.lineWidth = 2;
          ctx.strokeStyle = alive;
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.globalAlpha = (1 - p) * 0.25;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(fx.x, fx.y, radius * 0.75, 0, Math.PI * 2);
          ctx.stroke();

          ctx.globalAlpha = (1 - p) * 0.35;
          ctx.lineWidth = 2;
          for (let i = 0; i < 10; i++) {
            const a = (i / 10) * Math.PI * 2 + p * 1.2;
            const r1 = radius * 0.35;
            const r2 = radius * 0.55;
            ctx.beginPath();
            ctx.moveTo(fx.x + Math.cos(a) * r1, fx.y + Math.sin(a) * r1);
            ctx.lineTo(fx.x + Math.cos(a) * r2, fx.y + Math.sin(a) * r2);
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      ctx.restore();

      if (s.showVignette) drawVignette(ctx, W, H);
    };

    const onResize = () => rebuild();
    window.addEventListener("resize", onResize);

    rebuild();

    const loop = (t: number) => {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = t - lastTRef.current;

      // advance click effects
      if (effectsRef.current.length) {
        for (const fx of effectsRef.current) fx.t += dt;
        effectsRef.current = effectsRef.current.filter((fx) => fx.t < 450);
      }

      lastTRef.current = t;
      accRef.current += dt;

      const s = settingsRef.current;
      const { cols, rows } = dimsRef.current;
      const current = currentRef.current;
      const next = nextRef.current;

      const shouldAdvance = isPlayingRef.current && !(s.pauseWhilePainting && paintRef.current.isDown);

      if (shouldAdvance && current && next && cols && rows) {
        let steps = 0;
        const maxSteps = 3;
        while (accRef.current >= s.tickMs && steps < maxSteps && shouldAdvance) {
          step(current, next, cols, rows);
          currentRef.current = next;
          nextRef.current = current;
          accRef.current -= s.tickMs;
          steps++;
        }
      }

      render();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [rebuild, computeThemeColors]);

  useEffect(() => {
    restart();
  }, [restartToken, restart]);

  useEffect(() => {
    const b = currentRef.current;
    if (!b) return;
    randomize(b, settingsRef.current.randomFill);
  }, [randomizeToken]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const toCanvasXY = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top, rect };
    };

    const isInside = (x: number, y: number, rect: DOMRect) =>
      x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

    const onMove = (e: PointerEvent) => {
      const { x, y, rect } = toCanvasXY(e.clientX, e.clientY);
      if (!isInside(x, y, rect)) return;
      // call your existing logic
      // you can refactor handlePointerMove to accept (x,y) instead of React event
      handlePointerMoveXY(x, y);
    };

    window.addEventListener("pointermove", onMove, { capture: true });

    return () => {
      window.removeEventListener("pointermove", onMove, { capture: true });
    };
  }, []);

  return (
    <div className="relative size-full overflow-hidden">
      {/* Tailwind style probes */}
      <div className="pointer-events-none absolute opacity-0">
        <div ref={deadProbeRef} className={probeClasses.dead} />
        <div ref={aliveProbeRef} className={probeClasses.alive} />
      </div>

      <canvas
        ref={canvasRef}
        className="block touch-none relative z-0"
        style={{ imageRendering: "pixelated" }}
      />

      <div 
        className="pointer-events-none z-10 bg-background absolute inset-0" 
        style={{ opacity: Math.max(Math.abs((settings.backgroundOpacity - 100) / 100)) }}
      />
    </div>
  );
}