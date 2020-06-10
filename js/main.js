'use strict';
var AMOUNT_ADVERTISEMENTS = 8;
var TITLES = [
  'Уютное жилье',
  'Лакшери пейнтхаус',
  'Хрущевка с косметическим ремонтом',
  'Дворец для короля',
  'Флигель для слуги',
  'Избушка в лесу',
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = [
  'Большая квартира в центре города',
  'Маленькая квартирка в тихом районе',
  'Жилье с видом на океан',
  'Квартира в историческом районе'
];
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

var REAL_ESTATE_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomIntegerRange = function (min, max) {
  var randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
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
      title: getRandomElement(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomIntegerRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntegerRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_TIMES),
      checkout: getRandomElement(CHECKIN_TIMES),
      features: getSliceElements(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
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

var createHTMLelement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createClassNames = function (data, className) {
  var basicClass = className;
  var modifierClasses = [];
  for (var i = 0; i < data.length; i++) {
    modifierClasses.push(basicClass + data[i]);
  }
  return modifierClasses;
};

var addFeaturesInCard = function (tagName, classNames) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < classNames.length; i++) {
    var element = createHTMLelement(tagName, 'popup__feature');
    element.classList.add(classNames[i]);
    fragment.appendChild(element);
  }
  return fragment;
};

var mapPinsBlock = document.querySelector('.map__pins');
mapPinsBlock.appendChild(renderFinalPins(advertisements));
var templateAdvertisementsCard = document.querySelector('#card').content
  .querySelector('.map__card');


var renderAdvertisementCard = function (data) {
  var advertisementСard = templateAdvertisementsCard.cloneNode(true);

  advertisementСard.querySelector('.popup__title').textContent =
    data.offer.title;

  advertisementСard.querySelector('.popup__text--address').textContent =
    data.offer.address;

  advertisementСard.querySelector('.popup__text--price').textContent =
    data.offer.price + ' ₽/ночь';

  advertisementСard.querySelector('.popup__text--capacity').textContent =
    data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';

  advertisementСard.querySelector('.popup__text--time').textContent =
    'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  // popup__feature--elevator
  var featuresAdvertisementCard = addFeaturesInCard('li', createClassNames(data.offer.features, 'popup__feature--'));
  advertisementСard.querySelector('.popup__features')
  .appendChild(featuresAdvertisementCard);


  advertisementСard.querySelector('.popup__description').textContent =
    data.offer.description;
  advertisementСard.querySelector('.popup__type').textContent =
  REAL_ESTATE_TYPE[data.offer.type];

  var advertisementСardPhotos =
  advertisementСard.querySelector('.popup__photos');

  var advertisementСardPhoto =
  advertisementСardPhotos.querySelector('.popup__photo');
  advertisementСardPhoto.remove();
  for (var i = 0; i < advertisements[0].offer.photos.length; i++) {
    var photo = advertisementСardPhoto.cloneNode();
    photo.src = advertisements[0].offer.photos[i];
    advertisementСardPhotos.appendChild(photo);
  }
  return advertisementСard;
};

map.insertAdjacentElement('beforebegin', renderAdvertisementCard(advertisements[0]));

