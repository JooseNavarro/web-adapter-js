"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var RoutesAdapter = /** @class */ (function () {
    function RoutesAdapter() {
        this.statusRoutes = new rxjs_1.BehaviorSubject(null);
        this.initRoutes();
    }
    RoutesAdapter.prototype.initRoutes = function () {
        var _this = this;
        var addEventListener = document.addEventListener;
        addEventListener(constants_1.ROUTES_EVENT, function (e) {
            return _this.statusRoutes.next(e);
        });
    };
    RoutesAdapter.prototype.on = function () {
        return this.statusRoutes.asObservable().pipe(operators_1.filter(function (e) { return !utils_1.isNullOrUndefined(e); }), operators_1.map(function (ele) { return ele.detail; }));
    };
    RoutesAdapter.prototype.onPromise = function () {
        var _this = this;
        return new Promise(function (reject, resolve) {
            _this.on().subscribe(function (res) { return resolve(res); }, function (error) { return reject(error); });
        });
    };
    RoutesAdapter.prototype.emit = function (route, option) {
        var data = { route: route, option: option };
        var event = new CustomEvent(constants_1.ROUTES_EVENT, { detail: data });
        document.dispatchEvent(event);
    };
    return RoutesAdapter;
}());
exports.RoutesAdapter = RoutesAdapter;
