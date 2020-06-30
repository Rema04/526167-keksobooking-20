'use strict';

(function () {
  var successModal = document.querySelector('#success')
    .content.querySelector('.success');

  var errorModal = document.querySelector('#error')
    .content.querySelector('.error');
  var errorMessageCloseButton = errorModal.querySelector('.error__button');

  var closeModal = function (modal) {
    modal.remove();
  };
  var errorMessageCloseButtonMousedownHandler = function () {
    closeModal();
  };

  var showModal = function (modal, insertionPoint) {
    insertionPoint.append(modal);

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.ESCAPE_KEY) {
        closeModal(modal);
      }
    });
    document.addEventListener('mousedown', function (evt) {
      if (evt.target !== modal.children[0]) {
        modal.remove();
      }
    });
  };

  errorMessageCloseButton.addEventListener('mousedown', errorMessageCloseButtonMousedownHandler);

  window.modal = {
    show: showModal,
    close: closeModal,
    success: successModal,
    error: errorModal
  };
})();

