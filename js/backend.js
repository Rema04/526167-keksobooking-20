'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var URL_REQUEST = 'https://javascript.pages.academy/keksobooking/data';
  var TIME_DELAY = 1000;

  var uploadOffers = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
  var loadOffers = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL_REQUEST);
    xhr.send();
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
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
    return xhr;
  };

  window.backend = {
    load: loadOffers,
    upload: uploadOffers
  };

})();
