import {getUserFormSubmit, onButtonReset, disableState} from './form.js';
import {initialMap, mainMarkerLatLng} from './map.js';
import {getData} from './api.js';
import {setFilterChange, getFilteredAds, activateFilterForm} from './filtres.js';
import {debounce} from './utils/debounce.js';
import './preview.js';


disableState();

initialMap();
mainMarkerLatLng();

getData((cards) => {
  getFilteredAds(cards),
  setFilterChange(debounce(() => getFilteredAds(cards)));
  activateFilterForm();
  getUserFormSubmit(() => getFilteredAds(cards));
  onButtonReset(() => getFilteredAds(cards));
});
