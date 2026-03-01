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
              "linear-gradient(rgba(250,204,21,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.10) 1px, transparent 1px)",
            backgroundSize: `${cellSize * 2}px ${cellSize * 2}px`,
          }}
        />
    )
}