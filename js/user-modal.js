const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorButton = errorTemplate.querySelector('.error__button');

const getDataErrorPopup = (message, cb) => {
  const errorPopup = errorTemplate.cloneNode(true);

  errorPopup.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const element = document.createElement('p');

  element.classList.add('error__message');
  element.textContent = message;
  fragment.appendChild(element);

  errorPopup.appendChild(fragment);

  cb(errorPopup);
};

const openPopup = (popup) => {
  document.body.append(popup);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      popup.remove();
    }
  }, {once: true});

  document.addEventListener('click', (evt) => {
    if (evt.target.className !== 'success__message' && evt.target.className !== 'error__message' && evt.target.className !== 'error__button') {
      popup.remove();
    }
  }, {once: true});
};

const closeErrorPopup = () => {
  errorButton.addEventListener('click', () => {
    errorTemplate.remove();
  });
};

const getSuccessPopup = () => openPopup(successTemplate);
const getErrorPopup = () => openPopup(errorTemplate);

export {getSuccessPopup, getErrorPopup, closeErrorPopup, getDataErrorPopup, openPopup};
