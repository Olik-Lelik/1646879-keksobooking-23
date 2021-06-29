const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const typeInput = adForm.querySelector('#type');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const capacityOption = capacityInput.querySelectorAll('option');
const timeInInpup = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

const priceHousing = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const capacityGuests = {
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

typeInput.addEventListener('change', () => {
  priceInput.placeholder = priceHousing[typeInput.value];
  priceInput.min = priceHousing[typeInput.value];
});

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;

  if (+valuePrice > MAX_VALUE_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена — ${MAX_VALUE_PRICE}.`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// «Количество комнат» и «Количество мест»

const capasityOptionDisabled = () => {
  capacityOption.forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

capasityOptionDisabled();

const CapacityRooms = () => {

  capasityOptionDisabled();

  const numberRooms = capacityGuests[roomNumberInput.value];

  numberRooms.forEach((room) => {
    capacityOption.forEach((item) => {
      if (+item.value === room) {
        item.removeAttribute('disabled');
      }
    });
  });
};

roomNumberInput.addEventListener('change', CapacityRooms);

// «Время заезда» и «Время выезда»

const changeTimeInInpup  = () => {
  timeOutInput.value = timeInInpup.value;
};

const changeTimeOutInpup = () => {
  timeInInpup.value = timeOutInput.value;
};

timeInInpup.addEventListener('change', changeTimeInInpup);
timeOutInput.addEventListener('change', changeTimeOutInpup);

// "Неактивное состояние" и "Активное состояние"

const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  for (const elem of adFormList) {
    elem.setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.setAttribute('disabled', 'disabled');
  }
};

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const elem of adFormList) {
    elem.removeAttribute('disabled');
  }
  mapFilters.classList.remove('map__filters--disabled');
  for (const elem of mapFiltersList) {
    elem.removeAttribute('disabled');
  }
};

export {inactiveState, activeState}; // Пока оставила так, чтобы линтер не ругался
