# Base
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Dependencies
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile


# Build
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm prisma generate

RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm build
RUN cp -r src/templates dist/templates

# Production
FROM node:24-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated ./src/generated
EXPOSE 5000

CMD ["node", "dist/server.js"]