import common from "../common.module";

export interface IInterceptor {
    request: Function;
    requestError: Function;
    response: Function;
    responseError: Function;
}

class LoadingInterceptor implements IInterceptor {

    public static Factory($q: angular.IQService, $rootScope, $timeout, ngProgressFactory, ngProgressInstance) {
        return new LoadingInterceptor($q, $rootScope, $timeout, ngProgressFactory, ngProgressInstance);
    }

    inFlightRequest: number;
    constructor(private $q: angular.IQService,
        private $rootScope: angular.IRootScopeService,
        private $timeout: angular.ITimeoutService,
        private ngProgressFactory: any,
        private ngProgressInstance) {
        this.inFlightRequest = 0;
    }

    public request = (requestSuccess): angular.IPromise<any> => {        
        this.startLoader();
        return requestSuccess;
    }

    public requestError = (requestFailure): angular.IPromise<any> => {
        this.stopLoader();
        return requestFailure;
    }

    public response = (responseSuccess): angular.IPromise<any> => {
        this.stopLoader();
        return responseSuccess;
    }

    public responseError = (responseFailure): angular.IPromise<any> => {
        this.stopLoader();
        return this.$q.reject(responseFailure);
    }

    public startLoader(): void {
        if (!this.ngProgressInstance) {
            this.ngProgressInstance = this.ngProgressFactory.createInstance();
            this.ngProgressInstance.setColor("#0051AA");            
        }

        if (this.ngProgressInstance && this.ngProgressInstance.status() === 0) {
            this.ngProgressInstance.reset();
            this.ngProgressInstance.start();            
            this.$rootScope.$emit("progress:loading", true);            
        }

        if (this.inFlightRequest < 0) this.inFlightRequest = 0;

        this.inFlightRequest++;
    }

    public stopLoader(): void {
        this.inFlightRequest--;
        if (this.ngProgressInstance && this.inFlightRequest <= 0) {
            this.ngProgressInstance.complete(); 
            this.$rootScope.$emit("progress:completed", true);           
        }
    }
}

LoadingInterceptor.Factory.$inject = ["$q", "$rootScope", "$timeout", "ngProgressFactory", "ngProgressInstance"];

common.factory("loadingInterceptor", LoadingInterceptor.Factory);