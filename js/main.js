import {getUserFormSubmit, onButtonReset, disableState} from './form.js';
import {initialMap, mainMarkerLatLng} from './map.js';
import {getData} from './api.js';
import {getSuccessPopup, getErrorPopup} from './user-modal.js';
import {setFilterChange, getFilteredAds} from './filtres.js';
import {debounce} from './utils/debounce.js';


disableState();

initialMap();
mainMarkerLatLng();

getData((cards) => {
  getFilteredAds(cards),
  setFilterChange(debounce(() => getFilteredAds(cards)));
  onButtonReset(cards);
});

getUserFormSubmit(getSuccessPopup, getErrorPopup);
