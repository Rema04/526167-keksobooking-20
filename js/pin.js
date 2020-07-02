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

  var getOffers = function (amount) {
    var offers = [];
    for (var i = 0; i < amount; i++) {
      offers.push(window.createOffer(i + 1));
    }
    return offers;
  };

  var renderFinalPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderSimilarPin(pins[i]));
    }
    return fragment;
  };

  window.pin = {
    part: MainPinPart,
    render: renderFinalPins,
    getOffers: getOffers
  };

})();
