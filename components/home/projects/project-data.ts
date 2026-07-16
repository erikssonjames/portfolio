export type ProjectStatus = "DONE" | "IN_PRODUCTION" | "UNAVAILABLE"

export type StackLabel =
  | "Next.js"
  | "React"
  | "TypeScript"
  | "Python"
  | "NoSQL"
  | "Java"
  | "Spring Boot"
  | "RabbitMQ"
  | "Supabase"
  | "PostgreSQL"
  | "shadcn/ui"
  | "Strapi"
  | "Shopify"
  | "Resend"
  | "Tailwind CSS"
  | "Framer Motion"
  | "Jest"
  | "Cypress"

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
  previewImage?: string
  repoUrl?: string
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
    slug: "restaurant-discovery",
    title: "Restaurant Discovery - Restaurant Search Platform",
    headline: "A full-stack discovery experience for finding the right place to eat, from broad city searches to the details that make a decision easy.",
    description:
      "A restaurant discovery platform for searching by city, cuisine, price range, menu items, and current availability, with dedicated city and cuisine pages plus detailed restaurant profiles.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Strapi",
      "Supabase",
      "PostgreSQL",
      "Jest",
      "Cypress",
    ],
    liveUrl: "https://restaurants.jameseriksson.com/",
    repoUrl: "https://github.com/erikssonjames/restaurant-discovery",
    previewImage: "/previews/restaurant-discovery.png",
    status: "DONE",
    role: "Personal project: built the frontend, content setup, integrations, and tests.",
    planning: [
      "Frame restaurant discovery around the moments that affect a dining decision: location, cuisine, budget, menu preferences, ratings, and whether a table is available now.",
      "Use dedicated city and cuisine landing pages to make popular browsing paths useful for people while creating a strong, scalable SEO structure.",
      "Keep editorial content manageable by separating the customer-facing Next.js experience from Strapi, with Supabase PostgreSQL providing the underlying data foundation.",
    ],
    timeline: [
      {
        phase: "Search model",
        focus: "Define the filters and content relationships needed to move from a broad restaurant search to a confident choice.",
        output: "A discovery flow covering city, cuisine, price, menu items, ratings, and availability.",
      },
      {
        phase: "Content architecture",
        focus: "Structure restaurant, menu, review, location, and landing-page content so it can be maintained without code releases.",
        output: "A Strapi CMS model backed by Supabase PostgreSQL for practical editorial workflows.",
      },
      {
        phase: "Experience build",
        focus: "Create responsive listings, landing pages, and detailed restaurant profiles with clear visual hierarchy.",
        output: "A polished Next.js and shadcn/ui product surface built with TypeScript and Tailwind CSS.",
      },
      {
        phase: "Quality and discoverability",
        focus: "Make the platform easy to find, share, use, and validate across the critical browsing journey.",
        output: "SEO metadata, structured data, sitemap and robots support, social images, CMS revalidation, accessibility checks, and automated tests.",
      },
    ],
    sections: [
      {
        title: "Discovery that narrows naturally",
        items: [
          "The experience starts broad enough for exploration but makes it easy to refine results by the factors diners genuinely care about.",
          "Restaurant profiles bring images, menus, reviews, ratings, contact details, and availability into one decision-ready view.",
          "City and cuisine pages provide useful browsing destinations instead of treating SEO pages as thin, duplicated content.",
        ],
      },
      {
        title: "Editorially flexible foundation",
        items: [
          "Strapi gives content teams a clear place to manage listings and supporting editorial content without coupling every update to a frontend deployment.",
          "Supabase PostgreSQL provides a dependable relational foundation for the connected restaurant, menu, location, and review data.",
          "On-demand revalidation keeps published content fresh in the Next.js frontend without sacrificing fast delivery.",
        ],
      },
      {
        title: "Built for confidence",
        items: [
          "Search-friendly metadata, structured data, sitemap and robots support, and social sharing images make the product easier to discover and present well when shared.",
          "Responsive layouts and accessibility checks keep the core discovery experience usable across devices and input methods.",
          "Jest and Cypress cover important behaviour so iteration does not quietly erode the restaurant-search journey.",
        ],
      },
    ],
    nextSteps: [
      "Add map-based exploration and neighbourhood-level recommendations for more spatially intuitive discovery.",
      "Introduce saved restaurants and personalised suggestions based on dining preferences and past activity.",
      "Expand real-time reservation and availability integrations for a tighter path from searching to booking.",
    ],
  },
  {
    slug: "gym-quest",
    title: "Gym Quest - Gamified Training Tracker",
    headline: "A social workout tracker designed to turn consistency into a game loop.",
    description:
      "A social, game-like workout tracker that turns gym progress into quests, streaks, and shared milestones, making consistency feel fun.",
    stack: ["Next.js", "Supabase", "shadcn/ui"],
    liveUrl: "https://gymquest.jameseriksson.com/",
    repoUrl: "https://github.com/erikssonjames/gym-quest",
    healthCheckUrl: "https://gymquest.jameseriksson.com/",
    status: "IN_PRODUCTION",
    role: "Personal project: built the product UI, auth and persistence integration, and deployment.",
    featured: true,
    previewImage: "/previews/gym-quest.png",
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
        focus: "Ship the tracker flow, connect persistence, and refine the experience so the full solution feels coherent in use.",
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
          "Next.js provided a fast way to iterate on the application flow, route structure, and delivery surface in one place.",
          "Supabase covered the backend foundation cleanly enough to keep attention on the core problem, product flow, and reliability.",
          "The stack gave enough flexibility to shape the product around user needs without overengineering the foundation."
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
    slug: "vroff",
    title: "Vroff - Digital Workspace Platform",
    headline: "A collaborative work platform where I contributed key product surfaces used to orient work and track progress.",
    description:
      "Vroff is a Swedish digital workspace that brings meetings, chat, projects, KPIs, and calendar into one platform. My contribution focused on the metric dashboard, project cards, and the login/flow experience that helped users get into the product and understand their work at a glance.",
    stack: ["React", "Python", "NoSQL", "Tailwind CSS"],
    liveUrl: "https://www.vroff.com/",
    healthCheckUrl: "https://www.vroff.com/",
    previewImage: "/previews/vroff.png",
    status: "IN_PRODUCTION",
    role: "Designed and implemented the metric dashboard, project cards, and login/flow pages as part of the product experience.",
    planning: [
      "The work needed to support a product positioned as an all-in-one digital office, so the surfaces I worked on had to reinforce clarity, orientation, and day-to-day usefulness.",
      "The dashboard and project views had to help users understand status quickly, not just look polished, because the product promise is better oversight and easier coordination.",
      "The login and entry flow needed to lower friction and make the platform feel understandable from the first interaction."
    ],
    timeline: [
      {
        phase: "Product understanding",
        focus: "Align the work with Vroff's core promise of combining communication, projects, KPIs, and planning in one workspace.",
        output: "A clearer direction for which views needed to provide immediate value and orientation."
      },
      {
        phase: "Dashboard work",
        focus: "Build a metric dashboard that made important signals easier to scan and understand.",
        output: "A stronger overview surface for tracking progress and surfacing what matters."
      },
      {
        phase: "Project flow",
        focus: "Create project cards that supported structure, visibility, and easier task coordination.",
        output: "Project surfaces that fit the product's emphasis on simple project management and team overview."
      },
      {
        phase: "Access and onboarding flow",
        focus: "Shape the login and flow pages so entering the platform felt straightforward and coherent.",
        output: "A cleaner entry experience that supported first impressions and easier product access."
      }
    ],
    sections: [
      {
        title: "Product context",
        items: [
          "According to Vroff's official positioning, the platform combines meetings, chat, projects, KPIs, and calendar in one digital workspace.",
          "That meant the areas I worked on needed to do more than look good. They had to make work easier to understand and navigate inside a larger product ecosystem."
        ]
      },
      {
        title: "My contribution",
        items: [
          "I created the metric dashboard to give users a clearer view of progress and important signals in the platform.",
          "I also built the project cards, which supported the product's project management flow and made work items easier to scan and coordinate around.",
          "On top of that, I worked on the login and flow pages to make the path into the platform feel cleaner and more intuitive."
        ]
      },
      {
        title: "Why it mattered",
        items: [
          "The work sat in important product surfaces where clarity, structure, and usability directly shape how people work day to day.",
          "It also meant contributing inside an existing platform and making sure the parts I owned supported the product as a whole."
        ]
      }
    ],
    nextSteps: [
      "Keep refining the dashboard so key metrics are even easier to scan and act on.",
      "Develop the project-card flow further to support clearer coordination and follow-up.",
      "Continue improving the login and entry flow so the first experience of the platform feels simple and dependable."
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
    previewImage: "/previews/arts-and-crafts.png",
    status: "IN_PRODUCTION",
    role: "Personal project: built the storefront and connected Shopify and transactional email.",
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
        focus: "Connect catalog and checkout paths without overcomplicating the overall solution.",
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
    slug: "stayhaven",
    title: "stayhaven - Vacation Home Demo App",
    headline: "A lightweight demo for browsing and managing vacation-home stays.",
    description:
      "A demo vacation-home app with minimal functionality today, focused on validating the core stay discovery and booking flow direction.",
    stack: ["Next.js", "Java", "Spring Boot", "PostgreSQL", "RabbitMQ"],
    liveUrl: "https://stayhaven.jameseriksson.com",
    repoUrl: "https://github.com/erikssonjames/stayhaven",
    healthCheckUrl: "https://stayhaven.jameseriksson.com",
    previewImage: "/previews/stayhaven.png",
    status: "IN_PRODUCTION",
    role: "Personal project: built the demo interface and backend foundation.",
    planning: [
      "Keep the scope intentionally narrow so the demo can validate core vacation-home use cases quickly.",
      "Prioritize a simple guest journey over feature depth while the product direction is still being shaped.",
      "Use early feedback to decide which booking and host-management capabilities should be expanded next."
    ],
    timeline: [
      {
        phase: "Concept setup",
        focus: "Define the smallest vacation-home product slice worth demoing.",
        output: "A compact demo scope centered on core stay flows."
      },
      {
        phase: "MVP implementation",
        focus: "Build minimal screens and flows to make the concept tangible.",
        output: "A working public demo with intentionally limited functionality."
      },
      {
        phase: "Demo release",
        focus: "Deploy the app and prepare for iterative improvements from real usage.",
        output: "A live baseline for feedback-driven product iteration."
      }
    ],
    sections: [
      {
        title: "Current state",
        items: [
          "stayhaven is currently a demo build with minimal functionality by design.",
          "The goal at this stage is to validate product direction before expanding scope."
        ]
      },
      {
        title: "Product focus",
        items: [
          "The app is focused on vacation-home use cases and a clean path through key user actions.",
          "Feature depth is intentionally limited so iteration can stay fast and practical."
        ]
      },
      {
        title: "Next evolution",
        items: [
          "Future development will prioritize the highest-value booking and management improvements.",
          "The demo foundation exists to support incremental product hardening over time."
        ]
      }
    ],
    nextSteps: [
      "Expand booking flow depth with stronger state handling and clearer confirmation UX.",
      "Add richer property details and host-side management capabilities.",
      "Introduce authentication and persistence improvements as the demo matures."
    ]
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1 - Motion-First Personal Site",
    headline: "A personal site built to communicate solution ownership, clarity, and intentional engineering.",
    description:
      "A structured, rust-accented portfolio with crisp typography, Framer Motion interactions, and obsessive performance tuning for a snappy feel.",
    stack: ["Tailwind CSS", "Next.js", "Framer Motion"],
    liveUrl: "https://jameseriksson.com/",
    repoUrl: "https://github.com/erikssonjames/portfolio",
    healthCheckUrl: "https://jameseriksson.com/",
    previewImage: "/previews/portfolio-v1.png",
    status: "IN_PRODUCTION",
    role: "Personal project: built the site, project pages, and interactions.",
    planning: [
      "Use the site as both a portfolio and a signal of taste, which meant balancing personality, readability, and engineering discipline.",
      "Treat motion as part of the storytelling instead of a decorative layer added late.",
      "Plan the visual hierarchy around quick scanning so visitors understand strengths and projects without effort."
    ],
    timeline: [
      {
        phase: "Positioning",
        focus: "Clarify what the site should communicate in the first few seconds.",
        output: "A tighter narrative around customer understanding, solution delivery, and execution."
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
      "Add deeper writeups for more projects as the portfolio continues to grow.",
      "Add richer detail pages for more projects so the site scales beyond a single landing page.",
      "Continue refining performance and content density as the portfolio grows."
    ]
  },
  {
    slug: "mewtual",
    title: "Mewtual - Private Cat Sharing",
    headline: "A mobile-first social platform for sharing cat photos and updates with family and friends.",
    description: "Mewtual provides a private space for families and friends to share cat photos, stories, milestones, comments, and notifications.",
    stack: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "shadcn/ui",
      "Tailwind CSS",
      "Resend"
    ],
    repoUrl: "https://github.com/erikssonjames/mewtual",
    status: "IN_PRODUCTION",
    role: "Personal project: built the product across the UI, API, database, authentication, media, and moderation flows.",
    planning: [
      "Defined the product around private sharing for families and close friends rather than a public social network.",
      "Prioritised a mobile-first browsing and posting experience for quickly sharing cat photos from any device.",
      "Designed the data model around users, cats, posts, stories, comments, milestones, notifications, and moderation reports.",
      "Added privacy, authentication, rate limiting, reporting, and administrative workflows as core product requirements."
    ],
    timeline: [
      {
        phase: "Discovery",
        focus: "Framed the audience, privacy model, and primary sharing workflows.",
        output: "A focused product concept for private cat communities."
      },
      {
        phase: "Architecture",
        focus: "Defined the React frontend, TypeScript API, PostgreSQL schema, authentication model, and media workflow.",
        output: "A full-stack foundation with separated frontend and backend workspaces."
      },
      {
        phase: "Build",
        focus: "Implemented posts, stories, cat profiles, comments, reactions, milestones, notifications, sharing, and real-time updates.",
        output: "A usable social platform for sharing and discovering cat activity."
      },
      {
        phase: "Safety and Quality",
        focus: "Added moderation tools, reporting, account controls, accessibility coverage, integration tests, and security-focused tests.",
        output: "A more reliable and maintainable product with safety mechanisms built into the core experience."
      }
    ],
    sections: [
      {
        title: "The problem",
        items: [
          "Families and friends needed a dedicated place to share cat photos and updates without relying on a public social network.",
          "The product needed to make frequent, lightweight sharing feel natural while keeping content within trusted communities."
        ]
      },
      {
        title: "Product direction",
        items: [
          "The experience was shaped around mobile-first browsing, fast media sharing, cat-specific profiles, and temporary stories.",
          "Milestones and structured cat information added more lasting value than a simple chronological photo feed."
        ]
      },
      {
        title: "My contribution",
        items: [
          "Planned and implemented the product across the frontend, backend, database schema, authentication, media processing, and real-time features.",
          "Built moderation and reporting flows so administrators could review problematic posts, comments, stories, users, and cat profiles."
        ]
      },
      {
        title: "Outcome",
        items: [
          "Mewtual became a cohesive private-sharing platform with social features, structured cat profiles, and safety controls.",
          "The codebase includes automated unit, integration, security, accessibility, and end-to-end coverage for continued development."
        ]
      }
    ],
    nextSteps: [
      "Add production deployment and monitoring with a public health-check endpoint.",
      "Improve media delivery with object storage, responsive image variants, and CDN caching.",
      "Expand community controls with invitations, family groups, granular permissions, and richer notification preferences."
    ]
  }
]

export const featuredProject = allProjects.find((project) => project.featured) ?? allProjects[0]
export const projects = allProjects.filter((project) => !project.featured)

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug)
}
