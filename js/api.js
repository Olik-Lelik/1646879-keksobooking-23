import { getDataErrorPopup, createPopup, closeErrorPopup} from './user-modal.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        getDataErrorPopup(`${response.status} ${response.statusText}`, createPopup);
      }
    })
    .then((cards) => {
      onSuccess(cards);
    })
    .catch((err) => {
      getDataErrorPopup(err, createPopup);
    });
};

const sendData = (onSuccess, onError, reset, body) => {
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
      closeErrorPopup();
    }
  })
    .catch(() => {
      onError(),
      closeErrorPopup();
    });
};

export {getData, sendData};
