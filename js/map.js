import {activateAdForm, changeAddressInput, adForm, onPriceInputChange} from './form.js';
import {renderCardAd} from './card.js';
import {mapFilters} from './filtres.js';
import { avatarPreview, adFormPhoto} from './form.js';

const IMG_DEFAULT = 'img/muffin-grey.svg';

const initialPoint = {
  lat: 35.6895,
  lng: 139.692,
};

const MAIN_PIN_SIZE = [52, 52];

const MAIN_PIN_ANCHOR = [52, 52];

const PIN_SIZE = [40, 40];

const PIN_ANCHOR = [40, 40];

const SCALE = 11;

const map = L.map('map-canvas');

const initialMap = () => {
  map
    .on('load', () => {
      activateAdForm(),
      changeAddressInput(initialPoint);
    })
    .setView(initialPoint, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const mainPinMarker = L.marker(
  initialPoint,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const mainMarkerLatLng = () => mainPinMarker.on('moveend', (evt) => {
  const points = evt.target.getLatLng();
  changeAddressInput(points);
});

const markerGroup = L.layerGroup().addTo(map);

const createPinMarker = (data) => {
  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: PIN_SIZE,
    iconAnchor: PIN_ANCHOR,
  });

  const pinMarker = L.marker(
    data.location,
    {
      icon: pinIcon,
    },
  );

  pinMarker
    .addTo(markerGroup)
    .bindPopup(
      renderCardAd(data),
      {
        keepInView:true,
      },
    );
};

//очищает слой с метками объявлений.
const clearMarker = () => markerGroup.clearLayers();

const resetPage = () => {
  mainPinMarker.setLatLng(initialPoint);
  map.setView(initialPoint, SCALE);
  adForm.reset();
  avatarPreview.src = IMG_DEFAULT;
  adFormPhoto.innerHTML = '';
  const adFormInputs = adForm.querySelectorAll('input');
  adFormInputs.forEach((input) => input.style.borderColor = '');
  const resetMainPinMarker = mainPinMarker.getLatLng();
  changeAddressInput(resetMainPinMarker);
  onPriceInputChange();
  mapFilters.reset();
  clearMarker();
};

export {initialMap, createPinMarker, mainMarkerLatLng, resetPage, clearMarker};
