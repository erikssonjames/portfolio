import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, Code2, Sparkles, Zap } from "lucide-react"

export function AboutMe() {
  const highlights = [
    {
      icon: Zap,
      title: "Speed + polish",
      desc: "Fast iterations with a high bar for detail, performance, and accessibility.",
    },
    {
      icon: Sparkles,
      title: "Neon-friendly UI",
      desc: "Glow, contrast, and depth—without sacrificing readability.",
    },
    {
      icon: Code2,
      title: "Systems mindset",
      desc: "Reusable components, consistent tokens, and clean patterns that scale.",
    },
  ]

  const stack = ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"]

  return (
    <section id="about" className="relative overflow-hidden text-zinc-100">
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
                About
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
              >
                Neon • Shadow • Yellow
              </Badge>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A little about me
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-300">
              I’m a frontend-focused builder who likes clean systems, strong typography,
              and luminous UI details. I care about speed, clarity, and making products
              feel great to use.
            </p>
          </div>

          <Button
            variant="outline"
            className="border-yellow-400/35 bg-black/30 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.18)] hover:bg-yellow-400/10"
          >
            Download resume
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Bio / narrative */}
          <div className="lg:col-span-7">
            <Card className="border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <CardHeader>
                <CardTitle>Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-300">
                <p className="leading-relaxed">
                  I design and build interfaces that balance{" "}
                  <span className="text-yellow-200">bold visual energy</span> with{" "}
                  <span className="text-yellow-200">practical usability</span>. My
                  focus is shipping real features quickly—then refining the interaction
                  details until everything feels effortless.
                </p>

                <p className="leading-relaxed">
                  I enjoy collaborating with product and design teams, translating ideas
                  into scalable component systems, and keeping codebases tidy and
                  predictable.
                </p>

                <Separator className="bg-yellow-400/15" />

                <div>
                  <p className="text-sm font-medium text-zinc-200">Current stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stack.map((t) => (
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

                <div className="rounded-xl border border-yellow-400/15 bg-black/30 p-4 shadow-[inset_0_0_18px_rgba(250,204,21,0.08)]">
                  <p className="text-sm font-medium text-zinc-200">What I’m looking for</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    Roles/projects where I can own UI quality, collaborate closely, and
                    ship meaningful product improvements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Highlights */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <Card
                    key={h.title}
                    className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.10)]"
                  >
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-yellow-400/10 blur-[70px]" />
                    </div>

                    <CardContent className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl border border-yellow-400/25 bg-black/30 p-3 shadow-[0_0_22px_rgba(250,204,21,0.12)]">
                          <Icon className="h-5 w-5 text-yellow-200" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-zinc-100">
                            {h.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                            {h.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}