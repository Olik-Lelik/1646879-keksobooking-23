import { getDataErrorPopup, openPopup} from './user-modal.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        getDataErrorPopup(`${response.status} ${response.statusText}`, openPopup);
      }
    })
    .then((cards) => {
      onSuccess(cards);
    })
    .catch((err) => {
      getDataErrorPopup(err, openPopup);
    });
};

const sendData = (onSuccess, onError, reset, body, closeButton) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess(),
      reset();
    } else {
      onError(),
      closeButton();
    }
  })
    .catch(() => {
      onError(),
      closeButton();
    });
};

export {getData, sendData};
