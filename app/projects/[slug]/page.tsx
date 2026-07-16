import type { Metadata } from "next"
import Image from "next/image"
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
import { getProjectTechnologyGroups } from "@/components/home/projects/project-technology"
import { StackIcons, StackLogo } from "@/components/home/projects/stack-icons"

type PageProps = {
  params: Promise<{ slug: string }>
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
  return allProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  return project
    ? { title: `${project.title} | James Eriksson`, description: project.headline }
    : { title: "Project not found" }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  const technologyGroups = getProjectTechnologyGroups(project)

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

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-zinc-950/85 p-4 shadow-[0_0_60px_rgba(250,204,21,0.10)] sm:p-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-400/12 blur-[80px]" />
            <div className="absolute bottom-0 left-8 h-48 w-48 rounded-full bg-yellow-300/8 blur-[72px]" />
          </div>

          <div className="relative">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-yellow-400/15 bg-zinc-900">
              {project.previewImage ? (
                <Image
                  src={project.previewImage}
                  alt={`${project.title} project preview`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1152px"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-zinc-900 via-zinc-950 to-yellow-400/10 p-6 text-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-yellow-200/75">Project preview</p>
                    <p className="mt-2 text-sm text-zinc-400">A visual preview will be added here.</p>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="px-2 pb-2 pt-8 sm:px-4 sm:pt-10">
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
                    {project.repoUrl ? (
                      <Button asChild variant="outline" className="border-yellow-400/35 bg-black/30 text-yellow-100 hover:bg-yellow-400/10">
                        <a href={project.repoUrl} target="_blank" rel="noreferrer">
                          View repository
                          <Github className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <aside className="rounded-2xl border border-yellow-400/15 bg-black/30 p-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Stack at a glance</p>
                    <StackIcons stack={project.stack} className="mt-3 flex flex-wrap items-center gap-2" />
                    <p className="mt-3 text-xs leading-5 text-zinc-500">
                      Hover over a logo for a quick description. The full breakdown is below.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-yellow-400/15 bg-zinc-950/80 p-7 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Technology overview</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-semibold sm:text-3xl">What each part of the stack does</h2>
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              A practical overview of the tools used here and the job each one was chosen to do.
            </p>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {technologyGroups.map((group) => (
              <article key={group.label} className="rounded-xl border border-white/8 bg-black/20 p-5 sm:p-6">
                <div className="border-b border-white/8 pb-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{group.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{group.description}</p>
                </div>

                <div className="mt-4 grid gap-3">
                  {group.technologies.map((item) => (
                    <div key={item.name} className="flex items-start gap-3 border border-white/8 bg-zinc-950/45 p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-yellow-400/20 bg-black/30">
                        <StackLogo item={item.name} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-zinc-100">{item.name}</h4>
                        <p className="mt-1 text-sm leading-6 text-zinc-400">{item.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <Link href="/#projects" className="inline-flex items-center text-sm text-zinc-400 transition hover:text-yellow-200">
            See all projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
