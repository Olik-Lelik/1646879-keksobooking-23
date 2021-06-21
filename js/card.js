import {TYPE_HOUSING} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createFeatures = (path, items) => {
  path.innerHTML = '';
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add(`popup__feature--${item}`);
    fragment.appendChild(element);
  });

  path.appendChild(fragment);

  if (items.lengt === 0) {
    path.classList.add('hidden');
  }
};

const createPhotos = (path, items) => {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const element = path.querySelector('.popup__photo').cloneNode(true);
    element.src = item;
    fragment.appendChild(element);
  });

  path.innerHTML = '';

  path.appendChild(fragment);

  if (items.lengt === 0) {
    path.classList.add('hidden');
  }
};

const getListAds = (array) => {
  const adsFragment = document.createDocumentFragment();

  array.forEach( (element) => {
    const cardElemet = cardTemplate.cloneNode(true);

    cardElemet.querySelector('.popup__avatar').src = element.autor.avatar;

    cardElemet.querySelector('.popup__title').textContent = element.offer.title;
    cardElemet.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElemet.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;
    cardElemet.querySelector('.popup__type').textContent = TYPE_HOUSING[element.offer.type];
    cardElemet.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
    cardElemet.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}.`;
    createFeatures(cardElemet.querySelector('.popup__features'), element.offer.features);
    cardElemet.querySelector('.popup__description').textContent = element.offer.description;
    createPhotos(cardElemet.querySelector('.popup__photos'), element.offer.photos);

    if (element.offer.description.lengt === 0) {
      cardElemet.querySelector('.popup__description')
        .classList.add('hidden');
    }

    adsFragment.appendChild(cardElemet);
  });

  return adsFragment;
};

export {getListAds};
