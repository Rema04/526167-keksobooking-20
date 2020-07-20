'use strict';
(function () {

  var templateOfferCard = document.querySelector('#card').content
    .querySelector('.map__card');

  var addFeaturesInCard = function (data, insertionPoint) {
    window.util.deleteInsertionPoint(data, insertionPoint);
    insertionPoint.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var newElement = document.createElement('li');
      newElement.classList.add('popup__feature', 'popup__feature' + '--' + data[i]);
      insertionPoint.append(newElement);
    }
  };

  var addPhotoInCard = function (data, insertionPoint) {
    window.util.deleteInsertionPoint(data, insertionPoint);
    var similarPhoto = insertionPoint.firstElementChild.cloneNode();
    insertionPoint.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var photo = similarPhoto.cloneNode();
      photo.src = data[i];
      insertionPoint.appendChild(photo);
    }
  };

  var renderOfferCard = function (data) {
    var offerСard = templateOfferCard.cloneNode(true);
    var offerAvatar = offerСard.querySelector('.popup__avatar');
    var offerTitle = offerСard.querySelector('.popup__title');
    var offerAddress = offerСard.querySelector('.popup__text--address');
    var offerPrice = offerСard.querySelector('.popup__text--price');
    var offerType = offerСard.querySelector('.popup__type');
    var offerGuests = offerСard.querySelector('.popup__text--capacity');
    var offerTime = offerСard.querySelector('.popup__text--time');
    var offerFeatures = offerСard.querySelector('.popup__features');
    var offerDescription = offerСard.querySelector('.popup__description');
    var offerPhoto = offerСard.querySelector('.popup__photos');

    offerAvatar.src = window.util.deleteInsertionPoint(data.author.avatar, offerAvatar);
    offerTitle.textContent = window.util.deleteInsertionPoint(data.offer.title, offerTitle);
    offerAddress.textContent = window.util.deleteInsertionPoint(data.offer.address);
    offerPrice.textContent = window.util.deleteInsertionPoint(data.offer.price + ' ₽/ночь', offerPrice);
    offerType.textContent = window.util.deleteInsertionPoint(window.util.REAL_ESTATE_TYPE[data.offer.type]);
    offerGuests.textContent = window.util.deleteInsertionPoint(data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей', offerGuests);
    offerTime.textContent = window.util.deleteInsertionPoint('Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout, offerTime);
    addFeaturesInCard(data.offer.features, offerFeatures, 'li', 'popup__feature');
    offerDescription.textContent = window.util.deleteInsertionPoint(data.offer.description);
    addPhotoInCard(data.offer.photos, offerPhoto);
    return offerСard;
  };

  window.card = {
    render: renderOfferCard,
  };

})();
