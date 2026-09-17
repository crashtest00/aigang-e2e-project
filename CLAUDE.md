# e2e-web — Project Map

## Framework / Runtime
Node (>=20) + Express 4, CommonJS (`"type": "commonjs"`).

## Key Directories
- `public/` — static assets served at `/` by `express.static`
- `test/`   — `node:test` suites, one file per module under test (`<module>.test.js`)

## Entry Points
- `server.js` — the whole server; exports `createApp()` and `start()`
- `public/index.html` — the static landing page

## Conventions
- `server.js` exports `createApp()` (builds the app, binds no port) separately
  from `start()` so tests can mount the real app on an ephemeral port
  (`app.listen(0)`) instead of spawning a process. Register new routes inside
  `createApp()`.
- JSON endpoints respond with a bare object via `res.json(...)` — no envelope.
- Values that already live in `package.json` (e.g. version) are read from it
  rather than duplicated as literals.

## Test Framework
`node --test` (built-in `node:test` + `node:assert/strict`), run with `npm test`.
Tests make real HTTP requests against a listening server; no HTTP mocking layer.
