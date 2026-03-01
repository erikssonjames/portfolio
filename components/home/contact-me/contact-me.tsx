import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, ArrowUpRight, Github, Linkedin } from "lucide-react"
import { CopyEmailButton } from "./copy-email-button"
import { getPublicEnv } from "@/config/env"
import Link from "next/link"
import { ContactMeForm } from "./contact-me-form"
import { GameOfLifeGrid } from "@/components/background/game-of-life/game-of-life-grid"

export function ContactMe() {
  const { EMAIL, GITHUB_LINK, LINKED_IN_LINK } = getPublicEnv()

  return (
    <section id="contact" className="relative overflow-hidden text-zinc-100">
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
                Contact
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-900/70 text-zinc-200 ring-1 ring-yellow-400/15"
              >
                Let&apos;s build something
              </Badge>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Want to work together?
            </h2>
            <p className="mt-2 max-w-xl text-zinc-300">
              Send a message and I&apos;ll reply soon. Or reach out directly via email/social.
            </p>
          </div>

          <div className="flex items-center gap-2">
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

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: direct contact + notes */}
          <div className="lg:col-span-5">
            <Card className="border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.65)]" />
                  Direct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-zinc-300">
                <div className="rounded-xl border border-yellow-400/15 bg-black/30 p-4 shadow-[inset_0_0_18px_rgba(250,204,21,0.08)]">
                  <p className="text-zinc-200">Email</p>
                  <div className="flex justify-between">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="mt-1 inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-100"
                    >
                      <Mail className="h-4 w-4" />
                      {EMAIL}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <CopyEmailButton email={EMAIL} />
                  </div>
                </div>

                <Separator className="bg-yellow-400/15" />

                <div className="space-y-2">
                  <p className="font-medium text-zinc-200">What I&apos;m best at</p>
                  <div className="flex flex-wrap gap-2">
                    {["UI Engineering", "Design Systems", "Performance", "Motion"].map((t) => (
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

                <div className="rounded-xl border border-yellow-400/15 bg-black/30 p-4">
                  <p className="font-medium text-zinc-200">Typical response time</p>
                  <p className="mt-1 text-zinc-300">Within 1–2 business days.</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Add your timezone/availability here if you want.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Card className="relative overflow-hidden border-yellow-400/20 bg-zinc-950/40 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/12 blur-[70px]" />
                <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-yellow-300/10 blur-[80px]" />
              </div>

              <CardHeader className="relative">
                <CardTitle>Send a message</CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <ContactMeForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}