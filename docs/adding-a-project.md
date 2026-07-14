# Adding a project

Projects are stored in [`components/home/projects/project-data.ts`](../components/home/projects/project-data.ts) inside the `allProjects` array. Add a new object to that array, then run the checks listed at the end of this guide.

## Information to provide

### Basic project information

- `slug` — A unique, lowercase URL identifier using hyphens only. This becomes `/projects/<slug>`.
- `title` — The display name and short project label.
- `headline` — One concise sentence used at the top of the project detail page and in page metadata.
- `description` — A short summary used on the project card and detail page.
- `status` — One of `"DONE"`, `"IN_PRODUCTION"`, or `"UNAVAILABLE"`.
- `role` — A clear description of your contribution, including design, planning, implementation, integrations, or delivery responsibilities.

### Links

- `liveUrl` — The public project URL, if one exists.
- `repoUrl` — The source repository URL, if it is public.
- `healthCheckUrl` — A URL that can be requested to confirm the project is online. Usually this is the same as `liveUrl`; omit it if the project cannot be checked publicly.

All three link fields are optional. Use complete URLs, including `https://`.

### Technology stack

Provide a `stack` array containing every notable technology used in the project. The current allowed labels are:

```text
Next.js, React, TypeScript, Python, NoSQL, Java, Spring Boot, RabbitMQ,
Supabase, PostgreSQL, shadcn/ui, Strapi, Shopify, Resend, Tailwind CSS,
Framer Motion, Jest, Cypress
```

If a technology is missing from this list, add its label to the `StackLabel` type and add its icon/link mapping in `components/home/projects/stack-icons.tsx` before using it in the project.

### Case-study content

The detail page expects the following content:

- `planning` — Three or more bullets describing the problem framing, product priorities, constraints, or decisions made before and during the build.
- `timeline` — A chronological set of phases. Every phase needs:
  - `phase` — A short phase name, such as `"Discovery"` or `"Launch"`.
  - `focus` — What you worked on in that phase.
  - `output` — The concrete result of that phase.
- `sections` — The main case-study sections. Every section needs:
  - `title` — A descriptive heading.
  - `items` — One or more supporting points.
- `nextSteps` — Two or more realistic improvements, extensions, or follow-up ideas.

Write these sections around your actual contribution. Explain what needed to be solved, why important decisions were made, and what changed as a result. Avoid vague claims such as “made it better” without describing the user, product, or technical outcome.

### Optional featured flag

- `featured: true` — Shows the project in the larger featured-project card. Only one project should normally be featured. Omit the field for regular projects.

## Copy-and-fill template

```ts
{
  slug: "unique-project-slug",
  title: "Project Name - Short Description",
  headline: "One sentence that explains the project and its value.",
  description: "A short summary for the project card and detail page.",
  stack: ["Next.js", "TypeScript"],
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/your-name/repository",
  healthCheckUrl: "https://example.com",
  status: "DONE",
  role: "Your contribution and ownership in the project.",
  planning: [
    "The problem, audience, or opportunity the project addressed.",
    "The most important product, design, or technical priority.",
    "A constraint or decision that shaped the solution."
  ],
  timeline: [
    {
      phase: "Discovery",
      focus: "What was explored, defined, or prioritised.",
      output: "The concrete result of the phase."
    },
    {
      phase: "Build",
      focus: "What was designed, implemented, or integrated.",
      output: "The concrete result of the phase."
    }
  ],
  sections: [
    {
      title: "The problem",
      items: [
        "What users, customers, or stakeholders needed.",
        "The context or constraint that made the problem worth solving."
      ]
    },
    {
      title: "My contribution",
      items: [
        "The work you owned and how you approached it.",
        "The outcome or impact of that work."
      ]
    }
  ],
  nextSteps: [
    "A realistic next improvement.",
    "A feature, refinement, or technical follow-up."
  ]
}
```

## Before submitting

1. Confirm that the slug is unique and the detail page opens at `/projects/<slug>`.
2. Check that every stack label is supported by `StackLabel`.
3. Verify that public links work and that `healthCheckUrl` returns a healthy response when applicable.
4. Check that the project has the right status and that `featured` is not creating an unintended second featured project.
5. Run:

   ```bash
   npm run lint
   npm run build
   ```

