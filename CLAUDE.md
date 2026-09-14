# e2e-web — Project Map

<!-- Agents use this file to locate files efficiently — keep it concise.
     Update at the directory/pattern level when structure changes; not individual files. -->

## Framework / Runtime
Node >=20 + Express 4 (CommonJS, `"type": "commonjs"`).

## Key Directories
- `public/` — static assets served at `/` by `express.static`
- `test/`   — `*.test.js`, one file per source module under test

## Entry Points
- `server.js` — exports `{ createApp, start }`; self-starts only under
  `require.main === module`. `npm start` runs it (`PORT`, default 3000).
- `public/index.html` — the served page.

## Conventions
- Routes are registered inside `createApp()` in `server.js` — keep the app
  factory export intact so tests can mount it on an ephemeral port
  (`app.listen(0)`) instead of spawning a process.
- JSON responses are returned with `res.json()` as a flat object
  (e.g. `/health` → `{ "status": "ok" }`, `/version` → `{ "version": "0.1.0" }`).
- The app version is sourced from `package.json`, never hardcoded.

## Test Framework
Node's built-in test runner — `npm test` → `node --test`. Tests make real
HTTP requests against the real server; no HTTP mocking layer.
