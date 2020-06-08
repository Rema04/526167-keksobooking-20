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
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (elements) {
  var index = getRandomIntegerRange(0, elements.length - 1);
  return elements[index];
};

var getSliceElements = function (elements) {
  return elements.slice(0, getRandomIntegerRange(0, elements.length));
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
      type: getRandomElement(TYPES),
      rooms: getRandomIntegerRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntegerRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_TIMES),
      checkout: getRandomElement(CHECKIN_TIMES),
      features: getSliceElements(FEATURES),
      description: 'Большая квартира в центре Токио',
      photos: getSliceElements(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getAdvertisements = function (amount) {
  var advertisements = [];
  for (var i = 0; i < amount; i++) {
    advertisements.push(createOffer(i + 1));
  }
  return advertisements;
};

var advertisements = getAdvertisements(AMOUNT_ADVERTISEMENTS);

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

var templateAdvertisementsCard = document.querySelector('#card').content
  .querySelector('.map__card');
var advertisementСard = templateAdvertisementsCard.cloneNode(true);

advertisementСard.querySelector('.popup__title').textContent =
advertisements[0].offer.title;

advertisementСard.querySelector('.popup__text--address').textContent =
advertisements[0].offer.address;

advertisementСard.querySelector('.popup__text--price').textContent =
advertisements[0].offer.price + ' ₽/ночь';


var type = advertisementСard.querySelector('.popup__type');
var typeValue = advertisements[0].offer.type;
if (typeValue === 'flat') {
  type.textContent = 'Квартира';
}
if (typeValue === 'bungalo') {
  type.textContent = 'Бунгало';
}
if (typeValue === 'house') {
  type.textContent = 'Дом';
}
if (typeValue === 'palace') {
  type.textContent = 'Дворец';
}

advertisementСard.querySelector('.popup__text--capacity').textContent =
  advertisements[0].offer.rooms + ' комнаты для ' + advertisements[0].offer.guests + ' гостей';

advertisementСard.querySelector('.popup__text--time').textContent =
  'Заезд после ' + advertisements[0].offer.checkin + ', выезд до ' + advertisements[0].offer.checkout;

advertisementСard.querySelector('.popup__features').textContent =
  advertisements[0].offer.features;

advertisementСard.querySelector('.popup__description').textContent =
  advertisements[0].offer.description;

var advertisementСardPhotos = advertisementСard.querySelector('.popup__photos');
var advertisementСardPhoto = advertisementСardPhotos.querySelector('.popup__photo');
advertisementСardPhoto.remove();
for (var i = 0; i < advertisements[0].offer.photos.length; i++) {
  var photo = advertisementСardPhoto.cloneNode();
  photo.src = advertisements[0].offer.photos[i];
  advertisementСardPhotos.appendChild(photo);
}
var mapFilters = document.querySelector('.map__filters-container');
map.append(advertisementСard);

