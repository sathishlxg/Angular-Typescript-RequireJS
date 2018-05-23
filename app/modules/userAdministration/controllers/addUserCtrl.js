define(["require", "exports", "../user.module"], function(
    require,
    exports,
    user_module_1
) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AddUserCtrl = (function() {
        function AddUserCtrl(user, service, $state) {
            this.user = user;
            this.service = service;
            this.$state = $state;
            this.user = user;
        }
        AddUserCtrl.prototype.save = function() {
            var _this = this;
            this.service
                .saveUser(this.user)
                .then(function(data) {
                    _this.$state.get("userSummary");
                })
                .catch(function(reason) {
                    alert("an error occured while saving the user");
                });
        };
        AddUserCtrl.prototype.delete = function() {
            var _this = this;
            this.service
                .deleteUser(1)
                .then(function(data) {
                    _this.$state.get("userSummary");
                })
                .catch(function(reason) {
                    alert("an error occured");
                });
        };
        AddUserCtrl.$inject = ["user", "UserService"];
        return AddUserCtrl;
    })();
    user_module_1.default.controller("AddUserCtrl", AddUserCtrl);
});
