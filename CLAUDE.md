# e2e-web — Project Map

<!-- Agents use this file to locate files efficiently — keep it concise.
     Update at the directory/pattern level when structure changes; not individual files. -->

## Framework / Runtime
Node >=20 (Docker image: node:22-bookworm-slim) + Express 4, CommonJS (`"type": "commonjs"`).

## Key Directories
- `public/`  — static assets served at the web root by `express.static`
- `test/`    — `*.test.js`, one file per source module it covers

## Entry Points
- `server.js`        — the whole HTTP app; exports `{ createApp, start }`
- `public/index.html` — static landing page, served at `/`
- Container: `Dockerfile` / `docker-compose.yml`, listening on `$PORT` (default 3000)

## Conventions
- `createApp()` builds and returns the Express app but does not listen; `start()` binds the
  port. Routes are registered inside `createApp()` so tests can mount the app on an
  ephemeral port (`app.listen(0)`) with no separate process — add new routes there.
- JSON endpoints respond with a flat object via `res.json()` (e.g. `{ status: 'ok' }`,
  `{ version }`); there is no envelope wrapper.
- Values that also live in `package.json` (such as the version) are read from it rather
  than duplicated in source, so they cannot drift.
- Unused Express handler params are prefixed with `_` (e.g. `(_req, res)`).

## Test Framework
Built-in `node:test` + `node:assert/strict`, run with `npm test` (`node --test`).
No external test dependency — do not add one. Tests make real HTTP requests
against the real server on an ephemeral port rather than mocking.
