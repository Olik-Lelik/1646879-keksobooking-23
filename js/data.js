import {getRandom, getRandomArrayElement, getShuffleArray, getImageNumber, getLocation} from './util.js';

const  OFFER_COUNT = 3;

const Price = {
  MIN: 1000,
  MAX: 50000,
};

const Lat = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const Lng = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const TypeHousing = {
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
  const CURRENT_LOCATION = getLocation(Lat, Lng);

  return {
    autor: {
      avatar: `img/avatars/${getImageNumber()}.png`,
    },
    offer: {
      title: getTitle(),
      address: `${CURRENT_LOCATION.lat}, ${CURRENT_LOCATION.lng}`,
      price: getRandom(Price.MIN, Price.MAX),
      type: getRandomArrayElement(Object.keys(TypeHousing)),
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

const getAds = () => new Array(OFFER_COUNT).fill(null).map(() => createOffer());

export {getAds, TypeHousing};

