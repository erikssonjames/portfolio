import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  siFramer,
  siCypress,
  siJest,
  siNextdotjs,
  siPostgresql,
  siReact,
  siResend,
  siShadcnui,
  siShopify,
  siStrapi,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import type { StackLabel } from "./project-data"

type StackIconProps = {
  stack: StackLabel[]
  className?: string
}

type StackMeta = {
  icon: SimpleIcon
  href: string
  description: string
  needsLightInset?: boolean
}

const stackMetaMap: Record<StackLabel, StackMeta> = {
  "Next.js": {
    icon: siNextdotjs,
    href: "https://nextjs.org/",
    description: "React framework for routing, rendering, and production-ready full-stack apps.",
    needsLightInset: true,
  },
  React: {
    icon: siReact,
    href: "https://react.dev/",
    description: "JavaScript library for building component-driven user interfaces.",
  },
  TypeScript: {
    icon: siTypescript,
    href: "https://www.typescriptlang.org/",
    description: "Typed JavaScript that makes large application codebases safer to evolve.",
  },
  Supabase: {
    icon: siSupabase,
    href: "https://supabase.com/",
    description: "Backend platform for Postgres, auth, storage, and realtime features.",
  },
  PostgreSQL: {
    icon: siPostgresql,
    href: "https://www.postgresql.org/",
    description: "Open-source relational database for structured, connected application data.",
  },
  "shadcn/ui": {
    icon: siShadcnui,
    href: "https://ui.shadcn.com/",
    description: "Composable UI building blocks based on Radix and Tailwind CSS.",
    needsLightInset: true,
  },
  Strapi: {
    icon: siStrapi,
    href: "https://strapi.io/",
    description: "Headless CMS for modelling and managing structured product content.",
  },
  Shopify: {
    icon: siShopify,
    href: "https://www.shopify.com/",
    description: "Commerce platform for catalog, checkout, and storefront operations.",
  },
  Resend: {
    icon: siResend,
    href: "https://resend.com/",
    description: "Developer-focused email delivery platform for product and transactional mail.",
    needsLightInset: true
  },
  "Tailwind CSS": {
    icon: siTailwindcss,
    href: "https://tailwindcss.com/",
    description: "Utility-first CSS framework for fast, consistent interface styling.",
  },
  "Framer Motion": {
    icon: siFramer,
    href: "https://www.framer.com/motion/",
    description: "Animation library for expressive motion and interaction design in React.",
  },
  Jest: {
    icon: siJest,
    href: "https://jestjs.io/",
    description: "JavaScript testing framework for validating application behaviour.",
  },
  Cypress: {
    icon: siCypress,
    href: "https://www.cypress.io/",
    description: "End-to-end testing framework for verifying real user flows in the browser.",
  },
}

function BrandGlyph({ icon, needsLightInset }: { icon: SimpleIcon; needsLightInset?: boolean }) {
  return (
    <span
      className={
        needsLightInset
          ? "flex h-5 w-5 items-center justify-center rounded-full bg-white/92 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
          : "flex h-5 w-5 items-center justify-center"
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={`#${icon.hex}`}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
    </span>
  )
}

export function StackIcons({ stack, className }: StackIconProps) {
  return (
    <div className={className}>
      {stack.map((item) => {
        const meta = stackMetaMap[item]

        return (
          <HoverCard key={item} openDelay={80} closeDelay={60}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-yellow-400/25 bg-zinc-950/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-yellow-300/45 hover:bg-zinc-900"
                aria-label={item}
              >
                <BrandGlyph icon={meta.icon} needsLightInset={meta.needsLightInset} />
              </button>
            </HoverCardTrigger>

            <HoverCardContent
              align="start"
              side="top"
              className="w-80 border border-yellow-400/15 bg-zinc-950/96 p-4 text-zinc-100 shadow-[0_0_28px_rgba(250,204,21,0.10)]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/20 bg-black/30">
                  <BrandGlyph icon={meta.icon} needsLightInset={meta.needsLightInset} />
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-zinc-100">{item}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">{meta.description}</p>

                  <Link
                    href={meta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-yellow-200 transition hover:text-yellow-100"
                  >
                    Learn more
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )
      })}
    </div>
  )
}
