import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FeaturedProjectCard } from "./featured-project-card"
import { featuredProject, projects } from "./project-data"
import { ProjectCard } from "./project-card"

export function Projects() {
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
                A few projects spanning UI engineering, design systems, and product features.
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

        <MotionStagger className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <MotionReveal key={project.slug} variants={revealItemVariants}>
              <ProjectCard project={project} />
            </MotionReveal>
          ))}
        </MotionStagger>
      </div>
    </section>
  )
}
