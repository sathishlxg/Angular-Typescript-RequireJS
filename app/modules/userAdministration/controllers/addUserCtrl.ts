import userModule from "../user.module";
import * as models from "../models/user";
import * as service from "../services/userService";

/**
 * User detail controller interface
 */
export interface IAddUserCtrl {
    user: models.User;
    save(): void;
    delete(): void;
}

/**
 * User detail controller
 */
class AddUserCtrl implements IAddUserCtrl {
    static $inject = ["user", "UserService"];

    constructor(
        public user: models.User,
        private service: service.UserService,
        private $state: ng.ui.IStateService
    ) {
        this.user = user;
    }

    public save(): void {
        this.service
            .saveUser(this.user)
            .then(data => {
                this.$state.get("userSummary");
            })
            .catch(reason => {
                alert("an error occured while saving the user");
            });
    }

    public delete(): void {
        this.service
            .deleteUser(1)
            .then(data => {
                this.$state.get("userSummary");
            })
            .catch(reason => {
                alert("an error occured");
            });
    }
}

userModule.controller("AddUserCtrl", AddUserCtrl);
