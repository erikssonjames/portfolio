import * as z from "zod";

const EnvSchema = z.object({
  EMAIL: z.string().min(1),
  GITHUB_LINK: z.string().min(1),
  LINKED_IN_LINK: z.string().min(1),
});

export function getPublicEnv() {
  const envVars = {
    EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    GITHUB_LINK: process.env.NEXT_PUBLIC_GITHUB,
    LINKED_IN_LINK: process.env.NEXT_PUBLIC_LINKED_IN,
  };

  const parsed = EnvSchema.safeParse(envVars);

  if (!parsed.success) {
    // Keep it readable without pulling in extra helpers
    throw new Error(
      "Invalid env provided: " +
        parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", "),
    );
  }

  return parsed.data;
}