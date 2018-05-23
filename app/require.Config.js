(function() {
    "use strict";

    require.config({
        baseUrl: "./",
        paths: {
            jquery: "../vendor/jquery/dist/jquery.min",
            bootstrap: "../vendor/bootstrap/dist/js/bootstrap.min",
            angular: "../vendor/angular/angular.min",
            uiRouter:
                "../vendor/angular-ui-router/release/angular-ui-router.min",
            moment: "../vendor/moment/moment.min",
            uiGrid: "../vendor/angular-ui-grid/ui-grid.min",
            odata: "../vendor/angular-odata-resources/build/odataresources",
            ngProgress: "../vendor/ngProgress/build/ngProgress.min",
            breadcrumb: "../vendor/angular-breadcrumb/angular-breadcrumb"
        },
        shim: {
            bootstrap: {
                exports: "bootstrap",
                deps: ["jquery"]
            },
            angular: {
                exports: "angular"
            },
            uiGrid: {
                deps: ["angular"]
            },
            uiRouter: {
                deps: ["angular"]
            },
            odata: {
                deps: ["angular"]
            },
            ngProgress: {
                deps: ["angular"]
            },
            breadcrumb: {
                deps: ["angular"]
            }
        },
        deps: ["main"]
    });
})();
