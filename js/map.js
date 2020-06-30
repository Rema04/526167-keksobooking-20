'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filters = mapFiltersContainer.querySelector('form');

  window.util.changeDisabledForm(window.form.fields);
  window.util.changeDisabledForm(filters);

  var putMainPinCenterMap = function () {
    mainPin.style.top = map.clientHeight / 2 + 'px';
    mainPin.style.left = map.clientWidth / 2 + 'px';
  };
  var onSuccess = function (data) {
    var mapPins = window.pin.render(data);
    for (var i = 0; i < mapPins.children.length; i++) {
      var pin = mapPins.children[i];
      addPinClickHandler(pin, window.card.render(data[i]));
    }
    mapPinsBlock.appendChild(mapPins);
    window.util.changeDisabledForm(filters);
  };
  var activateMapAndForm = function () {
    map.classList.remove('map--faded');
    window.form.fields.classList.remove('ad-form--disabled');
    window.util.changeDisabledForm(window.form.fields);
    window.form.addressField.value =
    window.form.getAddress(window.pin.part.TIP);
    window.loadOffers(onSuccess);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
  };

  var disableMapAndForm = function () {
    map.classList.add('map--faded');
    window.form.fields.classList.add('ad-form--disabled');
    window.util.changeDisabledForm(window.form.fields);
    window.form.addressField.value =
    window.form.getAddress(window.pin.part.CENTER);
    window.util.changeDisabledForm(filters);
    putMainPinCenterMap();
    mainPin.removeEventListener('mousemove', window.mainPinMousemoveHandler);
  };
  var mainPinKeydownHandler = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      activateMapAndForm();
    }
  };
  var mainPinMousedownHandler = function (evt) {
    if (evt.button === window.util.LEFT_MOUSE_BUTTON) {
      activateMapAndForm();
    }
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  var openOfferCard = function (card) {
    mapFiltersContainer.before(card);
  };
  var deleteCard = function (card) {
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', documentKeydownHandler);
  };
  var closeCardButtonMousedownHandler = function () {
    deleteCard(currentCard);
  };
  var documentKeydownHandler = function (evt) {
    if (evt.key === window.util.ESCAPE_KEY) {
      deleteCard(currentCard);
    }
  };
  var currentCard;
  var addPinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      deleteCard(currentCard);
      currentCard = card;
      openOfferCard(card);
      document.addEventListener('keydown', documentKeydownHandler);
    });
    var closeCardButton = card.querySelector('.popup__close');
    closeCardButton.
      addEventListener('mousedown', closeCardButtonMousedownHandler);
  };

  window.map = {
    disable: disableMapAndForm,
    active: activateMapAndForm,
  };

})();
