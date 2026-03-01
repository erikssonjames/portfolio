import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { getPublicEnv } from "@/config/env"
import Link from "next/link"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"

export function Hero() {
  const { GITHUB_LINK, LINKED_IN_LINK } = getPublicEnv()

  return (
    <section className="relative min-h-screen overflow-hidden text-zinc-100">
      {/* Grid + scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <GameOfLifeGrid />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Main copy */}
          <div className="lg:col-span-7">
            <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
                <CardContent>
                    <div className="flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-yellow-400/50 bg-yellow-400/10 text-yellow-200 shadow-[0_0_18px_rgba(250,204,21,0.25)]"
                    >
                        Available for work
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
                    >
                        Neon • Shadow • Yellow
                    </Badge>
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    I build{" "}
                    <span className="relative">
                        <span className="bg-linear-to-b from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                        fast
                        </span>
                        <span className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-yellow-400/10 blur-md" />
                    </span>{" "}
                    products with{" "}
                    <span className="bg-linear-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                        bold UI
                    </span>
                    .
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                    Fullstack builder with a love for crisp interactions, clean systems,
                    and the kind of glow that makes interfaces feel alive.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                        size="lg"
                        scrollToId="projects"
                        className="group relative bg-yellow-400 text-black shadow-[0_0_28px_rgba(250,204,21,0.35)] hover:bg-yellow-300"
                    >
                        View projects
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="pointer-events-none absolute -inset-1 -z-10 rounded-xl bg-yellow-400/20 blur-lg" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        scrollToId="contact"
                        className="border-yellow-400/40 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.20)] hover:bg-yellow-400/10"
                    >
                        Contact me
                        <Mail className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2 sm:ml-2">
                        <Link
                          href={GITHUB_LINK}
                          target="_blank"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                            aria-label="GitHub"
                          >
                            <Github className="h-5 w-5" />
                          </Button>
                        </Link>
                        <Link
                          href={LINKED_IN_LINK}
                          target="_blank"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-300 hover:bg-yellow-400/10 hover:text-yellow-200"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5" />
                          </Button>
                        </Link>
                    </div>
                    </div>

                    <div className="mt-10 max-w-xl">
                    <Separator className="bg-yellow-400/15" />
                    <div className="mt-4 flex flex-wrap gap-2">
                        {["React", "Next.js", "TypeScript", "Design Systems", "Motion"].map((t) => (
                        <Badge
                            key={t}
                            variant="outline"
                            className="border-yellow-400/25 bg-zinc-950/40 text-zinc-200"
                        >
                            {t}
                        </Badge>
                        ))}
                    </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Right: Feature card */}
          <div className="lg:col-span-5">
            <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/90 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-400/15 blur-[60px]" />
                <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[70px]" />
              </div>

              <CardContent className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-yellow-200/80">
                      Now shipping
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                      Neon-ready portfolio
                    </h2>
                  </div>
                  <Badge className="bg-yellow-400 text-black">v1</Badge>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  A clean layout with luminous accents, deep shadows, and high contrast—
                  built with shadcn/ui components for a polished baseline.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    { title: "Glow-first visuals", desc: "Soft gradients + subtle scanlines." },
                    { title: "Sharp CTAs", desc: "High-contrast buttons that pop." },
                    { title: "Easy to extend", desc: "Swap copy, links, and badges quickly." },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="rounded-xl border border-yellow-400/15 bg-black/30 p-4 shadow-[inset_0_0_18px_rgba(250,204,21,0.08)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-zinc-100">{f.title}</p>
                        <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.6)]" />
                      </div>
                      <p className="mt-1 text-sm text-zinc-300">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="bg-zinc-100 text-black hover:bg-white"
                    variant="secondary"
                  >
                    Download resume
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-400/30 bg-transparent text-yellow-100 hover:bg-yellow-400/10"
                  >
                    See case study
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-30%); opacity: .0; }
          10% { opacity: .35; }
          50% { opacity: .22; }
          90% { opacity: .35; }
          100% { transform: translateY(30%); opacity: .0; }
        }
      `}</style>
    </section>
  )
}