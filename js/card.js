import {typeHousing} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createFeatures = (container, features) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add(`popup__feature--${feature}`);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);

  if (features.lengt === 0) {
    container.classList.add('hidden');
  }
};

const createPhotos = (container, photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = container.querySelector('.popup__photo').cloneNode(true);
    element.src = photo;
    fragment.appendChild(element);
  });

  container.innerHTML = '';

  container.appendChild(fragment);

  if (photos.lengt === 0) {
    container.classList.add('hidden');
  }
};

const renderAds = (ad) => {
  const adsFragment = document.createDocumentFragment();

  ad.forEach( (element) => {
    const cardElemet = cardTemplate.cloneNode(true);

    cardElemet.querySelector('.popup__avatar').src = element.autor.avatar;

    cardElemet.querySelector('.popup__title').textContent = element.offer.title;
    cardElemet.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElemet.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;
    cardElemet.querySelector('.popup__type').textContent = typeHousing[element.offer.type];
    cardElemet.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
    cardElemet.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}.`;
    createFeatures(cardElemet.querySelector('.popup__features'), element.offer.features);
    cardElemet.querySelector('.popup__description').textContent = element.offer.description;
    createPhotos(cardElemet.querySelector('.popup__photos'), element.offer.photos);

    if (element.offer.description.lengt === 0) {
      cardElemet.querySelector('.popup__description')
        .classList.add('hidden');
    }

    if (element.autor.avatar === 0) {
      cardElemet.querySelector('.popup__avatar')
        .classList.add('hidden');
    }

    adsFragment.appendChild(cardElemet);
  });

  return adsFragment;
};

export {renderAds};
