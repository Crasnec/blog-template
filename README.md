# Blog Template

An Astro template for technical writing, with Markdown and MDX, animated
diagrams, scientific plots and code that readers can edit and run in the browser.

[Use this template](https://github.com/Crasnec/blog-template/generate) to create
an independent repository with your own content and history.

## Included

- Responsive layouts, light and dark modes, and three visual themes
- Markdown and MDX, highlighted code, Mermaid, KaTeX, tables and callouts
- Categories, tags, archives, pagination and a table of contents
- Pagefind search, generated social images, favicons and a sitemap
- Reusable animated diagrams for queues, sorting, paths, trees, hashing,
  scheduling, memory, sequence messages and state machines
- Thirty statistical plots, including distribution, regression, time-series,
  survival and classification views
- Typed TSX figure composition imported into MDX, including bespoke SVG figures
- Editable JavaScript, TypeScript and Python, with custom TextMate grammars
- Approved NumPy, pandas, SciPy, Matplotlib and Seaborn packages, loaded as needed
- Optional author-encrypted posts and moderated repository-backed comments
- Checks on pushes and pull requests, plus an optional GitHub Pages deployment

All included articles are editable examples. No author keypair, comment data,
credentials or production deployment target is included.

## Start your blog

Requirements: Node.js **22.12 or newer**, npm and Git. CI uses Node.js 24.

1. Select **Use this template → Create a new repository** on GitHub.
2. Clone your new repository and enter its directory.
3. Install the locked dependencies and start the server:

```bash
npm ci
npm run astro -- dev --background
```

No environment variables, tokens or encryption keys are needed to preview,
check or build a public blog. The first development server start or build
downloads the pinned scientific Python wheels from their official
distributions and verifies their SHA-256 digests. Later runs use the cache.

Manage the server with:

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Make it yours

| File | What to change |
| --- | --- |
| [`src/config.ts`](src/config.ts) | Interface locale, site URL, title, subtitle, description, profile, links, categories and navigation |
| [`src/assets/profile-avatar.png`](src/assets/profile-avatar.png) | Replace the neutral placeholder with your own image |
| [`src/content/pages/about.md`](src/content/pages/about.md) | Introduce yourself |
| `src/content/posts/` | Replace the example articles or keep the ones useful to your readers |
| [`src/theme.config.mjs`](src/theme.config.mjs) | Select `swiss`, `graphite` or `slate` |

Set `siteConfig.url` to your real origin before publishing outside the included
Pages workflow. This value controls canonical links, social images, robots.txt
and the sitemap. `https://example.com` is a placeholder.

The Pages workflow automatically supplies `SITE_URL` and `SITE_BASE` from the
destination repository's Pages configuration, supporting project subpaths,
user sites and custom domains. For another host, these optional build-time
environment variables can override the origin and base path:

```bash
SITE_URL=https://example.com SITE_BASE=/notes npm run build
```

Write example-to-example links relative to the current article, as the included
guides do. For site-absolute links in Astro components, use
[`sitePath()`](src/utils/url.ts); in MDX, import the helper and use it in an
`<a>` element. A literal Markdown link to `/about/` points at the domain root
and needs a prefix on a project site. Rebuild from a clean cache after changing
the deployment base, a Markdown plugin, content schema or theme.

See [`src/styles/themes/README.md`](src/styles/themes/README.md) for theme
tokens, typography and layout overrides.

## Language and date formatting

Set the interface language in `src/config.ts`:

```ts
export const siteConfig = {
  locale: "ko", // "en" (default) or "ko"
  // Keep your other site settings here.
};
```

Rebuild with `npm run build:clean` after changing it. In development, restart
the server so server-rendered messages and browser bundles use the same locale.
No additional dependencies are needed.

The locale applies to navigation, search, comments, locked-post controls,
figure replay controls, code playground controls and status messages,
CodeMirror's built-in find/replace panel, default category names, post counts,
reading times, document language, sharing metadata and the search index.
Category keys and post URLs stay the same. You can still replace category
display names in `src/config.ts` with your own labels.

Pagefind selects its index from the document language. Korean search works,
but the bundled release does not provide Korean stemming: related word forms
are not automatically treated as the same search term.

The formatters in [`src/utils/format.ts`](src/utils/format.ts) use the same
setting throughout listings, archives, articles, comments and social images:

| Display | `en` | `ko` |
| --- | --- | --- |
| Full date | October 21, 2026 | 2026년 10월 21일 |
| Compact date | 2026 · 10 · 21 | 2026. 10. 21. |
| Archive month/day | 10 · 21 | 10. 21. |
| Archive year | 2026 | 2026년 |
| Revision in the same year | Updated October 21 | 10월 21일 수정 |
| Revision in another year | Updated October 21, 2027 | 2027년 10월 21일 수정 |
| Post count | 1 post / 2 posts | 1개의 글 / 2개의 글 |
| Reading time | 3 min | 3분 |

Dates are formatted in **UTC**, independent of the reader's device timezone.
Locale changes the display, not the stored instant or calendar policy. Write
frontmatter dates as ISO `YYYY-MM-DD`, for example `published: 2026-10-21` and
`updated: 2027-10-21`. Machine-readable `<time datetime>`, JSON-LD dates and
publication timestamps retain their ISO formats.

One locale is selected for the whole site at build time. This does not generate
translated posts, language-prefixed routes or a language switcher. Post prose,
titles, descriptions, tags, custom site/profile text, and diagram data, units
and labels remain exactly as authored. Example articles and project
documentation stay in English. Compiler errors and third-party runtime
diagnostics retain their original text; surrounding controls and status
messages use the selected locale.

Interface messages live in [`src/locales/`](src/locales/). The Korean catalog
must contain every English key, and checks verify that interpolation
placeholders match. Add new common messages to both catalogs. CodeMirror's
own phrase map is in `src/locales/editor.ts`.

## Write a post

The full path below `src/content/posts/` becomes the URL below `/posts/`.
For example, `src/content/posts/backend/cache-invalidation.md` becomes
`/posts/backend/cache-invalidation/` before any deployment base.

```yaml
---
title: Cache invalidation without guesswork
published: 2026-10-21
description: A short summary for listings and metadata.
category: backend
tags: [caching, performance]
draft: false
---
```

`title`, `published` and `category` are required. Category keys are declared in
`src/config.ts`; tags are free-form. `updated` is an optional date. Drafts are
visible during development and excluded from production builds.

Use `.mdx` when a post imports components. Keep post-specific datasets and TSX
compositions in a neighbouring `_figures/` directory; these files are not posts.
After removing the sample articles, you may also remove their `_figures/` and
`_playground/` helpers. Browser tests reference the sample routes, so update or
remove the corresponding example tests when replacing those pages.

## Diagrams and executable examples

Read the included guides and component references:

- [Markdown and MDX](src/content/posts/build/markdown-and-mdx-features.mdx)
- [Animated figures and TSX composition](src/content/posts/build/animated-figures.mdx)
- [Thirty statistical figures](src/content/posts/build/statistical-figures.mdx)
- [JavaScript, TypeScript, Python and TextMate grammars](src/content/posts/build/browser-code.mdx)
- [Figure input contracts and visual checks](src/figures/README.md)
- [Statistical conventions and limits](src/figures/statistics/README.md)
- [Playground props, isolation and package policy](src/playground/README.md)

Example MDX:

```mdx
import { Boxplot } from "../../../components/figures";
import CodePlayground from "../../../components/CodePlayground.astro";

<Boxplot props={{ groups: [{ label: "Sample", values: [1, 2, 3, 4, 9] }] }}
  caption="The central half of the observations and their spread." />

<CodePlayground language="python" code={`from statistics import mean
print(mean([1, 2, 3, 4, 9]))`} />
```

Adjust relative import paths to the depth of your article. Figure captions and
replay controls retain their space throughout playback. Plots respect the
current theme and reduced-motion preference.

Python runs in a Worker using the pinned official Pyodide runtime. Scientific
packages are limited to an approved dependency graph and hosted on the same
origin as the site. Matplotlib and Seaborn output PNG images that readers can
download. No arbitrary npm or PyPI packages are automatically installed.

## Checks

```bash
npm run check       # Astro types, ESLint and Node tests
npm run build       # Static HTML, assets and Pagefind index
npm run preview     # Serve dist/
npm run build:clean # Rebuild after changing themes, plugins, schema or base
```

With the development server running:

```bash
npm run test:figures:browser
npm run test:playground:browser
npm run test:locale:browser
npm run figures:shot -- /posts/build/statistical-figures/
```

Browser checks use the existing Playwright dependency. On a new machine, install
its Chromium browser once with `npx playwright install chromium`. Linux CI may
also need its system dependencies: `npx playwright install --with-deps chromium`.
Node tests and the default CI workflow do not require a browser installation.

Use `FIGURES_BASE` or `PLAYGROUND_BASE` to target a running server explicitly.
For locale checks, use `LOCALE_BASE` and `EXPECTED_LOCALE=en` or
`EXPECTED_LOCALE=ko` to verify an existing build of that locale. These test
variables do not change the site's configured language.
Screenshot options are documented in the figure reference. Inspect screenshots
at mobile and desktop widths in both themes before publishing a figure change.

## Deploy

The build output is `dist/`. Any static host can serve it. On hosts with
extensionless routes, enable directory index files so `/about/` serves
`about/index.html`.

For GitHub Pages in the **new repository**:

1. Open **Settings → Pages** and select **GitHub Actions** as the source.
2. Open **Actions → Deploy to GitHub Pages → Run workflow**.
3. To deploy automatically after pushes to `main`, add an Actions repository
   variable named `PAGES_ENABLED` with value `true`.

The workflow builds and uploads `dist/` to that repository's Pages site using
GitHub's standard token and official Pages actions. No deploy key, external
Pages repository or comment token is required. The template's CI workflow runs
independently, even while deployment is disabled.

For a custom domain, configure it in Pages settings and add `public/CNAME` with
your domain if required by your hosting setup. The workflow reads the configured
Pages origin and base path. See the [Astro Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Optional encrypted posts

Generate your own keypair before sealing any post:

```bash
npm run secret:keygen
npm run secret:seal -- secrets/private-note.md
npm run secret:open -- src/content/posts/private/private-note.md
npm run secret:rekey
```

Plaintext lives in the ignored `secrets/` directory. Commit only the sealed post
and the generated `keys/public.json` and `keys/private.json`. The latter contains
the passphrase-wrapped private key, which the reader needs for local decryption.
Keep the passphrase separate. Title, date, category and tags remain public.

Each new blog needs its own keypair. The template contains none. See the
[encrypted-post guide](src/content/posts/backend/private-posts-and-comments.md)
and [`src/utils/secret.ts`](src/utils/secret.ts) for the format and boundaries.

## Optional comments

Comments are disabled by default. To enable them, create your own public,
data-only comment repository using the files and instructions in
[`examples/comments/`](examples/comments/README.md). That example is not an
active workflow in the blog repository.

Copy `.env.example` to `.env` for local use, then set:

```dotenv
PUBLIC_COMMENTS_REPO=YOUR_NAME/YOUR_COMMENT_STORE
PUBLIC_COMMENTS_TOKEN=YOUR_FINE_GRAINED_TOKEN
```

The token is intentionally shipped to the browser. Restrict it to the comment
repository with **Actions: read and write**; never grant it access to your blog
source or use a broad personal token. This exposes the comment repository's
Actions API, so the separate repository and limited permission scope matter.
Set the repository as an Actions variable and the token as an Actions secret
with the same names for deployment. The token's secret storage does not prevent
its inclusion in the generated public page.

New comments have `approved: false`. Change this to `true` in the comment store,
then rebuild or manually run the Pages workflow. The template has no hourly
deployment schedule. Run `npm run comments:pull` to refresh local comments.
Comment Markdown is restricted; raw HTML, images and unsafe links are removed.

## Project structure

```text
.github/workflows/  CI and optional same-repository Pages deployment
examples/comments/ Optional standalone comment-store workflow
scripts/           Build assets, comments, screenshots and encryption tools
src/components/    Astro and typed TSX components
src/content/       Editable example posts and the About page
src/figures/       Reusable drawing kinds, models and statistical calculations
src/layouts/       Site and article layouts
src/pages/         Static routes and generated assets
src/playground/    Editors, execution workers, grammars and Python package policy
src/plugins/       Markdown processing
src/scripts/       Browser behaviour
src/styles/        Layout, prose, motion and three themes
test/              Unit and browser checks
```

`dist/`, `.astro/`, `.comments/`, `.cache/python/`, `node_modules/`, `secrets/`,
local `.env*` files and screenshot output are ignored. Only `.env.example` is
tracked as a blank configuration reference.

## License

[MIT](LICENSE). Included dependencies retain their respective licenses.
