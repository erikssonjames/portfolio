"use client";

import { ReactNode } from "react";
import { GameOfLifeCanvas } from "./game-of-life";
import { GameOfLifeControlsOverlay } from "./game-of-life/gol-controls-overlay";
import { GolProvider } from "./game-of-life/gol-context";
import { GameOfLifeStats } from "./game-of-life/game-of-life-stats";

export function Background({ children }: { children: ReactNode }) {
  return (
    <GolProvider>
      <div className="relative w-full h-screen overflow-y-auto">
        {/* background */}
        <div className="fixed inset-0 z-0">
          <GameOfLifeCanvas />
        </div>

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