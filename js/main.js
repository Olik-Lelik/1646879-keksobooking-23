import './form.js';
import {getAds} from './data.js';
import {initialMap, renderAdsMarkers, mainMarkerLatLng} from './map.js';

const cardsAds = getAds();

initialMap();
mainMarkerLatLng();
renderAdsMarkers(cardsAds);
