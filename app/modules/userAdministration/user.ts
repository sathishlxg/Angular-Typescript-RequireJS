/// <amd-dependency path="./controllers/userSummary"/>
/// <amd-dependency path="./controllers/addUserCtrl"/>
/// <amd-dependency path="./services/userService"/>
/// <amd-dependency path="./services/userRepository"/>

import userModule from "./user.module";
import * as models from "./models/user";
import * as service from "./services/userService";

function userConfig($stateProvider: ng.ui.IStateProvider): void {
    $stateProvider
        .state("addUser", <any>{
            url: "/addNewUser/:id",
            templateUrl: "modules/userAdministration/templates/add-User.html",
            controller: "AddUserCtrl",
            controllerAs: "edit",
            ncyBreadcrumb: {
                label: "Add New User",
                parent: "userSummary"
            },
            resolve: {
                user: loadUser
            }
        })
        .state("userSummary", <any>{
            url: "/userSummary",
            templateUrl:
                "modules/userAdministration/templates/userSummary.html",
            controller: "UserSummaryCtrl",
            controllerAs: "summary",
            ncyBreadcrumb: {
                label: "User Administration",
                parent: "home"
            },
            resolve: {
                Userusers: getUsers
            }
        });
}

userConfig.$inject = ["$stateProvider"];

userModule.config(userConfig).run(() => {
    console.log("user module loaded");
});

getUsers.$inject = ["UserService"];
function getUsers(
    service: service.UserService
): angular.IPromise<models.User[]> {
    return service.getUser();
}

loadUser.$inject = ["$stateParams", "UserService"];
function loadUser(
    $state: any,
    service: service.UserService
): angular.IPromise<models.User> {
    return service.getUserById($state.id);
}

export var module = userModule;
