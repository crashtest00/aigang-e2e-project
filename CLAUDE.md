# e2e-web — Project Map

## Framework / Runtime
Node >= 20 + Express 4 (CommonJS). No build step, no bundler, no template engine.

## Key Directories
- `public/` — static assets served as-is by `express.static` (HTML, CSS, images)
- `test/`   — `node --test` test files, one per module under test

## Entry Points
- `server.js` — exports `createApp()`/`start()`; `public/index.html` is the app page

## Conventions
- Front end is plain HTML/CSS/JS in `public/`; page scripts are inline and
  must not depend on images having loaded.
- Everything in `public/` is reachable at the matching URL path (`public/logo.png` -> `/logo.png`).
- `server.js` exports the app so tests can mount it on an ephemeral port.

## Test Framework
Node's built-in test runner (`node --test`), run via `npm test`. No external test deps.
