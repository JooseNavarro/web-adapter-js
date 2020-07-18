"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var OperatorStore = /** @class */ (function () {
    function OperatorStore() {
        this.storeGlobal = new rxjs_1.BehaviorSubject(null);
        this.storeRoot = new rxjs_1.BehaviorSubject(null);
        this.trackingGlobal();
    }
    OperatorStore.prototype.trackingGlobal = function () {
        var _this = this;
        document.addEventListener(constants_1.STORE_GLOBAL, function (e) {
            return _this.storeGlobal.next(e);
        });
    };
    OperatorStore.prototype.trackingRoot = function () {
        var _this = this;
        document.addEventListener(constants_1.STORE_ROOT, function (e) {
            return _this.storeRoot.next(e);
        });
    };
    OperatorStore.prototype.on = function () {
        return this.storeGlobal.asObservable().pipe(operators_1.filter(function (e) { return !utils_1.isNullOrUndefined(e); }), operators_1.map(function (_a) {
            var detail = _a.detail;
            return detail;
        }));
    };
    OperatorStore.prototype.onRoot = function () {
        return this.storeRoot.asObservable().pipe(operators_1.filter(function (e) { return !utils_1.isNullOrUndefined(e); }), operators_1.map(function (_a) {
            var detail = _a.detail;
            return detail;
        }));
    };
    OperatorStore.prototype.dispatch = function (state) {
        var data = { stateApp: state };
        var event = new CustomEvent(constants_1.STORE_ROOT, { detail: data });
        document.dispatchEvent(event);
    };
    return OperatorStore;
}());
exports.OperatorStore = OperatorStore;
