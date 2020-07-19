'use strict';
(function () {

  var uploadOffers = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', window.util.URL_UPLOAD);
    xhr.send(data);
  };
  var loadOffers = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', window.util.URL_REQUEST);
    xhr.send();
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Произошла ошибка. Статус: ' + xhr.status);
      }
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    });

    xhr.timeout = window.util.TIME_DELAY;
    return xhr;
  };

  window.backend = {
    load: loadOffers,
    upload: uploadOffers
  };

})();
