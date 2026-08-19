FROM node:24-alpine3.23

WORKDIR /app

#install bash
RUN apk add --no-cache bash

# Enable pnpm through Corepack
RUN corepack enable && corepack prepare pnpm@11.22.0 --activate

# Copy dependency files first for better Docker caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application source
COPY . .

#build the application
RUN pnpm run build

#copy dist folder
RUN cp -r src/templates dist/templates

# Development server port
EXPOSE 5050

# Start development server
CMD ["pnpm", "start"]