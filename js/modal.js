'use strict';

(function () {
  var successModal = document.querySelector('#success')
    .content.querySelector('.success');

  var errorModal = document.querySelector('#error')
    .content.querySelector('.error');
  var errorMessageCloseButton = errorModal.querySelector('.error__button');
  var closeModal = function (modal) {
    modal.remove();
    document.removeEventListener('keydown', modalKeydownHandler);
    document.removeEventListener('mousedown', modalMousedownHandler);
    errorMessageCloseButton.removeEventListener('mousedown', errorMessageCloseButtonMousedownHandler);
  };
  var errorMessageCloseButtonMousedownHandler = function () {
    closeModal(currentModal);
  };

  var currentModal;
  var modalKeydownHandler = function (evt) {
    if (evt.key === window.util.ESCAPE_KEY) {
      closeModal(currentModal);
    }
  };

  var modalMousedownHandler = function (evt) {
    if (evt.target !== currentModal.children[0]) {
      closeModal(currentModal);
    }
  };

  var showModal = function (modal, insertionPoint) {
    insertionPoint.append(modal);
    currentModal = modal;
    document.addEventListener('keydown', modalKeydownHandler);
    document.addEventListener('mousedown', modalMousedownHandler);
    errorMessageCloseButton.addEventListener('mousedown', errorMessageCloseButtonMousedownHandler);
  };


  window.modal = {
    show: showModal,
    close: closeModal,
    success: successModal,
    error: errorModal
  };
})();
