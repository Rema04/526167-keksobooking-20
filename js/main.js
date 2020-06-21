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

var MIN_PRICE_DEPENDENCE_TYPE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var MainPinPart = {
  CENTER: 'center',
  TIP: 'tip'
};
var TIP_HEIGHT = 22;
var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';
var LEFT_MOUSE_BUTTON = 0;

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
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

var templateOfferCard = document.querySelector('#card').content
  .querySelector('.map__card');

var renderOfferCard = function (data) {
  var offerСard = templateOfferCard.cloneNode(true);
  var offerAvatar = offerСard.querySelector('.popup__avatar');
  var offerTitle = offerСard.querySelector('.popup__title');
  var offerAddress = offerСard.querySelector('.popup__text--address');
  var offerPrice = offerСard.querySelector('.popup__text--price');
  var offerType = offerСard.querySelector('.popup__type');
  var offerGuests = offerСard.querySelector('.popup__text--capacity');
  var offerTime = offerСard.querySelector('.popup__text--time');
  var offerFeatures = offerСard.querySelector('.popup__features');
  var offerDescription = offerСard.querySelector('.popup__description');
  var offerPhoto = offerСard.querySelector('.popup__photos');

  offerAvatar.src = deleteInsertionPoint(data.author.avatar, offerAvatar);
  offerTitle.textContent = deleteInsertionPoint(data.offer.title, offerTitle);
  offerAddress.textContent = deleteInsertionPoint(data.offer.address);
  offerPrice.textContent = deleteInsertionPoint(data.offer.price + ' ₽/ночь', offerPrice);
  offerType.textContent = deleteInsertionPoint(REAL_ESTATE_TYPE[data.offer.type]);
  offerGuests.textContent = deleteInsertionPoint(data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей', offerGuests);
  offerTime.textContent = deleteInsertionPoint('Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout, offerTime);

  addFeaturesInCard(data.offer.features, offerFeatures, 'li', 'popup__feature');
  offerDescription.textContent = deleteInsertionPoint(data.offer.description);
  addPhotoInCard(data.offer.photos, offerPhoto);
  return offerСard;
};

var offerForm = document.querySelector('.ad-form');
var titleField = offerForm.title;
var addressField = offerForm.address;
var typeField = offerForm.type;
var priceField = offerForm.price;
var roomField = offerForm.rooms;
var guestField = offerForm.capacity;
var timeInField = offerForm.timein;
var timeOutField = offerForm.timeout;
var mainPin = document.querySelector('.map__pin--main');

var getCoords = function (element) {
  return {
    top: element.offsetTop,
    left: element.offsetLeft
  };
};

var getAddress = function (pinPart) {
  var diff = pinPart === MainPinPart.CENTER ? mainPin.clientHeight / 2 : mainPin.clientHeight + TIP_HEIGHT;
  return Math.round(Number(getCoords(mainPin).left) + mainPin.clientWidth / 2) + ', ' + Math.round(Number(getCoords(mainPin).top + diff));
};

addressField.value = getAddress(MainPinPart.CENTER);

var changeDisabledForm = function (form) {
  var formElements = form.children;
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].toggleAttribute('disabled');
  }
};
changeDisabledForm(offerForm);

var mapPins = renderFinalPins(offers);

var activateMapAndForm = function () {
  map.classList.remove('map--faded');
  offerForm.classList.remove('ad-form--disabled');
  changeDisabledForm(offerForm);
  addressField.value = getAddress(MainPinPart.TIP);
  mapPinsBlock.appendChild(mapPins);
  mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
};
var mainPinKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMapAndForm();
  }
};
var mainPinMousedownHandler = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activateMapAndForm();
  }
};

mainPin.addEventListener('mousedown', mainPinMousedownHandler);
mainPin.addEventListener('keydown', mainPinKeydownHandler);

var validateRoomsAndGuestsValues = function () {
  if (guestField.value > roomField.value && guestField.value !== '0' && roomField.value !== '100') {
    roomField.setCustomValidity('Количество гостей не может превышать количество комнат');
    roomField.classList.add('error-border');
  } else if (guestField.value === '0' && roomField.value !== '100') {
    roomField.setCustomValidity('Выберите 100 комнат');
    roomField.classList.add('error-border');
  } else if (guestField.value !== '0' && roomField.value === '100') {
    roomField.setCustomValidity('Данное жилье не для гостей');
    roomField.classList.add('error-border');
  } else {
    roomField.setCustomValidity('');
    roomField.classList.remove('error-border');
  }
};
var guestFieldChangeHandler = function () {
  validateRoomsAndGuestsValues();
};
var roomFieldChangeHandler = function () {
  validateRoomsAndGuestsValues();
};
guestField.addEventListener('change', guestFieldChangeHandler);
roomField.addEventListener('change', roomFieldChangeHandler);

