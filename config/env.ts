import * as z from 'zod';
import 'dotenv/config';

const createEnv = () => {
  const EnvSchema = z.object({
    EMAIL: z.string(),
    GITHUB_LINK: z.string(),
    LINKED_IN_LINK: z.string()
  });

  const envVars = {
    EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    GITHUB_LINK: process.env.NEXT_PUBLIC_GITHUB,
    LINKED_IN_LINK: process.env.NEXT_PUBLIC_LINKED_IN,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(z.treeifyError(parsedEnv.error))
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();