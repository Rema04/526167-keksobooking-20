'use strict';
(function () {

  var HousingPriceMap = window.util.HousingPriceMap;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');

  var checkMatchedOfCondition = function (item, condition) {
    return item === condition || condition === window.util.ANY_SELECT;
  };

  var checkPrice = function (advertPrice, type) {
    return type === window.util.ANY_SELECT || (advertPrice >= HousingPriceMap[type].min && advertPrice < HousingPriceMap[type].max);
  };

  var checkFeatures = function (offerFeatures, selectedFeatures) {
    return selectedFeatures.every(function (feature) {
      return offerFeatures.includes(feature);
    });
  };
  var checkMatchedHousingType = function (advert) {
    return checkMatchedOfCondition(advert.offer.type, housingType.value);
  };

  var checkMatchedPrice = function (advert) {
    return checkPrice(advert.offer.price, housingPrice.value);
  };
  var checkMatchedRooms = function (advert) {
    return checkMatchedOfCondition(String(advert.offer.rooms), housingRoom.value);
  };
  var checkMatchedGuests = function (advert) {
    return checkMatchedOfCondition(String(advert.offer.guests), housingGuest.value);
  };

  var checkMatchedFeatures = function (advert) {
    var checkboxFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
    var featuresValues = checkboxFeatures.map(function (feature) {
      return feature.value;
    });
    return checkFeatures(advert.offer.features, featuresValues);
  };
  var checkParameters = [
    checkMatchedHousingType,
    checkMatchedPrice,
    checkMatchedRooms,
    checkMatchedGuests,
    checkMatchedFeatures
  ];

  var getFilteredPins = function (adverts) {
    var filteredElements = [];
    for (var i = 0; i < adverts.length; i++) {
      if (checkParameters.every(function (parameter) {
        return parameter(adverts[i]);
      })) {
        filteredElements.push(adverts[i]);
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
