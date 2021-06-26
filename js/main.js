import {getAds} from './data.js';
import {renderCardAd} from './card.js';
import {inactiveState, activeState} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const adData = getAds()[0];

const cardAd = renderCardAd(adData);

mapCanvas.appendChild(cardAd);

inactiveState();
activeState();
