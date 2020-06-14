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

var REAL_ESTATE_TYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var map = document.querySelector('.map');
// map.classList.remove('map--faded');

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

var mapPinsBlock = document.querySelector('.map__pins');
mapPinsBlock.appendChild(renderFinalPins(offers));

var deleteInsertionPoint = function (data, insertionPoint) {
  if (data.length === 0) {
    insertionPoint.remove();
  }
  return data;
};

var addFeaturesInCard = function (data, insertionPoint) {
  deleteInsertionPoint(data, insertionPoint);
  insertionPoint.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature', 'popup__feature' + '--' + data[i]);
    insertionPoint.append(newElement);
  }
};

var addPhotoInCard = function (data, insertionPoint) {
  deleteInsertionPoint(data, insertionPoint);
  var similarPhoto = insertionPoint.firstElementChild.cloneNode();
  insertionPoint.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    var photo = similarPhoto.cloneNode();
    photo.src = data[i];
    insertionPoint.appendChild(photo);
  }
};

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
// var mapFiltersContainer = map.querySelector('.map__filters-container');
// mapFiltersContainer.before(renderOfferCard(offers[0]));

var offerForm = document.querySelector('.ad-form');
var titleInput = offerForm.title;
var addressInput = offerForm.address;
var typeInput = offerForm.type;
var priceInput = offerForm.price;
var roomInput = offerForm.rooms;
var guestInput = offerForm.capacity;
var submitButton = offerForm.querySelector('[type=submit]');
var MAIN_PIN = document.querySelector('.map__pin--main');

var MAIN_PIN_SIZE = {
  height: MAIN_PIN.clientHeight,
  width: MAIN_PIN.clientWidth,
};
var TITLE_LENGTH = {
  min: 5,
  max: 100
};
var PRICE_MAX = 1000000;
var REQUIRED_INPUTS = [
  titleInput,
  priceInput
];
var MIN_PRICE_DEPENDENCE_TYPE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

// эти две ф-ции не работают если их передавать в changeDisable
// var removeDisableAttr = function (form) {
//   for (var i = 0; i < form.children.length; i++) {
//     form.children[i].removeAttribute('disable');
//   }
// };
// var setDisableAttr = function (form) {
//   for (var i = 0; i < form.children.length; i++) {
//     form.children[i].setAttribute('disable', 'disable');
//   }
// };

var changeDisabledForm = function (form, isDisable) {
  var formElements = form.children;
  if (isDisable === false) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', 'disabled');
    }
  } else {
    for (var i = 0; i < formElements.length; i++) { //ругается на i, но фция выше не передается
      formElements[i].removeAttribute('disabled');
    }
  }
};
changeDisabledForm(offerForm, false);

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

var mainPinClickHandler = function () {
  map.classList.remove('map--faded');
  offerForm.classList.remove('ad-form--disabled');
  changeDisabledForm(offerForm, true);
  addressInput.value = Number(getCoords(MAIN_PIN).top) + MAIN_PIN_SIZE.width / 2 + ', ' + Number(getCoords(MAIN_PIN).left + MAIN_PIN_SIZE.width);
  addressInput.setAttribute('readonly', true);
  MAIN_PIN.removeEventListener('click', mainPinClickHandler);
};

var onKeyEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    mainPinClickHandler();
  }
};

MAIN_PIN.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    mainPinClickHandler();
  }
});
MAIN_PIN.addEventListener('keydown', function (evt) {
  onKeyEnterHandler(evt);
});


var makeRequiredInputs = function (inputs) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('required', 'required');
  }
};
makeRequiredInputs(REQUIRED_INPUTS);


var setAttributesLength = function (input, min, max) {
  input.setAttribute('min', min);
  input.setAttribute('max', max);
};
setAttributesLength(offerForm.title, TITLE_LENGTH.min, TITLE_LENGTH.max);
setAttributesLength(offerForm.price, 0, PRICE_MAX);

var successModal = document.querySelector('#success')
  .content.querySelector('.success');
var succesText = successModal.querySelector('.success__message');
var showMessageSubmit = function (message, insertionPoint) {
  insertionPoint.append(message);
};

titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;
  if (valueLength < TITLE_LENGTH.min) {
    titleInput.style.border = '2px solid red';
    titleInput
      .setCustomValidity('Минимальная длина — ' + TITLE_LENGTH.min + ' символов. Не хватает еще ' +
        (TITLE_LENGTH.min - valueLength) + ' символов');
  } else if (valueLength > TITLE_LENGTH.max) {
    titleInput.style.border = '2px solid red';
    titleInput
      .setCustomValidity('Максимальная длина — ' + TITLE_LENGTH.max + ' символов. Удалите ' +
        (TITLE_LENGTH.max - valueLength) + ' символов');
  } else {
    titleInput.setCustomValidity('');
    titleInput.style.border = '';
  }
});
var checkIsValueMissing = function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Пожалуйста, введите заголовок');
  }
};
titleInput.addEventListener('invalid', checkIsValueMissing);

var compareTypeAndPriceValues = function () {
  priceInput.min = MIN_PRICE_DEPENDENCE_TYPE[typeInput.value];
  priceInput.setAttribute('placeholder', MIN_PRICE_DEPENDENCE_TYPE[typeInput.value]);
  priceInput.value = '';
};
typeInput.addEventListener('change', compareTypeAndPriceValues);

priceInput.addEventListener('input', function () {
  var valuePrice = +priceInput.value;
  var valueType = typeInput.value;
  if (valuePrice > PRICE_MAX) {
    priceInput
      .setCustomValidity('Максимальное значение - ' + PRICE_MAX);
  } else if (valuePrice < MIN_PRICE_DEPENDENCE_TYPE[valueType]) {
    priceInput
      .setCustomValidity('Минимальное значение для ' + valueType + ' - ' + MIN_PRICE_DEPENDENCE_TYPE[valueType]);
  } else {
    priceInput
      .setCustomValidity('');
  }
});

var compareRoomsAndGuestsValues = function () {
  if (roomInput.value === '1' && guestInput.value === '1') {
    roomInput.setCustomValidity('');
  } else {
    roomInput.setCustomValidity('Данное жилье предназначено для одного гостя');
  }
  if (roomInput.value === '2') {
    if (guestInput.value === '1' || guestInput.value === '2') {
      roomInput.setCustomValidity('');
    } else {
      roomInput.setCustomValidity('Данное жилье предназначено для одного или двух гостей');
    }
  }
  if (roomInput.value === '100') {
    if (guestInput.value === '0') {
      roomInput.setCustomValidity('');
    } else {
      roomInput.setCustomValidity('Данное жилье не предназначено для гостей');
    }
  } else {
    roomInput.setCustomValidity('');
  }
};

roomInput.addEventListener('change', compareTypeAndPriceValues);


offerForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (titleInput.value === '') {
    titleInput.setCustomValidity('Пожалуйста, введите заголовок');
  } else {
    titleInput.setCustomValidity('');
  }
  compareRoomsAndGuestsValues();
});

var onEscCloseHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.target.remove();
  }
};
successModal.addEventListener('click', function (evt) {
  if (evt.target !== succesText) {
    successModal.remove();
  }
});
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    successModal.remove();
  }
});

//делаем красные рамки если при отправке обязательные поля не валидные

// offerForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   for (var i = 0; i < REQUIRED_INPUTS.length; i++) {
//     if (!REQUIRED_INPUTS[i].validity.valid) {
//       REQUIRED_INPUTS[i].style.border = '2px solid red';
//     }
//   }
// });