//
var validateTitleField = function () {
  var valueLength = titleField.value.length;
  var minLengthValue = titleField.getAttribute('minlength');
  var maxLengthValue = titleField.getAttribute('maxlength');
  if (titleField.validity.valueMissing) {
    titleField.classList.add('error-border');
    titleField.setCustomValidity('Поле обязательно к заполнению');
  } else if (titleField.validity.tooShort) {
    titleField.classList.add('error-border');
    titleField
      .setCustomValidity('Минимальная длина — ' + minLengthValue + ' символов. Вам не хватает еще ' + (minLengthValue - valueLength));
  } else if (titleField.validity.tooLong) {
    titleField.classList.add('error-border');
    titleField
      .setCustomValidity('Максимальная длина — ' + maxLengthValue + ' символов. Удалите ' + (valueLength - maxLengthValue));
  } else {
    titleField.setCustomValidity('');
    titleField.classList.remove('error-border');
  }
};
var titleFieldInputHandler = function () {
  validateTitleField();
};
var titleFieldInvalidHandler = function () {
  validateTitleField();
};

var validateTypeField = function () {
  priceField.min = MIN_PRICE_DEPENDENCE_TYPE[typeField.value];
  priceField.setAttribute('placeholder', MIN_PRICE_DEPENDENCE_TYPE[typeField.value]);
  priceField.value = '';
};
var typeFieldChangeHandler = function () {
  validateTypeField();
};
// не получается экранировать чтоб тип жилья был в кавычках
var validatePriceField = function () {
  var maxPrice = priceField.getAttribute('max');
  var priceValue = +priceField.value;
  var typeValue = typeField.value;
  if (priceValue > maxPrice) {
    priceField.setCustomValidity('Максимальное значение - ' + maxPrice);
    priceField.classList.add('error-border');
  } else if (priceValue < MIN_PRICE_DEPENDENCE_TYPE[typeValue]) {
    priceField.setCustomValidity('Минимальное значение для  ' + REAL_ESTATE_TYPE[typeValue] + ' - ' + MIN_PRICE_DEPENDENCE_TYPE[typeValue]);
    priceField.classList.add('error-border');
  } else if (priceValue === '') {
    priceValue.setCustomValidity('Поле обязательно к заполнению');
    priceField.classList.add('error-border');
  } else {
    priceField.setCustomValidity('');
    priceField.classList.remove('error-border');
  }
};
var priceFieldChangeHandler = function () {
  validateTypeField();
};

var validateTimeInField = function () {
  timeOutField.selectedIndex = timeInField.selectedIndex;
};
var timeInFieldChangeHandler = function () {
  validateTimeInField();
};

var validateTimeOutField = function () {
  timeInField.selectedIndex = timeOutField.selectedIndex;
};

var timeOutFieldChangeHandler = function () {
  validateTimeOutField();
};

titleField.addEventListener('invalid', titleFieldInvalidHandler);
titleField.addEventListener('input', titleFieldInputHandler);

typeField.addEventListener('change', typeFieldChangeHandler);

priceField.addEventListener('change', priceFieldChangeHandler);
priceField.addEventListener('invalid', priceFieldChangeHandler);

timeInField.addEventListener('change', timeInFieldChangeHandler);
timeOutField.addEventListener('change', timeOutFieldChangeHandler);

var deleteCard = function (card) {
  if (card) {
    card.remove();
  }
};
var documentKeydownHandler = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    deleteCard(currentCard);
  }
};
var currentCard;
var addPinClickHandler = function (pin, card) {
  pin.addEventListener('click', function () {
    deleteCard(currentCard);
    currentCard = card;
    mapFiltersContainer.before(card);
    document.addEventListener('keydown', documentKeydownHandler);
  });
  var closeCardButton = card.querySelector('.popup__close');
  closeCardButton.addEventListener('click', function () {
    card.remove();
  });
};

for (var i = 0; i < mapPins.children.length; i++) {
  var pin = mapPins.children[i];
  addPinClickHandler(pin, renderOfferCard(offers[i]));
}


mainPin.addEventListener('mousedown', function (evt) {
  var shiftX = evt.clientX - mainPin.getBoundingClientRect().left;
  var shiftY = evt.clientY - mainPin.getBoundingClientRect().top;
  mainPin.style.position = 'absolute';
  var moveMainPin = function (evt) {
    mainPin.style.left = evt.pageX - shiftX + 'px';
    mainPin.style.top = evt.pageY - shiftY + 'px';
    addressField.value = getAddress(MainPinPart.TIP);
  };
  moveMainPin(evt.pageX, evt.pageY);
  map.addEventListener('mousemove', moveMainPin);
  mainPin.addEventListener('mouseup', function () {
    map.removeEventListener('mousemove', moveMainPin);
  });
});

mainPin.ondragstart = function () {
  return false;
};


var successModal = document.querySelector('#success')
  .content.querySelector('.success');

var succesText = successModal.querySelector('.success__message');
var showMessageSubmit = function (message, insertionPoint) {
  insertionPoint.append(message);
};
offerForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  showMessageSubmit(successModal, map);
  offerForm.reset();
});


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
