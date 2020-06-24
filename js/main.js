'use strict';
(function () {

  var addressField = window.form.offerForm;
  addressField.value = window.map.getAddress(window.pin.MainPinPart.CENTER);

})();
