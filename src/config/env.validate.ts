import zod, { safeParse } from 'zod';

const envSchema = zod.object({
  PORT: zod.string(),
  NODE_ENV: zod.string(),
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
