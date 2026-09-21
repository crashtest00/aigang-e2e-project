'use strict';

// Acceptance: the web boilerplate builds, runs, and deploys without
// modification. This exercises "runs" directly (starts the real server on
// an ephemeral port and makes real HTTP requests against it) —
// build/deploy are exercised via `npm install`/`docker build`, not
// meaningfully unit-testable here.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');

test('GET /health returns {"status":"ok"}', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: 'ok' });
  } finally {
    server.close();
  }
});

test('GET / serves the counter page with the brand logo above the counter', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.match(body, /<img[^>]*src="\/logo\.png"[^>]*alt="[^"]+"/);
    assert.match(body, /id="increment"/);
    assert.ok(
      body.indexOf('/logo.png') < body.indexOf('id="increment"'),
      'the logo should be rendered above the counter'
    );
  } finally {
    server.close();
  }
});

test('GET /logo.png serves the brand logo', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/logo.png`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-type'), 'image/png');
  } finally {
    server.close();
  }
});
