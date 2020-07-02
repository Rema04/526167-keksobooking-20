'use strict';

(function () {

  var offerForm = document.querySelector('.ad-form');
  var addressField = offerForm.address;
  var titleField = offerForm.title;
  var typeField = offerForm.type;
  var priceField = offerForm.price;
  var roomField = offerForm.rooms;
  var guestField = offerForm.capacity;
  var timeInField = offerForm.timein;
  var timeOutField = offerForm.timeout;
  var mainPin = document.querySelector('.map__pin--main');
  var offerFormResetButton = document.querySelector('.ad-form__reset');
  var mainElement = document.querySelector('main');

  var validateRoomsAndGuestsValues = function () {
    if (guestField.value > roomField.value && guestField.value !== '0' && roomField.value !== '100') {
      window.util.addErrorField(roomField, 'Количество гостей не может превышать количество комнат');
    } else if (guestField.value === '0' && roomField.value !== '100') {
      window.util.addErrorField(roomField, 'Выберите 100 комнат');
    } else if (guestField.value !== '0' && roomField.value === '100') {
      window.util.addErrorField(roomField, 'Данное жилье не для гостей');
    } else {
      window.util.removeErrorField(roomField);
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

  var validateTitleField = function () {
    var valueLength = titleField.value.length;
    var minLengthValue = titleField.getAttribute('minlength');
    var maxLengthValue = titleField.getAttribute('maxlength');
    if (titleField.validity.valueMissing) {
      window.util.addErrorField(titleField, 'Поле обязательно к заполнению');
    } else if (titleField.validity.tooShort) {
      window.util.addErrorField(titleField, 'Минимальная длина — ' + minLengthValue + ' символов. Вам не хватает еще ' + (minLengthValue - valueLength));
    } else if (titleField.validity.tooLong) {
      window.util.addErrorField(titleField, 'Максимальная длина — ' + maxLengthValue + ' символов. Удалите ' + (valueLength - maxLengthValue));
    } else {
      window.util.removeErrorField(titleField);
    }
  };
  var titleFieldInputHandler = function () {
    validateTitleField();
  };
  var titleFieldInvalidHandler = function () {
    validateTitleField();
  };

  var validateTypeField = function () {
    priceField.min = window.data.MIN_PRICE_DEPENDENCE_TYPE[typeField.value];
    priceField.setAttribute('placeholder', window.data.MIN_PRICE_DEPENDENCE_TYPE[typeField.value]);
    window.util.removeErrorField(priceField);
  };
  var typeFieldChangeHandler = function () {
    validateTypeField();
  };

  var validatePriceField = function () {
    var maxPrice = priceField.getAttribute('max');
    var priceValue = +priceField.value;
    var typeValue = typeField.value;
    if (priceValue > maxPrice) {
      window.util.addErrorField(priceField, 'Максимальное значение - ' + maxPrice);
    } else if (priceValue < window.data.MIN_PRICE_DEPENDENCE_TYPE[typeValue]) {
      window.util.addErrorField(priceField, 'Минимальное значение для  ' + window.data.REAL_ESTATE_TYPE[typeValue] + ' - ' + window.data.MIN_PRICE_DEPENDENCE_TYPE[typeValue]);
    } else if (priceValue === '') {
      window.util.addErrorField(priceField, 'Поле обязательно к заполнению');
    } else {
      window.util.removeErrorField(priceField);
    }
  };
  var priceFieldChangeHandler = function () {
    validatePriceField();
  };
  var priceFieldInvalidHandler = function () {
    validatePriceField();
  };
  var priceFieldInputHandler = function () {
    validatePriceField();
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
  priceField.addEventListener('invalid', priceFieldInvalidHandler);
  priceField.addEventListener('input', priceFieldInputHandler);
  timeInField.addEventListener('change', timeInFieldChangeHandler);
  timeOutField.addEventListener('change', timeOutFieldChangeHandler);

  var getAddress = function (pinPart) {
    var diff = pinPart === window.pin.part.CENTER ? mainPin.clientHeight / 2 : mainPin.clientHeight + window.util.TIP_HEIGHT;
    return Math.round(Number(window.util.getCoords(mainPin).left) + mainPin.clientWidth / 2) + ', ' + Math.round(Number(window.util.getCoords(mainPin).top + diff));
  };

  addressField.value = getAddress(window.pin.part.CENTER);

  var onSuccess = function () {
    window.uploadOffer(new FormData(offerForm), function () {
      window.modal.show(window.modal.success, mainElement);
    }, onError);
  };
  var onError = function () {
    window.modal.show(window.modal.error, mainElement);
  };

  var offerFormSubmitHandler = function (evt) {
    onSuccess();
    window.map.disable();
    evt.preventDefault();
    offerForm.reset();
  };
  offerForm.addEventListener('submit', offerFormSubmitHandler);

  var offerFormResetHandler = function () {
    offerForm.reset();
    window.map.disable();
    window.util.removeErrorField(roomField);
    window.util.removeErrorField(priceField);
    window.util.removeErrorField(titleField);
    mainPin.addEventListener('mousedown', window.map.activateHandler);
  };
  offerFormResetButton.addEventListener('click', offerFormResetHandler);

  window.form = {
    fields: offerForm,
    addressField: addressField,
    getAddress: getAddress
  };

})();

