import {createPinMarker, clearMarker} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const ANY = 'any';

//const COUNT = 10;

const priceMap = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const filterByType = (ad) =>
  ad.offer.type === housingType.value || housingType.value === ANY;

const filterByPrice = (ad) => {
  if (housingPrice.value === ANY) {
    return true;
  } else {
    return ad.offer.price >= priceMap[housingPrice.value].start && ad.offer.price <= priceMap[housingPrice.value].end;
  }
};

const filterByRooms = (ad) => ad.offer.rooms === +housingRooms.value || housingRooms.value === ANY;

const filterByGuests = (ad) => ad.offer.guests === +housingGuests.value || housingGuests.value === ANY;

const filterByFeatures = (ad) => Array.from(housingFeatures)
  .every((filterFeature) => {
    if (!filterFeature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(filterFeature.value);
  });

//отфильтрованный массив объявлений
const getFilteredAds = (ads) =>
  ads
    .slice()
    .filter((ad) => (filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFeatures(ad)))
    .slice(0, 10)
    .forEach((ad) => createPinMarker(ad));

//перерисовка карты
const setFilterChange = (ads) => {
  mapFilters.addEventListener('change', () => {
    clearMarker(),
    getFilteredAds(ads);
  });
};

export {mapFilters, mapFiltersList, setFilterChange, getFilteredAds};
