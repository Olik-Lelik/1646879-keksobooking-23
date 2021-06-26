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
  const cardElemet = cardTemplate.cloneNode(true);

  createAutorAvatar(cardElemet.querySelector('.popup__avatar'), ad.autor.avatar);

  checkDataAvailable(cardElemet.querySelector('.popup__title'), ad.offer.title);
  checkDataAvailable(cardElemet.querySelector('.popup__text--address'), ad.offer.address);
  createPrice(cardElemet.querySelector('.popup__text--price'), ad.offer.price);
  createTypeHousing(cardElemet.querySelector('.popup__type'), ad.offer.type);
  createCapacity(cardElemet.querySelector('.popup__text--capacity'), ad.offer.rooms, ad.offer.guests);
  createTime(cardElemet.querySelector('.popup__text--time'), ad.offer.checkin, ad.offer.checkout);
  createFeatures(cardElemet.querySelector('.popup__features'), ad.offer.features);
  checkDataAvailable(cardElemet.querySelector('.popup__description'), ad.offer.description);
  createPhotos(cardElemet.querySelector('.popup__photos'), ad.offer.photos);

  return cardElemet;
};

export {renderCardAd};
