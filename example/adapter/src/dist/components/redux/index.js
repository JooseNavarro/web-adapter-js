"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var constants_1 = require("../../constants");
var operators_1 = require("rxjs/operators");
var utils_1 = require("../../utils");
var Store = /** @class */ (function () {
    function Store(location) {
        this.store = new rxjs_1.BehaviorSubject(null);
        this.conf = { listen: '', destination: '' };
        this.conf = location;
        this.initListener();
    }
    Store.prototype.initListener = function () {
        var _this = this;
        document.addEventListener(this.conf.listen, function (e) {
            return _this.store.next(e);
        });
    };
    Object.defineProperty(Store.prototype, "getState", {
        get: function () {
            return this.store.asObservable().pipe(operators_1.filter(function (e) { return !utils_1.isNullOrUndefined(e); }), operators_1.map(function (_a) {
                var detail = _a.detail;
                return detail;
            }));
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.dispatch = function (state) {
        var data = { stateApp: state };
        var event = new CustomEvent(this.conf.destination, { detail: data });
        document.dispatchEvent(event);
    };
    Store.prototype.on = function () {
        return this.getState;
    };
    Store.prototype.onPromise = function () {
        var _this = this;
        return new Promise((function (resolve, reject) {
            _this.getState.subscribe(function () { return resolve(); }, function (err) { return reject(err); });
        }));
    };
    return Store;
}());
exports.config = {
    root: new Store({ listen: constants_1.STORE_ROOT, destination: constants_1.STORE_GLOBAL }),
    child: new Store({ listen: constants_1.STORE_GLOBAL, destination: constants_1.STORE_ROOT }),
};
