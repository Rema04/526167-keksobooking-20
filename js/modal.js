'use strict';

(function () {
  var offerForm = document.querySelector('.ad-form');
  var successModal = document.querySelector('#success')
    .content.querySelector('.success');

  var succesText = successModal.querySelector('.success__message');
  var showMessageSubmit = function (message, insertionPoint) {
    insertionPoint.append(message);
  };

  offerForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    showMessageSubmit(successModal, offerForm);
    offerForm.reset();
  });

  successModal.addEventListener('click', function (evt) {
    if (evt.target !== succesText) {
      successModal.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscapePress(evt, successModal.remove());
  });

})();

