'use strict';

(function () {
  var Price = window.util.Price;
  var housingPriceMap = window.util.housingPriceMap;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');

  var checkMatchedOfCondition = function (item, condition) {
    return item === condition || condition === window.util.ANY_SELECT;
  };

  var checkPrice = function (offerPrice, condition) {
    return condition === Price.low && offerPrice < housingPriceMap[condition].max ||
      condition === Price.high && offerPrice > housingPriceMap[condition].min ||
      condition === Price.middle && (offerPrice >= housingPriceMap[condition].min &&
        offerPrice <= housingPriceMap[condition].max) || condition === window.util.ANY_SELECT;
  };
  var checkFeatures = function (offerFeatures, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return offerFeatures.includes(feature);
    });
  };
  var checkMatchedHousingType = function (element) {
    return checkMatchedOfCondition(element.offer.type, housingType.value);
  };

  var checkMatchedPrice = function (element) {
    return checkPrice(element.offer.price, housingPrice.value);
  };
  var checkMatchedRooms = function (element) {
    return checkMatchedOfCondition(String(element.offer.rooms), housingRoom.value);
  };
  var checkMatchedGuests = function (element) {
    return checkMatchedOfCondition(String(element.offer.guests), housingGuest.value);
  };

  var checkMatchedFeatures = function (element) {
    var checkboxFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
    var featuresValues = checkboxFeatures.map(function (feature) {
      return feature.value;
    });
    return checkFeatures(element.offer.features, featuresValues);
  };
  var checkParameters = [
    checkMatchedHousingType,
    checkMatchedPrice,
    checkMatchedRooms,
    checkMatchedGuests,
    checkMatchedFeatures
  ];

  var getFilteredPins = function (elements) {
    var filteredElements = [];
    for (var i = 0; i < elements.length; i++) {
      if (checkParameters.every(function (parameter) {
        return parameter(elements[i]);
      })) {
        filteredElements.push(elements[i]);
      }
      if (filteredElements.length === window.util.LIMITED_AMOUNT_SHOWN_PINS) {
        break;
      }
    }
    return filteredElements;
  };

  window.filter = {
    getFilteredPins: getFilteredPins
  };

})();
