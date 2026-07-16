import type { ProjectType, StackLabel } from "./project-data"

export type ProjectTechnology = {
  name: StackLabel
  reason: string
}

export type ProjectTechnologyGroup = {
  label: string
  description: string
  technologies: ProjectTechnology[]
}

const technologyByProject: Record<string, ProjectTechnology[]> = {
  "restaurant-discovery": [
    { name: "Next.js", reason: "Provides the app structure, routing, server rendering, and fast page delivery." },
    { name: "React", reason: "Handles the interactive search, filters, listings, and restaurant detail views." },
    { name: "TypeScript", reason: "Keeps the data shared between the UI, API calls, and content models predictable." },
    { name: "Tailwind CSS", reason: "Made it straightforward to build a responsive visual system without a large custom CSS layer." },
    { name: "shadcn/ui", reason: "Supplied accessible, composable UI primitives for filters, buttons, cards, and dialogs." },
    { name: "Strapi", reason: "Gives editorial content a manageable home instead of hard-coding restaurant and landing-page content." },
    { name: "Supabase", reason: "Provides the hosted backend and database foundation for the search data." },
    { name: "PostgreSQL", reason: "Fits the connected restaurant, menu, location, and review data better than a flat document model." },
    { name: "Jest", reason: "Covers focused logic and component behaviour as the search experience changes." },
    { name: "Cypress", reason: "Checks the important browser journeys, from searching to opening a restaurant profile." },
  ],
  "gym-quest": [
    { name: "Next.js", reason: "Keeps the product UI, routes, and deployment surface in one focused application." },
    { name: "Supabase", reason: "Handles authentication and persistence so the app can stay focused on the workout loop." },
    { name: "shadcn/ui", reason: "Provides a small set of consistent UI building blocks for a product that is used repeatedly." },
  ],
  vroff: [
    { name: "React", reason: "Supports the interactive dashboards, project cards, and product flows I contributed to." },
    { name: "Python", reason: "Was used within the existing product stack for backend and platform functionality." },
    { name: "NoSQL", reason: "Fits the flexible workspace data and the product's existing persistence approach." },
    { name: "Tailwind CSS", reason: "Made it easier to extend the product UI while keeping the new surfaces consistent." },
  ],
  "arts-and-crafts": [
    { name: "Next.js", reason: "Provides a fast storefront shell and a simple way to build the browsing experience." },
    { name: "Shopify", reason: "Takes care of product data, checkout, and commerce operations that are better not to rebuild." },
    { name: "Resend", reason: "Handles transactional emails with a small, dependable integration." },
  ],
  stayhaven: [
    { name: "Next.js", reason: "Provides the public demo interface and keeps the initial product slice easy to iterate on." },
    { name: "Java", reason: "Offers a familiar, strongly typed foundation for the backend services." },
    { name: "Spring Boot", reason: "Provides the structure for HTTP APIs and the application layer." },
    { name: "PostgreSQL", reason: "Stores the relational data behind properties, guests, and stays." },
    { name: "RabbitMQ", reason: "Leaves room for asynchronous work without coupling every action to one request." },
  ],
  "portfolio-v1": [
    { name: "Next.js", reason: "Handles the portfolio pages, project routes, metadata, and static delivery." },
    { name: "Tailwind CSS", reason: "Makes the visual system quick to adjust while keeping styles close to the markup." },
    { name: "Framer Motion", reason: "Adds restrained transitions and reveals where they help the page feel easier to scan." },
  ],
  mewtual: [
    { name: "React", reason: "Drives the feed, cat profiles, posting flows, and other interactive product surfaces." },
    { name: "TypeScript", reason: "Keeps the frontend, API contracts, and data model aligned as the product grows." },
    { name: "PostgreSQL", reason: "Stores the relationships between users, cats, posts, comments, and notifications." },
    { name: "shadcn/ui", reason: "Provides accessible primitives for a product with many small, repeated interactions." },
    { name: "Tailwind CSS", reason: "Supports a mobile-first interface without building a separate styling system." },
    { name: "Resend", reason: "Sends account and notification emails without adding unnecessary mail infrastructure." },
  ],
}

export function getProjectTechnology(project: ProjectType) {
  return technologyByProject[project.slug] ?? project.stack.map((name) => ({
    name,
    reason: "Used as part of the project's application stack.",
  }))
}

const technologyGroups: Array<{
  label: string
  description: string
  names: StackLabel[]
}> = [
  {
    label: "Frontend",
    description: "The parts users interact with directly.",
    names: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    label: "Backend",
    description: "Application logic, APIs, and background communication.",
    names: ["Java", "Spring Boot", "Python", "RabbitMQ"],
  },
  {
    label: "Data & services",
    description: "Persistence, content, commerce, and supporting services.",
    names: ["PostgreSQL", "Supabase", "NoSQL", "Strapi", "Shopify", "Resend"],
  },
  {
    label: "Testing",
    description: "Tools used to check behaviour and keep changes safe.",
    names: ["Jest", "Cypress"],
  },
]

export function getProjectTechnologyGroups(project: ProjectType): ProjectTechnologyGroup[] {
  const technology = getProjectTechnology(project)

  return technologyGroups
    .map((group) => ({
      label: group.label,
      description: group.description,
      technologies: group.names
        .map((name) => technology.find((item) => item.name === name))
        .filter((item): item is ProjectTechnology => Boolean(item)),
    }))
    .filter((group) => group.technologies.length > 0)
}
