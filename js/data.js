'use strict';

(function () {

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

  window.data = {
    AMOUNT_OFFER: AMOUNT_OFFER,
    OFFER_TITLES: OFFER_TITLES,
    TYPES: TYPES,
    CHECKIN_TIMES: CHECKIN_TIMES,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    MIN_COORDINATES_Y: MIN_COORDINATES_Y,
    MAX_COORDINATES_Y: MAX_COORDINATES_Y,
    REAL_ESTATE_TYPE: REAL_ESTATE_TYPE,
    MIN_PRICE_DEPENDENCE_TYPE: MIN_PRICE_DEPENDENCE_TYPE
  };

})();
