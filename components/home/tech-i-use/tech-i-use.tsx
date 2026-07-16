import { Braces, Database, LayoutTemplate, ServerCog, Sparkles } from "lucide-react"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { ResumeActionGroup } from "@/components/resume-actions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const techGroups = [
  {
    icon: ServerCog,
    title: "Backend & architecture",
    description: "Services, API design, platform thinking, and pragmatic system decisions.",
    items: [
      "Java",
      "Spring Boot",
      "Python",
      "RabbitMQ",
      "REST APIs",
      "Architecture",
      "KPIs",
      "Reliability",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Solution delivery",
    description: "Tools I use to turn requirements into maintainable applications and complete working flows.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "APIs",
      "Integration",
      "Implementation",
    ],
  },
  {
    icon: Database,
    title: "Data & operations",
    description: "Systems and services that support reliable delivery, business workflows, and product outcomes.",
    items: [
      "Supabase",
      "Postgres",
      "NoSQL",
      "Strapi",
      "Jest",
      "Cypress",
      "Shopify",
      "Resend",
      "Reliability",
      "Business Flows",
    ],
  },
]

export function TechIUse() {
  return (
    <section id="tech" className="relative overflow-hidden text-zinc-100">
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
                  Tech
                </Badge>
              </MotionReveal>
              <MotionReveal variants={revealItemVariants}>
                <Badge
                  variant="secondary"
                  className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                >
                  What I use
                </Badge>
              </MotionReveal>
            </MotionStagger>

            <MotionReveal delay={0.08}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Tech I use
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="mt-2 max-w-2xl text-zinc-300">
                The stack changes with the project, but these are the tools and systems I use most
                in my work and personal projects.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.18}>
            <ResumeActionGroup
              className="flex flex-col gap-3 sm:flex-row"
              viewClassName="bg-zinc-100 text-black hover:bg-white"
              downloadClassName="border-yellow-400/35 bg-black/30 text-yellow-100 hover:bg-yellow-400/10"
            />
          </MotionReveal>
        </MotionReveal>

        <MotionStagger className="grid gap-5 lg:grid-cols-3">
          {techGroups.map((group) => {
            const Icon = group.icon

            return (
              <MotionReveal key={group.title} variants={revealItemVariants}>
                <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/50 shadow-[0_0_36px_rgba(250,204,21,0.10)]">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[72px]" />
                  </div>

                  <CardHeader className="relative">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-yellow-400/25 bg-black/30 p-3 shadow-[0_0_22px_rgba(250,204,21,0.12)]">
                        <Icon className="h-5 w-5 text-yellow-200" />
                      </div>
                      <div>
                        <CardTitle>{group.title}</CardTitle>
                        <p className="mt-1 text-sm text-zinc-400">{group.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionReveal>
            )
          })}
        </MotionStagger>

        <MotionReveal delay={0.2} className="mt-8">
          <Card className="border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_30px_rgba(250,204,21,0.10)]">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-yellow-200">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">How I use them</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  I care less about collecting logos and more about choosing a stack that keeps the
                  product understandable, fast to iterate on, and easy to maintain as it grows.
                </p>
              </div>

                <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Braces className="h-4 w-4" />
                  <span>Use the right tool for the job</span>
              </div>
            </CardContent>
          </Card>
        </MotionReveal>
      </div>
    </section>
  )
}
