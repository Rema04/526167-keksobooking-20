'use strict';
var AMOUNT_ADVERSTISEMENTS = 8;
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//Служебная функция для получения рандомного числа в диапозоне от min до max
var randomIntegerRange = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
};

//ф-ция для получения случайного значения из массива
var randomIndexArray = function (array) {
  var index = [Math.ceil(Math.random() * array.length)] - 1;
  return array[index];
};

//ф-ция создания объекта
var createOffer = function (pathAvatar) {
  var typesArray = ['palace', 'flat', 'house', 'bungalo'];
  var checkinArray = ['12:00', '13:00', '14:00'];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//объект который будет возвращаться из функции
  var tempOffer = {
    author: {
      avatar: 'img/avatars/user0' + pathAvatar + '.png'
    },
    offer: {
      title: 'строка с описанием',
      address: '600, 350',
      price: randomIntegerRange(5000, 30000),
      type: randomIndexArray(typesArray),
      rooms: Math.ceil(Math.random() * 5),
      guests: Math.ceil(Math.random() * 10),
      checkin: randomIndexArray(checkinArray),
      features: randomIndexArray(featuresArray),
      description: 'строка с описанием',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ]
    },
    location: {
      x: randomIntegerRange(0, map.clientWidth),//ограничение значения X по ширине блока map
      y: randomIntegerRange(130, 630)//рандом от 130 до 630
    }
  };
  return tempOffer;
};

// массив объявлений
var advertisements = [];
for(var i = 0; i < AMOUNT_ADVERSTISEMENTS; i++) {
  advertisements.push(createOffer(i+1));
}

var templatePin = document.querySelector('#pin').content
.querySelector('.map__pin');

var createPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
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

