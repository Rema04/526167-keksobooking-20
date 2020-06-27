'use strict';
(function () {

  var TIP_HEIGHT = 22;
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var LEFT_MOUSE_BUTTON = 0;

  var addErrorField = function (field, errorText) {
    field.classList.add('error-border');
    field.setCustomValidity(errorText);
  };
  var removeErrorField = function (field) {
    field.classList.remove('error-border');
    field.setCustomValidity('');
  };

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

  var changeDisabledForm = function (form) {
    var formElements = form.children;
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].toggleAttribute('disabled');
    }
  };


  var isEscapePress = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    TIP_HEIGHT: TIP_HEIGHT,
    ENTER_KEY: ENTER_KEY,
    ESCAPE_KEY: ESCAPE_KEY,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    getRandomIntegerRange: getRandomIntegerRange,
    getRandomElement: getRandomElement,
    getSliceElements: getSliceElements,
    addErrorField: addErrorField,
    removeErrorField: removeErrorField,
    getCoords: getCoords,
    deleteInsertionPoint: deleteInsertionPoint,
    changeDisabledForm: changeDisabledForm,
    isEscapePress: isEscapePress
  };


})();
