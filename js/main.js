'use strict';
var AMOUNT_ADVERTISEMENTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_PRICE = 3000;
var MAX_PRICE = 50000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
var MIN_COORDINATES_Y = 130;
var MAX_COORDINATES_Y = 630;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomIntegerRange = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

var getRandomElementArray = function (array) {
  var index = getRandomIntegerRange(0, array.length - 1);
  return array[index];
};

var createOffer = function (pathAvatar) {
  var locationX = getRandomIntegerRange(0, map.clientWidth);
  var locationY = getRandomIntegerRange(MIN_COORDINATES_Y, MAX_COORDINATES_Y);
  return {
    author: {
      avatar: 'img/avatars/user0' + pathAvatar + '.png'
    },
    offer: {
      title: 'Уютное жилье',
      address: locationX + ', ' + locationY,
      price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
      type: getRandomElementArray(TYPES),
      rooms: getRandomIntegerRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntegerRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElementArray(CHECKIN_TIMES),
      checkout: getRandomElementArray(CHECKIN_TIMES),
      features: FEATURES.slice(0, getRandomIntegerRange(1, FEATURES.length - 1)),
      description: 'Большая квартира в центре Токио',
      photos: PHOTOS.slice(0, getRandomIntegerRange(1, PHOTOS.length - 1))
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getAdvertisements = function () {
  var advertisements = [];
  for (var i = 0; i < AMOUNT_ADVERTISEMENTS; i++) {
    advertisements.push(createOffer(i + 1));
  }
  return advertisements;
};

var advertisements = getAdvertisements();

var templatePin = document.querySelector('#pin').content
.querySelector('.map__pin');

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var pin = templatePin.cloneNode(true);
    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = pins[i].author.avatar;
    pinAvatar.alt = pins[i].offer.title;
    pin.style.left = pins[i].location.x - (pin.clientWidth / 2) + 'px';
    pin.style.top = pins[i].location.y - pin.clientHeight + 'px';
    fragment.appendChild(pin);
  }
  return fragment;
};

map.appendChild(renderPins(advertisements));
