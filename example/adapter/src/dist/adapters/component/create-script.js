"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var CreateScript = /** @class */ (function () {
    function CreateScript() {
    }
    CreateScript.prototype.build = function (_a) {
        var name = _a.name, src = _a.src, type = _a.type;
        var createElement = document.createElement, getElementById = document.getElementById;
        var elementId = "waj:" + name;
        var scriptElement = createElement(constants_1.SCRIPT_ELEMENT);
        scriptElement.type = type || 'text/javascript';
        scriptElement.src = src;
        scriptElement.async = true;
        scriptElement.id = elementId;
        var currentElement = !utils_1.isNullOrUndefined(getElementById(elementId));
        if (currentElement)
            this.appendChild(scriptElement);
        return new Promise(function (resolve, reject) {
            scriptElement.onload = (function (e) { return resolve({ name: name, element: scriptElement, status: true }); });
            scriptElement.onerror = (function (e) {
                reject({ name: name, element: scriptElement, status: false });
                scriptElement.remove();
            });
        });
    };
    CreateScript.prototype.appendChild = function (element) {
        var body = document.body, getElementById = document.getElementById, createDocumentFragment = document.createDocumentFragment;
        var containerElement = getElementById(constants_1.ELEMENT_ID_CONTAINER) || body;
        var documentFragment = createDocumentFragment();
        documentFragment.appendChild(element);
        containerElement.appendChild(documentFragment);
    };
    return CreateScript;
}());
exports.CreateScript = CreateScript;
