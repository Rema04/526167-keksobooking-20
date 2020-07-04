'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobookin';
  var TIME_DELAY = 1000;
  window.uploadOffer = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    });

    xhr.timeout = TIME_DELAY;
    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
