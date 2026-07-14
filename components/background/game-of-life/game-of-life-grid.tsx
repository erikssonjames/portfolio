"use client"

import { useGol } from "./gol-context"

export function GameOfLifeGrid () {
    const { settings } = useGol()
    const { cellSize } = settings

    return (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(205,119,71,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(112,157,173,0.10) 1px, transparent 1px)",
            backgroundSize: `${cellSize * 2}px ${cellSize * 2}px`,
          }}
        />
    )
}
