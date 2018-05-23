define(["require", "exports", "../common.module"], function(
    require,
    exports,
    common_module_1
) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuthenticationInterceptor = (function() {
        function AuthenticationInterceptor($injector, $q, logger) {
            var _this = this;
            this.$injector = $injector;
            this.$q = $q;
            this.logger = logger;
            this.request = function(requestSuccess) {
                _this.logger.log("intercepting request");
                return requestSuccess;
            };
            this.requestError = function(requestFailure) {
                _this.logger.log("requestError reported");
                return requestFailure;
            };
            this.response = function(responseSuccess) {
                _this.logger.log(
                    "success response reported with status: " +
                        responseSuccess.status
                );
                return responseSuccess;
            };
            this.responseError = function(responseFailure) {
                _this.logger.log("response Error reported");
                if (responseFailure.status === 401) {
                    console.log("401 error");
                }
                return _this.$q.reject(responseFailure);
            };
            logger.log("initializing AuthenticationInterceptor");
        }
        AuthenticationInterceptor.Factory = function($injector, $q, logger) {
            return new AuthenticationInterceptor($injector, $q, logger);
        };
        return AuthenticationInterceptor;
    })();
    AuthenticationInterceptor.Factory.$inject = ["$injector", "$q", "logger"];
    common_module_1.default.factory(
        "AuthenticationInterceptor",
        AuthenticationInterceptor.Factory
    );
});
