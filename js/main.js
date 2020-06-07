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

var similarPinTemplate = document.querySelector('#pin').content
  .querySelector('.map__pin');

var renderSimilarPin = function (advertisementItem) {
  var pin = similarPinTemplate.cloneNode(true);
  pin.style.left = advertisementItem.location.x - (pin.clientWidth / 2) + 'px';
  pin.style.top = advertisementItem.location.y - pin.clientHeight + 'px';
  pin.querySelector('img').src = advertisementItem.author.avatar;
  pin.querySelector('img').alt = advertisementItem.title;

  return pin;
};

var renderFinalPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderSimilarPin(pins[i]));
  }
  return fragment;
};

var mapPinsBlock = document.querySelector('.map__pins');
mapPinsBlock.appendChild(renderFinalPins(advertisements));

