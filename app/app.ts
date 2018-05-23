/**
 * userMaster application module.
 */

/// <amd-dependency path= "jquery" />
/// <amd-dependency path= "angular" />
/// <amd-dependency path= "uiRouter" />
/// <amd-dependency path= "bootstrap" />

import * as common from "./modules/common/common";
import * as user from "./modules/userAdministration/user";

/**
 * The user interface
 */
interface IUser {
    name: string;
    role: string;
}

/**
 * Controls the behavior of the userMaster application
 * @class AppController
 */
class AppController {
    /**
     * Currently logged in user
     * @name AppController#user
     * @type IUser
     */
    user: IUser = <IUser>{};

    /**
     * Indicator to display or hide the application loading bar overlay
     * @name AppController#isLoading
     * @type Boolean
     */
    isLoading: boolean;

    /**
     * Holds the list of dependencies
     * @static
     */
    static $inject = ["$rootScope", "$scope"];

    /**
     * Creates a new instance of the Application controller class
     * @constructor
     * @param {angular.IRootScopeService} angular rootscope
     * @param {angular.IScope}
     */
    constructor(
        private $rootScope: angular.IRootScopeService,
        $scope: angular.IScope
    ) {
        this.user.name = "Sathish";
        this.user.role = "Admin";
        this.isLoading = false;

        this.$rootScope.$on("progress:loading", (event, args) => {
            this.isLoading = true;
        });

        this.$rootScope.$on("progress:completed", (event, args) => {
            this.isLoading = false;
        });
    }
}

/**
 * Configures application controller
 * @param {angular.ui.IStateProvider} $stateProvider - The ui.router state provider object to configure routes
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider - The url router provider object to configure default route
 */
function appConfig(
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider
): void {
    $urlRouterProvider.otherwise("/userSummary");

    $stateProvider.state("home", <any>{
        url: "/",
        ncyBreadcrumb: {
            label: "Dashboard"
        }
    });
}
/**
 * Contains the list of dependencies for appConfig
 * @static $inject
 */
appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

angular
    .module("userMaster", ["ui.router", common.module.name, user.module.name])
    .controller("appController", AppController)
    .config(appConfig)
    .run([
        "$rootScope",
        ($rootScope: angular.IRootScopeService) => {
            console.log("main app loaded");
        }
    ]);

/**
 * Initializes the userMaster application
 * @exports init
 */
export var init = function() {
    angular.bootstrap($("body"), ["userMaster"]);
};
