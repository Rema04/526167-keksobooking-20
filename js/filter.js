'use strict';

(function () {
  var LIMITED_AMOUNT_SHOWN_PINS = window.util.LIMITED_AMOUNT_SHOWN_PINS;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters['housing-type'];
  var checkMatchedOfCondition = function (item, condition) {
    var isMatched = item === condition || condition === 'any' ? true : false;
    return isMatched;
  };

  var getFilteredElementsHousingType = function (elements, userChoice) {
    userChoice = userChoice.value;
    var filteredElements = [];
    for (var i = 0; i < elements.length; i++) {
      if (checkMatchedOfCondition(elements[i].offer.type, userChoice)) {
        filteredElements.push(elements[i]);
      }
    }
    var limitedFilteredElements = filteredElements.slice(0, LIMITED_AMOUNT_SHOWN_PINS);
    return limitedFilteredElements;
  };


  var housingTypeChangeHandler = function () {
    getFilteredElementsHousingType(window.allPins, housingType);
  };

  window.filter = {
    housingType: housingTypeChangeHandler,
    getFilteredElementsHousingType: getFilteredElementsHousingType
  };

})();
