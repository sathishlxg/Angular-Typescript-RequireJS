define(["require", "exports", "../user.module", "../models/user"], function (require, exports, user_module_1, models) {
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
    user_module_1.default.service("UserService", UserService);
});
