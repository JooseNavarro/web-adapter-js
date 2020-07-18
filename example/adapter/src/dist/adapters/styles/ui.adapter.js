"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var create_style_1 = require("./create-style");
var UiAdapter = /** @class */ (function () {
    function UiAdapter() {
        this.allStyles = [];
        this.statusStyles = new rxjs_1.BehaviorSubject(null);
    }
    UiAdapter.prototype.getStatusStyles = function () {
        return this.statusStyles.asObservable();
    };
    UiAdapter.prototype.create = function (name, src) {
        var _this = this;
        var style = new create_style_1.CreateStyle();
        style.sourceServices(src).then(function (res) {
            style.build(name, res.data).then(function (status) {
                _this.statusStyles.next(status);
                _this.allStyles.push({ name: status.name, element: status.element });
            }).catch(function (e) { return _this.statusStyles.next(e); });
        });
    };
    UiAdapter.prototype.createLink = function (name, src) {
        var _this = this;
        var style = new create_style_1.CreateStyle();
        style.createLink(name, src).then(function (status) {
            _this.statusStyles.next(status);
            _this.allStyles.push(({ name: status.name, element: status.element }));
        }).catch(function (e) { return _this.statusStyles.next(e); });
    };
    UiAdapter.prototype.loadCdn = function (styles) {
        var _this = this;
        if (styles === void 0) { styles = []; }
        styles.forEach(function (_a) {
            var name = _a.name, src = _a.src;
            return _this.createLink(name, src);
        });
    };
    UiAdapter.prototype.loadStyles = function (styles) {
        var _this = this;
        if (styles === void 0) { styles = []; }
        styles.forEach(function (_a) {
            var name = _a.name, src = _a.src;
            return _this.create(name, src);
        });
    };
    UiAdapter.prototype.removeOneStyle = function (name) {
        this.allStyles.filter(function (component, index) { return component.name === name; })
            .forEach(function (_a) {
            var element = _a.element;
            return element.remove();
        });
    };
    UiAdapter.prototype.allRemoveStyles = function () {
        this.allStyles.forEach(function (_a) {
            var element = _a.element;
            return element.remove();
        });
    };
    return UiAdapter;
}());
exports.UiAdapter = UiAdapter;
