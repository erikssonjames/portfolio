import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"
import { getPublicEnv } from "@/config/env"
import { MotionReveal, MotionStagger, revealItemVariants } from "@/components/motion/reveal"
import { ResumeDownloadButton, ResumeViewButton } from "@/components/resume-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function Hero() {
  const { GITHUB_LINK, LINKED_IN_LINK } = getPublicEnv()

  return (
    <section className="relative min-h-screen overflow-hidden text-zinc-100">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <GameOfLifeGrid />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <MotionReveal className="lg:col-span-7">
            <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <CardContent>
                <MotionStagger className="flex flex-wrap items-center gap-2">
                  <MotionReveal variants={revealItemVariants}>
                    <Badge
                      variant="outline"
                      className="border-yellow-400/50 bg-yellow-400/10 text-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.25)]"
                    >
                      Open to new opportunities
                    </Badge>
                  </MotionReveal>

                  <MotionReveal variants={revealItemVariants}>
                    <Badge
                      variant="secondary"
                      className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                    >
                      Customer-first - End-to-end - Outcome-driven
                    </Badge>
                  </MotionReveal>
                </MotionStagger>

                <MotionReveal delay={0.08}>
                  <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    I deliver{" "}
                    <span className="relative">
                      <span className="bg-linear-to-b from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                        practical
                      </span>
                      <span className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-yellow-400/10 blur-md" />
                    </span>{" "}
                    solutions with{" "}
                    <span className="bg-linear-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                      customer focus
                    </span>
                    .
                  </h1>
                </MotionReveal>

                <MotionReveal delay={0.14}>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                    Fullstack consultant focused on understanding customer needs, shaping the right
                    solution, and delivering reliable systems from architecture and backend to the
                    final product experience.
                  </p>
                </MotionReveal>

                <MotionStagger className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <MotionReveal variants={revealItemVariants}>
                    <Button
                      size="lg"
                      scrollToId="projects"
                      className="group relative bg-yellow-400 text-black shadow-[0_0_28px_rgba(250,204,21,0.35)] hover:bg-yellow-300"
                    >
                      View projects
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-yellow-400/20 blur-lg" />
                    </Button>
                  </MotionReveal>

                  <MotionReveal variants={revealItemVariants}>
                    <Button
                      size="lg"
                      variant="outline"
                      scrollToId="contact"
                      className="border-yellow-400/40 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.20)] hover:bg-yellow-400/10"
                    >
                      Get in touch
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </MotionReveal>

                  <MotionStagger className="flex items-center gap-2 sm:ml-2">
                    <MotionReveal variants={revealItemVariants}>
                      <Link href={GITHUB_LINK} target="_blank">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                          aria-label="GitHub"
                        >
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                    </MotionReveal>

                    <MotionReveal variants={revealItemVariants}>
                      <Link href={LINKED_IN_LINK} target="_blank">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Button>
                      </Link>
                    </MotionReveal>
                  </MotionStagger>
                </MotionStagger>

                <MotionStagger className="mt-10 max-w-xl">
                  <MotionReveal variants={revealItemVariants}>
                    <Separator className="bg-yellow-400/15" />
                  </MotionReveal>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Customer Needs", "Architecture", "Backend", "Delivery", "Product Thinking"].map((item) => (
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
                </MotionStagger>
              </CardContent>
            </Card>
          </MotionReveal>

          <MotionReveal className="lg:col-span-5" delay={0.12}>
            <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-400/15 blur-[60px]" />
                <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[70px]" />
              </div>

              <CardContent className="relative p-6 sm:p-8">
                <MotionReveal delay={0.05}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-yellow-200/80">
                        Why I could be a strong hire
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                        Solution ownership from problem to delivery
                      </h2>
                    </div>
                    <Badge className="bg-yellow-400 text-black">Now</Badge>
                  </div>
                </MotionReveal>

                <MotionReveal delay={0.12}>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    I work best where technical decisions need to stay grounded in real customer
                    needs. The goal is to ship the full solution clearly and responsibly, not just
                    one polished layer of it.
                  </p>
                </MotionReveal>

                <MotionStagger className="mt-7 grid gap-3">
                  <MotionReveal variants={revealItemVariants}>
                    <div className="grid gap-3 rounded-2xl border border-yellow-400/15 bg-black/25 p-4 sm:grid-cols-3">
                      {[
                        { label: "Focus", value: "Customer value" },
                        { label: "Strength", value: "Full-solution delivery" },
                        { label: "Mode", value: "Pragmatic execution" },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                          <p className="mt-1 text-sm font-medium text-zinc-100">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </MotionReveal>

                  <MotionReveal variants={revealItemVariants}>
                    <div className="flex items-center justify-between rounded-2xl border border-yellow-400/15 bg-black/25 px-4 py-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Current focus</p>
                        <p className="mt-1 text-sm text-zinc-200">
                          Helping teams define the right solution, align technical choices with
                          customer outcomes, and deliver work end to end.
                        </p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.7)]" />
                    </div>
                  </MotionReveal>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <MotionReveal variants={revealItemVariants}>
                      <ResumeViewButton
                        className="w-full bg-zinc-100 text-black hover:bg-white"
                      />
                    </MotionReveal>

                    <MotionReveal variants={revealItemVariants}>
                      <ResumeDownloadButton
                        className="w-full border-yellow-400/30 bg-transparent text-yellow-100 hover:bg-yellow-400/10"
                      />
                    </MotionReveal>
                  </div>
                </MotionStagger>
              </CardContent>
            </Card>
          </MotionReveal>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-30%); opacity: 0; }
          10% { opacity: .35; }
          50% { opacity: .22; }
          90% { opacity: .35; }
          100% { transform: translateY(30%); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
