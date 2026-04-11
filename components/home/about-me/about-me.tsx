import { Code2, Sparkles, Zap } from "lucide-react"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { ResumeDownloadButton } from "@/components/resume-download-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function AboutMe() {
  const highlights = [
    {
      icon: Zap,
      title: "Delivery + quality",
      desc: "Fast iterations with a high bar for maintainability, performance, and accessibility.",
    },
    {
      icon: Code2,
      title: "Architecture-minded",
      desc: "KPI-driven decisions, clean patterns, and system design that scales across teams.",
    },
    {
      icon: Sparkles,
      title: "Frontend depth",
      desc: "Years of UI experience with strong typography, component systems, and polished interaction details.",
    },
  ]

  const stack = [
    "Java",
    "Spring Boot",
    "Architecture & KPIs",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
  ]

  return (
    <section id="about" className="relative overflow-hidden text-zinc-100">
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
                  About
                </Badge>
              </MotionReveal>

              <MotionReveal variants={revealItemVariants}>
                <Badge
                  variant="secondary"
                  className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                >
                  Backend - Frontend - Architecture
                </Badge>
              </MotionReveal>
            </MotionStagger>

            <MotionReveal delay={0.08}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A little about me
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="mt-2 max-w-2xl text-zinc-300">
                I&apos;m a consultant at Netcompany, working mainly with{" "}
                <span className="text-yellow-200">Java Spring Boot</span> and{" "}
                <span className="text-yellow-200">KPI and architectural design</span>. I also
                have an extensive frontend background, so I&apos;m comfortable owning work end-to-end,
                from system decisions to the UI polish that users actually feel.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.18}>
            <ResumeDownloadButton
              variant="outline"
              className="border-yellow-400/35 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.18)] hover:bg-yellow-400/10"
            />
          </MotionReveal>
        </MotionReveal>

        <div className="grid gap-8 lg:grid-cols-12">
          <MotionReveal className="lg:col-span-7">
            <Card className="border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <CardHeader>
                <CardTitle>Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-300">
                <MotionReveal variants={revealItemVariants}>
                  <p className="leading-relaxed">
                    Today I build backend services and platform features in{" "}
                    <span className="text-yellow-200">Java/Spring Boot</span>, with a focus on{" "}
                    <span className="text-yellow-200">architecture</span> and{" "}
                    <span className="text-yellow-200">measurable outcomes</span> like KPIs,
                    performance, and reliability. I like making tradeoffs explicit and keeping
                    solutions pragmatic.
                  </p>
                </MotionReveal>

                <MotionReveal variants={revealItemVariants}>
                  <p className="leading-relaxed">
                    Alongside that, I bring strong frontend experience, designing and implementing
                    component systems, building clean interfaces, and refining the interaction details
                    that make products feel fast and intentional.
                  </p>
                </MotionReveal>

                <MotionReveal variants={revealItemVariants}>
                  <p className="leading-relaxed">
                    I enjoy collaborating across product, design, and engineering, translating goals
                    into a scalable system and a UI that&apos;s easy to use and easy to maintain.
                  </p>
                </MotionReveal>

                <MotionReveal variants={revealItemVariants}>
                  <Separator className="bg-yellow-400/15" />
                </MotionReveal>

                <MotionStagger>
                  <MotionReveal variants={revealItemVariants}>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">Current focus & stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stack.map((item) => (
                          <MotionReveal key={item} variants={revealItemVariants}>
                            <Badge
                              variant="outline"
                              className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                            >
                              {item}
                            </Badge>
                          </MotionReveal>
                        ))}
                      </div>
                    </div>
                  </MotionReveal>
                </MotionStagger>

                <MotionReveal variants={revealItemVariants}>
                  <div className="rounded-xl border border-yellow-400/15 bg-black/30 p-4 shadow-[inset_0_0_18px_rgba(250,204,21,0.08)]">
                    <p className="text-sm font-medium text-zinc-200">What I&apos;m looking for</p>
                    <p className="mt-1 text-sm text-zinc-300">
                      Projects where I can shape architecture, ship real features, and leverage my
                      frontend background to deliver a polished user experience without sacrificing
                      code quality and long-term maintainability.
                    </p>
                  </div>
                </MotionReveal>
              </CardContent>
            </Card>
          </MotionReveal>

          <MotionStagger className="lg:col-span-5 grid gap-4">
            {highlights.map((highlight) => {
              const Icon = highlight.icon

              return (
                <MotionReveal key={highlight.title} variants={revealItemVariants}>
                  <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.10)]">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[70px]" />
                    </div>

                    <CardContent className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl border border-yellow-400/25 bg-black/30 p-3 shadow-[0_0_22px_rgba(250,204,21,0.12)]">
                          <Icon className="h-5 w-5 text-yellow-200" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-zinc-100">{highlight.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                            {highlight.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionReveal>
              )
            })}
          </MotionStagger>
        </div>
      </div>
    </section>
  )
}
