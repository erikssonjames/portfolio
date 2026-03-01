import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight } from "lucide-react"
import { ProjectCard, ProjectType } from "./project-card"
import { FeaturedProjectCard } from "./featured-project-card"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"

export const featuredProject: ProjectType = {
  title: "Gym Quest — Gamified Training Tracker",
  description:
    "A social, game-like workout tracker that turns gym progress into quests, streaks, and shared milestones—making consistency feel fun.",
  tags: ["Next.js", "Supabase", "shadcn/ui"],
  liveUrl: "https://gym-quest-phi.vercel.app/",
  repoUrl: "https://github.com/erikssonjames/gym-quest",
  metric: {
    label: "Impact",
    value: "+38% retention"
  },
  healthCheckUrl: "https://gym-quest-phi.vercel.app/",
  status: "IN_PRODUCTION"
}

export const projects: Array<ProjectType> = [
  {
    title: "Arts & Crafts — Clay Art Storefront",
    description:
      "A fast, minimalist e-commerce site for handcrafted clay artwork—smooth browsing, simple checkout, and reliable order emails.",
    tags: ["Next.js", "Shopify", "Resend"],
    liveUrl: "https://arts-and-crafts-website.vercel.app/",
    repoUrl: "https://github.com/erikssonjames/arts-and-crafts-website",
    metric: {
      label: "Latency",
      value: "<120ms"
    },
    healthCheckUrl: "https://arts-and-crafts-website.vercel.app/",
    status: "IN_PRODUCTION"
  },
  {
    title: "Portfolio v1 — Motion-First Personal Site",
    description:
      "A neon-accented portfolio with crisp typography, Framer Motion interactions, and obsessive performance tuning for a snappy feel.",
    tags: ["Tailwind", "Next.js", "Framer"],
    liveUrl: "https://jameseriksson.com/",
    repoUrl: "https://github.com/erikssonjames/portfolio",
    metric: {
      label: "Lighthouse",
      value: "100"
    },
    healthCheckUrl: "https://jameseriksson.com/",
    status: "IN_PRODUCTION"
  }
]

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden text-zinc-100">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <GameOfLifeGrid />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-yellow-400/45 bg-yellow-400/10 text-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.18)]"
              >
                Projects
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
              >
                Selected work
              </Badge>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Things I’ve built
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-300">
              A few projects spanning UI engineering, design systems, and product features.
            </p>
          </div>
        </div>

        {/* Featured project */}
        <FeaturedProjectCard project={featuredProject} />

        <Separator className="mb-8 bg-yellow-400/15" />

        {/* Project grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {projects
            .map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
        </div>
      </div>
    </section>
  )
}