"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var enum_1 = require("../enum");
var component_adapter_1 = require("./component/component.adapter");
var Adapter = /** @class */ (function () {
    function Adapter() {
        this.buildElementAdapter();
    }
    Adapter.prototype.buildElementAdapter = function () {
        var createElement = document.createElement, body = document.body;
        var el = createElement('div');
        el.id = constants_1.ELEMENT_ID_CONTAINER;
        body.appendChild(el);
    };
    Adapter.prototype.init = function (frameworks) {
        var _this = this;
        if (frameworks === void 0) { frameworks = []; }
        frameworks.forEach(function (data) {
            if (data === enum_1.Framework.angular)
                _this.initialAngular('initAngular');
        });
    };
    Adapter.prototype.initialAngular = function (name) {
        var scriptElement = new component_adapter_1.ComponentAdapter();
        scriptElement.loadComponents([
            { name: 'zonaJs', src: enum_1.AngularConfig.zone },
            { name: 'customElement', src: enum_1.AngularConfig.customElement },
        ]);
    };
    return Adapter;
}());
exports.Adapter = Adapter;
