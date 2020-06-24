'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  window.util.changeDisabledForm(window.form.fields);

  var activateMapAndForm = function () {
    map.classList.remove('map--faded');
    window.form.fields.classList.remove('ad-form--disabled');
    window.util.changeDisabledForm(window.form.fields);
    window.form.addressField.value =
    window.form.getAddress(window.pin.part.TIP);
    mapPinsBlock.appendChild(mapPins);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
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

  var offers = window.pin.getOffers(window.data.AMOUNT_OFFER);
  var mapPins = window.pin.render(offers);
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

  for (var i = 0; i < mapPins.children.length; i++) {
    var pin = mapPins.children[i];
    addPinClickHandler(pin, window.card.render(offers[i]));
  }

})();
