import userModule from "../user.module";
import * as models from "../models/user";
import * as service from "./userRepository";

export class UserService {
    static $inject = ["$q", "UserRepository"];
    constructor(
        private $q: angular.IQService,
        private userRepository: service.UserRepository
    ) {}

    public getUser(): angular.IPromise<models.User[]> {
        return this.userRepository.getAll();
    }

    public getUserById(id): angular.IPromise<models.User> {
        if (id) {
            return this.userRepository.getById(id);
        } else {
            return this.$q.when(new models.User());
        }
    }

    public saveUser(User): angular.IPromise<models.User> {
        if (User.id) {
            return this.userRepository.update(User);
        } else {
            return this.userRepository.save(User);
        }
    }

    public deleteUser(id): angular.IPromise<models.User> {
        return this.userRepository.delete(id);
    }
}

userModule.service("UserService", UserService);
