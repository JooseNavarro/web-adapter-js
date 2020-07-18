"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var RegisterStore = /** @class */ (function () {
    function RegisterStore() {
        this.store = new rxjs_1.BehaviorSubject(null);
        this.listStatus = ['global', 'root'];
    }
    RegisterStore.prototype.globalEvent = function () {
        document.addEventListener(constants_1.STORE_GLOBAL, function (e) { });
    };
    RegisterStore.prototype.rootEvent = function () {
        var _this = this;
        document.addEventListener(constants_1.STORE_ROOT, function (e) {
            return _this.store.next(e);
        });
    };
    RegisterStore.prototype.initStoreAdapter = function () {
        this.globalEvent();
        this.rootEvent();
    };
    // Este metodo escucha cuando le envian algo de un microfront
    RegisterStore.prototype.on = function () {
        return this.store.asObservable().pipe(operators_1.filter(function (e) { return !utils_1.isNullOrUndefined(e); }), operators_1.map(function (_a) {
            var detail = _a.detail;
            return detail;
        }));
    };
    // Le envia data a todos los webCompoenent
    RegisterStore.prototype.dispatch = function (state) {
        var data = { stateApp: state };
        var event = new CustomEvent(constants_1.STORE_GLOBAL, { detail: data });
        document.dispatchEvent(event);
    };
    // remove del evento para el store ROOT
    RegisterStore.prototype.remove = function () {
        var removeEventListener = document.removeEventListener;
        this.listStatus.forEach(function (status) {
            return removeEventListener(constants_1.STORE_ROOT, function () { });
        });
    };
    // selector reducer
    RegisterStore.prototype.selector = function () {
        function d() {
            var c = new rxjs_1.BehaviorSubject(null);
            ;
        }
    };
    return RegisterStore;
}());
exports.RegisterStore = RegisterStore;
