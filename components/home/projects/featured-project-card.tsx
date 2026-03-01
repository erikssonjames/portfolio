"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Github, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectType } from "./project-card"
import Image from "next/image"

function thumbUrl(url?: string) {
    if (!url) return ""
    const cleaned = url.trim()
    return `https://image.thum.io/get/width/1200/noanimate/${cleaned}`
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

async function checkHealth(url: string): Promise<HealthState> {
  try {
    const finalUrl = `/api/healthcheck?url=${encodeURIComponent(url)}`
    const res = await fetch(finalUrl, {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
      headers: { Accept: "application/json, text/plain, */*" },
    })

    if (!res.ok) return "DOWN"

    const data = await res.json();

    if (!data.ok) return "DOWN";

    return "HEALTHY"
  } catch {
    return "DOWN"
  }
}

export function FeaturedProjectCard({
  project,
  className,
}: {
  project: ProjectType
  className?: string
}) {
  const [health, setHealth] = React.useState<HealthState>(() =>
    project.healthCheckUrl ? "CHECKING" : "UNKNOWN"
  )

  React.useEffect(() => {
    let cancelled = false

    if (!project.healthCheckUrl) {
      setHealth("UNKNOWN")
      return
    }

    const run = async () => {
      setHealth("CHECKING")
      const next = await checkHealth(project.healthCheckUrl!)
      if (!cancelled) setHealth(next)
    }

    run()
    const id = window.setInterval(run, 30_000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [project.healthCheckUrl])

  const liveDisabled = !project.liveUrl || project.status === "UNAVAILABLE"

  const previewTarget = project.liveUrl
  const screenshot = thumbUrl(previewTarget)

  return (
    <Card
      className={cn(
        "relative mb-8 overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_44px_rgba(250,204,21,0.14)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/12 blur-[75px]" />
        <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[85px]" />
      </div>

      <CardContent className="relative p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-yellow-400 text-black">Featured</Badge>

              <Badge variant="outline" className={cn("border bg-black/30", statusBadgeStyle(project.status))}>
                {project.status === "DONE"
                  ? "Done"
                  : project.status === "IN_PRODUCTION"
                    ? "In production"
                    : "Unavailable"}
              </Badge>

              <Badge variant="outline" className="border-yellow-400/25 bg-black/30 text-zinc-200">
                {project.metric.label}:{" "}
                <span className="ml-1 text-yellow-200">{project.metric.value}</span>
              </Badge>
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-zinc-100">{project.title}</h3>
            <p className="mt-2 text-zinc-300">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                disabled={liveDisabled}
                className={cn(
                  "group relative bg-yellow-400 text-black shadow-[0_0_28px_rgba(250,204,21,0.35)] hover:bg-yellow-300",
                  liveDisabled && "opacity-60"
                )}
                asChild={!liveDisabled}
              >
                {liveDisabled ? (
                  <span className="inline-flex items-center">
                    Live demo
                    <Globe className="ml-2 h-4 w-4" />
                    <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-yellow-400/20 blur-lg" />
                  </span>
                ) : (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo
                    <Globe className="ml-2 h-4 w-4" />
                    <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-yellow-400/20 blur-lg" />
                  </a>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-yellow-400/35 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.18)] hover:bg-yellow-400/10"
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noreferrer">
                  View code
                  <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Fake preview block */}
          <div className="w-full md:w-90">
            <div className="rounded-2xl border border-yellow-400/15 bg-black/40 p-3 shadow-[inset_0_0_22px_rgba(250,204,21,0.08)]">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.65)]" />
                    <span className="text-xs text-zinc-400">preview</span>
                </div>

                <Badge variant="outline" className={cn("h-5 px-2 text-[11px]", healthBadgeStyle(health))}>
                    <span className={cn("mr-1 inline-block h-2 w-2 rounded-full", dotClass(health))} />
                    {healthLabel(health)}
                </Badge>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-yellow-400/10">
                <div className="relative aspect-16/10 w-full bg-zinc-900/60">
                    {screenshot ? (
                    <Image
                        src={screenshot}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                        priority
                    />
                    ) : (
                    <div className="absolute inset-0 grid place-items-center">
                        <span className="text-xs text-zinc-500">No preview url</span>
                    </div>
                    )}

                    {/* subtle neon overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-yellow-400/10 via-transparent to-transparent" />
                </div>
                </div>

                {previewTarget && (
                <div className="mt-3 flex justify-end">
                    <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px] text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                    asChild
                    >
                    <a href={previewTarget} target="_blank" rel="noreferrer">
                        Open <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                    </Button>
                </div>
                )}
            </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}