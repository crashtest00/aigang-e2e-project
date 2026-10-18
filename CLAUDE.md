# e2e-web — Project Map

## Framework / Runtime
- Node.js >= 20, Express 4 (CommonJS)

## Key Directories
- public/ — static assets served at /
- test/ — `node:test` suites

## Entry Points
- server.js — exports `createApp()` (routes defined inline) and `start()`

## Conventions
- JSON API routes are registered in `createApp()` in server.js (e.g. `/health`, `/version`)
- Runtime config via env vars (see .env.example): `PORT`, `APP_VERSION` (overrides package.json version reported by `/version`)

## Test Framework
- `npm test` (`node --test`); tests mount `createApp()` on an ephemeral port and hit it with `fetch`
