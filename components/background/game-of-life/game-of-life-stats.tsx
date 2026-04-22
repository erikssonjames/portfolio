"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCompactNumber } from "@/lib/large-number"
import { cn } from "@/lib/utils"
import { Activity, Skull, Sparkles } from "lucide-react"
import { useGameOfLifeStats } from "./use-game-of-life-stats"
import { useGol } from "./gol-context"

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: bigint | number
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-yellow-400/15 bg-black/30 px-3 py-2 shadow-[inset_0_0_18px_rgba(250,204,21,0.06)]">
      <div className="flex items-center gap-2">
        <span className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 p-1.5 shadow-[0_0_14px_rgba(250,204,21,0.14)]">
          <Icon className="h-4 w-4 text-yellow-200" />
        </span>
        <span className="text-xs text-zinc-300">{label}</span>
      </div>
      <span className="text-sm font-semibold tabular-nums text-zinc-100">
        {formatCompactNumber(value)}
      </span>
    </div>
  )
}

export function GameOfLifeStats({
  className,
  defaultExpanded = false,
}: {
  className?: string
  defaultExpanded?: boolean
}) {
  const { localDeaths, localRebirths } = useGol()
  const { statistics } = useGameOfLifeStats()
  const { deaths: globalDeaths, rebirths: globalRebirths } = statistics ?? {
    deaths: BigInt(0),
    rebirths: BigInt(0),
  }
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const totalLocalEvents = localDeaths + localRebirths
  const totalGlobalEvents = globalDeaths + globalRebirths

  const toggleExpanded = () => setExpanded((v) => !v)

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border-white/10 bg-black/40 py-0 shadow-xl backdrop-blur gap-0",
        "shadow-[0_0_50px_rgba(250,204,21,0.10)]",
        className,
        expanded && "min-w-72"
      )}
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-yellow-400/10 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-24 right-6 h-56 w-56 rounded-full bg-yellow-300/8 blur-[75px]" />

      <button
        type="button"
        onClick={toggleExpanded}
        className={cn(
          "group flex w-full items-center justify-between gap-2 rounded-2xl px-2.5 py-2 text-left",
          "outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/35"
        )}
        aria-expanded={expanded}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-1.5 shadow-[0_0_14px_rgba(250,204,21,0.16)]">
            <Activity className="h-4 w-4 text-yellow-200" />
          </span>

          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-2">
              <span className="truncate text-xs font-medium text-zinc-100">Lifecycle</span>
            </div>

            {!expanded && (
              <div className="mt-0.5 truncate pe-2 text-[11px] text-zinc-400">
                {formatCompactNumber(localDeaths)} deaths • {formatCompactNumber(localRebirths)} rebirths
              </div>
            )}
          </div>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Separator className="bg-yellow-400/10" />

          <div className="grid gap-2 p-2.5">
            <p className="text-muted-foreground text-xs">Local stats</p>

            <StatRow icon={Skull} label="Deaths" value={localDeaths} />
            <StatRow icon={Sparkles} label="Rebirths" value={localRebirths} />
            <StatRow icon={Sparkles} label="Total" value={totalLocalEvents} />

            <Separator className="bg-yellow-400/10" />

            <p className="text-muted-foreground text-xs">Global stats</p>

            <StatRow icon={Skull} label="Deaths" value={globalDeaths} />
            <StatRow icon={Sparkles} label="Rebirths" value={globalRebirths} />
            <StatRow icon={Sparkles} label="Total" value={totalGlobalEvents} />
          </div>
        </div>
      </div>
    </Card>
  )
}
