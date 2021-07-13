const TypeHousing = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {TypeHousing, isEscEvent};
