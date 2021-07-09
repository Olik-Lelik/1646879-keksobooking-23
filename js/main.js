import {getUserFormSubmit, onButtonReset, disableState} from './form.js';
import {initialMap, renderAdsMarkers, mainMarkerLatLng} from './map.js';
import {getData} from './api.js';
import {getSuccessPopup, getErrorPopup} from './user-modal.js';

const COUNT = 10;

disableState();

initialMap();
mainMarkerLatLng();

getData((cards) => {
  renderAdsMarkers(cards.slice(0, COUNT));
});

getUserFormSubmit(getSuccessPopup, getErrorPopup);
onButtonReset();
