'use strict';
(function () {

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesChooser = document.querySelector('#images');
  var imagesPreview = document.querySelector('.ad-form__photo img');


  var getPreviewImage = function (fileInput, previewImageElement) {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.util.FILE_TYPES.some(function (format) {
      return fileName.endsWith(format);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImageElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var removePreview = function () {
    imagesPreview.src = window.util.PICTURE_STUB;
    avatarPreview.src = window.util.PICTURE_STUB;
  };

  var avatarChooserChangeHandler = function () {
    getPreviewImage(avatarChooser, avatarPreview);
  };
  var imagesChooserChangeHandler = function () {
    getPreviewImage(imagesChooser, imagesPreview);
  };
  avatarChooser.addEventListener('change', avatarChooserChangeHandler);
  imagesChooser.addEventListener('change', imagesChooserChangeHandler);

  window.preview = {
    remove: removePreview
  };

})();
