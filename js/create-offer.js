'use strict';

(function () {
  var map = document.querySelector('.map');
  window.createOffer = function (pathAvatar) {
    var locationX = window.util.getRandomIntegerRange(0, map.clientWidth);
    var locationY = window.util.getRandomIntegerRange(window.data.MIN_COORDINATES_Y, window.data.MAX_COORDINATES_Y);
    return {
      author: {
        avatar: 'img/avatars/user0' + pathAvatar + '.png'
      },
      offer: {
        title: window.util.getRandomElement(window.data.OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: window.util.getRandomIntegerRange(window.data.MIN_PRICE, window.data.MAX_PRICE),
        type: window.util.getRandomElement(window.data.TYPES),
        rooms: window.util.getRandomIntegerRange(window.data.MIN_ROOMS, window.data.MAX_ROOMS),
        guests: window.util.getRandomIntegerRange(window.data.MIN_GUESTS, window.data.MAX_GUESTS),
        checkin: window.util.getRandomElement(window.data.CHECKIN_TIMES),
        checkout: window.util.getRandomElement(window.data.CHECKIN_TIMES),
        features: window.util.getSliceElements(window.data.FEATURES),
        description: window.util.getRandomElement(window.data.DESCRIPTIONS),
        photos: window.util.getSliceElements(window.data.PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

})();
