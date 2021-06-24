/*Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled;*/

const adForm = document.querySelector('.ad-form');
const adFormList = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;

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

export {inactiveState, activeState};
