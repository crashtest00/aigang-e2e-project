'use strict';

// Acceptance: the web boilerplate builds, runs, and deploys without
// modification. This exercises "runs" directly (starts the real server on
// an ephemeral port and makes real HTTP requests against it) —
// build/deploy are exercised via `npm install`/`docker build`, not
// meaningfully unit-testable here.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');
const pkg = require('../package.json');

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

test('GET / serves the static index page', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.match(body, /Hello, web\./);
  } finally {
    server.close();
  }
});

test('GET /version returns the package version as JSON', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/version`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { version: pkg.version });
    assert.match(pkg.version, /^\d+\.\d+\.\d+/);
  } finally {
    server.close();
  }
});
