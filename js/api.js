import { getDataErrorPopup, createPopup, closeErrorPopup} from './user-modal.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => (response.ok) ? response.json() : getDataErrorPopup(`${response.status} ${response.statusText}`, createPopup))
    .then((cards) => {
      onSuccess(cards);
    })
    .catch((err) => {
      getDataErrorPopup(err, createPopup);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
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
