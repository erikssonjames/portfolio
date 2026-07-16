"use client";

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { drawVignette, parseRgb, rgbToStr, stampSparseDisc } from "./lib/canvas";
import { randomize, stampPattern, step } from "./lib/gol";
import { useGol } from "./gol-context";

type GridDims = {
  cols: number;
  rows: number;
};

const CELL_GAP = 1;
const MAX_DPR = 1.5;

type IntroStage = "dead" | "loading" | "revealed";

export function GameOfLifeCanvas({ introStage = "revealed" }: { introStage?: IntroStage }) {
  const {
    isPlaying,
    restartToken,
    randomizeToken,
    clearToken,
    patternId,
    patternToken,
    isImmersive,
    settings,
    updateLocalDeaths,
    updateLocalRebirths,
  } = useGol();

  const [baseColors, setBaseColors] = useState({
    aliveCss: "rgb(218,126,72)",
    deadCss: "rgb(8,17,25)",
  });
  const introStageRef = useRef<IntroStage>(introStage);
  const settingsRef = useRef(settings);
  const isPlayingRef = useRef(isPlaying);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const aliveProbeRef = useRef<HTMLDivElement | null>(null);
  const deadProbeRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<Uint8Array>(new Uint8Array());
  const nextBoardRef = useRef<Uint8Array>(new Uint8Array());
  const protectionRef = useRef<Uint8Array>(new Uint8Array());
  const dimsRef = useRef<GridDims>({ cols: 0, rows: 0 });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    introStageRef.current = introStage;
  }, [introStage]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const probeClasses = useMemo(
    () => ({
      dead: "bg-slate-950",
      alive: "bg-primary",
    }),
    []
  );

  const themeColors = useMemo(() => {
    const baseAlive = parseRgb(baseColors.aliveCss) ?? { r: 218, g: 126, b: 72 };
    const baseDead = parseRgb(baseColors.deadCss) ?? { r: 8, g: 17, b: 25 };

    if (isImmersive) {
      return {
        alive: "rgb(91,226,255)",
        dead: "rgb(4,12,28)",
        glowBlur: 0,
      };
    }

    if (settings.theme === "classic") {
      return {
        alive: rgbToStr(baseAlive),
        dead: rgbToStr(baseDead),
        glowBlur: 0,
      };
    }

    if (settings.theme === "mono") {
      return {
        alive: "rgb(232,234,237)",
        dead: "rgb(12,12,16)",
        glowBlur: 0,
      };
    }

    return {
      alive: "rgb(91,226,255)",
      dead: "rgb(4,12,28)",
      glowBlur: 0,
    };
  }, [baseColors.aliveCss, baseColors.deadCss, isImmersive, settings]);

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

    const { alive, dead } = themeColors;
    ctx.fillStyle = dead;
    ctx.fillRect(0, 0, width, height);

    const inset = CELL_GAP;
    const size = s.cellSize - inset * 2;
    ctx.save();
    ctx.fillStyle = alive;
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;

    for (let y = 0; y < rows; y++) {
      const rowOffset = y * cols;
      const py = y * s.cellSize + inset;
      for (let x = 0; x < cols; x++) {
        if (board[rowOffset + x] !== 1) continue;

        const px = x * s.cellSize + inset;
        ctx.fillRect(px, py, size, size);
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
    if (introStageRef.current === "revealed") {
      randomize(boardRef.current, s.randomFill);
    }
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
  }, [
    renderBoard,
    settings.backgroundOpacity,
    settings.glowStrength,
    settings.showVignette,
    settings.theme,
  ]);

  useEffect(() => {
    const runLoop = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        const shouldAdvance = isPlayingRef.current;

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
    if (!clearToken) return;

    const { cols, rows } = dimsRef.current;
    if (!cols || !rows) return;

    boardRef.current = new Uint8Array(cols * rows);
    nextBoardRef.current = new Uint8Array(cols * rows);
    protectionRef.current = new Uint8Array(cols * rows);
    renderBoard();
  }, [clearToken, renderBoard]);

  useEffect(() => {
    if (!patternToken) return;

    const { cols, rows } = dimsRef.current;
    if (!cols || !rows) return;

    const next = new Uint8Array(cols * rows);
    stampPattern(next, cols, rows, patternId);
    boardRef.current = next;
    nextBoardRef.current = new Uint8Array(next.length);
    protectionRef.current = new Uint8Array(next.length);
    renderBoard();
  }, [patternId, patternToken, renderBoard]);

  useEffect(() => {
    const { cols, rows } = dimsRef.current;
    if (!cols || !rows || !boardRef.current.length) return;

    if (introStage === "dead") {
      boardRef.current = new Uint8Array(cols * rows);
      nextBoardRef.current = new Uint8Array(cols * rows);
      protectionRef.current = new Uint8Array(cols * rows);
      renderBoard();
      return;
    }

    if (introStage === "loading") {
      const board = new Uint8Array(cols * rows);
      const centerX = Math.floor(cols / 2);
      const centerY = Math.floor(rows / 2);
      const pulses = [
        { dx: 0, dy: 0, radius: 3, density: 0.82, delay: 0 },
        { dx: -Math.max(4, Math.floor(cols * 0.08)), dy: -2, radius: 4, density: 0.64, delay: 180 },
        { dx: Math.max(4, Math.floor(cols * 0.08)), dy: 2, radius: 5, density: 0.56, delay: 360 },
        { dx: 0, dy: Math.max(3, Math.floor(rows * 0.05)), radius: 6, density: 0.44, delay: 540 },
        { dx: 0, dy: 0, radius: Math.max(6, Math.floor(Math.min(cols, rows) * 0.12)), density: 0.18, delay: 760 },
      ];

      boardRef.current = board;
      nextBoardRef.current = new Uint8Array(cols * rows);
      protectionRef.current = new Uint8Array(cols * rows);
      renderBoard();

      const timers = pulses.map((pulse, index) =>
        window.setTimeout(() => {
          stampSparseDisc({
            board,
            cols,
            rows,
            cx: centerX + pulse.dx,
            cy: centerY + pulse.dy,
            radius: pulse.radius,
            density: pulse.density,
            seed: 0x9e3779b9 ^ (index * 2654435761),
            ringBias: index === pulses.length - 1 ? 0.85 : 0.35,
          });
          renderBoard();
        }, pulse.delay)
      );

      return () => {
        for (const timer of timers) {
          window.clearTimeout(timer);
        }
      };
    }

    if (introStage === "revealed") {
      const liveCells = boardRef.current.reduce((count, value) => count + value, 0);
      if (liveCells === 0) {
        const next = new Uint8Array(cols * rows);
        randomize(next, settingsRef.current.randomFill);
        boardRef.current = next;
        nextBoardRef.current = new Uint8Array(next.length);
        protectionRef.current = new Uint8Array(next.length);
      }
      renderBoard();
    }
  }, [introStage, renderBoard]);

  return (
    <div
      ref={containerRef}
      className={`gol-grid-shell relative size-full overflow-hidden ${isImmersive ? "is-focus" : "is-regular"}`}
      style={
        {
          "--gol-alive": themeColors.alive,
          "--gol-dead": themeColors.dead,
          "--gol-glow-size": `${themeColors.glowBlur}px`,
          "--gol-cell-size": `${settings.cellSize}px`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute opacity-0">
        <div ref={deadProbeRef} className={probeClasses.dead} />
        <div ref={aliveProbeRef} className={probeClasses.alive} />
      </div>

      <canvas ref={canvasRef} className="gol-canvas absolute left-0 top-0 z-0 block" />
    </div>
  );
}
