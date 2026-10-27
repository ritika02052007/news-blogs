
PROJECT
"News Blog Performance Optimization" - an article manager for news blog staff 
Stack: React 18 + Vite (JavaScript, no TypeScript), Vitest + React Testing Library + @testing-library/user-event + jsdom, ESLint (react, react-hooks, jsx-a11y plugins). 
No backend: use a mock async service backed by localStorage.

USER STORIES (happy path)
1. As a user, I can clearly access the interface and complete my main task: see the article list with summary stats (total articles, total views, top article), search by title/author, filter by category, add an article, delete an article (with confirmation), and OPEN an article to read its details.

2. As a user, the system responds quickly to my input: simulated service delay of about 400ms, search debounced at 300ms, no full-screen blocking loaders.

3. As a manager, data is structured consistently: every article is { id, title, author, category, views (non-negative integer), publishedAt (YYYY-MM-DD), content (string) }.

"OPEN ARTICLE" FEATURE
- Each table row has a "View" button (aria-label "View article <title>").
- It opens an accessible detail dialog (role="dialog", aria-modal="true", aria-labelledby the title) showing title, author, category, views, published date and full content.

- Escape key and a "Close" button close it; focus moves into the dialog on open and returns to the triggering button on close; Tab is trapped inside while open.
- Opening an article logs the analytics event "article_viewed".
- The add form has an extra optional-but-validated "Content" textarea (max 2000 chars). Seed data must include content text for all 7 seed articles.

UNHAPPY PATH 
- Empty states: an empty list OR a search/filter with no matches shows a friendly "No data found" message, never a blank screen. "No data found" must not flash before the first load finishes.
- Bad connectivity: a visible loading indicator (role="status") during every async operation (load, add, delete). Errors show a message (role="alert") with a Retry button. The failure rate of the mock service is 0 by default; add a "Simulate network error" checkbox in the UI that makes the next service calls fail, so I can test this manually.
- Invalid inputs: block submit if title < 5 chars, author/category empty, views missing/negative/decimal, content > 2000 chars. Highlight offending fields in red (aria-invalid="true" + inline error text linked with aria-describedby). If saving fails, keep the user's typed data in the form.

NON-FUNCTIONAL REQUIREMENTS
- Accessibility: target 100% Lighthouse accessibility. Semantic landmarks (header, main), single h1, logical heading order, table with caption and th scope, every input has a real <label>, every button has an accessible name, fully keyboard navigable, visible focus ring, sufficient color contrast, lang attribute on <html>, aria-live for status messages.
- Telemetry: on each completed primary action (add, delete, view, search, filter change) call trackEvent(action) which logs: "[Analytics] User interacted with Performance Optimization - <action>". Log exactly once per action (no duplicates).
- Security: sanitize every text input BEFORE it is stored in state. Sanitizer must strip HTML tags and angle brackets and "javascript:" patterns but keep normal text readable (e.g. "Tom & Jerry" and "Council's" must display unchanged; React already escapes on render, so do NOT HTML-entity-encode). Never use dangerouslySetInnerHTML.
- Performance: wrap derived computations (filtered list, stats, categories) in useMemo; stabilize handlers with useCallback; use React.memo for pure components (rows, table, stats, filter bar, form).
- Design: clean monochromatic corporate design system using only CSS variables defined once in :root (grays + white). The ONLY non-gray color allowed is a single --error red for invalid fields/errors. No hard-coded hex colors outside :root. Spacing only in 16px / 32px steps (use --space-1: 16px, --space-2: 32px). Responsive table (horizontal scroll on small screens). Respect prefers-reduced-motion.

REQUIRED STRUCTURE
src/components (Header, StatsBar, SearchFilterBar, ArticleTable, ArticleRow, ArticleForm, ArticleDialog, LoadingSpinner, EmptyState, ErrorMessage), src/services/articleService.js, src/utils (sanitize, validate, filterArticles, analytics), src/__tests__, src/setupTests.js, README.md, PROMPTS.md.

PHASE 1 - TESTS ONLY (do this now)
1. Create package.json with ALL dependencies and devDependencies (including vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, eslint + plugins) so that a fresh `npm install && npm test` works. Configure Vitest (jsdom, setupFiles) and the lint script (`eslint . --ext .js,.jsx --max-warnings 0`, ignore dist).
2. Write the complete test suite first, covering every acceptance criterion above:
   - happy path: loading then list + stats, search, category filter, add article (analytics logged exactly once, form cleared), delete with confirm, open/close article dialog (focus, Escape, analytics).
   - unhappy path: empty list, no search matches, error + Retry, "Simulate network error", invalid form fields (aria-invalid on each), failed save keeps typed data, XSS payloads (<script>, <img onerror>, javascript:) are sanitized, "Tom & Jerry" stays unchanged.
   - unit tests for sanitize, validate, filterArticles, trackEvent.
3. Run the suite and SHOW me the output proving the tests FAIL (red) because no implementation exists yet.
4. STOP and wait for my message "proceed".

PHASE 2 - IMPLEMENTATION (only after I say "proceed")
1. Implement the minimum code to make all tests pass, following the structure and rules above.
2. Run `npm test` (all green), `npm run lint` (zero warnings, no unused imports) and `npm run build`, and show me the outputs.
3. Do not change the tests to make them pass unless a test is genuinely wrong; tell me if so and why.

PHASE 3 - DOCS
1. README.md: how to run, test, lint, build, deploy; list of edge cases handled.
2. Do not create PROMPTS.md content yourself; I will paste my real prompts into it.

RULES
- Never hardcode API keys or personal data.
- If something fails or the UI breaks, tell me the exact error and propose a different approach instead of silently rewriting unrelated files.
- Keep code clean, commented where non-obvious, and consistent in style.