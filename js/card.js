import {TYPE_HOUSING} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createFeatures = (path, items) => {
  path.innerHTML = '';
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = document.createElement('li');
    element.classList.add(`popup__features--${item}`);
    path.appendChild(element);
  });

  path.appendChild(fragment);

  if (!items.lengt) {
    path.classList.add('hidden');
  }
};

const createPhotos = (path, items) => {
  path.innerHTML = '';
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = path.cloneNode(true);
    element.src = `${item}`;
    fragment.appendChild(element);
  });

  path.appendChild(fragment);

  if (!items.lengt) {
    path.classList.add('hidden');
  }
};

const getListAds = (array) => {
  const adsFragment = document.createDocumentFragment();

  array.forEach( ({autor, offer}) => {
    const cardElemet = cardTemplate.cloneNode(true);

    cardElemet.querySelector('.popup__avatar').src = autor.avatar;

    cardElemet.querySelector('.popup__title').textContent = offer.title;
    cardElemet.querySelector('.popup__text--address').textContent = offer.address;
    cardElemet.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
    cardElemet.querySelector('.popup__type').textContent = TYPE_HOUSING[offer.type];
    cardElemet.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardElemet.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
    createFeatures(cardElemet.querySelector('.popup__features'), offer.features);
    cardElemet.querySelector('.popup__description').textContent = offer.description;
    createPhotos(cardElemet.querySelector('.popup__photos'), offer.photos);

    if (offer.description.lengt === 0) {
      cardElemet.querySelector('.popup__description')
        .classList.add('hidden');
    }

    adsFragment.appendChild(cardElemet);
  });

  return adsFragment;
};

export {getListAds};
