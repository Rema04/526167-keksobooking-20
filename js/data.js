'use strict';

(function () {

  var MIN_COORDINATES_Y = 130;
  var MAX_COORDINATES_Y = 630;
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
    MIN_COORDINATES_Y: MIN_COORDINATES_Y,
    MAX_COORDINATES_Y: MAX_COORDINATES_Y,
    REAL_ESTATE_TYPE: REAL_ESTATE_TYPE,
    MIN_PRICE_DEPENDENCE_TYPE: MIN_PRICE_DEPENDENCE_TYPE
  };

})();
