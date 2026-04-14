# AGENTS.md

Guide for agentic coding in this repository.
Use this file to make safe, consistent changes that match project conventions.

## Project Snapshot
- Framework: Next.js 15 App Router + React 19 + TypeScript (`strict: true`).
- Styling: Tailwind CSS 4 with shared helpers in `lib/utils.ts`.
- Data layer: Prisma + PostgreSQL.
- Generated Prisma client location: `lib/generated/prisma`.
- Path alias: `@/*` -> project root (configured in `tsconfig.json`).
- Build config note: `next.config.mjs` ignores type and lint errors during production build.

## Package Manager and Runtime
- Preferred package manager: `npm`.
- `pnpm-lock.yaml` also exists; use pnpm only if explicitly requested.
- Node version is not pinned in repo; use a modern LTS version compatible with Next.js 15.

## Core Commands
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Run lint checks: `npm run lint`

## Lint, Typecheck, and Test Commands
- Lint entire project: `npm run lint`
- Lint one file: `npm run lint -- --file app/page.tsx`
- Type check (manual): `npx tsc --noEmit`
- Format command: not configured (no Prettier script found).

### Test Status (Current)
- No test runner is configured in `package.json` scripts.
- No Jest/Vitest/Playwright/Cypress config files were found.
- There is currently no working `npm test` command.

### Single-Test Guidance
- Not available yet because no test framework is installed.
- If you add a test framework, add and document all of:
  - `test` script
  - `test:watch` script
  - single-test command examples
- Recommended future examples (after setup):
  - Vitest single file: `npm run test -- src/foo/bar.test.ts`
  - Vitest by name: `npm run test -- -t "renders upload state"`
  - Jest single file: `npm run test -- src/foo/bar.test.ts`

## Prisma and Database Workflow
- Prisma schema source: `prisma/schema.prisma`.
- Generate Prisma client: `npx prisma generate`.
- Create/apply dev migration: `npx prisma migrate dev`.
- Do not edit generated files under `lib/generated/prisma` manually.
- Use the shared Prisma singleton from `lib/prisma.ts`.

## Repository Layout
- `app/`: App Router routes, layouts, pages, and API route handlers.
- `components/`: reusable React components and UI building blocks.
- `hooks/`: custom React hooks.
- `lib/`: utilities, integrations, Prisma client glue, domain helpers.
- `prisma/`: schema and migration history.
- `const/` and `type/`: shared constants and type definitions.

## Coding Standards

### TypeScript
- Keep code in TypeScript (`.ts` / `.tsx`) for app and API code.
- Prefer explicit types on exported functions and API boundaries.
- Avoid `any`; use `unknown` + narrowing when needed.
- Reuse shared types from `type/index.ts` or colocated module types.
- Keep `strict`-mode compatibility even though build ignores type errors.

### Imports
- Prefer `@/` absolute imports for internal modules.
- Import order:
  1) third-party packages
  2) `@/` internal imports
  3) relative imports
- Keep imports minimal; remove unused imports promptly.

### Formatting and File Style
- Follow existing local style in each file.
- Current project style generally uses:
  - double quotes
  - no semicolons
  - trailing commas in multiline literals
- Keep JSX readable; extract complex inline expressions into variables/helpers.

### Naming Conventions
- React components: `PascalCase` names and exports.
- Component filenames: follow existing pattern in folder (mostly kebab-case or lowercase).
- Hooks: `useXxx` convention for new hooks.
- Types/interfaces: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants; otherwise match local file patterns.

### React and Next.js
- Use App Router conventions and colocate route files under `app/`.
- Add `"use client"` only when client behavior is required.
- Prefer server components by default in App Router.
- Use `next/link` for internal navigation.
- Use route-level `loading.tsx` / `not-found.tsx` when appropriate.

### API Routes
- Place handlers in `app/api/**/route.ts`.
- Use `NextResponse` for consistent JSON and status handling.
- Validate request input (zod is available in dependencies).
- Return clear 4xx messages for user-fixable issues.
- Return generic 500 messages for unexpected server errors.

### Error Handling and Logging
- Wrap external I/O and parsing operations in `try/catch`.
- Never leak secrets/tokens in logs or error payloads.
- Keep logs concise and actionable.
- Fail fast on invalid input; avoid silent fallbacks that hide bugs.

### Security and Secrets
- Never commit credentials or `.env*` contents.
- Read secrets via `process.env.*`.
- Sanitize data from uploads and external providers.
- If a secret is discovered in code, replace with env access and flag it.

### Styling and UI
- Use Tailwind utility classes and existing UI primitives.
- Prefer `cn(...)` helper from `lib/utils.ts` for conditional classes.
- Reuse patterns from `components/ui/` before creating new primitives.
- Preserve existing Spanish copy unless task explicitly requests text changes.

## Agent Workflow Rules
- Keep edits focused and minimal for the requested task.
- Do not refactor unrelated areas opportunistically.
- Avoid modifying generated artifacts (`.next/`, Prisma generated client output).
- Update docs when introducing new scripts, tooling, or conventions.
- If adding tests/tooling, extend this file with exact commands and single-test usage.

## Cursor and Copilot Rules Check
- Checked paths:
  - `.cursor/rules/`
  - `.cursorrules`
  - `.github/copilot-instructions.md`
- Current status: none of these files exist in this repository.
- If they are added later, summarize their rules here and note precedence.

## Source of Truth Priority for Agents
- First: direct user task instructions.
- Second: this `AGENTS.md`.
- Third: tool-specific or editor-specific guidance files (Cursor/Copilot), if added.

## When Updating This File
- Keep command examples copy-paste ready.
- Prefer concrete paths over generic wording.
- Include single-file and single-test instructions whenever tooling supports them.
- Document new config file locations when adding tooling.
