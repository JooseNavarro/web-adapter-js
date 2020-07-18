"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Adapter
__export(require("./adapters/adapter"));
__export(require("./adapters/styles/ui.adapter"));
__export(require("./adapters/component/component.adapter"));
__export(require("./components/routes/routes.adapter"));
__export(require("./components/redux"));
