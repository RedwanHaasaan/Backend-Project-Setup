import zod from 'zod';

const envSchema = zod.object({
  PORT: zod.coerce.number(),
  NODE_ENV: zod.string(),
  DATABASE_URL: zod.string(),
  SMTP_HOST: zod.string(),
  SMTP_PORT: zod.string(),
  SMTP_USER: zod.string(),
  SMTP_PASS: zod.string(),
  SMTP_FROM: zod.string(),
});

export const envValidate = () => {
  const parsedEnv = envSchema.safeParse(process.env);
  if (!parsedEnv.success) {
    const error = zod.treeifyError(parsedEnv.error);

    console.dir(error, { depth: null });
    process.exit(1);
  }
  return parsedEnv.data
};
