'use strict';
(function () {

  var SUCCESS_STATUS = 200;
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var URL_REQUEST = 'https://javascript.pages.academy/keksobooking/data';
  var TIME_DELAY = 1000;
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
  var TIP_HEIGHT = 22;
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;
  var LIMITED_AMOUNT_SHOWN_PINS = 5;
  var ANY_SELECT = 'any';
  var HousingPriceMap = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PICTURE_STUB = 'img/muffin-grey.svg';

  var addErrorField = function (field, errorText) {
    field.classList.add('error-border');
    field.setCustomValidity(errorText);
  };
  var removeErrorField = function (field) {
    field.classList.remove('error-border');
    field.setCustomValidity('');
  };

  var getCoords = function (element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  };

  var deleteInsertionPoint = function (data, insertionPoint) {
    if (data.length === 0) {
      insertionPoint.remove();
    }
    return data;
  };

  var disableForm = function (form) {
    var formElements = form.children;
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', 'disabled');
    }
  };

  var activateForm = function (form) {
    var formElements = form.children;
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  window.util = {
    SUCCESS_STATUS: SUCCESS_STATUS,
    URL_UPLOAD: URL_UPLOAD,
    URL_REQUEST: URL_REQUEST,
    TIME_DELAY: TIME_DELAY,
    MIN_COORDINATES_Y: MIN_COORDINATES_Y,
    MAX_COORDINATES_Y: MAX_COORDINATES_Y,
    REAL_ESTATE_TYPE: REAL_ESTATE_TYPE,
    MIN_PRICE_DEPENDENCE_TYPE: MIN_PRICE_DEPENDENCE_TYPE,
    TIP_HEIGHT: TIP_HEIGHT,
    ENTER_KEY: ENTER_KEY,
    ESCAPE_KEY: ESCAPE_KEY,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    LIMITED_AMOUNT_SHOWN_PINS: LIMITED_AMOUNT_SHOWN_PINS,
    ANY_SELECT: ANY_SELECT,
    HousingPriceMap: HousingPriceMap,
    FILE_TYPES: FILE_TYPES,
    PICTURE_STUB: PICTURE_STUB,
    addErrorField: addErrorField,
    removeErrorField: removeErrorField,
    getCoords: getCoords,
    deleteInsertionPoint: deleteInsertionPoint,
    disableForm: disableForm,
    activateForm: activateForm
  };

})();
