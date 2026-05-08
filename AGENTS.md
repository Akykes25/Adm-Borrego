# AGENTS.md

## Project Context

This is a real estate web application project. Treat the codebase as a production-oriented business system, not as an experimental prototype.

Prioritize maintainability, clarity, security, predictable behavior, and low-risk changes.

The main working stack may include TypeScript, React, Tailwind CSS, Supabase/PostgreSQL, Playwright, and general web application testing practices.

When making changes, preserve existing business logic unless the user explicitly asks to modify it.

---

## Default Behavior

Work in a concise, practical, and token-efficient way.

Prefer direct answers, concrete steps, and specific file-level recommendations.

Avoid long explanations unless the task requires architecture, debugging, risk analysis, or teaching.

Do not add unnecessary comments, abstractions, dependencies, libraries, or architectural complexity.

Before editing code, understand the current structure and identify the smallest safe change.

When uncertain, inspect the relevant files before proposing or applying changes.

Do not assume framework versions, file paths, database schema, environment variables, or deployment details without checking the project.

---

## Skill Usage Policy

Before starting any meaningful task, consider the project skills available under:

.opencode/skills/

Use the native skill tool to load the skills required before working.

Always load and follow `caveman` by default for every conversation and response, unless the user explicitly asks for `normal mode` or `stop caveman`.

Always load and follow `typescript-expert` by default for every meaningful coding, debugging, review, refactor, configuration, or architecture task, because this project is TypeScript-first.

Do not ignore project skills when they apply to the current task.

Do not load every optional skill by default. Beyond the base skills (`caveman` and usually `typescript-expert`), infer from the conversation context which additional skill is relevant and load only those needed, because loading unnecessary skills wastes context and tokens.

If the user explicitly mentions a skill by name, load that skill before answering or working.

If the user asks for shorter answers, token saving, compressed output, minimal wording, or mentions "caveman", immediately load and follow the `caveman` skill.

Use conversation context to decide optional skill routing even when the user does not name the skill explicitly. Examples: UI/component/page/layout work should load `frontend-design`; Tailwind class/responsive styling work should load `tailwind-css-patterns`; Supabase/PostgreSQL/schema/RLS/query/auth work should load `supabase-postgres-best-practices`.

Use the following routing rules:

- Always load `caveman` as the default response style.
- Always load `typescript-expert` for coding, debugging, review, refactor, configuration, architecture, and TypeScript/React tasks.
- For finding, auditing, or recommending skills, load `find-skills`.
- For UI, layout, visual hierarchy, component polish, or UX improvements, load `frontend-design`.
- For Tailwind CSS classes, responsive design, spacing, layout, and styling patterns, load `tailwind-css-patterns`.
- For TypeScript types, React typing, refactors, interfaces, generics, type safety, and compiler errors, load `typescript-expert` if not already loaded.
- For Supabase, PostgreSQL, SQL, RLS, database schema, migrations, queries, auth, policies, and multi-tenant data access, load `supabase-postgres-best-practices`.
- For Playwright, browser automation, E2E testing, selectors, test reliability, and debugging tests, load `playwright-best-practices`.
- For general web app testing strategy, test planning, regression coverage, and QA flows, load `webapp-testing`.

If multiple skills apply, load the most specific skill first. Load a second skill only if it clearly improves the result.

---

## Response Style

Use Spanish when speaking with the user unless the user asks otherwise.

Use simple, professional Spanish.

Be direct and concrete.

When giving instructions, prefer step-by-step sequences.

When giving code, provide complete usable snippets, not vague fragments.

When the user is debugging, explain:
1. What is probably happening.
2. How to verify it.
3. What to change.
4. How to test that it worked.

When the user asks for a command, config file, prompt, skill, or document, provide the exact content ready to copy.

---

## Code Quality Rules

Prefer small, safe, incremental changes.

Do not rewrite large parts of the project unless the user explicitly asks for a refactor.

Preserve existing naming conventions, folder structure, formatting style, and project patterns.

Use TypeScript safely:
- Avoid `any` unless there is a strong reason.
- Prefer explicit types for public functions, API payloads, and database records.
- Handle null and undefined states clearly.
- Do not silence type errors without fixing the cause.

For React:
- Keep components focused and readable.
- Avoid unnecessary state.
- Avoid duplicating business logic in components.
- Extract helpers only when it improves clarity.
- Preserve existing UI behavior unless asked to change it.

For Tailwind:
- Keep class usage readable.
- Avoid excessive visual complexity.
- Prefer consistent spacing, responsive behavior, and accessible contrast.
- Do not introduce a new design system unless requested.

For Supabase/PostgreSQL:
- Treat RLS and tenant isolation as critical.
- Never weaken security policies casually.
- Always consider tenant_id isolation when dealing with multi-tenant data.
- Avoid destructive queries unless the user explicitly approves them.
- Prefer migrations or clearly documented SQL changes over manual unclear edits.
- Check whether the project already has existing schema patterns before proposing new tables or columns.

For tests:
- Prefer tests that verify real user behavior.
- Avoid brittle selectors.
- Use stable selectors when available.
- Add regression coverage when fixing bugs.

---

## Safety and Permissions

Do not run destructive commands without explicit confirmation.

Do not delete files, reset branches, drop tables, overwrite configuration, or remove dependencies unless the user clearly asks for it.

Before using commands that modify many files, explain what will be changed.

Before changing dependencies, check the current package manager and existing lockfile.

Do not expose secrets, tokens, API keys, private URLs, database passwords, or environment variables.

If secrets are found in files, warn the user and recommend rotating them.

---

## Git and Project Hygiene

Before making code changes, check the current project state when useful.

Prefer:
- Reading relevant files first.
- Making the smallest correct change.
- Summarizing changed files after editing.
- Suggesting a simple verification command.

Do not commit automatically unless the user asks.

Do not push automatically unless the user asks.

Never include `node_modules` in Git.

Respect `.gitignore`.

---

## Debugging Workflow

When debugging, follow this order:

1. Reproduce or understand the reported behavior.
2. Locate the exact files, functions, components, routes, queries, or workflows involved.
3. Identify the most likely cause.
4. Apply the smallest safe fix.
5. Explain how to test the fix.
6. Mention any remaining risk or follow-up improvement.

Do not guess blindly when the codebase can be inspected.

---

## Final Answer Format

For normal explanations, use this structure:

1. Brief diagnosis.
2. Recommended solution.
3. Exact steps or code.
4. How to verify it.
5. Optional improvement.

For very simple tasks, answer directly without unnecessary structure.

If the `caveman` skill is active, prioritize maximum brevity over this format.
