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

    window.mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var centerMainPinX = Math.floor(mainPin.clientWidth / 2);

      if (mainPin.offsetLeft < -centerMainPinX) {
        mainPin.style.left = -centerMainPinX + 'px';
      }
      if (mainPin.offsetLeft > map.clientWidth - centerMainPinX) {
        mainPin.style.left = map.clientWidth - mainPin.clientWidth / 2 + 'px';
      }

      if (mainPin.offsetTop < window.util.MIN_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT)) {
        mainPin.style.top = window.util.MIN_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT) + 'px';
      }
      if (mainPin.offsetTop > window.util.MAX_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT)) {
        mainPin.style.top = window.util.MAX_COORDINATES_Y - (mainPin.clientHeight + window.util.TIP_HEIGHT) + 'px';
      }
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      addressField.value = window.form.getAddress(window.pin.part.TIP);
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', window.mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', window.mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  });

})();

