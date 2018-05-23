define(["require", "exports", "../common.module"], function(
    require,
    exports,
    common_module_1
) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadingInterceptor = (function() {
        function LoadingInterceptor(
            $q,
            $rootScope,
            $timeout,
            ngProgressFactory,
            ngProgressInstance
        ) {
            var _this = this;
            this.$q = $q;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.ngProgressFactory = ngProgressFactory;
            this.ngProgressInstance = ngProgressInstance;
            this.request = function(requestSuccess) {
                _this.startLoader();
                return requestSuccess;
            };
            this.requestError = function(requestFailure) {
                _this.stopLoader();
                return requestFailure;
            };
            this.response = function(responseSuccess) {
                _this.stopLoader();
                return responseSuccess;
            };
            this.responseError = function(responseFailure) {
                _this.stopLoader();
                return _this.$q.reject(responseFailure);
            };
            this.inFlightRequest = 0;
        }
        LoadingInterceptor.Factory = function(
            $q,
            $rootScope,
            $timeout,
            ngProgressFactory,
            ngProgressInstance
        ) {
            return new LoadingInterceptor(
                $q,
                $rootScope,
                $timeout,
                ngProgressFactory,
                ngProgressInstance
            );
        };
        LoadingInterceptor.prototype.startLoader = function() {
            if (!this.ngProgressInstance) {
                this.ngProgressInstance = this.ngProgressFactory.createInstance();
                this.ngProgressInstance.setColor("#0051AA");
            }
            if (
                this.ngProgressInstance &&
                this.ngProgressInstance.status() === 0
            ) {
                this.ngProgressInstance.reset();
                this.ngProgressInstance.start();
                this.$rootScope.$emit("progress:loading", true);
            }
            if (this.inFlightRequest < 0) this.inFlightRequest = 0;
            this.inFlightRequest++;
        };
        LoadingInterceptor.prototype.stopLoader = function() {
            this.inFlightRequest--;
            if (this.ngProgressInstance && this.inFlightRequest <= 0) {
                this.ngProgressInstance.complete();
                this.$rootScope.$emit("progress:completed", true);
            }
        };
        return LoadingInterceptor;
    })();
    LoadingInterceptor.Factory.$inject = [
        "$q",
        "$rootScope",
        "$timeout",
        "ngProgressFactory",
        "ngProgressInstance"
    ];
    common_module_1.default.factory(
        "loadingInterceptor",
        LoadingInterceptor.Factory
    );
});
