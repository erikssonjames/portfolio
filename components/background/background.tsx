"use client";

import { ReactNode, useEffect, useRef } from "react";
import { GameOfLifeCanvas } from "./game-of-life";
import { GameOfLifeControlsOverlay } from "./game-of-life/gol-controls-overlay";
import { GolProvider } from "./game-of-life/gol-context";
import { GameOfLifeStats } from "./game-of-life/game-of-life-stats";

export function Background({ children }: { children: ReactNode }) {
  return (
    <GolProvider>
      <div className="relative h-screen w-full overflow-y-auto cursor-none">
        {/* background */}
        <div className="fixed inset-0 z-0">
          <GameOfLifeCanvas />
        </div>

        <BackgroundCursor />

        {/* page */}
        <div className="relative z-10">
          {children}
        </div>

        <div className="fixed left-2 top-2 z-50">
          <GameOfLifeStats />
        </div>

        {/* ALWAYS ON TOP */}
        <div className="fixed left-2 bottom-2 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <GameOfLifeControlsOverlay />
          </div>
        </div>
      </div>
    </GolProvider>
  );
}

function BackgroundCursor() {
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

  return <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[60] gol-cursor-dot" />
}
