var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("modules/common/common.module", ["require", "exports", "angular", "ngProgress", "breadcrumb", "odata"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = angular.module("userMaster.common", ["ncy-angular-breadcrumb", "ngProgress", "ODataResources"]);
});
define("modules/common/common", ["require", "exports", "modules/common/common.module", "./directives/userGridFilter", "./services/BaseRepository", "./interceptor/loadingInterceptor"], function (require, exports, common_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    commonConfig.$inject = ["$httpProvider", "$breadcrumbProvider"];
    function commonConfig($httpProvider, $breadcrumbProvider) {
        $httpProvider.interceptors.push("loadingInterceptor");
        $breadcrumbProvider.setOptions({ templateUrl: 'modules/common/templates/breadcrumb.html' });
    }
    common_module_1.default.config(commonConfig)
        .run(function () { console.log("common module loaded"); });
    common_module_1.default.value("ngProgressInstance", null);
    exports.module = common_module_1.default;
});
define("modules/userAdministration/user.module", ["require", "exports", "angular", "uiGrid"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = angular.module("userMaster.userAdmin", ["ui.grid"]);
});
define("modules/userAdministration/models/user", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var User = (function () {
        function User() {
            this.address = new Address();
            this.identities = [];
            this.orgAssociations = [];
        }
        return User;
    }());
    exports.User = User;
    var Address = (function () {
        function Address() {
        }
        return Address;
    }());
    exports.Address = Address;
    var OrgAssociations = (function () {
        function OrgAssociations() {
            this.organization = new Organization();
        }
        return OrgAssociations;
    }());
    exports.OrgAssociations = OrgAssociations;
    var Organization = (function () {
        function Organization() {
        }
        return Organization;
    }());
    exports.Organization = Organization;
    var Identity = (function () {
        function Identity() {
        }
        return Identity;
    }());
    exports.Identity = Identity;
});
define("modules/common/services/BaseRepository", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseRepository = (function () {
        function BaseRepository($odataresource, $q) {
            this.$odataresource = $odataresource;
            this.$q = $q;
            this.resource = this.$odataresource("http://localhost/sm/odata/user", "id", {}, { isodatav4: true });
        }
        BaseRepository.prototype.getAll = function () {
            var deferred = this.$q.defer();
            this.resource
                .odata()
                .query()
                .$promise.then(function (data) {
                deferred.resolve(data);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseRepository.prototype.getById = function (id) {
            var deferred = this.$q.defer();
            this.resource
                .odata()
                .get(id)
                .$promise.then(function (data) {
                deferred.resolve(data);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseRepository.prototype.save = function (entity) {
            var deferred = this.$q.defer();
            this.resource
                .save(entity)
                .$promise.then(function (data) {
                deferred.resolve(data);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseRepository.prototype.update = function (entity) {
            var deferred = this.$q.defer();
            this.resource
                .update(entity.id, entity)
                .$promise.then(function (data) {
                deferred.resolve(data);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        BaseRepository.prototype.delete = function (id) {
            var deferred = this.$q.defer();
            this.resource
                .delete(id)
                .$promise.then(function (data) {
                deferred.resolve(data);
            })
                .catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        };
        return BaseRepository;
    }());
    exports.BaseRepository = BaseRepository;
});
define("modules/userAdministration/services/userRepository", ["require", "exports", "modules/userAdministration/user.module", "modules/common/services/BaseRepository"], function (require, exports, user_module_1, common) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserRepository = (function (_super) {
        __extends(UserRepository, _super);
        function UserRepository($odataresource, $q) {
            return _super.call(this, $odataresource, $q) || this;
        }
        UserRepository.$inject = ["$odataresource", "$q"];
        return UserRepository;
    }(common.BaseRepository));
    exports.UserRepository = UserRepository;
    user_module_1.default.service("UserRepository", UserRepository);
});
define("modules/userAdministration/services/userService", ["require", "exports", "modules/userAdministration/user.module", "modules/userAdministration/models/user"], function (require, exports, user_module_2, models) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserService = (function () {
        function UserService($q, userRepository) {
            this.$q = $q;
            this.userRepository = userRepository;
        }
        UserService.prototype.getUser = function () {
            return this.userRepository.getAll();
        };
        UserService.prototype.getUserById = function (id) {
            if (id) {
                return this.userRepository.getById(id);
            }
            else {
                return this.$q.when(new models.User());
            }
        };
        UserService.prototype.saveUser = function (User) {
            if (User.id) {
                return this.userRepository.update(User);
            }
            else {
                return this.userRepository.save(User);
            }
        };
        UserService.prototype.deleteUser = function (id) {
            return this.userRepository.delete(id);
        };
        UserService.$inject = ["$q", "UserRepository"];
        return UserService;
    }());
    exports.UserService = UserService;
    user_module_2.default.service("UserService", UserService);
});
define("modules/userAdministration/user", ["require", "exports", "modules/userAdministration/user.module", "./controllers/summary", "./controllers/addUserCtrl", "./services/userService", "./services/userRepository"], function (require, exports, user_module_3) {
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
    user_module_3.default.config(userConfig).run(function () {
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
    exports.module = user_module_3.default;
});
define("app", ["require", "exports", "modules/common/common", "modules/userAdministration/user", "jquery", "angular", "uiRouter", "bootstrap"], function (require, exports, common, user) {
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
require(["app"], function (staffMaster) {
    staffMaster.init();
});
define("modules/common/directives/userGridFilter", ["require", "exports", "modules/common/common.module"], function (require, exports, common_module_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    userGridFilter.$inject = ["$window"];
    function userGridFilter($window) {
        return {
            restrict: "E",
            require: "^uiGrid",
            templateUrl: "modules/common/templates/userGridFilter.html",
            link: function (scope, ele, attrs) {
                scope.isIcon = attrs.isIcon;
                scope.show = function () {
                    scope.open = !scope.open;
                    $(".ui-grid-top-panel").css("overflow", "visible");
                    $(".ui-grid-header-viewport").css("overflow", "visible");
                };
                scope.select = function (opts) {
                    if (scope.col.filter)
                        scope.col.filter.term = opts.label;
                    scope.selected = opts.label;
                };
                $($window).bind("click", function (e) {
                    if (e.target != ele[0].children[0]) {
                        $(".ui-grid-top-panel").css("overflow", "hidden");
                        $(".ui-grid-header-viewport").css("overflow", "hidden");
                    }
                });
            }
        };
    }
    common_module_2.default.directive("userGridFilter", userGridFilter);
});
define("modules/common/interceptor/authenticationInterceptor", ["require", "exports", "modules/common/common.module"], function (require, exports, common_module_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthenticationInterceptor = (function () {
        function AuthenticationInterceptor($injector, $q, logger) {
            var _this = this;
            this.$injector = $injector;
            this.$q = $q;
            this.logger = logger;
            this.request = function (requestSuccess) {
                _this.logger.log("intercepting request");
                return requestSuccess;
            };
            this.requestError = function (requestFailure) {
                _this.logger.log("requestError reported");
                return requestFailure;
            };
            this.response = function (responseSuccess) {
                _this.logger.log("success response reported with status: " + responseSuccess.status);
                return responseSuccess;
            };
            this.responseError = function (responseFailure) {
                _this.logger.log("response Error reported");
                if (responseFailure.status === 401) {
                    console.log("401 error");
                }
                return _this.$q.reject(responseFailure);
            };
            logger.log("initializing AuthenticationInterceptor");
        }
        AuthenticationInterceptor.Factory = function ($injector, $q, logger) {
            return new AuthenticationInterceptor($injector, $q, logger);
        };
        return AuthenticationInterceptor;
    }());
    AuthenticationInterceptor.Factory.$inject = ["$injector", "$q", "logger"];
    common_module_3.default.factory("AuthenticationInterceptor", AuthenticationInterceptor.Factory);
});
define("modules/common/interceptor/loadingInterceptor", ["require", "exports", "modules/common/common.module"], function (require, exports, common_module_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadingInterceptor = (function () {
        function LoadingInterceptor($q, $rootScope, $timeout, ngProgressFactory, ngProgressInstance) {
            var _this = this;
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.ngProgressFactory = ngProgressFactory;
            this.ngProgressInstance = ngProgressInstance;
            this.request = function (requestSuccess) {
                _this.startLoader();
                return requestSuccess;
            };
            this.requestError = function (requestFailure) {
                _this.stopLoader();
                return requestFailure;
            };
            this.response = function (responseSuccess) {
                _this.stopLoader();
                return responseSuccess;
            };
            this.responseError = function (responseFailure) {
                _this.stopLoader();
                return _this.$q.reject(responseFailure);
            };
            this.inFlightRequest = 0;
        }
        LoadingInterceptor.Factory = function ($q, $rootScope, $timeout, ngProgressFactory, ngProgressInstance) {
            return new LoadingInterceptor($q, $rootScope, $timeout, ngProgressFactory, ngProgressInstance);
        };
        LoadingInterceptor.prototype.startLoader = function () {
            if (!this.ngProgressInstance) {
                this.ngProgressInstance = this.ngProgressFactory.createInstance();
                this.ngProgressInstance.setColor("#0051AA");
            }
            if (this.ngProgressInstance && this.ngProgressInstance.status() === 0) {
                this.ngProgressInstance.reset();
                this.ngProgressInstance.start();
                this.$rootScope.$emit("progress:loading", true);
            }
            if (this.inFlightRequest < 0)
                this.inFlightRequest = 0;
            this.inFlightRequest++;
        };
        LoadingInterceptor.prototype.stopLoader = function () {
            this.inFlightRequest--;
            if (this.ngProgressInstance && this.inFlightRequest <= 0) {
                this.ngProgressInstance.complete();
                this.$rootScope.$emit("progress:completed", true);
            }
        };
        return LoadingInterceptor;
    }());
    LoadingInterceptor.Factory.$inject = ["$q", "$rootScope", "$timeout", "ngProgressFactory", "ngProgressInstance"];
    common_module_4.default.factory("loadingInterceptor", LoadingInterceptor.Factory);
});
define("modules/userAdministration/controllers/addUserCtrl", ["require", "exports", "modules/userAdministration/user.module"], function (require, exports, user_module_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddUserCtrl = (function () {
        function AddUserCtrl(user, service, $state) {
            this.user = user;
            this.service = service;
            this.$state = $state;
            this.user = user;
        }
        AddUserCtrl.prototype.save = function () {
            var _this = this;
            this.service
                .saveUser(this.user)
                .then(function (data) {
                _this.$state.get("userSummary");
            })
                .catch(function (reason) {
                alert("an error occured while saving the user");
            });
        };
        AddUserCtrl.prototype.delete = function () {
            var _this = this;
            this.service
                .deleteUser(1)
                .then(function (data) {
                _this.$state.get("userSummary");
            })
                .catch(function (reason) {
                alert("an error occured");
            });
        };
        AddUserCtrl.$inject = ["user", "UserService"];
        return AddUserCtrl;
    }());
    user_module_4.default.controller("AddUserCtrl", AddUserCtrl);
});
define("modules/userAdministration/controllers/userSummary", ["require", "exports", "modules/userAdministration/user.module"], function (require, exports, user_module_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserSummaryCtrl = (function () {
        function UserSummaryCtrl(Users, gridConstant) {
            this.Users = Users;
            this.gridConstant = gridConstant;
            this.initGrid();
        }
        UserSummaryCtrl.prototype.initGrid = function () {
            var _this = this;
            var headerCellTmpl = "modules/userAdministration/templates/headerCellTemplate.html";
            this.gridOptions = {
                data: this.Users,
                enableSorting: false,
                enableColumnMenus: false,
                enableColumnResizing: false,
                enableFiltering: true,
                multiSelect: false,
                enableFullRowSelection: true,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                columnDefs: [
                    {
                        name: 'status', headerCellClass: "text-center", headerCellTemplate: headerCellTmpl, width: 100, cellTemplate: '<div class="ui-grid-cell-contents text-center"><span class="sm-status sm-status-{{ COL_FIELD }}"></span></div>',
                        filter: { term: "", placeholder: "Select", selectOptions: [{ value: 1, label: "Green" }, { value: 1, label: "Yello" }, { value: 2, label: "Red" }] },
                        filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
                    },
                    { name: "spinId", headerCellTemplate: headerCellTmpl, displayName: 'SPIN ID', maxWidth: 250, cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="addUser({id: row.entity.id})">{{ COL_FIELD }}</a></div>' },
                    { name: 'firstName', headerCellTemplate: headerCellTmpl, maxWidth: 250, },
                    { name: 'lastName', headerCellTemplate: headerCellTmpl, maxWidth: 250 },
                    { name: 'startDate', headerCellTemplate: headerCellTmpl, maxWidth: 250, type: 'date', cellFilter: 'date:"MM-dd-yyyy"' },
                    {
                        name: 'department',
                        headerCellTemplate: headerCellTmpl,
                        filter: { term: "", selectOptions: [{ value: 1, label: 'Sales' }, { value: 2, label: 'Finance' }] },
                        filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
                    },
                    {
                        name: 'requestStatus',
                        headerCellTemplate: headerCellTmpl,
                        filter: { term: "", selectOptions: [{ value: 1, label: "Approved" }, { value: 1, label: "Rejected" }, { value: 2, label: "Submitted for Approval" }] },
                        filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
                    },
                    {
                        name: 'actions',
                        headerCellClass: "text-center",
                        headerCellTemplate: headerCellTmpl,
                        maxWidth: 150,
                        cellTemplate: '<div class="ui-grid-cell-contents text-center"><span><i class="fa fa-user-times fa-flip-horizontal"></i></span></div>',
                        filter: {
                            term: "",
                            selectOptions: [{ value: 1, label: 'Approved' }, { value: 2, label: 'Rejected' }]
                        },
                        filterHeaderTemplate: "<sm-grid-filter is-icon='true'></sm-grid-filter>"
                    }
                ],
                onRegisterApi: function (api) {
                    _this.gridApi = api;
                }
            };
        };
        UserSummaryCtrl.prototype.removeFilter = function () {
            this.gridApi.core.clearAllFilters(true);
        };
        UserSummaryCtrl.$inject = ["Users", "uiGridConstants"];
        return UserSummaryCtrl;
    }());
    user_module_5.default.controller("UserSummaryCtrl", UserSummaryCtrl);
});
