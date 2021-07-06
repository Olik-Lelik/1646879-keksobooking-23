import {createAutorAvatar, createPrice, createTypeHousing, createCapacity, createTime, createFeatures, createPhotos, checkDataAvailable} from './filtr-card-ad.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

/**
 * Отрисовка карточки объявления
 * @param {Object} ad  - Данные объявления
 * @return {Object} - Разметка карточки объявления
 */
const renderCardAd = (ad) => {
  const cardElement = cardTemplate.cloneNode(true);

  createAutorAvatar(cardElement.querySelector('.popup__avatar'), ad.author.avatar);

  checkDataAvailable(cardElement.querySelector('.popup__title'), ad.offer.title);
  checkDataAvailable(cardElement.querySelector('.popup__text--address'), ad.offer.address);
  createPrice(cardElement.querySelector('.popup__text--price'), ad.offer.price);
  createTypeHousing(cardElement.querySelector('.popup__type'), ad.offer.type);
  createCapacity(cardElement.querySelector('.popup__text--capacity'), ad.offer.rooms, ad.offer.guests);
  createTime(cardElement.querySelector('.popup__text--time'), ad.offer.checkin, ad.offer.checkout);
  createFeatures(cardElement.querySelector('.popup__features'), ad.offer.features);
  checkDataAvailable(cardElement.querySelector('.popup__description'), ad.offer.description);
  createPhotos(cardElement.querySelector('.popup__photos'), ad.offer.photos);

  return cardElement;
};

export {renderCardAd};
