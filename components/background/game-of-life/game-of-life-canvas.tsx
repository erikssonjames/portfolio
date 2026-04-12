"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { drawRoundedRect, drawVignette, parseRgb, rgbToStr, stampSparseDisc } from "./lib/canvas";
import { randomize, step } from "./lib/gol";
import { useGol } from "./gol-context";
import type { GolSettings } from "./game-of-life-settings";

type GridDims = {
  cols: number;
  rows: number;
};

const CELL_GAP = 1;
const BRUSH_PROTECTION_TICKS = 3;
const BRUSH_ACTIVE_MS = 120;
const MAX_DPR = 1.5;

function getBrushRadiusCells(settings: GolSettings, startedAt: number, now: number) {
  const targetRadius = Math.max(1, Math.round(settings.brushMaxRadius / 4));
  const growthMs = Math.max(1, settings.brushGrowthMs);
  const elapsed = Math.max(0, now - startedAt);
  const progress = Math.min(1, elapsed / growthMs);
  return Math.max(1, Math.round(1 + (targetRadius - 1) * progress));
}

export function GameOfLifeCanvas() {
  const { isPlaying, restartToken, randomizeToken, settings, updateLocalDeaths, updateLocalRebirths } = useGol();

  const [baseColors, setBaseColors] = useState({
    aliveCss: "rgb(253,224,71)",
    deadCss: "rgb(0,0,0)",
  });
  const settingsRef = useRef(settings);
  const isPlayingRef = useRef(isPlaying);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const brushOutlineRef = useRef<HTMLDivElement | null>(null);
  const aliveProbeRef = useRef<HTMLDivElement | null>(null);
  const deadProbeRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<Uint8Array>(new Uint8Array());
  const nextBoardRef = useRef<Uint8Array>(new Uint8Array());
  const protectionRef = useRef<Uint8Array>(new Uint8Array());
  const dimsRef = useRef<GridDims>({ cols: 0, rows: 0 });
  const timerRef = useRef<number | null>(null);
  const lastHoverCellRef = useRef<{ x: number; y: number } | null>(null);
  const brushVisibleRef = useRef(false);
  const brushPointRef = useRef({ x: 0, y: 0 });
  const brushStartedAtRef = useRef(0);
  const brushActiveUntilRef = useRef(0);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const probeClasses = useMemo(
    () => ({
      dead: "bg-black",
      alive: "bg-yellow-300 rounded-sm",
    }),
    []
  );

  const themeColors = useMemo(() => {
    const baseAlive = parseRgb(baseColors.aliveCss) ?? { r: 253, g: 224, b: 71 };
    const baseDead = parseRgb(baseColors.deadCss) ?? { r: 0, g: 0, b: 0 };

    if (settings.theme === "classic") {
      return {
        alive: rgbToStr(baseAlive),
        dead: rgbToStr(baseDead),
        glowBlur: Math.max(6, settings.glowStrength),
      };
    }

    if (settings.theme === "mono") {
      return {
        alive: "rgb(232,234,237)",
        dead: "rgb(12,12,16)",
        glowBlur: Math.max(4, settings.glowStrength * 0.8),
      };
    }

    return {
      alive: "rgb(56,244,214)",
      dead: "rgb(4,10,20)",
      glowBlur: Math.max(8, settings.glowStrength * 1.25),
    };
  }, [baseColors.aliveCss, baseColors.deadCss, settings]);

  const renderBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { cols, rows } = dimsRef.current;
    const board = boardRef.current;
    const s = settingsRef.current;
    if (!cols || !rows || board.length === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = cols * s.cellSize;
    const height = rows * s.cellSize;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const { alive, dead, glowBlur } = themeColors;
    ctx.fillStyle = dead;
    ctx.fillRect(0, 0, width, height);

    const inset = CELL_GAP;
    const size = s.cellSize - inset * 2;
    const radius = Math.max(0, Math.min(Math.floor(s.cellSize * 0.12), size / 2));

    ctx.save();
    ctx.fillStyle = alive;
    ctx.shadowColor = alive;
    ctx.shadowBlur = glowBlur;

    for (let y = 0; y < rows; y++) {
      const rowOffset = y * cols;
      const py = y * s.cellSize + inset;
      for (let x = 0; x < cols; x++) {
        if (board[rowOffset + x] !== 1) continue;

        const px = x * s.cellSize + inset;
        if (radius > 0) drawRoundedRect(ctx, px, py, size, size, radius);
        else ctx.fillRect(px, py, size, size);
      }
    }

    ctx.restore();

    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(Math.abs((s.backgroundOpacity - 100) / 100))})`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    if (s.showVignette) {
      drawVignette(ctx, width, height);
    }
  }, [themeColors]);

  const resizeBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = settingsRef.current;
    const cols = Math.max(1, Math.ceil(window.innerWidth / s.cellSize));
    const rows = Math.max(1, Math.ceil(window.innerHeight / s.cellSize));
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = cols * s.cellSize;
    const height = rows * s.cellSize;

    dimsRef.current = { cols, rows };
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    boardRef.current = new Uint8Array(cols * rows);
    nextBoardRef.current = new Uint8Array(cols * rows);
    protectionRef.current = new Uint8Array(cols * rows);
    randomize(boardRef.current, s.randomFill);
    lastHoverCellRef.current = null;
    renderBoard();
  }, [renderBoard]);

  const restartBoard = useCallback(() => {
    const next = new Uint8Array(boardRef.current.length);
    randomize(next, settingsRef.current.randomFill);
    boardRef.current = next;
    nextBoardRef.current = new Uint8Array(next.length);
    protectionRef.current = new Uint8Array(next.length);
    renderBoard();
  }, [renderBoard]);

  const randomizeBoard = useCallback(() => {
    const next = new Uint8Array(boardRef.current.length);
    randomize(next, settingsRef.current.randomFill);
    boardRef.current = next;
    protectionRef.current = new Uint8Array(next.length);
    renderBoard();
  }, [renderBoard]);

  const updateBrushOutline = useCallback(() => {
    const outline = brushOutlineRef.current;
    if (!outline) return;

    const radiusCells = getBrushRadiusCells(settingsRef.current, brushStartedAtRef.current, performance.now());
    const diameter = settingsRef.current.cellSize * (radiusCells * 2 + 1);
    outline.style.width = `${diameter}px`;
    outline.style.height = `${diameter}px`;
    outline.style.transform = `translate(${brushPointRef.current.x - diameter / 2}px, ${brushPointRef.current.y - diameter / 2}px)`;
    outline.style.opacity = brushVisibleRef.current && !settingsRef.current.disableBrush ? "1" : "0";
  }, []);

  const handlePointerMoveXY = useCallback(
    (px: number, py: number) => {
      const { cols, rows } = dimsRef.current;
      const currentBoard = boardRef.current;
      const s = settingsRef.current;

      if (!currentBoard.length || !cols || !rows || s.disableBrush) return;

      const cx = Math.floor(px / s.cellSize);
      const cy = Math.floor(py / s.cellSize);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return;

      const last = lastHoverCellRef.current;
      if (last && last.x === cx && last.y === cy) return;
      lastHoverCellRef.current = { x: cx, y: cy };

      const now = performance.now();
      brushActiveUntilRef.current = now + BRUSH_ACTIVE_MS;
      const radius = getBrushRadiusCells(s, brushStartedAtRef.current || now, now);
      const next = currentBoard.slice();
      const { rebirths } = stampSparseDisc({
        board: next,
        cols,
        rows,
        cx,
        cy,
        radius,
        density: s.brushDensity,
        seed: (cx * 83492791) ^ (cy * 297657976),
        ringBias: 0.25,
      });

      if (!rebirths) return;

      const protection = protectionRef.current;
      for (let i = 0; i < next.length; i++) {
        if (currentBoard[i] !== next[i]) {
          protection[i] = BRUSH_PROTECTION_TICKS;
        }
      }

      boardRef.current = next;
      updateLocalRebirths(rebirths);
      renderBoard();
    },
    [renderBoard, updateLocalRebirths]
  );

  useEffect(() => {
    const aliveProbe = aliveProbeRef.current;
    const deadProbe = deadProbeRef.current;
    if (!aliveProbe || !deadProbe) return;

    const aliveCS = getComputedStyle(aliveProbe);
    const deadCS = getComputedStyle(deadProbe);
    setBaseColors({
      aliveCss: aliveCS.backgroundColor,
      deadCss: deadCS.backgroundColor,
    });
    renderBoard();
  }, [renderBoard]);

  useEffect(() => {
    resizeBoard();

    const onResize = () => resizeBoard();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resizeBoard, settings.cellSize]);

  useEffect(() => {
    renderBoard();
    updateBrushOutline();
  }, [
    renderBoard,
    updateBrushOutline,
    settings.backgroundOpacity,
    settings.glowStrength,
    settings.showVignette,
    settings.theme,
    settings.disableBrush,
    settings.brushMaxRadius,
    settings.brushGrowthMs,
  ]);

  useEffect(() => {
    const runLoop = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        const isBrushActive = brushActiveUntilRef.current > performance.now();
        const shouldAdvance = isPlayingRef.current && !(settingsRef.current.pauseWhilePainting && isBrushActive);

        if (shouldAdvance) {
          const current = boardRef.current;
          const next = nextBoardRef.current;
          const { cols, rows } = dimsRef.current;

          if (current.length && next.length && cols && rows) {
            const { deaths, rebirths } = step(current, next, cols, rows);
            const protection = protectionRef.current;
            let preventedDeaths = 0;

            for (let i = 0; i < next.length; i++) {
              if (protection[i] > 0) {
                if (current[i] === 1 && next[i] === 0) {
                  next[i] = 1;
                  preventedDeaths++;
                }
                protection[i] -= 1;
              }
            }

            if (deaths - preventedDeaths > 0) updateLocalDeaths(deaths - preventedDeaths);
            if (rebirths) updateLocalRebirths(rebirths);

            boardRef.current = next.slice();
            nextBoardRef.current = current;
            renderBoard();
          }
        }

        runLoop();
      }, settingsRef.current.tickMs);
    };

    runLoop();

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [renderBoard, updateLocalDeaths, updateLocalRebirths]);

  useEffect(() => {
    restartBoard();
  }, [restartBoard, restartToken]);

  useEffect(() => {
    randomizeBoard();
  }, [randomizeBoard, randomizeToken]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const toBoardXY = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top, rect };
    };

    const onMove = (e: PointerEvent) => {
      const { x, y, rect } = toBoardXY(e.clientX, e.clientY);
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        brushVisibleRef.current = false;
        brushStartedAtRef.current = 0;
        updateBrushOutline();
        return;
      }

      if (!brushVisibleRef.current) {
        brushStartedAtRef.current = performance.now();
      }

      brushVisibleRef.current = true;
      brushPointRef.current = { x, y };
      updateBrushOutline();
      handlePointerMoveXY(x, y);
    };

    const onLeave = () => {
      brushVisibleRef.current = false;
      brushStartedAtRef.current = 0;
      updateBrushOutline();
    };

    window.addEventListener("pointermove", onMove, { capture: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove, { capture: true });
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [handlePointerMoveXY, updateBrushOutline]);

  return (
    <div
      ref={containerRef}
      className="gol-grid-shell relative size-full overflow-hidden"
      style={
        {
          "--gol-alive": themeColors.alive,
          "--gol-dead": themeColors.dead,
          "--gol-glow-size": `${themeColors.glowBlur}px`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute opacity-0">
        <div ref={deadProbeRef} className={probeClasses.dead} />
        <div ref={aliveProbeRef} className={probeClasses.alive} />
      </div>

      <canvas ref={canvasRef} className="gol-canvas absolute left-0 top-0 z-0 block" />
      <div ref={brushOutlineRef} className="gol-brush-outline pointer-events-none absolute left-0 top-0 z-[1]" />
    </div>
  );
}
