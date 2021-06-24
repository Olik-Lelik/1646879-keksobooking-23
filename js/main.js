import {createOffer} from './data.js';
import {renderAds} from './card.js';
import {inactiveState, activeState} from './form.js';

const  OFFER_COUNT = 3;

const getAds = () => new Array(OFFER_COUNT).fill(null).map(() => createOffer());

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild((renderAds(getAds())).firstChild);

inactiveState();
activeState();
