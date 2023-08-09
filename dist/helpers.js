function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function parseTimeString(timeString) {
  if (timeString === undefined) {
    return 1000 * 10;
  }
  var stripLetter = timeString.replace('s', '');
  var number = Number(stripLetter);
  if (number === NaN) {
    throw new Error('Refresh time-string formatted incorrectly');
  }
  var num_miliseconds = number * 1000;
  return num_miliseconds;
}
function getFlagStatusFromPaylod(payload, flag) {
  var features = payload.features;
  var _flag$split = flag.split('.'),
    _flag$split2 = _slicedToArray(_flag$split, 2),
    featureName = _flag$split2[0],
    variableName = _flag$split2[1];
  var featureVariables = features[featureName];
  if (featureVariables) {
    var _iterator = _createForOfIteratorHelper(featureVariables),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var variable = _step.value;
        if (variable.hasOwnProperty(variableName)) {
          return variable[variableName];
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return undefined;
}
function getFeatureStatusFromPayload(payload, feature) {
  var featureExists = payload.features[feature];
  if (featureExists !== undefined) {
    return true;
  }
  return false;
}
function cachePayloadLocally(payload) {
  localStorage.setItem('cached-payload', JSON.stringify(payload));
}
function getLocalPayload() {
  return localStorage.getItem('cached-payload');
}
export { parseTimeString, getFlagStatusFromPaylod, cachePayloadLocally, getLocalPayload, getFeatureStatusFromPayload };