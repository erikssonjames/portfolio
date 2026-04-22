"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { GameOfLifeCanvas } from "./game-of-life";
import { GameOfLifeControlsOverlay } from "./game-of-life/gol-controls-overlay";
import { GolProvider } from "./game-of-life/gol-context";
import { GameOfLifeStats } from "./game-of-life/game-of-life-stats";

type IntroStage = "dead" | "loading" | "revealed";

const INTRO_DEAD_MS = 420;
const INTRO_LOADING_MS = 1400;

export function Background({ children }: { children: ReactNode }) {
  const [introStage, setIntroStage] = useState<IntroStage>("dead");

  useEffect(() => {
    const deadTimer = window.setTimeout(() => {
      setIntroStage("loading");
    }, INTRO_DEAD_MS);

    const revealTimer = window.setTimeout(() => {
      setIntroStage("revealed");
    }, INTRO_DEAD_MS + INTRO_LOADING_MS);

    return () => {
      window.clearTimeout(deadTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  const isRevealed = introStage === "revealed";

  return (
    <GolProvider>
      <div className="relative h-screen w-full overflow-y-auto cursor-none">
        {/* background */}
        <div className="fixed inset-0 z-0">
          <GameOfLifeCanvas introStage={introStage} />
        </div>

        <BackgroundCursor hidden={!isRevealed} />

        <div className={`gol-intro-overlay fixed inset-0 z-20 ${isRevealed ? "is-hidden" : ""}`}>
          <div className="gol-intro-panel">
            <span className="gol-intro-label">
              {introStage === "dead" ? "awakening the grid" : "loading signal into the field"}
            </span>
            <div className="gol-intro-track" aria-hidden="true">
              <div className={`gol-intro-fill ${introStage === "loading" ? "is-loading" : ""}`} />
            </div>
          </div>
        </div>

        {/* page */}
        <div className={`relative z-10 transition-all duration-700 ease-out ${isRevealed ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-6"}`}>
          {children}
        </div>

        <div className={`fixed left-2 top-2 z-50 transition-all duration-500 ease-out ${isRevealed ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-3"}`}>
          <GameOfLifeStats />
        </div>

        {/* ALWAYS ON TOP */}
        <div className={`fixed left-2 bottom-2 z-50 pointer-events-none transition-all duration-500 ease-out ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className="pointer-events-auto">
            <GameOfLifeControlsOverlay />
          </div>
        </div>
      </div>
    </GolProvider>
  );
}

function BackgroundCursor({ hidden }: { hidden: boolean }) {
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const move = (event: PointerEvent) => {
      dot.style.opacity = "1"
      dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    }

    const hide = () => {
      dot.style.opacity = "0"
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerleave", hide)
    window.addEventListener("blur", hide)

    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerleave", hide)
      window.removeEventListener("blur", hide)
    }
  }, [])

  return <div ref={dotRef} className={`pointer-events-none fixed left-0 top-0 z-[60] gol-cursor-dot ${hidden ? "opacity-0" : ""}`} />
}
