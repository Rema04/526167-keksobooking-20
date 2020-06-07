'use strict';
var AMOUNT_ADVERSTISEMENTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_PRICE = 3000;
var MAX_PRICE = 50000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomIntegerRange = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

var getRandomElementArray = function (array) {

  var index = getRandomIntegerRange(0, array.length - 1);
  return array[index];
};

var getSubarray = function (array) {
  var lengthArray = array.length;
  var lengthSubarray = getRandomIntegerRange(0, lengthArray - 1);
  var subarray = [];
  for (var i = 0; i <= lengthSubarray; i++) {
    subarray.push(array[i]);
  }
  return subarray;
};

var createOffer = function (pathAvatar) {
  var locationX = getRandomIntegerRange(0, map.clientWidth);
  var locationY = getRandomIntegerRange(130, 630);

  var tempOffer = {
    author: {
      avatar: 'img/avatars/user0' + pathAvatar + '.png'
    },
    offer: {
      title: 'Уютное жилье',
      address: locationX + ', ' + locationY, // ? не работает location.x
      price: getRandomIntegerRange(MIN_PRICE, MAX_PRICE),
      type: getRandomElementArray(TYPES),
      rooms: getRandomIntegerRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntegerRange(0, 5),
      checkin: getRandomElementArray(CHECKIN_TIMES),
      checkout: getRandomElementArray(CHECKIN_TIMES), // ? checkout строка
      features: getSubarray(FEATURES),
      description: 'Большая квартира в центре Токио',
      photos: getSubarray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return tempOffer; // ? может не создавать объект, а сразу возвращать его
};

var advertisements = [];
for (var i = 0; i < AMOUNT_ADVERSTISEMENTS; i++) {
  advertisements.push(createOffer(i + 1));
}

var templatePin = document.querySelector('#pin').content
  .querySelector('.map__pin');

var createPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) { // жалуется на i
    var pin = templatePin.cloneNode(true);
    var pinAvatar = pin.querySelector('img');
    pinAvatar.src = advertisements[i].author.avatar;
    pinAvatar.alt = advertisements[i].offer.title;
    pin.style.left = advertisements[i].location.x - (pin.clientWidth / 2) + 'px';
    pin.style.top = advertisements[i].location.y - pin.clientHeight + 'px';
    fragment.appendChild(pin);
  }
  return fragment;
};
map.appendChild(createPin());
