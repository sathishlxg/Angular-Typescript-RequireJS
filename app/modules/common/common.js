define([
    "require",
    "exports",
    "./common.module",
    "./directives/userGridFilter",
    "./services/BaseRepository",
    "./interceptor/loadingInterceptor"
], function(require, exports, common_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    commonConfig.$inject = ["$httpProvider", "$breadcrumbProvider"];
    function commonConfig($httpProvider, $breadcrumbProvider) {
        $httpProvider.interceptors.push("loadingInterceptor");
        $breadcrumbProvider.setOptions({
            templateUrl: "modules/common/templates/breadcrumb.html"
        });
    }
    common_module_1.default.config(commonConfig).run(function() {
        console.log("common module loaded");
    });
    common_module_1.default.value("ngProgressInstance", null);
    exports.module = common_module_1.default;
});
