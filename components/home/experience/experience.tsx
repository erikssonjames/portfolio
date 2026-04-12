import { BriefcaseBusiness, Building2, Layers3, Workflow } from "lucide-react"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { ResumeViewButton } from "@/components/resume-actions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const experienceItems = [
  {
    icon: Building2,
    label: "Current role",
    title: "Consultant at Netcompany",
    copy:
      "Working mainly with Java Spring Boot, backend services, KPI-driven decisions, and architecture-focused delivery.",
    tags: ["Java", "Spring Boot", "Architecture", "KPIs"],
  },
  {
    icon: Layers3,
    label: "Frontend depth",
    title: "Extensive UI engineering background",
    copy:
      "Designing and building polished interfaces, component systems, and interaction patterns that hold up in real products.",
    tags: ["React", "Next.js", "Design Systems", "Interaction Design"],
  },
  {
    icon: Workflow,
    label: "How I work",
    title: "End-to-end product ownership",
    copy:
      "Comfortable moving from system decisions to implementation details, making sure architecture and user experience support each other.",
    tags: ["Full-stack", "Product Thinking", "Delivery", "Maintainability"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden text-zinc-100">
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
                  Experience
                </Badge>
              </MotionReveal>
              <MotionReveal variants={revealItemVariants}>
                <Badge
                  variant="secondary"
                  className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                >
                  Backend + frontend delivery
                </Badge>
              </MotionReveal>
            </MotionStagger>

            <MotionReveal delay={0.08}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Experience
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="mt-2 max-w-2xl text-zinc-300">
                I work comfortably across architecture, backend implementation, and frontend
                execution, with a bias toward shipping clear, maintainable solutions.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.18}>
            <ResumeViewButton className="bg-zinc-100 text-black hover:bg-white" />
          </MotionReveal>
        </MotionReveal>

        <MotionStagger className="grid gap-5 lg:grid-cols-3">
          {experienceItems.map((item) => {
            const Icon = item.icon

            return (
              <MotionReveal key={item.title} variants={revealItemVariants}>
                <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/50 shadow-[0_0_36px_rgba(250,204,21,0.10)]">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[72px]" />
                  </div>

                  <CardHeader className="relative">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-yellow-400/25 bg-black/30 p-3 shadow-[0_0_22px_rgba(250,204,21,0.12)]">
                        <Icon className="h-5 w-5 text-yellow-200" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
                        <CardTitle className="mt-2">{item.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-sm leading-7 text-zinc-300">{item.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionReveal>
            )
          })}
        </MotionStagger>

        <MotionReveal delay={0.22} className="mt-8">
          <Card className="border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_30px_rgba(250,204,21,0.10)]">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-yellow-200">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <span className="text-sm font-medium">What that means in practice</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  I can contribute at the system level, implement the product itself, and still care
                  about the UX details that make the end result feel intentional.
                </p>
              </div>

              <ResumeViewButton className="bg-zinc-100 text-black hover:bg-white" />
            </CardContent>
          </Card>
        </MotionReveal>
      </div>
    </section>
  )
}
