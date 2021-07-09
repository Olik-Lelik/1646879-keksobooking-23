import { resetPage } from './map.js';
import { sendData } from './api.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
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

// "Заголовок объявления"

titleInput.addEventListener('input', () => {
  const titleLength = titleInput.value.length;

  if (titleLength < MIN_LENGTH_TITLE) {
    titleInput.setCustomValidity(`Минимальная длина — 30 символов. Нужно еще ${MIN_LENGTH_TITLE - titleLength} симв.`);
  } else if (titleLength > MAX_LENGTH_TITLE) {
    titleInput.setCustomValidity(`Максимальная длина — 100 символов. Удалите лишние ${titleLength - MAX_LENGTH_TITLE} симв.`);
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
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

  if (valuePrice > MAX_VALUE_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена — ${MAX_VALUE_PRICE}.`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// «Количество комнат» и «Количество мест»

const disableCapacityOption = () => {
  capacityOptions.forEach((item) => {
    if (item.selected) {
      item.disabled = false;
    } else {
      item.disabled = true;
    }
  });
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

const enableState = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const elem of adFormList) {
    elem.removeAttribute('disabled');
  }
  mapFilters.classList.remove('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.removeAttribute('disabled');
  }
};

const getUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(onSuccess, onError, resetPage, formData);
  });
};

const onButtonReset = () => {
  adFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();

    resetPage();
  } );
};

export {disableState, enableState, changeAddressInput, getUserFormSubmit, adForm, changePriceInput, onButtonReset};
