# e2e-web — Project Map

## Framework / Runtime
Node >=20 + Express 4 (CommonJS). No build step.

## Key Directories
- `public/` — static assets served at `/` by `express.static`
- `test/` — `*.test.js`, one file per source module

## Entry Points
- `server.js` — `createApp()` builds the Express app (all routes registered here);
  `start(port)` listens. Both are exported so tests can mount on an ephemeral port.
- `public/index.html` — landing page

## Conventions
- Routes are registered inside `createApp()` in `server.js`; JSON responses via `res.json(...)`.
- Unused handler params are prefixed with `_` (e.g. `(_req, res)`).
- Tests start the real app with `app.listen(0)` and make real `fetch` requests — no HTTP mocking.

## Test Framework
`node --test` (built-in `node:test` + `node:assert/strict`) — run with `npm test`.
