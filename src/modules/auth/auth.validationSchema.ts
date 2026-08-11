import zod from 'zod'
export const loginSchema = zod.object({
  body: zod.object({
    email: zod.email(),
    password: zod.string(),
  }),
});