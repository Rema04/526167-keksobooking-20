'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin');
  var addressField = window.form.fields.address;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetLeft < -Math.round(mainPin.clientWidth / 2)) {
        mainPin.style.left = -Math.round(mainPin.clientWidth / 2) + 'px';
      }
      if (mainPin.offsetLeft > Math.round(map.clientWidth - mainPin.clientWidth / 2)) {
        mainPin.style.left = Math.round(map.clientWidth - mainPin.clientWidth / 2) + 'px';
      }
      if (mainPin.offsetTop < window.data.MIN_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT)) {
        mainPin.style.top = window.data.MIN_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT) + 'px';
      }
      if (mainPin.offsetTop > window.data.MAX_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT)) {
        mainPin.style.top = window.data.MAX_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT) + 'px';
      }
      mainPin.style.zIndex = 1000;
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      addressField.value = window.form.getAddress(window.pin.part.TIP);
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);

  });

})();

