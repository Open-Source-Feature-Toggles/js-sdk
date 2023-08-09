"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachePayloadLocally = cachePayloadLocally;
exports.getFlagStatusFromPaylod = getFlagStatusFromPaylod;
exports.getLocalPayload = getLocalPayload;
exports.parseTimeString = parseTimeString;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
function parseTimeString(timeString) {
  if (timeString === undefined) {
    return 1000 * 10;
  }
  let stripLetter = timeString.replace('s', '');
  let number = Number(stripLetter);
  if (number === NaN) {
    throw new Error('Refresh time-string formatted incorrectly');
  }
  let num_miliseconds = number * 1000;
  return num_miliseconds;
}
function getFlagStatusFromPaylod(payload, flag) {
  let features = payload.features;
  let [featureName, variableName] = flag.split('.');
  let featureVariables = features[featureName];
  if (featureVariables) {
    for (let variable of featureVariables) {
      if (variable.hasOwnProperty(variableName)) {
        return variable[variableName];
      }
    }
  }
  return undefined;
}
function cachePayloadLocally(payload) {
  localStorage.setItem('cached-payload', JSON.stringify(payload));
}
function getLocalPayload() {
  return localStorage.getItem('cached-payload');
}