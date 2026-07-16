"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { GameOfLifeCanvas } from "./game-of-life";
import { GameOfLifeControlsOverlay } from "./game-of-life/gol-controls-overlay";
import { GolProvider, useGol } from "./game-of-life/gol-context";
import { GameOfLifeStats } from "./game-of-life/game-of-life-stats";

type IntroStage = "dead" | "loading" | "revealed";

const INTRO_DEAD_MS = 420;
const INTRO_LOADING_MS = 1400;
const FOCUS_PATTERN_DELAY_MS = 650;

export function Background({ children }: { children: ReactNode }) {
  return (
    <GolProvider>
      <BackgroundScene>{children}</BackgroundScene>
    </GolProvider>
  );
}

function BackgroundScene({ children }: { children: ReactNode }) {
  const [introStage, setIntroStage] = useState<IntroStage>("dead");
  const {
    isImmersive,
    setIsImmersive,
    requestClear,
    requestPattern,
    requestRandomize,
  } = useGol();
  const wasImmersiveRef = useRef(false);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (event.key === "Escape" && isImmersive) {
        setIsImmersive(false);
      } else if (!isTyping && event.key.toLowerCase() === "f") {
        setIsImmersive((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImmersive, setIsImmersive]);

  useEffect(() => {
    let patternTimer: number | undefined;

    if (isImmersive && !wasImmersiveRef.current) {
      requestClear();
      patternTimer = window.setTimeout(() => {
        requestPattern("glider");
      }, FOCUS_PATTERN_DELAY_MS);
    } else if (!isImmersive && wasImmersiveRef.current) {
      requestRandomize();
    }

    wasImmersiveRef.current = isImmersive;

    return () => {
      if (patternTimer) window.clearTimeout(patternTimer);
    };
  }, [isImmersive, requestClear, requestPattern, requestRandomize]);

  const isRevealed = introStage === "revealed";

  return (
    <div className="relative h-screen w-full overflow-y-auto">
        {/* background */}
        <div className="fixed inset-0 z-0">
          <GameOfLifeCanvas introStage={introStage} />
        </div>

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
        <div className={`relative z-10 transition-all duration-700 ease-out ${isRevealed ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-6"} ${isImmersive ? "pointer-events-none invisible opacity-0" : ""}`}>
          {children}
        </div>

        <div className={`fixed left-2 top-2 z-50 transition-all duration-500 ease-out ${isRevealed && !isImmersive ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-3"}`}>
          <GameOfLifeStats />
        </div>

        {/* Simulation controller */}
        <div
          className={`gol-controls-positioner fixed z-50 pointer-events-none ${
            isRevealed ? "is-revealed" : ""
          } ${isImmersive ? "is-focus" : "is-regular"}`}
        >
          <div className="pointer-events-auto">
            <GameOfLifeControlsOverlay />
          </div>
        </div>
      </div>
  );
}
