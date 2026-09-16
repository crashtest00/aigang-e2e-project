# e2e-web — Project Map

## Framework / Runtime
Node >= 20 + Express 4 (CommonJS, `"type": "commonjs"`).

## Key Directories
- `public/` — static assets served at the web root by `express.static`
- `test/` — `node --test` suites, one file per source module (`<module>.test.js`)

## Entry Points
- `server.js` — the whole server; exports `{ createApp, start }` and self-starts
  only under `require.main === module`
- `public/index.html` — static landing page

## Conventions
- Routes are registered inside `createApp()` in `server.js`; the app factory is
  exported so tests can mount it on an ephemeral port (`app.listen(0)`) instead
  of spawning a process.
- JSON endpoints return a flat, single-purpose object via `res.json()` —
  `/health` → `{ status: 'ok' }`, `/version` → `{ version }`. No envelope.
- Values the deployed artifact must not drift from (e.g. the version string)
  are read from `package.json` rather than hardcoded.

## Test Framework
Node's built-in test runner (`node --test`) with `node:assert/strict` —
`npm test`. No external test dependency; do not add one.
Tests make real HTTP requests against a real listening server.
