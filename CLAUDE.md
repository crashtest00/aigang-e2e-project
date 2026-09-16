# e2e-web — Project Map

## Framework / Runtime
Node >= 20 + Express 4, CommonJS (`"type": "commonjs"`).

## Key Directories
- `public/` — static assets served at the web root
- `test/` — `node:test` specs, one file per source module (`<module>.test.js`)

## Entry Points
- `server.js` — `createApp()` builds the Express app, `start()` listens; both exported
- `public/index.html` — static landing page

## Conventions
- Routes are registered inside `createApp()` in `server.js`; the app is exported
  (not only self-invoked) so tests can mount it on an ephemeral port.
- JSON endpoints respond with a plain object via `res.json()` — no envelope.
- Values that also live in `package.json` (e.g. the version) are required from
  there rather than duplicated as literals.

## Test Framework
`node:test` + `node:assert/strict`, run with `npm test` (`node --test`).
Tests start the real server on port `0` and make real HTTP requests.
