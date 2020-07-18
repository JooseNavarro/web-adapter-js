"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var create_script_1 = require("./create-script");
var ComponentAdapter = /** @class */ (function () {
    function ComponentAdapter() {
        this.allComponent = [];
        this.statusComponent = new rxjs_1.BehaviorSubject(null);
    }
    ComponentAdapter.prototype.getStatusComponent = function () {
        return this.statusComponent.asObservable();
    };
    ComponentAdapter.prototype.loadComponents = function (microComponent) {
        var _this = this;
        if (microComponent === void 0) { microComponent = []; }
        microComponent.forEach(function (element) { return _this.createScript(element); });
    };
    ComponentAdapter.prototype.allRemoveComponent = function () {
        this.allComponent.forEach(function (_a) {
            var element = _a.element;
            return element.remove();
        });
    };
    ComponentAdapter.prototype.removeOneComponent = function (name) {
        this.allComponent.filter(function (component, index) { return component.name === name; })
            .forEach(function (_a) {
            var element = _a.element;
            return element.remove();
        });
    };
    ComponentAdapter.prototype.createScript = function (element) {
        var _this = this;
        var script = new create_script_1.CreateScript();
        script.build(element).then(function (data) {
            _this.statusComponent.next(data);
            _this.allComponent.push({ name: data.name, element: data.element });
        }).catch(function (e) { return _this.statusComponent.next(e); });
    };
    return ComponentAdapter;
}());
exports.ComponentAdapter = ComponentAdapter;
