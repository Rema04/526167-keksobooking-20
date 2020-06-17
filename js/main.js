'use strict';
var AMOUNT_OFFER = 8;
var OFFER_TITLES = [
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

// var REAL_ESTATE_TYPE = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };

// var MIN_PRICE_DEPENDENCE_TYPE = {
//   'bungalo': 0,
//   'flat': 1000,
//   'house': 5000,
//   'palace': 10000
// };
var MAIN_PIN_PART = {
  center: 'center',
  tip: 'tip'
};
var TIP_HEIGHT = 22;
var ENTER_KEY = 'Enter';
var LEFT_MOUSE_BUTTON = 0;
var ERROR_BORDER = {
  color: 'red',
  width: '2px',
  addBorder: function (element) {
    element.style.border = this.width + ' solid ' + this.color;
  },
  removeBorder: function (element) {
    element.style.border = '';
  }
};

var map = document.querySelector('.map');
// var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPinsBlock = document.querySelector('.map__pins');

var getRandomIntegerRange = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
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
      title: getRandomElement(OFFER_TITLES),
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

var getOffers = function (amount) {
  var offers = [];
  for (var i = 0; i < amount; i++) {
    offers.push(createOffer(i + 1));
  }
  return offers;
};

var offers = getOffers(AMOUNT_OFFER);

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


// var deleteInsertionPoint = function (data, insertionPoint) {
//   if (data.length === 0) {
//     insertionPoint.remove();
//   }
//   return data;
// };

// var addFeaturesInCard = function (data, insertionPoint) {
//   deleteInsertionPoint(data, insertionPoint);
//   insertionPoint.innerHTML = '';
//   for (var i = 0; i < data.length; i++) {
//     var newElement = document.createElement('li');
//     newElement.classList.add('popup__feature', 'popup__feature' + '--' + data[i]);
//     insertionPoint.append(newElement);
//   }
// };

// var addPhotoInCard = function (data, insertionPoint) {
//   deleteInsertionPoint(data, insertionPoint);
//   var similarPhoto = insertionPoint.firstElementChild.cloneNode();
//   insertionPoint.innerHTML = '';
//   for (var i = 0; i < data.length; i++) {
//     var photo = similarPhoto.cloneNode();
//     photo.src = data[i];
//     insertionPoint.appendChild(photo);
//   }
// };

// var templateOfferCard = document.querySelector('#card').content
//   .querySelector('.map__card');

// var renderOfferCard = function (data) {
//   var offerСard = templateOfferCard.cloneNode(true);
//   var offerAvatar = offerСard.querySelector('.popup__avatar');
//   var offerTitle = offerСard.querySelector('.popup__title');
//   var offerAddress = offerСard.querySelector('.popup__text--address');
//   var offerPrice = offerСard.querySelector('.popup__text--price');
//   var offerType = offerСard.querySelector('.popup__type');
//   var offerGuests = offerСard.querySelector('.popup__text--capacity');
//   var offerTime = offerСard.querySelector('.popup__text--time');
//   var offerFeatures = offerСard.querySelector('.popup__features');
//   var offerDescription = offerСard.querySelector('.popup__description');
//   var offerPhoto = offerСard.querySelector('.popup__photos');

//   offerAvatar.src = deleteInsertionPoint(data.author.avatar, offerAvatar);
//   offerTitle.textContent = deleteInsertionPoint(data.offer.title, offerTitle);
//   offerAddress.textContent = deleteInsertionPoint(data.offer.address);
//   offerPrice.textContent = deleteInsertionPoint(data.offer.price + ' ₽/ночь', offerPrice);
//   offerType.textContent = deleteInsertionPoint(REAL_ESTATE_TYPE[data.offer.type]);
//   offerGuests.textContent = deleteInsertionPoint(data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей', offerGuests);
//   offerTime.textContent = deleteInsertionPoint('Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout, offerTime);

//   addFeaturesInCard(data.offer.features, offerFeatures, 'li', 'popup__feature');
//   offerDescription.textContent = deleteInsertionPoint(data.offer.description);
//   addPhotoInCard(data.offer.photos, offerPhoto);
//   return offerСard;
// };
// mapFiltersContainer.before(renderOfferCard(offers[0]));

var offerForm = document.querySelector('.ad-form');
// var titleInput = offerForm.title;
var addressInput = offerForm.address;
// var typeInput = offerForm.type;
// var priceInput = offerForm.price;
var roomInput = offerForm.rooms;
var guestInput = offerForm.capacity;
// var timeInInput = offerForm.timein;
// var timeOutInput = offerForm.timeout;
var mainPin = document.querySelector('.map__pin--main');

var getCoords = function (element) {
  return {
    top: element.offsetTop,
    left: element.offsetLeft
  };
};

var getAddress = function (pinPart) {
  var addressCoordinates;
  if (pinPart === MAIN_PIN_PART.center) {
    addressCoordinates = Math.round(Number(getCoords(mainPin).left) + mainPin.clientWidth / 2) + ', ' + Math.round(Number(getCoords(mainPin).top + mainPin.clientHeight / 2));
  } else if (pinPart === MAIN_PIN_PART.tip) {
    addressCoordinates = Math.round(Number(getCoords(mainPin).left) + mainPin.clientWidth / 2) + ', ' + Math.round(Number(getCoords(mainPin).top + mainPin.clientHeight + TIP_HEIGHT));
  }
  return addressCoordinates;
};

addressInput.value = getAddress(MAIN_PIN_PART.center);

var changeDisabledForm = function (form) {
  var formElements = form.children;
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].toggleAttribute('disabled');
  }
};
changeDisabledForm(offerForm);
var mapPins = renderFinalPins(offers);
var mainPinActivateHandler = function () {
  map.classList.remove('map--faded');
  offerForm.classList.remove('ad-form--disabled');
  changeDisabledForm(offerForm);
  addressInput.value = getAddress(MAIN_PIN_PART.tip);
  mapPinsBlock.appendChild(mapPins);
  mainPin.removeEventListener('mousedown', mainPinActivateHandler);
  mainPin.removeEventListener('keydown', onMainPinEnterPress);
};
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    mainPinActivateHandler();
  }
});
var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    mainPinActivateHandler();
  }
};
var onMainPinLeftButtonMouseHandler = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    mainPinActivateHandler();
  }
};
mainPin.addEventListener('mousedown', onMainPinLeftButtonMouseHandler);
mainPin.addEventListener('keydown', onMainPinEnterPress);

var validateRoomsAndGuestsValues = function () {
  if (guestInput.value > roomInput.value && guestInput.value !== '0' && roomInput.value !== '100') {
    roomInput.setCustomValidity('Количество гостей не может превышать количество комнат');
    ERROR_BORDER.addBorder(roomInput);
  } else if (guestInput.value === '0' && roomInput.value !== '100') {
    roomInput.setCustomValidity('Выберите 100 комнат');
    ERROR_BORDER.addBorder(roomInput);
  } else if (guestInput.value !== '0' && roomInput.value === '100') {
    roomInput.setCustomValidity('Данное жилье не для гостей');
    ERROR_BORDER.addBorder(roomInput);
  } else if (guestInput.value === '0' && roomInput.value === '100') {
    roomInput.setCustomValidity('');
    ERROR_BORDER.removeBorder(roomInput);
  } else {
    roomInput.setCustomValidity('');
    ERROR_BORDER.removeBorder(roomInput);
  }
};
var guestsChangeHandler = validateRoomsAndGuestsValues;
var roomsChangeHandler = validateRoomsAndGuestsValues;
guestInput.addEventListener('change', guestsChangeHandler);
roomInput.addEventListener('change', roomsChangeHandler);
