export type ProjectStatus = "DONE" | "IN_PRODUCTION" | "UNAVAILABLE"

export type StackLabel =
  | "Next.js"
  | "Supabase"
  | "shadcn/ui"
  | "Shopify"
  | "Resend"
  | "Tailwind CSS"
  | "Framer Motion"

export type ProjectTimelineItem = {
  phase: string
  focus: string
  output: string
}

export type ProjectDetailSection = {
  title: string
  items: string[]
}

export type ProjectType = {
  slug: string
  title: string
  description: string
  stack: StackLabel[]
  repoUrl: string
  liveUrl?: string
  healthCheckUrl?: string
  status: ProjectStatus
  role: string
  headline: string
  planning: string[]
  timeline: ProjectTimelineItem[]
  sections: ProjectDetailSection[]
  nextSteps: string[]
  featured?: boolean
}

export const allProjects: ProjectType[] = [
  {
    slug: "gym-quest",
    title: "Gym Quest - Gamified Training Tracker",
    headline: "A social workout tracker designed to turn consistency into a game loop.",
    description:
      "A social, game-like workout tracker that turns gym progress into quests, streaks, and shared milestones, making consistency feel fun.",
    stack: ["Next.js", "Supabase", "shadcn/ui"],
    liveUrl: "https://gym-quest-phi.vercel.app/",
    repoUrl: "https://github.com/erikssonjames/gym-quest",
    healthCheckUrl: "https://gym-quest-phi.vercel.app/",
    status: "IN_PRODUCTION",
    role: "Product planning, UX direction, frontend architecture, and full-stack delivery.",
    featured: true,
    planning: [
      "Frame the product around daily motivation, not just exercise logging, so the core loop feels rewarding before advanced features land.",
      "Prioritize progression systems early: quests, streaks, and milestones needed to feel coherent before polishing edge-case screens.",
      "Keep the stack lean enough to move quickly, with Supabase handling auth and persistence while Next.js drives the product surface."
    ],
    timeline: [
      {
        phase: "Discovery",
        focus: "Define what makes a workout tracker feel game-like instead of administrative.",
        output: "A core loop centered on quests, streaks, and shared progress."
      },
      {
        phase: "Product framing",
        focus: "Map the first meaningful user journey from onboarding to logging workouts to checking progress.",
        output: "A compact MVP scope with social motivation and progression as the headline value."
      },
      {
        phase: "Build and iteration",
        focus: "Ship the tracker flow, connect persistence, and refine the reward language across the UI.",
        output: "A production-facing app that feels cohesive rather than feature-stuffed."
      },
      {
        phase: "Stabilization",
        focus: "Tune health checks, polish states, and reduce friction in repeated use.",
        output: "A more dependable product experience for regular return visits."
      }
    ],
    sections: [
      {
        title: "Planning priorities",
        items: [
          "The first planning pass focused on habit formation. If the app did not reinforce momentum, the rest of the product would feel cosmetic.",
          "Feature decisions were filtered through one question: does this make returning tomorrow feel easier or more exciting?",
          "The implementation leaned toward quick iteration loops so product language and interaction design could evolve together."
        ]
      },
      {
        title: "Build decisions",
        items: [
          "Next.js provided a fast way to iterate on the app shell, route structure, and frontend interactions in one place.",
          "Supabase covered the backend foundation cleanly enough to keep most attention on product flow and interface quality.",
          "shadcn/ui gave a flexible baseline so the product could keep a custom feel without rebuilding every primitive."
        ]
      },
      {
        title: "What mattered most",
        items: [
          "The most important outcome was making progress feel visible and motivating, not buried in tables or logs.",
          "That meant shaping copy, state feedback, and progression cues with as much care as the actual data model."
        ]
      }
    ],
    nextSteps: [
      "Expand the social layer with shared challenges and group milestones.",
      "Add richer performance history so long-term progress feels as rewarding as daily streaks.",
      "Refine onboarding to tailor the quest system to different training styles."
    ]
  },
  {
    slug: "arts-and-crafts",
    title: "Arts & Crafts - Clay Art Storefront",
    headline: "A minimalist commerce experience built to feel calm, tactile, and trustworthy.",
    description:
      "A fast, minimalist e-commerce site for handcrafted clay artwork with smooth browsing, simple checkout, and reliable order emails.",
    stack: ["Next.js", "Shopify", "Resend"],
    liveUrl: "https://arts-and-crafts-website.vercel.app/",
    repoUrl: "https://github.com/erikssonjames/arts-and-crafts-website",
    healthCheckUrl: "https://arts-and-crafts-website.vercel.app/",
    status: "IN_PRODUCTION",
    role: "Frontend implementation, storefront UX, and commerce integration.",
    planning: [
      "Keep the browsing experience lightweight so the products, textures, and photography do most of the talking.",
      "Reduce checkout friction by avoiding custom complexity where Shopify already solves the hard parts well.",
      "Make transactional email feel dependable and polished because trust matters as much as aesthetics in a storefront."
    ],
    timeline: [
      {
        phase: "Direction setting",
        focus: "Translate the handcrafted brand into a digital experience that still feels warm and personal.",
        output: "A minimalist visual system that lets the artwork lead."
      },
      {
        phase: "Storefront planning",
        focus: "Define the smallest set of product browsing and purchase flows needed for a clean launch.",
        output: "A simpler information architecture with less clutter and faster decision-making."
      },
      {
        phase: "Commerce integration",
        focus: "Connect catalog and checkout paths without overcomplicating the frontend.",
        output: "A straightforward shopping flow backed by Shopify."
      },
      {
        phase: "Launch polish",
        focus: "Tighten transitions, empty states, and order confirmation communication.",
        output: "A calmer buying experience with more confidence at the finish."
      }
    ],
    sections: [
      {
        title: "Planning priorities",
        items: [
          "The planning work emphasized clarity over feature breadth. A small catalog benefits more from mood and readability than from heavy merchandising patterns.",
          "Layout decisions were made to keep users close to the products and away from unnecessary interface noise."
        ]
      },
      {
        title: "Build decisions",
        items: [
          "Next.js handled the storefront shell and visual experience while Shopify supported commerce workflows that did not need reinvention.",
          "Resend helped keep order-related communication simple and dependable."
        ]
      },
      {
        title: "Experience goals",
        items: [
          "The site needed to feel fast and quiet, with visual restraint that matched the handmade nature of the products.",
          "Trust signals came from consistency, clean checkout paths, and confident transactional messaging."
        ]
      }
    ],
    nextSteps: [
      "Add richer product storytelling for materials, making process, and collection context.",
      "Introduce a lightweight editorial layer for launches and featured pieces.",
      "Explore inventory-aware merchandising for one-off handmade items."
    ]
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1 - Motion-First Personal Site",
    headline: "A personal site built to feel sharp, expressive, and intentionally engineered.",
    description:
      "A neon-accented portfolio with crisp typography, Framer Motion interactions, and obsessive performance tuning for a snappy feel.",
    stack: ["Tailwind CSS", "Next.js", "Framer Motion"],
    liveUrl: "https://jameseriksson.com/",
    repoUrl: "https://github.com/erikssonjames/portfolio",
    healthCheckUrl: "https://jameseriksson.com/",
    status: "IN_PRODUCTION",
    role: "Creative direction, interaction design, content framing, and implementation.",
    planning: [
      "Use the site as both a portfolio and a signal of taste, which meant balancing personality, readability, and engineering discipline.",
      "Treat motion as part of the storytelling instead of a decorative layer added late.",
      "Plan the visual hierarchy around quick scanning so visitors understand strengths and projects without effort."
    ],
    timeline: [
      {
        phase: "Positioning",
        focus: "Clarify what the site should communicate in the first few seconds.",
        output: "A tighter narrative around UI engineering, product thinking, and execution."
      },
      {
        phase: "Visual system",
        focus: "Develop a motion-forward interface without drifting into noise or gimmicks.",
        output: "A distinctive visual language with controlled contrast and transitions."
      },
      {
        phase: "Implementation",
        focus: "Turn the concept into a responsive experience that still feels deliberate on smaller screens.",
        output: "A polished portfolio shell with strong visual rhythm."
      },
      {
        phase: "Performance tuning",
        focus: "Trim rough edges so animation and responsiveness reinforce each other.",
        output: "A faster and more confident end result."
      }
    ],
    sections: [
      {
        title: "Planning priorities",
        items: [
          "The site was planned around first impressions: visual identity, project credibility, and ease of navigation needed to land immediately.",
          "Every section had to justify its place because portfolio sites get weaker when they become diaries instead of curated stories."
        ]
      },
      {
        title: "Build decisions",
        items: [
          "Next.js provided the foundation for a fast personal site with room for future expansion into richer case studies.",
          "Tailwind CSS made it easier to shape a consistent visual language quickly while keeping the interface highly customized.",
          "Framer Motion carried the interaction tone and helped the site feel alive without making it harder to use."
        ]
      },
      {
        title: "Quality bar",
        items: [
          "The quality bar was less about adding more content and more about making each interaction feel considered.",
          "Typography, spacing, motion timing, and performance all had to support the same impression: this work is intentional."
        ]
      }
    ],
    nextSteps: [
      "Replace inferred case-study notes with deeper real project retrospectives.",
      "Add richer detail pages for more projects so the site scales beyond a single landing page.",
      "Continue refining performance and content density as the portfolio grows."
    ]
  }
]

export const featuredProject = allProjects.find((project) => project.featured) ?? allProjects[0]
export const projects = allProjects.filter((project) => !project.featured)

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug)
}
