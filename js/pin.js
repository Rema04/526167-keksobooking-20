'use strict';
(function () {

  var MainPinPart = {
    CENTER: 'center',
    TIP: 'tip'
  };
  var similarPinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin');

  var renderSimilarPin = function (offersItem) {
    var pin = similarPinTemplate.cloneNode(true);
    pin.style.left = offersItem.location.x - (pin.clientWidth / 2) + 'px';
    pin.style.top = offersItem.location.y - pin.clientHeight + 'px';
    pin.querySelector('img').src = offersItem.author.avatar;
    pin.querySelector('img').alt = offersItem.title;
    return pin;
  };

  var renderFinalPins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      if (pin.offer) {
        fragment.append(renderSimilarPin(pin));
      }
    });
    return fragment;
  };


  window.pin = {
    part: MainPinPart,
    render: renderFinalPins,
  };

})();
