import {enableState, changeAddressInput} from './form.js';
import {renderCardAd} from './card.js';

const initialPoint = {
  lat: 35.6895,
  lng: 139.692,
};

const SCALE = 11;

const map = L.map('map-canvas');

const initialMap = () => {
  map
    .on('load', () => {
      enableState,
      changeAddressInput(initialPoint);
    })
    .setView(initialPoint, SCALE);
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
      pinIcon,
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

const renderAdsMarkers = (ads) => ads.forEach((ad) => {
  createPinMarker(ad);
});

//const resetMarker = map.setView(initialPoint, SCALE);; возвращает гл.маркер и масштаб в изначальное состояние.
//const clearMarker = markerGroup.clearLayers(); очищает слой с метками объявлений.

export {initialMap, renderAdsMarkers, mainMarkerLatLng};