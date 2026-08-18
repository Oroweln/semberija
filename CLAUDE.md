# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Start development server
npm run build        # Build for production (outputs to build/)
npm run preview      # Preview production build locally
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
```

No test runner or linter is configured in this project.

## Architecture

This is a **SvelteKit 2 + Svelte 5** app using `@sveltejs/adapter-node` for Node.js deployment. It is a bilingual (Serbian/English) business directory for the Bijeljina/Semberija region of Bosnia and Herzegovina.

**Production deployment**: Build outputs `build/index.js`. The `server.cjs` file is the Node.js entry point — it dynamically imports `./index.js` (the built output). Run in production with `node server.cjs` from the project root after building.

**Svelte 5 runes**: The codebase uses Svelte 5 syntax throughout — `$state`, `$derived`, `$effect`, `$props`, `{@render children()}` in place of `<slot>`. Do not use Svelte 4 syntax.

**Static data**: All content (companies, categories, networking posts) is hardcoded in `src/lib/data.ts`. There is no database or API. To add or edit listings, edit that file directly.

**i18n**: Translations live in `src/lib/i18n.svelte.ts` as a hand-rolled Svelte 5 class store (`I18nStore`) with inline `sr` and `en` translation objects. Import and use via `import { i18n } from '$lib/i18n.svelte'` — `i18n.t` returns the active translation object, `i18n.lang` is `'sr' | 'en'`, and `i18n.toggle()` switches languages. The `svelte-i18n` package listed in `package.json` is installed but not used.

**CSS design system**: All design tokens (colors, fonts, spacing, shadows, border radii) are CSS custom properties defined globally in `src/routes/+layout.svelte` under `:global(:root)`. Key tokens: `--emerald: #0f3d3e`, `--gold: #c8a96a`, `--beige: #f4f1ec`, `--dark: #1a1a1a`, `--font-serif: 'Playfair Display'`, `--font-sans: 'Inter'`, `--max-w: 1280px`. Fonts are loaded from Google Fonts in `src/app.html`.

**Route structure**: All routes use Serbian-language slugs — `/firme` (companies), `/kategorije` (categories), `/umrezavanje` (networking), `/prilike` (opportunities), `/usluge` (digital services), `/oglasi` (advertising), `/kontakt` (contact), `/legal/*` (privacy, terms, cookies, GDPR, disclaimer). `+layout.svelte` wraps all routes with `<Nav>`, `<main>`, and `<Footer>`.

**Contact form**: The form in `src/routes/kontakt/+page.svelte` is frontend-only — submission sets a `submitted` flag locally and shows a success state. There is no `+page.server.js` action yet. Email sending (nodemailer) is configured in `src/lib/config.server.js` but not yet wired to any route handler.

**Email (nodemailer)**: `src/lib/config.server.js` holds SMTP credentials. It must be filled in before building for production. `example.config.server.js` is the committed template — never commit `config.server.js` with real credentials. The config exports `emailConfig` and `validateEmailConfig()`.

**AdPlaceholder**: `src/lib/components/AdPlaceholder.svelte` renders styled placeholder ad slots. It accepts a `variant` prop (`leaderboard`, `banner`, `sidebar`, `square`) and a `label` string. These are visual placeholders for future real ad integrations.

**Security headers**: `src/hooks.server.js` applies security headers on every response: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. The CSP allows inline scripts (required by SvelteKit hydration) and Google Fonts.
