import {getRandom, getRandomArrayElement, getShuffleArray, getImageNumber, getLocation} from './util.js';

const price = {
  MIN: 1000,
  MAX: 50000,
};

const lat = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const lng = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const typeHousing = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getTitle = () => `Предложение №${getRandom (1, 10)}`;

const getDescription = () => `Описание №${getRandom (1, 10)}`;

const createOffer = () => {
  const CURRENT_LOCATION = getLocation(lat, lng);

  return {
    autor: {
      avatar: `img/avatars/${getImageNumber()}.png`,
    },
    offer: {
      title: getTitle(),
      address: `${CURRENT_LOCATION.lat}, ${CURRENT_LOCATION.lng}`,
      price: getRandom(price.MIN, price.MAX),
      type: getRandomArrayElement(typeHousing),
      rooms: getRandom(1, 4),
      guests: getRandom(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getShuffleArray(FEATURES),
      description: getDescription(),
      photos: getShuffleArray(PHOTOS),
    },
    location: CURRENT_LOCATION,
  };
};

export {createOffer};
export {typeHousing};
