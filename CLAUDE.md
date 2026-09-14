# e2e-web — Project Map

## Framework / Runtime
Node >= 20 + Express 4 (CommonJS, `"type": "commonjs"`).

## Key Directories
- `public/` — static assets served at `/` by `express.static`
- `test/`   — `node --test` suites, one file per source module (`<module>.test.js`)

## Entry Points
- `server.js` — exports `createApp()` / `start()`; self-starts when run directly (`npm start`)
- `public/index.html` — the served page

## Conventions
- `server.js` exports `createApp()` so tests can mount the app on an ephemeral
  port (`app.listen(0)`) instead of spawning a process — follow this rather than
  hard-coding a port in tests.
- JSON endpoints are registered inside `createApp()` and reply with a flat
  object via `res.json()` (`/health` → `{ status: 'ok' }`,
  `/version` → `{ version }`). No envelope wrapper.
- Values that already exist in `package.json` (e.g. version) are read from it
  rather than duplicated as literals.

## Test Framework
Node's built-in test runner (`node --test`, via `npm test`) with
`node:assert/strict`. No external test dependency — do not add one.
