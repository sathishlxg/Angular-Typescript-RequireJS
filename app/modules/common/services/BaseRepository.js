define(["require", "exports"], function(require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseRepository = (function() {
        function BaseRepository($odataresource, $q) {
            this.$odataresource = $odataresource;
            this.$q = $q;
            this.resource = this.$odataresource(
                "http://localhost/sm/odata/user",
                "id",
                {},
                { isodatav4: true }
            );
        }
        BaseRepository.prototype.getAll = function() {
            var deferred = this.$q.defer();
            this.resource
                .odata()
                .query()
                .$promise.then(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        BaseRepository.prototype.getById = function(id) {
            var deferred = this.$q.defer();
            this.resource
                .odata()
                .get(id)
                .$promise.then(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        BaseRepository.prototype.save = function(entity) {
            var deferred = this.$q.defer();
            this.resource
                .save(entity)
                .$promise.then(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        BaseRepository.prototype.update = function(entity) {
            var deferred = this.$q.defer();
            this.resource
                .update(entity.id, entity)
                .$promise.then(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        BaseRepository.prototype.delete = function(id) {
            var deferred = this.$q.defer();
            this.resource
                .delete(id)
                .$promise.then(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
        return BaseRepository;
    })();
    exports.BaseRepository = BaseRepository;
});
