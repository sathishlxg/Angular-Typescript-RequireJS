/**
 * @module BaseRepository
 */
export interface IRepository<T> {
    getAll(): angular.IPromise<T[]>;
    getById(id): angular.IPromise<T>;
    save(T): angular.IPromise<T>;
    update(T): angular.IPromise<T>;
    delete(id): angular.IPromise<T>;
} 


/**
* Base class for the UserMaster data repository
*/
export abstract class BaseRepository<T> implements IRepository<T> {
    
    /**
     * OData Resource class of type <T>
     * @name BaseRepository#resource
     * @type OData.IResourceClass<OData.IResource<T>>
     */
    protected resource: OData.IResourceClass<OData.IResource<T>>;
    
    /**
    * Creates new instance of a repository
    * @params {OData.IResourceService} $odataresource - The odata resource service
    * @params {angular.IQService} $q - The angular promise object
    */
    constructor(protected $odataresource: OData.IResourceService, protected $q: angular.IQService) {
        this.resource = this.$odataresource('http://localhost/sm/odata/user', 'id', {}, { isodatav4: true });
    }
    
    /**
     * Fetches all resource of type <T>
     */
    public getAll(): angular.IPromise<T[]> {
        var deferred: angular.IDeferred<T[]> = this.$q.defer();
        this.resource.odata().query().$promise
            .then((data: any) => { deferred.resolve(data); })
            .catch((reason: any) => { deferred.reject(reason); });
        return deferred.promise;
    }

    /**
     * Fetches a single entity by id
     * @param {any} id - The id of the entity to get
     */
    public getById(id: any): angular.IPromise<T> {
        var deferred: angular.IDeferred<T> = this.$q.defer();
        this.resource.odata().get(id).$promise
            .then((data: any) => { deferred.resolve(data); })
            .catch((reason: any) => { deferred.reject(reason); })
        return deferred.promise;
    }
    
    /**
     * Creates a new entity
     * @param {any} entity - The entity to save
     */
    public save(entity: T): angular.IPromise<T> {
        var deferred: angular.IDeferred<T> = this.$q.defer();
        this.resource.save(entity).$promise
            .then((data: any) => { deferred.resolve(data); })
            .catch((reason: any) => { deferred.reject(reason); });
        return deferred.promise;
    }
    
    /**
     * Updates an entity
     * @param {any} entity - The entity to update
     */
    public update(entity: any): angular.IPromise<T> {
        var deferred: angular.IDeferred<T> = this.$q.defer();
        this.resource.update(entity.id, entity).$promise
            .then((data: any) => { deferred.resolve(data); })
            .catch((reason: any) => { deferred.reject(reason); });
        return deferred.promise;
    }
    
    /**
     * Deletes an entity
     * @param {any} id - The id of the entity to delete
     */
    public delete(id: any): angular.IPromise<T> {
        var deferred: angular.IDeferred<T> = this.$q.defer();
        this.resource.delete(id).$promise
            .then((data: any) => { deferred.resolve(data); })
            .catch((reason: any) => { deferred.reject(reason); });
        return deferred.promise;

    }
}

