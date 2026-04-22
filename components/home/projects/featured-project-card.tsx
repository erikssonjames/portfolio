"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Globe, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ProjectType } from "./project-data"
import { StackIcons } from "./stack-icons"

function thumbUrl(url?: string) {
  if (!url) return ""
  return `https://image.thum.io/get/width/1200/noanimate/${url.trim()}`
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
      return "Checking..."
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

    const data = await res.json()

    if (!data.ok) return "DOWN"

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
  const screenshot = thumbUrl(project.liveUrl)

  return (
    <Card
      className={cn(
        "group relative mb-8 overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_44px_rgba(250,204,21,0.14)] transition hover:-translate-y-0.5 hover:border-yellow-300/35 hover:shadow-[0_0_52px_rgba(250,204,21,0.18)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/12 blur-[75px]" />
        <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[85px]" />
      </div>

      <CardContent className="relative z-10 p-6 sm:p-8">
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

              <StackIcons stack={project.stack} className="flex flex-wrap items-center gap-2" />
            </div>

            <Link
              href={`/projects/${project.slug}`}
              aria-label={`Open ${project.title} case study`}
            >
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold text-zinc-100">{project.title}</h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-zinc-500 transition group-hover:text-yellow-200" />
              </div>
            </Link>

            <p className="mt-2 text-zinc-300">{project.description}</p>

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

              {project.repoUrl ? (
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
              ) : null}
            </div>
          </div>

          <div className="w-full md:w-90">
            <div className="rounded-2xl border border-yellow-400/15 bg-black/40 p-3 shadow-[inset_0_0_22px_rgba(250,204,21,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.65)]" />
                  <span className="text-xs text-zinc-400">preview</span>
                </div>

                <Badge variant="outline" className={cn("flex h-5 items-center gap-1 px-2 text-[11px]", healthBadgeStyle(health))}>
                  <span className={cn("inline-block h-2 w-2 rounded-full", dotClass(health))} />
                  {healthLabel(health)}
                  {project.healthCheckUrl ? (
                    <button
                      type="button"
                      aria-label="Recheck health status"
                      className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-current/80 transition hover:bg-black/20 hover:text-current"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setHealth("CHECKING")
                        checkHealth(project.healthCheckUrl!).then(setHealth)
                      }}
                    >
                      <RotateCw className={cn("h-3 w-3", health === "CHECKING" && "animate-spin")} />
                    </button>
                  ) : null}
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

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-yellow-400/10 via-transparent to-transparent" />
                </div>
              </div>

              {project.liveUrl ? (
                <div className="mt-3 flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px] text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Open <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
