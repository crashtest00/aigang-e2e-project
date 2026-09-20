# e2e-web — Project Map

## Framework / Runtime
Node 20+ with Express 4 (CommonJS). No build step, no frontend framework —
the client is plain HTML/CSS/JS served statically.

## Key Directories
- `public/` — static assets served at the site root: `index.html`, `style.css`,
  and one plain browser script per home-page feature (e.g. `counter.js`).
- `test/` — `node:test` suites, one file per feature area.

## Entry Points
- `server.js` — exports `createApp()` / `start()`; `npm start` runs it on
  `PORT` (default 3000).
- `public/index.html` — the home page.

## Conventions
- Browser scripts are plain IIFEs loaded from `index.html` with `defer`, and
  bail out early if the elements they wire up are absent.
- `server.js` exports `createApp()` so tests can mount it on an ephemeral
  port instead of spawning a process.

## Test Framework
Node's built-in `node:test` — `npm test` runs `node --test`. Browser scripts
have no DOM library available; they are exercised in a `node:vm` context
against a minimal `document` stub (see `test/counter.test.js`).
