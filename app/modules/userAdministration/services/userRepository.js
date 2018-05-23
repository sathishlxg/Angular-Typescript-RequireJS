var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
define([
  "require",
  "exports",
  "../user.module",
  "../../../modules/common/services/BaseRepository"
], function(require, exports, user_module_1, common) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var UserRepository = (function(_super) {
    __extends(UserRepository, _super);
    function UserRepository($odataresource, $q) {
      return _super.call(this, $odataresource, $q) || this;
    }
    UserRepository.$inject = ["$odataresource", "$q"];
    return UserRepository;
  })(common.BaseRepository);
  exports.UserRepository = UserRepository;
  user_module_1.default.service("UserRepository", UserRepository);
});
