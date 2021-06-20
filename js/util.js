function getRandom (min, max) {
  if (min >= max || min < 0 || max <= 0) {
    throw new Error('Диапазон включает только положительные числа. Число "от" не может быть больше числа "до".');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const random = min + Math.random() * (max - min + 1);
  return Math.floor(random);
}

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

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

const getShuffleArray = (array) => array.sort(() => Math.random() - 0.5).slice(Math.floor(Math.random()*array.length));

const getImageNumber = () => {
  const number = getRandom (1, 10);

  if (number < 10) {
    return `user0${number}`;
  }
  return `user${number}`;
};

const getLocation = (lat, lng) => ({
  lat: getRandomPoint(lat.MIN, lat.MAX, 5),
  lng: getRandomPoint(lng.MIN, lng.MAX, 5),
});

export {getRandom, getRandomArrayElement, getShuffleArray, getImageNumber, getLocation};
