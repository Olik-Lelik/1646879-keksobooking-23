import {isEscEvent} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorDataPopup = errorTemplate.cloneNode(true);

const errorButton = errorTemplate.querySelector('.error__button');

const getDataErrorPopup = (message, cb) => {
  errorDataPopup.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const element = document.createElement('p');

  element.classList.add('error__message');
  element.textContent = message;
  fragment.appendChild(element);

  errorDataPopup.appendChild(fragment);

  cb(errorDataPopup);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupCloseClick = (evt) => {
  if (evt.target.className !== 'success__message' && evt.target.className !== 'error__message' && evt.target.className !== 'error__button') {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupButtonClick = () => {
  closePopup();
};

function closePopup () {
  if (errorDataPopup) {
    errorDataPopup.remove();
  }
  if (successTemplate) {
    successTemplate.remove();
  }
  if (errorTemplate) {
    errorTemplate.remove();
  }

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseClick);
}

const createPopup = (popup) => {
  document.body.append(popup);

  document.addEventListener('keydown', onPopupEscKeydown);

  document.addEventListener('click', onPopupCloseClick);
};

const closeErrorPopup = () => {
  errorButton.addEventListener('click', onPopupButtonClick);
};

const getSuccessPopup = () => createPopup(successTemplate);
const getErrorPopup = () => createPopup(errorTemplate);

export {getSuccessPopup, getErrorPopup, closeErrorPopup, getDataErrorPopup, createPopup};
