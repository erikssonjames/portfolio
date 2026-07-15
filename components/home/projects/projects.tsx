"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FeaturedProjectCard } from "./featured-project-card"
import { featuredProject, projects } from "./project-data"
import { ProjectCard } from "./project-card"

const PROJECTS_PER_PAGE = 4
const technologyOptions = Array.from(new Set(projects.flatMap((project) => project.stack))).sort()

export function Projects() {
  const [search, setSearch] = React.useState("")
  const [technology, setTechnology] = React.useState("all")
  const [page, setPage] = React.useState(1)

  const filteredProjects = React.useMemo(() => {
    const query = search.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesName = !query || project.title.toLowerCase().includes(query)
      const matchesTechnology = technology === "all" || project.stack.includes(technology as typeof project.stack[number])

      return matchesName && matchesTechnology
    })
  }, [search, technology])

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE))
  const visiblePage = Math.min(page, pageCount)
  const visibleProjects = filteredProjects.slice(
    (visiblePage - 1) * PROJECTS_PER_PAGE,
    visiblePage * PROJECTS_PER_PAGE
  )

  React.useEffect(() => {
    setPage(1)
  }, [search, technology])

  return (
    <section id="projects" className="relative overflow-hidden text-zinc-100">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <GameOfLifeGrid />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <MotionReveal className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <MotionStagger className="flex flex-wrap items-center gap-2">
              <MotionReveal variants={revealItemVariants}>
                <Badge
                  variant="outline"
                  className="border-yellow-400/45 bg-yellow-400/10 text-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.18)]"
                >
                  Projects
                </Badge>
              </MotionReveal>

              <MotionReveal variants={revealItemVariants}>
                <Badge
                  variant="secondary"
                  className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                >
                  Selected work
                </Badge>
              </MotionReveal>
            </MotionStagger>

            <MotionReveal delay={0.08}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Things I&apos;ve built
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="mt-2 max-w-2xl text-zinc-300">
                A few projects showing how I work from problem framing and stakeholder needs to
                implementation and delivered outcomes.
              </p>
            </MotionReveal>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <FeaturedProjectCard project={featuredProject} />
        </MotionReveal>

        <MotionReveal delay={0.18}>
          <Separator className="mb-8 bg-yellow-400/15" />
        </MotionReveal>

        <MotionReveal delay={0.2}>
          <div className="mb-6 flex flex-col gap-3 border border-white/10 bg-black/25 p-3 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search smaller projects by name</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects by name"
                className="pl-9"
              />
            </label>

            <label className="sm:w-56">
              <span className="sr-only">Filter smaller projects by technology</span>
              <Select value={technology} onValueChange={setTechnology}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All technologies</SelectItem>
                  {technologyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>
        </MotionReveal>

        {visibleProjects.length ? (
          <MotionStagger className="grid gap-5 sm:grid-cols-2">
            {visibleProjects.map((project) => (
              <MotionReveal key={project.slug} variants={revealItemVariants}>
                <ProjectCard project={project} />
              </MotionReveal>
            ))}
          </MotionStagger>
        ) : (
          <div className="border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center">
            <p className="text-sm text-zinc-300">No smaller projects match those filters.</p>
            <Button
              variant="outline"
              className="mt-4 border-yellow-400/35 text-yellow-100 hover:bg-yellow-400/10"
              onClick={() => {
                setSearch("")
                setTechnology("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {pageCount > 1 ? (
          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-400" aria-live="polite">
              Showing {Math.min((visiblePage - 1) * PROJECTS_PER_PAGE + 1, filteredProjects.length)}–
              {Math.min(visiblePage * PROJECTS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Previous projects"
                disabled={visiblePage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft />
              </Button>
              <span className="min-w-16 text-center text-xs tabular-nums text-zinc-300">
                {visiblePage} / {pageCount}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Next projects"
                disabled={visiblePage === pageCount}
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
