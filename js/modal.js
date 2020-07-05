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
    document.removeEventListener('click', modalClickHandler);
    errorMessageCloseButton.removeEventListener('click', errorMessageCloseButtonClickHandler);
  };
  var errorMessageCloseButtonClickHandler = function () {
    closeModal(currentModal);
  };

  var currentModal;
  var modalKeydownHandler = function (evt) {
    if (evt.key === window.util.ESCAPE_KEY) {
      closeModal(currentModal);
    }
  };

  var modalClickHandler = function (evt) {
    if (evt.target !== currentModal.children[0]) {
      closeModal(currentModal);
    }
  };

  var showModal = function (modal, insertionPoint) {
    insertionPoint.append(modal);
    currentModal = modal;
    document.addEventListener('keydown', modalKeydownHandler);
    document.addEventListener('click', modalClickHandler);
    errorMessageCloseButton.addEventListener('click', errorMessageCloseButtonClickHandler);
  };


  window.modal = {
    show: showModal,
    close: closeModal,
    success: successModal,
    error: errorModal
  };
})();
