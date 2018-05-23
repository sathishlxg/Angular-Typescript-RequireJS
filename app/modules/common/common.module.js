define([
    "require",
    "exports",
    "angular",
    "ngProgress",
    "breadcrumb",
    "odata"
], function(require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = angular.module("userMaster.common", [
        "ncy-angular-breadcrumb",
        "ngProgress",
        "ODataResources"
    ]);
});
