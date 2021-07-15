import {resetPage} from './map.js';
import {sendData} from './api.js';
import {mapFilters, mapFiltersList} from './filtres.js';
import {getSuccessPopup, getErrorPopup} from './user-modal.js';
import {getPreview} from './preview.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const capacityOptions = capacityInput.querySelectorAll('option');
const timeInInpup = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const addressInput = adForm.querySelector('#address');
const adFormReset = adForm.querySelector('.ad-form__reset');
const adFormAvatar = document.querySelector('.ad-form-header__preview');
const adFormPhoto = document.querySelector('.ad-form__photo');
const avatarPreview = adFormAvatar.querySelector('img').cloneNode(true);
const avatarChooser = adForm.querySelector('#avatar');
const photoChooser = adForm.querySelector('#images');

const priceHousing = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const roomsGuests = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

//Фото  аватар

const getAvatar = (result) => {
  const fragment = document.createDocumentFragment();

  avatarPreview.src = result;
  fragment.appendChild(avatarPreview);
  adFormAvatar.innerHTML = '';
  adFormAvatar.appendChild(fragment);
};

const getPhoto = (result) => {
  adFormPhoto.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const element = document.createElement('img');
  element.src = result;
  element.alt = 'Фото жилья';
  element.width = '70';
  element.height = '70';
  fragment.appendChild(element);
  adFormPhoto.appendChild(fragment);
};

const getAvatarPreview = () => getPreview(avatarChooser, getAvatar);
const getPhotoPreview = () => getPreview(photoChooser, getPhoto);

getAvatarPreview();
getPhotoPreview();

// "Заголовок объявления"

titleInput.addEventListener('input', () => {
  const titleLength = titleInput.value.length;

  if (titleLength < MIN_LENGTH_TITLE) {
    titleInput.style.borderColor = 'red';
    titleInput.setCustomValidity(`Минимальная длина — 30 символов. Нужно еще ${MIN_LENGTH_TITLE - titleLength} симв.`);
  } else if (titleLength > MAX_LENGTH_TITLE) {
    titleInput.style.borderColor = 'red';
    titleInput.setCustomValidity(`Максимальная длина — 100 символов. Удалите лишние ${titleLength - MAX_LENGTH_TITLE} симв.`);
  } else {
    titleInput.style.borderColor = 'white';
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// «Тип жилья» и «Цена за ночь»

const changePriceInput = () => {
  priceInput.placeholder = priceHousing[typeInput.value];
  priceInput.min = priceHousing[typeInput.value];
};

typeInput.addEventListener('change', changePriceInput);

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;

  if(valuePrice < priceHousing[typeInput.value]) {
    priceInput.style.borderColor = 'red';
  } else if (valuePrice > MAX_VALUE_PRICE) {
    priceInput.style.borderColor = 'red';
    priceInput.setCustomValidity(`Максимальная цена — ${MAX_VALUE_PRICE}.`);
  } else {
    priceInput.style.borderColor = 'white';
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// «Количество комнат» и «Количество мест»

const disableCapacityOption = () => {
  capacityOptions.forEach((item) => item.disabled = !item.selected);
};

disableCapacityOption();

const changeCapacityRooms = () => {
  const capacityGuests = roomsGuests[roomNumberInput.value];

  capacityOptions.forEach((item) => {
    const guests = +item.value;

    item.disabled = !capacityGuests.includes(guests);

    item.selected = capacityGuests.includes(guests);
  });
};

roomNumberInput.addEventListener('change', changeCapacityRooms);

// «Время заезда» и «Время выезда»

const changeTimeInInpup  = () => {
  timeOutInput.value = timeInInpup.value;
};

const changeTimeOutInpup = () => {
  timeInInpup.value = timeOutInput.value;
};

timeInInpup.addEventListener('change', changeTimeInInpup);
timeOutInput.addEventListener('change', changeTimeOutInpup);

// "Выбор адреса на карте"

const changeAddressInput = (coordinates) => {
  addressInput.value = `${(coordinates.lat).toFixed(5)}, ${(coordinates.lng).toFixed(5)}`;
};

// "Неактивное состояние" и "Активное состояние"

const disableState = () => {
  adForm.classList.add('ad-form--disabled');
  for (const elem of adFormList) {
    elem.setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.setAttribute('disabled', 'disabled');
  }
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const elem of adFormList) {
    elem.removeAttribute('disabled');
  }
};

//Отправка формы
const getUserFormSubmit = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(
      () => {
        getSuccessPopup();
        resetPage();
        cb();
      },
      getErrorPopup,
      formData);

  });
};

//Reset страницы
const onButtonReset = (cb) => {
  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();

    resetPage();
    cb();
  } );
};

export {disableState, activateAdForm, changeAddressInput, getUserFormSubmit, adForm, changePriceInput, onButtonReset, avatarPreview, adFormPhoto};
