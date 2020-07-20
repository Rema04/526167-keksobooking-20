'use strict';
(function () {

  var DEBOUNCE_DELAY = 500;
  var lastTimeout = null;
  window.debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_DELAY);
  };

})();
