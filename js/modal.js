'use strict';

(function () {
  var successModal = document.querySelector('#success')
    .content.querySelector('.success');
  var succesMessage = successModal.querySelector('.success__message');

  var errorModal = document.querySelector('#error')
  .content.querySelector('.error');
  var errorMessage = errorModal.querySelector('.error__message');
  var errorMessageCloseButton = errorModal.querySelector('.error__button');

  var showMessageSubmit = function (message, insertionPoint) {
    insertionPoint.append(message);
  };

  successModal.addEventListener('click', function (evt) {
    if (evt.target !== succesMessage) {
      successModal.remove();
    }
  });

  errorModal.addEventListener('click', function (evt) {
    if (evt.target !== errorMessage) {
      errorModal.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscapePress(evt, successModal.remove());
  });
  document.addEventListener('keydown', function (evt) {
    window.util.isEscapePress(evt, errorModal.remove());
  });
  errorMessageCloseButton.addEventListener('click', function () {
    errorModal.remove();
  });

  window.modal = {
    show: showMessageSubmit,
    success: successModal,
    error: errorModal
  };
})();

