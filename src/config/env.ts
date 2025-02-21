import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().optional().default('https://beta.asakiri.com'),
    AUTH0_AUDIENCE: z.string(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_DOMAIN: z.string(),
    API_BASE_URL: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    console.log('@@ key: value', key, value);
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
