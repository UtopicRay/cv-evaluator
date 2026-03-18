# AGENTS.md

This file guides agentic coding in this repository.
Keep changes focused, follow existing conventions, and avoid introducing secrets.

## Quick Facts
- Stack: Next.js App Router, React 19, TypeScript, Tailwind CSS.
- Data: Prisma with PostgreSQL; generated client in `lib/generated/prisma`.
- Hosting: `next.config.mjs` disables lint/type errors during build.
- Aliases: `@/*` maps to project root via `tsconfig.json`.

## Commands
Use npm unless the team requests pnpm (both lockfiles exist).

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

### Tests
No test runner is configured (no `test` script or config found).
If adding tests, also add a `test` script and document single-test usage.

### Single-file / Single-test Guidance
- Lint a file: use `next lint` with `--file` (e.g. `npm run lint -- --file app/page.tsx`).
- Type checking: `tsc --noEmit` (not in scripts, but usable).
- No single-test command exists until a test runner is added.

### Prisma / DB
- Generate client: `npx prisma generate`
- Migrate (if needed): `npx prisma migrate dev`
- Schema: `prisma/schema.prisma`

## Code Style and Conventions

### General TypeScript
- Use TypeScript for app, API routes, and components.
- Prefer explicit types for function boundaries, especially API inputs/outputs.
- Keep modules small; extract utilities to `lib/` or `hooks/`.
- Avoid `any` unless interoperating with external libraries.

### Imports
- Use absolute imports via `@/` for internal modules.
- Group imports in this order:
  1) External libs
  2) Internal `@/` imports
  3) Relative imports
- Keep import lines short; prefer one item per line for long named imports.

### Formatting
- Follow existing file style; most files use double quotes and no semicolons.
- Keep JSX props aligned and readable; avoid excessive inline logic.
- Prefer trailing commas in multi-line objects/arrays.

### Naming
- Components: `PascalCase` filenames and exports (`DashboardLayout`).
- Hooks: `useSomething` (note existing `UseAnalizeDocument` is nonstandard; avoid replicating).
- Files: kebab-case or lower-case where already used (`left-side-info.tsx`).
- Types: `PascalCase`; interfaces for object shapes.

### React / Next.js
- App Router conventions under `app/`.
- Mark client components with `"use client"` at top of file.
- Use `next/link` for navigation; avoid raw anchors for internal routes.
- Use `Metadata` in `app/layout.tsx` for page metadata.

### API Routes
- Use `NextResponse` for responses in `app/api/**/route.ts`.
- Validate request payloads and return clear status codes.
- Avoid logging secrets; return generic errors for unexpected failures.

### Error Handling
- Use `try/catch` in API routes and external calls.
- Provide actionable error messages for user-facing errors.
- For internal errors, log minimally and return `500` with a generic message.

### Security & Secrets
- Do not commit secrets; use `.env` for credentials.
- Avoid hard-coded API keys; use `process.env.*` instead.
- If you discover a secret in code, flag it and replace with env usage.

### Styling
- Tailwind CSS for styling; use `cn` helper in `lib/utils.ts`.
- Reuse existing UI components in `components/ui/`.
- Prefer `className` composition using `cn` when conditional.

### Data / Prisma
- Use the singleton Prisma client from `lib/prisma.ts`.
- Avoid creating new Prisma clients inside request handlers.
- Update schema in `prisma/schema.prisma` and regenerate client.

## Repository Layout
- `app/` routes, pages, and API handlers (App Router).
- `components/` UI and feature components.
- `lib/` utilities, Prisma client, integrations.
- `hooks/` custom hooks.
- `prisma/` database schema.

## Linting and Types
- `next lint` is the only lint step configured.
- Type errors are ignored during build by config; still keep types correct.
- If adding stricter lint/type checks, document them here.

## Cursor / Copilot Rules
No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
If added later, update this file to include and summarize them.

## Editing Guidance for Agents
- Keep changes small and scoped to the request.
- Preserve existing Spanish UI copy unless asked to change it.
- Prefer consistent casing and conventions already in the file you edit.
- Avoid changing generated files (e.g., `.next/`, Prisma client output).

## When You Add New Tooling
If you add tests, formatters, or linters, update this file with:
- install command
- run command
- single-test/example usage
- relevant config file locations
