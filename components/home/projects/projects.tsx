import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, Github, Globe } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Neon Dashboard",
      desc: "A high-contrast analytics UI with glowing accents, responsive charts, and snappy UX.",
      tags: ["Next.js", "TypeScript", "shadcn/ui"],
      href: "#",
      repo: "#",
      featured: true,
      metricLabel: "Impact",
      metricValue: "+38% retention",
    },
    {
      title: "Design System Kit",
      desc: "Reusable components, tokens, and docs for consistent product velocity across teams.",
      tags: ["React", "Tokens", "Storybook"],
      href: "#",
      repo: "#",
      featured: false,
      metricLabel: "Outcome",
      metricValue: "2× ship speed",
    },
    {
      title: "Portfolio v1",
      desc: "Neon/shadow/yellow personal site with motion, performance tuning, and clean typography.",
      tags: ["Tailwind", "Motion", "A11y"],
      href: "#",
      repo: "#",
      featured: false,
      metricLabel: "Score",
      metricValue: "Lighthouse 100",
    },
    {
      title: "Realtime Collab",
      desc: "Presence, comments, and real-time updates with careful loading states and fallbacks.",
      tags: ["WebSockets", "UX", "State"],
      href: "#",
      repo: "#",
      featured: false,
      metricLabel: "Latency",
      metricValue: "<120ms",
    },
  ]

  return (
    <section id="projects" className="relative overflow-hidden text-zinc-100">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,204,21,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.10) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
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
              Swap these for your real work—titles, links, and results.
            </p>
          </div>

          <Button
            variant="outline"
            className="border-yellow-400/35 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.18)] hover:bg-yellow-400/10"
          >
            View all
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Featured project */}
        <Card className="relative mb-8 overflow-hidden border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_44px_rgba(250,204,21,0.14)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/12 blur-[75px]" />
            <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[85px]" />
          </div>

          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-yellow-400 text-black">Featured</Badge>
                  <Badge
                    variant="outline"
                    className="border-yellow-400/25 bg-black/30 text-zinc-200"
                  >
                    {projects.find((p) => p.featured)?.metricLabel}:{" "}
                    <span className="ml-1 text-yellow-200">
                      {projects.find((p) => p.featured)?.metricValue}
                    </span>
                  </Badge>
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-zinc-100">
                  {projects.find((p) => p.featured)?.title}
                </h3>
                <p className="mt-2 text-zinc-300">
                  {projects.find((p) => p.featured)?.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {projects
                    .find((p) => p.featured)
                    ?.tags.map((t) => (
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
                    className="group relative bg-yellow-400 text-black shadow-[0_0_28px_rgba(250,204,21,0.35)] hover:bg-yellow-300"
                    asChild
                  >
                    <a href={projects.find((p) => p.featured)?.href} target="_blank" rel="noreferrer">
                      Live demo
                      <Globe className="ml-2 h-4 w-4" />
                      <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-yellow-400/20 blur-lg" />
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-400/35 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.18)] hover:bg-yellow-400/10"
                    asChild
                  >
                    <a href={projects.find((p) => p.featured)?.repo} target="_blank" rel="noreferrer">
                      View code
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Fake preview block */}
              <div className="w-full md:w-90">
                <div className="rounded-2xl border border-yellow-400/15 bg-black/40 p-4 shadow-[inset_0_0_22px_rgba(250,204,21,0.08)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.65)]" />
                    <span className="text-xs text-zinc-400">preview</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-10 rounded-xl bg-zinc-900/70" />
                    <div className="h-24 rounded-xl bg-zinc-900/50" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 rounded-xl bg-zinc-900/60" />
                      <div className="h-16 rounded-xl bg-zinc-900/60" />
                    </div>
                    <div className="h-10 rounded-xl bg-yellow-400/15 shadow-[0_0_22px_rgba(250,204,21,0.10)]" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="mb-8 bg-yellow-400/15" />

        {/* Project grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {projects
            .filter((p) => !p.featured)
            .map((p) => (
              <Card
                key={p.title}
                className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_34px_rgba(250,204,21,0.10)]"
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[70px]" />
                </div>

                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="border-yellow-400/25 bg-black/30 text-zinc-200"
                    >
                      {p.metricLabel}: <span className="ml-1 text-yellow-200">{p.metricValue}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-sm leading-relaxed text-zinc-300">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
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
                    className="border-yellow-400/35 bg-black/30 text-yellow-100 hover:bg-yellow-400/10"
                    asChild
                  >
                    <a href={p.href} target="_blank" rel="noreferrer">
                      Live
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                    asChild
                  >
                    <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.title} repository`}>
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  )
}