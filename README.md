# RAGE Project

## Description

This repository contains the source code and configuration for a project based on the RAGE Multiplayer platform. The project includes server, client, and browser parts, as well as support for CEF and .NET components.

## Project Structure

- `sources/` — TypeScript/JS/Vue source files
    - `browser/` — frontend (Vue)
    - `client/` — client logic
    - `server/` — server logic
    - `shared/` — shared constants and types
- `conf.json` — main config
- `.env` — environment variables (do not commit)

## Quick Start

1. Copy `.env.example` to `.env` and update the values as needed for your environment.
2. Start the server (this will install dependencies, build the sources, and launch the RAGE MP server):
    ```sh
    pnpm start
    ```


## Scripts

- `pnpm start` — Build the project and start the RAGE MP server
- `pnpm build` — Build server, client, and browser sources
- `pnpm build:server` — Build only the server sources
- `pnpm build:client` — Build only the client sources
- `pnpm build:browser` — Build only the browser (Vue) sources
- `pnpm dev:browser` — Start the browser (Vue) in development mode with hot reload
- `pnpm lint` — Run ESLint to check code style and find problems
- `pnpm lint:fix` — Run ESLint and automatically fix fixable issues
- `pnpm format` — Format all source files using Prettier
- `pnpm typecheck` — Run TypeScript type checking

## Requirements

- Node.js >= 18
- pnpm
- RAGE Multiplayer server (ragemp-server.exe in project root)

## License

MIT
