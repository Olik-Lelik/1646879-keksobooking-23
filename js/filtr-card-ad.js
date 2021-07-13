import {TypeHousing} from './util.js';

const createAutorAvatar = (container, avatar) => {
  if (avatar.length === 0) {
    container.classList.add('hidden');
  } else {
    container.src = avatar;
  }
};

const createPrice = (container, price) => {
  if (price.length === 0) {
    container.classList.add('hidden');
  } else {
    container.textContent = `${price}₽/ночь`;
  }
};

const createTypeHousing = (container, type) => {
  if (type.length === 0) {
    container.classList.add('hidden');
  } else {
    container.textContent = TypeHousing[type];
  }
};

const createCapacity = (container, rooms, guests) => {
  if (rooms.length === 0 || guests.length === 0) {
    container.classList.add('hidden');
  } else {
    container.textContent = `${rooms} комнаты для ${guests} гостей`;
  }
};

const createTime = (container, checkin, checkout) => {
  if (checkin.length === 0 || checkout.length === 0) {
    container.classList.add('hidden');
  } else {
    container.textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
  }
};

const createFeatures = (container, features) => {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  if (!features) {
    container.classList.add('hidden');
  } else {
    features.forEach((feature) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add(`popup__feature--${feature}`);
      fragment.appendChild(element);
    });

    container.appendChild(fragment);
  }
};

const createPhotos = (container, photos) => {
  const fragment = document.createDocumentFragment();

  if (!photos) {
    container.classList.add('hidden');
  } else {
    photos.forEach((photo) => {
      const element = container.querySelector('.popup__photo').cloneNode(true);
      element.src = photo;
      fragment.appendChild(element);
    });

    container.innerHTML = '';

    container.appendChild(fragment);
  }
};

const checkDataAvailable = (container, item) => {
  if (!item) {
    container.classList.add('hidden');
  } else {
    container.textContent = item;
  }
};

export {createAutorAvatar, createPrice, createTypeHousing, createCapacity, createTime, createFeatures, createPhotos, checkDataAvailable};
