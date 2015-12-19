import common from "../common.module";

interface IInterceptor {
    request: Function;
    requestError: Function;
    response: Function;
    responseError: Function;
}


class AuthenticationInterceptor implements IInterceptor {

    public static Factory($injector: angular.auto.IInjectorService, $q: angular.IQService, logger: angular.ILogService) {
        return new AuthenticationInterceptor($injector, $q, logger);
    }

    constructor(private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private logger: angular.ILogService) {
        logger.log("initializing AuthenticationInterceptor");
    }

    public request = (requestSuccess): angular.IPromise<any> => {
        this.logger.log("intercepting request");
        return requestSuccess;
    }
    public requestError = (requestFailure): angular.IPromise < any >  => {
        this.logger.log("requestError reported");
        return requestFailure;
    }
    public response = (responseSuccess): angular.IPromise < any >  => {
        this.logger.log("success response reported with status: " + responseSuccess.status);
        return responseSuccess;
    }

    public responseError = (responseFailure): angular.IPromise < any >  => {
        this.logger.log("response Error reported");
        if (responseFailure.status === 401) {
            console.log("401 error");
        }
        return this.$q.reject(responseFailure);
    }
}

AuthenticationInterceptor.Factory.$inject = ["$injector", "$q", "logger"];

common.factory("AuthenticationInterceptor", AuthenticationInterceptor.Factory);