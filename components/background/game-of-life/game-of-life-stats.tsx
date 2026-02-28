"use client"

import * as React from "react"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Activity, Skull, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { useGameOfLifeStats } from "./use-game-of-life-stats"

type Scope = "local" | "global"

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: number
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
        {value.toLocaleString()}
      </span>
    </div>
  )
}

export function GameOfLifeStats({
  className,
  defaultExpanded = false,
  defaultScope = "local",
}: {
  className?: string
  defaultExpanded?: boolean
  defaultScope?: Scope
}) {
  const { statistics } = useGameOfLifeStats()
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [scope, setScope] = React.useState<Scope>(defaultScope)

  // Expect your hook to expose BOTH:
  // statistics.local.{deaths, rebirths}
  // statistics.global.{deaths, rebirths}
  //
  // If your current shape is different, adjust these selectors only.
  // const active = scope === "local" ? local : global
  const active = statistics

  const deaths = active?.deaths ?? 0
  const rebirths = active?.rebirths ?? 0
  const total = deaths + rebirths
  const rebirthRate = total > 0 ? Math.round((rebirths / total) * 100) : 0

  const loading = !statistics || !active

  const toggleExpanded = () => setExpanded((v) => !v)

  const onScopeClick = (next: Scope) => (e: React.MouseEvent) => {
    e.stopPropagation() // don't collapse/expand when switching scope
    setScope(next)
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border-white/10 bg-black/40 shadow-xl backdrop-blur py-0 gap-0 px-4",
        "shadow-[0_0_50px_rgba(250,204,21,0.10)]",
        className
      )}
    >
      {/* tiny neon glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-yellow-400/10 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-24 right-6 h-56 w-56 rounded-full bg-yellow-300/8 blur-[75px]" />

      {/* Click-to-expand header (always small) */}
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

              {/* scope toggle (small, shadcn-y) */}
              <span className="inline-flex items-center rounded-xl border border-yellow-400/15 bg-black/30 p-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onScopeClick("local")}
                  className={cn(
                    "h-5 rounded-lg px-2 text-[11px] leading-none",
                    scope === "local"
                      ? "bg-yellow-400/15 text-yellow-200 hover:bg-yellow-400/20"
                      : "text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                  )}
                  aria-pressed={scope === "local"}
                >
                  Local
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onScopeClick("global")}
                  className={cn(
                    "h-5 rounded-lg px-2 text-[11px] leading-none",
                    scope === "global"
                      ? "bg-yellow-400/15 text-yellow-200 hover:bg-yellow-400/20"
                      : "text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                  )}
                  aria-pressed={scope === "global"}
                >
                  Global
                </Button>
              </span>
            </div>

            {/* secondary line only when collapsed */}
            {!expanded && !loading && (
              <div className="mt-0.5 truncate text-[11px] text-zinc-400">
                {deaths.toLocaleString()} deaths • {rebirths.toLocaleString()} rebirths
              </div>
            )}
            {!expanded && loading && (
              <div className="mt-0.5 truncate text-[11px] text-zinc-500">Loading stats…</div>
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Separator className="bg-yellow-400/10" />

          <div className="grid gap-2 p-2.5">
            <StatRow icon={Skull} label="Deaths" value={deaths} />
            <StatRow icon={Sparkles} label="Rebirths" value={rebirths} />

            <div className="rounded-xl border border-yellow-400/15 bg-black/30 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Rebirth rate</span>
                <Badge
                  variant="outline"
                  className="h-5 border-yellow-400/25 bg-yellow-400/10 px-2 text-[11px] text-yellow-200"
                  title="Rebirths / (Deaths + Rebirths)"
                >
                  {rebirthRate}%
                </Badge>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-900/70">
                <div
                  className="h-full rounded-full bg-yellow-400/70 shadow-[0_0_18px_rgba(250,204,21,0.30)]"
                  style={{ width: `${rebirthRate}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Total events</span>
                <span className="tabular-nums">{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[11px] text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(false)
                }}
              >
                Collapse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}