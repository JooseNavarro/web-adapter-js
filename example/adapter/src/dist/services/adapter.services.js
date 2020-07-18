"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var AdapterServices = /** @class */ (function () {
    function AdapterServices() {
    }
    AdapterServices.prototype.textContent = function (src, config) {
        return axios_1.default.get(src, config);
    };
    return AdapterServices;
}());
exports.AdapterServices = AdapterServices;
