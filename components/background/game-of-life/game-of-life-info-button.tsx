"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, CircleHelp } from "lucide-react"

const SURVIVAL_BEFORE = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const SURVIVAL_AFTER = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const BIRTH_BEFORE = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
]

const BIRTH_AFTER = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
]

const CROWDING_BEFORE = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const CROWDING_AFTER = [
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
]

type CellGridProps = {
  cells: number[][]
  highlight?: Array<[number, number]>
  accent?: "gold" | "emerald" | "rose"
}

type RuleDemoProps = {
  title: string
  caption: string
  before: number[][]
  after: number[][]
  highlight?: Array<[number, number]>
  accent?: "gold" | "emerald" | "rose"
}

function CellGrid({ cells, highlight = [], accent = "gold" }: CellGridProps) {
  const highlightSet = new Set(highlight.map(([row, col]) => `${row}-${col}`))
  const accentClasses =
    accent === "emerald"
      ? {
          live: "border-emerald-300/70 bg-emerald-300/85 shadow-[0_0_18px_rgba(110,231,183,0.3)]",
          highlight: "ring-2 ring-emerald-300/70",
        }
      : accent === "rose"
        ? {
            live: "border-rose-300/70 bg-rose-300/85 shadow-[0_0_18px_rgba(253,164,175,0.28)]",
            highlight: "ring-2 ring-rose-300/70",
          }
        : {
            live: "border-yellow-300/70 bg-yellow-300/85 shadow-[0_0_18px_rgba(253,224,71,0.28)]",
            highlight: "ring-2 ring-yellow-300/70",
          }

  return (
    <div className="grid grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-[inset_0_0_18px_rgba(255,255,255,0.03)]">
      {cells.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHighlighted = highlightSet.has(`${rowIndex}-${colIndex}`)

          return (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "h-3.5 w-3.5 rounded-[4px] border border-white/8 bg-white/5 transition-colors",
                cell && accentClasses.live,
                isHighlighted && accentClasses.highlight
              )}
            />
          )
        })
      )}
    </div>
  )
}

function RuleDemo({
  title,
  caption,
  before,
  after,
  highlight,
  accent = "gold",
}: RuleDemoProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-3">
        <p className="text-sm font-medium text-zinc-100">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">{caption}</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <CellGrid cells={before} highlight={highlight} accent={accent} />
        <ArrowRight className="h-4 w-4 shrink-0 text-zinc-500" />
        <CellGrid cells={after} highlight={highlight} accent={accent} />
      </div>
    </div>
  )
}

function GameOfLifeInfoCard() {
  return (
    <div className="space-y-3 text-white">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-zinc-50">What is Game of Life?</p>
        <p className="text-xs leading-relaxed text-zinc-300">
          Conway&apos;s Game of Life is a zero-player simulation. Each square is either alive
          or dead, and every tick the next state is decided only by nearby neighbors.
        </p>
      </div>

      <div className="grid gap-3">
        <RuleDemo
          title="Survival"
          caption="A live cell with two or three neighbors stays alive in the next generation."
          before={SURVIVAL_BEFORE}
          after={SURVIVAL_AFTER}
          highlight={[[2, 2]]}
          accent="gold"
        />

        <RuleDemo
          title="Birth"
          caption="A dead cell with exactly three live neighbors becomes alive."
          before={BIRTH_BEFORE}
          after={BIRTH_AFTER}
          highlight={[[2, 2]]}
          accent="emerald"
        />

        <RuleDemo
          title="Overcrowding"
          caption="Too many neighbors can kill a live cell, which makes larger patterns reshape."
          before={CROWDING_BEFORE}
          after={CROWDING_AFTER}
          highlight={[[1, 2], [2, 2]]}
          accent="rose"
        />
      </div>

      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-xs font-medium text-yellow-200 transition-colors hover:text-yellow-100"
      >
        <span>Read more</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

export function GameOfLifeInfoButton() {
  const [pinnedOpen, setPinnedOpen] = React.useState(false)

  return (
    <div className="relative">
        <button
          type="button"
          aria-label="Explain Game of Life"
          aria-pressed={pinnedOpen}
          onClick={(event) => {
            event.stopPropagation()
            setPinnedOpen((prev) => !prev)
          }}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-none border border-yellow-400/20 bg-yellow-400/10 text-yellow-100 transition-colors",
            "hover:bg-yellow-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/40",
            pinnedOpen && "bg-yellow-400/20"
          )}
        >
          <CircleHelp className="h-4 w-4" />
        </button>

      {pinnedOpen ? (
        <div className="absolute bottom-full right-0 z-50 mb-3 w-[min(26rem,calc(100vw-2rem))] border border-white/10 bg-zinc-950/95 p-4 shadow-xl">
          <GameOfLifeInfoCard />
        </div>
      ) : null}
    </div>
  )
}
