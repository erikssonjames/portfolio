"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Github } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type ProjectType = {
  title: string
  description: string
  metric: {
    label: string
    value: string
  }
  tags: string[]
  healthCheckUrl?: string
  repoUrl: string
  liveUrl?: string
  status: "DONE" | "IN_PRODUCTION" | "UNAVAILABLE"
}

interface ProjectProps {
  project: ProjectType
}

type HealthState = "CHECKING" | "HEALTHY" | "DEGRADED" | "DOWN" | "UNKNOWN"

function statusBadgeStyle(status: ProjectType["status"]) {
  switch (status) {
    case "DONE":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    case "IN_PRODUCTION":
      return "border-yellow-400/30 bg-yellow-400/10 text-yellow-200"
    case "UNAVAILABLE":
      return "border-red-400/30 bg-red-400/10 text-red-200"
  }
}

function healthBadgeStyle(health: HealthState) {
  switch (health) {
    case "HEALTHY":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
    case "DEGRADED":
      return "border-yellow-400/30 bg-yellow-400/10 text-yellow-200"
    case "DOWN":
      return "border-red-400/30 bg-red-400/10 text-red-200"
    case "CHECKING":
      return "border-white/15 bg-black/30 text-zinc-300"
    case "UNKNOWN":
    default:
      return "border-white/15 bg-black/30 text-zinc-300"
  }
}

function healthLabel(health: HealthState) {
  switch (health) {
    case "HEALTHY":
      return "Healthy"
    case "DEGRADED":
      return "Degraded"
    case "DOWN":
      return "Down"
    case "CHECKING":
      return "Checking…"
    default:
      return "Unknown"
  }
}

function dotClass(health: HealthState) {
  switch (health) {
    case "HEALTHY":
      return "bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.55)]"
    case "DEGRADED":
      return "bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.55)]"
    case "DOWN":
      return "bg-red-300 shadow-[0_0_16px_rgba(252,165,165,0.55)]"
    case "CHECKING":
      return "bg-zinc-400"
    default:
      return "bg-zinc-500"
  }
}

/**
 * Heuristic parsing:
 * - If health endpoint returns JSON with { status: "ok" | "pass" | "healthy" }, treat as HEALTHY
 * - If { status: "warn" | "degraded" }, treat as DEGRADED
 * - If { status: "fail" | "down" }, treat as DOWN
 * - Otherwise: any 2xx => HEALTHY, non-2xx/throw => DOWN
 */
async function checkHealth(url: string): Promise<HealthState> {
  try {
    const finalUrl = `/api/healthcheck?url=${encodeURIComponent(url)}`
    const res = await fetch(finalUrl, {
      method: "GET",
      cache: "no-store",
      // If your health check needs credentials/cookies, change to "include"
      credentials: "omit",
      headers: { Accept: "application/json, text/plain, */*" },
    })

    if (!res.ok) return "DOWN"

    const data = await res.json()

    if (!data.ok) return "DOWN";

    return "HEALTHY"
  } catch {
    return "DOWN"
  }
}

export function ProjectCard({
  project: { description, metric, repoUrl, tags, title, healthCheckUrl, liveUrl, status },
}: ProjectProps) {
  const [health, setHealth] = React.useState<HealthState>(() =>
    healthCheckUrl ? "CHECKING" : "UNKNOWN"
  )

  React.useEffect(() => {
    let cancelled = false
    if (!healthCheckUrl) {
      setHealth("UNKNOWN")
      return
    }

    const run = async () => {
      setHealth("CHECKING")
      const next = await checkHealth(healthCheckUrl)
      if (!cancelled) setHealth(next)
    }

    run()

    // Optional: keep it fresh every 30s while mounted
    const id = window.setInterval(run, 30_000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [healthCheckUrl])

  const liveDisabled = !liveUrl || status === "UNAVAILABLE"

  return (
    <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_34px_rgba(250,204,21,0.10)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[70px]" />
      </div>

      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate text-lg">{title}</CardTitle>

            {/* Project status + health status */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("h-5 px-2 text-[11px]", statusBadgeStyle(status))}>
                {status === "DONE" ? "Done" : status === "IN_PRODUCTION" ? "In production" : "Unavailable"}
              </Badge>

              <Badge
                variant="outline"
                className={cn("h-5 px-2 text-[11px]", healthBadgeStyle(health))}
                title={healthCheckUrl ? `Health check: ${healthCheckUrl}` : "No health check configured"}
              >
                <span className={cn("mr-1 inline-block h-2 w-2 rounded-full", dotClass(health))} />
                {healthLabel(health)}
              </Badge>

              {healthCheckUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-5 px-2 text-[11px] text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                  onClick={() => {
                    // manual re-check
                    setHealth("CHECKING")
                    checkHealth(healthCheckUrl).then(setHealth)
                  }}
                >
                  Recheck
                </Button>
              )}
            </div>
          </div>

          <Badge variant="outline" className="border-yellow-400/25 bg-black/30 text-zinc-200">
            {metric.label}: <span className="ml-1 text-yellow-200">{metric.value}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <p className="text-sm leading-relaxed text-zinc-300">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="relative flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={liveDisabled}
          className={cn(
            "border-yellow-400/35 bg-black/30 text-yellow-100 hover:bg-yellow-400/10",
            liveDisabled && "opacity-60"
          )}
          asChild={!liveDisabled}
        >
          {liveDisabled ? (
            <span className="inline-flex items-center">
              Live
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </span>
          ) : (
            <a href={liveUrl} target="_blank" rel="noreferrer">
              Live
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
          asChild
        >
          <Link href={repoUrl} target="_blank" aria-label={`${title} repository`} rel="noreferrer">
            <Github className="h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}