"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _constants = _interopRequireDefault(require("./constants.js"));
var _requests = _interopRequireDefault(require("./requests.js"));
var _helpers = require("./helpers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FeatureToggleClient extends EventTarget {
  constructor(args) {
    super();
    this.apiKey = args.apiKey;
    this.refreshRate = (0, _helpers.parseTimeString)(args.refreshRate);
    this.refreshIntervalID;
    this.payload;
    this.updatePayload = this.updatePayload.bind(this);
  }
  async start() {
    try {
      let [response, body] = await (0, _requests.default)(null, this.apiKey);
      console.log(typeof response.status);
      if (response.status !== 200 && response.status !== 304) {
        throw new Error(body);
      }
      this.payload = body;
      this.dispatchEvent(new CustomEvent(_constants.default.ready));
      this.refreshIntervalID = setInterval(this.updatePayload, this.refreshRate);
    } catch (error) {
      console.error(error);
      throw new Error('Client failed to start');
    }
  }
  async updatePayload() {
    try {
      let [refreshPayload, body] = await (0, _requests.default)(this.payload.last_updated, this.apiKey);
      if (refreshPayload.status === 304) {
        return;
      } else if (refreshPayload.status === 200) {
        this.payload = body;
        this.dispatchEvent(new CustomEvent(_constants.default.update));
      } else {
        this.dispatchEvent(new CustomEvent(_constants.default.error));
        throw new Error("Request to refresh payload returned with a status of ".concat(refreshPayload.status));
      }
    } catch (error) {
      console.error(error);
    }
  }
  async stop() {
    clearInterval(this.refreshIntervalID);
    this.dispatchEvent(new CustomEvent(_constants.default.end));
  }
  getFlag(flag) {
    return (0, _helpers.getFlagStatusFromPaylod)(this.payload, flag);
  }
}
var _default = FeatureToggleClient;
exports.default = _default;