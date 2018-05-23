define(["require", "exports", "./user.module", "./controllers/userSummary", "./controllers/addUserCtrl", "./services/userService", "./services/userRepository"], function (require, exports, user_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function userConfig($stateProvider) {
        $stateProvider
            .state("addUser", {
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
            .state("userSummary", {
            url: "/userSummary",
            templateUrl: "modules/userAdministration/templates/userSummary.html",
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
    user_module_1.default.config(userConfig).run(function () {
        console.log("user module loaded");
    });
    getUsers.$inject = ["UserService"];
    function getUsers(service) {
        return service.getUser();
    }
    loadUser.$inject = ["$stateParams", "UserService"];
    function loadUser($state, service) {
        return service.getUserById($state.id);
    }
    exports.module = user_module_1.default;
});
