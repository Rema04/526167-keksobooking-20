'use strict';

(function () {
  var checkMatchedOfCondition = function (item, condition) {
    return item === condition || condition === window.util.ANY_SELECT;
  };

  var getFilteredElementsHousingType = function (elements, userChoice) {
    userChoice = userChoice.value;
    var filteredElements = [];
    for (var i = 0; i < elements.length; i++) {
      if (checkMatchedOfCondition(elements[i].offer.type, userChoice)) {
        filteredElements.push(elements[i]);
        if (filteredElements.length === window.util.LIMITED_AMOUNT_SHOWN_PINS) {
          break;
        }
      }
    }
    return filteredElements;
  };

  window.filter = {
    getFilteredElementsHousingType: getFilteredElementsHousingType
  };

})();
