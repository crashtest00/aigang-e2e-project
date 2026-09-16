# e2e-web — Project Map

<!-- Agents use this file to locate files efficiently — keep it concise.
     Update at the directory/pattern level when structure changes; not individual files. -->

## Framework / Runtime
Node >=20 (CommonJS) + Express 4. Containerised via Dockerfile / docker-compose.yml.

## Key Directories
- `public/` — static assets served at `/` by `express.static`
- `test/`   — `*.test.js`, one file per source module it covers

## Entry Points
- `server.js` — exports `createApp()` (routes, no listen) and `start(port)`; self-starts only when run directly
- `public/index.html` — static page

## Conventions
- Routes are registered inside `createApp()` so tests can mount the app on an ephemeral port (`app.listen(0)`) without spawning a process — keep new routes there, not in `start()`.
- JSON endpoints respond with `res.json(...)` and a flat object (e.g. `/health` → `{ status: 'ok' }`, `/version` → `{ version: '0.1.0' }`); there is no envelope wrapper.
- The served version string comes from `package.json` — bump it there, never hardcode it in a route.

## Test Framework
Built-in `node:test` + `node:assert/strict`, run with `npm test` (`node --test`). No external test runner — do not add one.
