function getRandom (min, max) {
  if (min >= max || min < 0 || max <= 0) {
    throw new Error('Диапазон включает только положительные числа. Число "от" не может быть больше числа "до".');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const random = min + Math.random() * (max - min + 1);
  return Math.floor(random);
}

getRandom(3, 5);


function getRandomPoint (min, max, n) {
  if (min >= max || min < 0 || max <= 0) {
    throw new Error('Диапазон включает только положительные числа. Число "от" не может быть больше числа "до".');
  }

  if (n < 0) {
    throw new Error('Значение должно быть больше или равно 0');
  }

  if ((n ^ 0) !== n) {
    throw new Error('Значение должно быть целым числом');
  }

  const decimalPoint = Math.pow(10, n);
  const random = +((min + Math.random() * (max - min)).toFixed(n)) ;
  return Math.floor((random) * decimalPoint) / decimalPoint ;
}

getRandomPoint(1.2, 5.7, 2);

const getImageNumber = () => {
  const number = getRandom (1, 10);

  if (number < 10) {
    return `user0${number}`;
  }
  return `user${number}`;
};

const getAuthor = () => ({
  avatar: `img/avatars/${getImageNumber()}.png`,
});

const getTitle = () => `Предложение №${getRandom (1, 10)}`;

const PRICE = {
  min: 1000,
  max: 50000,
};

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = () => `Описание №${getRandom (1, 10)}`;

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

const getShuffleArray = (array) => array.sort(() => Math.random() - 0.5).slice(Math.floor(Math.random()*array.length));

const getLocation = () => ({
  lat: getRandomPoint(35.65000, 35.70000, 5),
  lng: getRandomPoint(139.70000, 139.80000, 5),
});

const getOffer = () => ({
  title: getTitle(),
  adress: `${getLocation.lat} , ${getLocation.lng}`,
  price: getRandom(PRICE.min, PRICE.max),
  type: getRandomArrayElement(TYPE),
  rooms: getRandom(1, 4),
  guests: getRandom(1, 10),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getShuffleArray(FEATURES),
  description: DESCRIPTION(),
  photos: getShuffleArray(PHOTOS),
});

const createNewArray = () => ({
  autor: getAuthor(),
  offer: getOffer(),
  location: getLocation(),
});

const getNewArray = new Array(10).fill(null).map(() => createNewArray());

getNewArray;
