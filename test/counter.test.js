'use strict';

// Acceptance: the home page offers a "Click" button whose in-page counter
// increments on every click.
//
// The project has no DOM test library (and installing one is out of scope
// for this ticket), so the browser script is executed for real in a `vm`
// context against a minimal document stub — the same code the browser
// loads, driven through the same addEventListener/textContent surface it
// uses.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createApp } = require('../server');

const counterSource = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'counter.js'),
  'utf8'
);

// Minimal stand-in for the two elements counter.js looks up, plus a
// `click()` that fires the listeners the script registered.
function stubDocument() {
  const listeners = [];
  const button = {
    addEventListener(type, fn) {
      if (type === 'click') listeners.push(fn);
    },
    click() {
      for (const fn of listeners) fn();
    },
  };
  const output = { textContent: null };
  const document = {
    getElementById(id) {
      if (id === 'click-button') return button;
      if (id === 'click-count') return output;
      return null;
    },
  };
  return { document, button, output };
}

function runCounter() {
  const dom = stubDocument();
  vm.runInNewContext(counterSource, { document: dom.document });
  return dom;
}

test('counter starts at 0', () => {
  const { output } = runCounter();
  assert.equal(output.textContent, '0');
});

test('each click increments the displayed count', () => {
  const { button, output } = runCounter();

  button.click();
  assert.equal(output.textContent, '1');

  button.click();
  button.click();
  assert.equal(output.textContent, '3');
});

test('counter script does not throw when the elements are absent', () => {
  const document = { getElementById: () => null };
  assert.doesNotThrow(() => vm.runInNewContext(counterSource, { document }));
});

test('GET / serves the Click button and its count element', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.match(body, /<button id="click-button" type="button">Click<\/button>/);
    assert.match(body, /id="click-count"/);
    assert.match(body, /<script src="\/counter\.js" defer><\/script>/);
  } finally {
    server.close();
  }
});

test('GET /counter.js serves the counter script', async () => {
  const app = createApp();
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/counter.js`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /javascript/);
    assert.match(await res.text(), /click-button/);
  } finally {
    server.close();
  }
});
