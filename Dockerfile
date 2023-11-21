# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.14.2

FROM oven/bun:1 as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json bun.lockb .
RUN bun install 

COPY --link . .

RUN bun run build

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "bun", ".output/server/index.mjs" ]