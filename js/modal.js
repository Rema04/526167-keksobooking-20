'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var successModal = document.querySelector('#success')
    .content.querySelector('.success');

  var errorModal = document.querySelector('#error')
    .content.querySelector('.error');
  var errorModalMessage = errorModal.querySelector('.error__message');
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

  var showModal = function (modal) {
    mainElement.append(modal);
    currentModal = modal;
    currentModal.addEventListener('keydown', modalKeydownHandler);
    currentModal.addEventListener('click', modalClickHandler);
    errorMessageCloseButton.addEventListener('click', errorMessageCloseButtonClickHandler);
  };

  var showErrorModal = function (message) {
    errorModalMessage.textContent = message;
    showModal(errorModal, message);
  };

  window.modal = {
    show: showModal,
    close: closeModal,
    showError: showErrorModal,
    success: successModal,
    error: errorModal
  };
})();
