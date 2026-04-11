import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  allProjects,
  getProjectBySlug,
  type ProjectType,
} from "@/components/home/projects/project-data"
import { StackIcons } from "@/components/home/projects/stack-icons"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function statusLabel(status: ProjectType["status"]) {
  switch (status) {
    case "DONE":
      return "Done"
    case "IN_PRODUCTION":
      return "In production"
    case "UNAVAILABLE":
      return "Unavailable"
  }
}

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

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project not found",
    }
  }

  return {
    title: `${project.title} | James Eriksson`,
    description: project.headline,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-zinc-950/85 p-8 shadow-[0_0_60px_rgba(250,204,21,0.10)] sm:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-400/12 blur-[80px]" />
            <div className="absolute bottom-0 left-8 h-48 w-48 rounded-full bg-yellow-300/8 blur-[72px]" />
          </div>

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={statusBadgeStyle(project.status)}>
                {statusLabel(project.status)}
              </Badge>
              <StackIcons stack={project.stack} className="flex flex-wrap items-center gap-2" />
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-zinc-300">{project.headline}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <div>
                <p className="max-w-3xl text-base leading-8 text-zinc-300">{project.description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl ? (
                    <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300">
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Visit project
                        <Globe className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}

                  <Button
                    asChild
                    variant="outline"
                    className="border-yellow-400/35 bg-black/30 text-yellow-100 hover:bg-yellow-400/10"
                  >
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      View repository
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <aside className="rounded-2xl border border-yellow-400/15 bg-black/30 p-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Role</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{project.role}</p>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <article className="rounded-[1.75rem] border border-yellow-400/15 bg-zinc-950/80 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Planning</p>
            <h2 className="mt-3 text-2xl font-semibold">How the project was framed</h2>
            <div className="mt-6 space-y-4 text-zinc-300">
              {project.planning.map((item) => (
                <div key={item} className="rounded-2xl border border-white/6 bg-black/20 p-4 leading-7">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-yellow-400/15 bg-zinc-950/80 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Timeline</p>
            <h2 className="mt-3 text-2xl font-semibold">Build progression</h2>
            <div className="mt-6 space-y-5">
              {project.timeline.map((entry, index) => (
                <div key={entry.phase} className="relative rounded-2xl border border-white/6 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-sm text-yellow-200">
                      {index + 1}
                    </div>
                    <p className="text-lg font-medium">{entry.phase}</p>
                  </div>
                  <p className="text-sm leading-7 text-zinc-300">
                    <span className="text-zinc-100">Focus:</span> {entry.focus}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    <span className="text-zinc-100">Output:</span> {entry.output}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {project.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-yellow-400/15 bg-zinc-950/80 p-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Case study</p>
              <h2 className="mt-3 text-2xl font-semibold">{section.title}</h2>
              <div className="mt-6 space-y-4 text-zinc-300">
                {section.items.map((item) => (
                  <p key={item} className="leading-7">
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-yellow-400/15 bg-zinc-950/80 p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Next steps</p>
              <h2 className="mt-3 text-2xl font-semibold">Where this project can go next</h2>
            </div>

            <Link
              href="/#projects"
              className="inline-flex items-center text-sm text-zinc-400 transition hover:text-yellow-200"
            >
              See all projects
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {project.nextSteps.map((item) => (
              <div key={item} className="rounded-2xl border border-white/6 bg-black/20 p-4 text-sm leading-7 text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
