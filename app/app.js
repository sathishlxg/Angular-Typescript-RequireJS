define(["require", "exports", "./modules/common/common", "./modules/userAdministration/user", "jquery", "angular", "uiRouter", "bootstrap"], function (require, exports, common, user) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppController = (function () {
        function AppController($rootScope, $scope) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.user = {};
            this.user.name = "Sathish";
            this.user.role = "Admin";
            this.isLoading = false;
            this.$rootScope.$on("progress:loading", function (event, args) {
                _this.isLoading = true;
            });
            this.$rootScope.$on("progress:completed", function (event, args) {
                _this.isLoading = false;
            });
        }
        AppController.$inject = ["$rootScope", "$scope"];
        return AppController;
    }());
    function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/userSummary");
        $stateProvider.state("home", {
            url: "/",
            ncyBreadcrumb: {
                label: "Dashboard"
            }
        });
    }
    appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
    angular
        .module("userMaster", ["ui.router", common.module.name, user.module.name])
        .controller("appController", AppController)
        .config(appConfig)
        .run([
        "$rootScope",
        function ($rootScope) {
            console.log("main app loaded");
        }
    ]);
    exports.init = function () {
        angular.bootstrap($("body"), ["userMaster"]);
    };
});
