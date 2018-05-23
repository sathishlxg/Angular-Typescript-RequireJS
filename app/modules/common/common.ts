/**
 * Common module contins features that are used across all the modules
 * @module Common
 */

/// <amd-dependency path="./directives/userGridFilter" />
/// <amd-dependency path="./services/BaseRepository" />
/// <amd-dependency path="./interceptor/loadingInterceptor" />

import commonModule from "./common.module";

/**
 * Configures the common module
 * @param {angular.IHttpProvider} $httpProvider - The $httpProvider to configure the $http
 * @param {any} $breadcrumbProvider - The breadcrumb module to configure the UserMaster application breadcrumbs
 */
commonConfig.$inject = ["$httpProvider", "$breadcrumbProvider"];
function commonConfig(
    $httpProvider: angular.IHttpProvider,
    $breadcrumbProvider: any
): void {
    $httpProvider.interceptors.push("loadingInterceptor");

    $breadcrumbProvider.setOptions({
        templateUrl: "modules/common/templates/breadcrumb.html"
    });
}

commonModule.config(commonConfig).run(() => {
    console.log("common module loaded");
});

//TODO: Consider using a angular Service to hide and display the loading progessbar
/** This value will be used by the LoadingInterceptor to create a ngProgress instance to show and hide the progress bar */
commonModule.value("ngProgressInstance", null);

/**
 * exports the angular module Common
 * @exports module
 */
export var module = commonModule;
