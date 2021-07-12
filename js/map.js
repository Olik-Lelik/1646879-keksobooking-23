import {enableState, changeAddressInput, adForm, changePriceInput} from './form.js';
import {renderCardAd} from './card.js';
import {mapFilters} from './filtres.js';


const initialPoint = {
  lat: 35.6895,
  lng: 139.692,
};

const SCALE = 11;

const map = L.map('map-canvas');

const initialMap = () => {
  map
    .on('load', () => {
      enableState(),
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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
  const adFormInputs = adForm.querySelectorAll('input');
  adFormInputs.forEach((input) => input.style.borderColor = '');
  const resetMainPinMarker = mainPinMarker.getLatLng();
  changeAddressInput(resetMainPinMarker);
  changePriceInput();
  mapFilters.reset();
};

export {initialMap, createPinMarker, mainMarkerLatLng, resetPage, clearMarker};
