/**
 * DataAccess layer for the UserAdministration module
 * @module UserRepository
 */
import userModule from "../user.module";
import * as common from "../../../modules/common/services/BaseRepository";
import * as models from "../models/user";

/**
 * Creates a new instance of the UserRepository
 * @class UserRepository
 * @extends common.BaseRepository
 */
export class UserRepository extends common.BaseRepository<models.User> {
    /**
     * Contains the list of dependencies for this class
     * @static
     */
    static $inject = ["$odataresource", "$q"];

    /**
     * @constructor
     * @param {OData.IResourceService} $odataresource - The odataresource service to connect to User master odata api
     * @param {angular.IQService} $q - The promise object
     */
    constructor($odataresource: any, $q: angular.IQService) {
        super($odataresource, $q);
    }
}

userModule.service("UserRepository", UserRepository);
