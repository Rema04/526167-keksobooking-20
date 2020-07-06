'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var filters = mapFiltersContainer.querySelector('form');
  var housingType = document.querySelector('#housing-type');

  window.util.changeDisabledForm(window.form.fields);
  window.util.changeDisabledForm(filters);

  var putMainPinCenterMap = function () {
    mainPin.style.top = map.clientHeight / 2 + 'px';
    mainPin.style.left = map.clientWidth / 2 + 'px';
    window.form.addressField.value =
      window.form.getAddress(window.pin.part.CENTER);
  };
  var onSuccess = function (data) {
    window.allPins = data;
    var shownPins = data.slice(0, window.util.LIMITED_AMOUNT_SHOWN_PINS);
    var mapPins = window.pin.render(shownPins);
    for (var i = 0; i < mapPins.children.length; i++) {
      var pin = mapPins.children[i];
      addPinClickHandler(pin, window.card.render(data[i]));
    }
    mapPinsBlock.appendChild(mapPins);
    window.util.changeDisabledForm(filters);
  };
  var deleteAllPins = function () {
    var pinCollections =
      document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinCollections.length; i++) {
      pinCollections[i].remove();
    }
  };
  var activateMapAndForm = function () {
    map.classList.remove('map--faded');
    window.form.fields.classList.remove('ad-form--disabled');
    window.util.changeDisabledForm(window.form.fields);
    window.form.addressField.value =
    window.form.getAddress(window.pin.part.TIP);
    window.backend.load(onSuccess);
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
    deleteCard(currentCard);
    deleteAllPins();
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
  var showFilteredOffer = function () {
    var filteredOffer = window.filter.getFilteredElementsHousingType(window.allPins, housingType);
    deleteAllPins();
    deleteCard(currentCard);
    var filteredPins = window.pin.render(filteredOffer);
    for (var i = 0; i < filteredPins.children.length; i++) {
      var pin = filteredPins.children[i];
      addPinClickHandler(pin, window.card.render(filteredOffer[i]));
    }
    mapPinsBlock.appendChild(filteredPins);
  };

  housingType.addEventListener('change', showFilteredOffer);

  window.map = {
    disable: disableMapAndForm,
    mainPinMousedownHandler: mainPinMousedownHandler,
    mainPinKeydownHandler: mainPinKeydownHandler,
    putMainPinCenter: putMainPinCenterMap,
  };

})();
