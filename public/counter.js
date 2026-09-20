'use strict';

// Home-page click counter. Plain browser script, no build step — served
// statically from public/ and loaded by index.html with `defer`, so the
// button and count element already exist when this runs.

(function () {
  var button = document.getElementById('click-button');
  var output = document.getElementById('click-count');

  if (!button || !output) {
    return;
  }

  var count = 0;
  output.textContent = String(count);

  button.addEventListener('click', function () {
    count += 1;
    output.textContent = String(count);
  });
})();
