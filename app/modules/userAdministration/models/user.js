define(["require", "exports"], function(require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var User = (function() {
    function User() {
      this.address = new Address();
      this.identities = [];
      this.orgAssociations = [];
    }
    return User;
  })();
  exports.User = User;
  var Address = (function() {
    function Address() {}
    return Address;
  })();
  exports.Address = Address;
  var OrgAssociations = (function() {
    function OrgAssociations() {
      this.organization = new Organization();
    }
    return OrgAssociations;
  })();
  exports.OrgAssociations = OrgAssociations;
  var Organization = (function() {
    function Organization() {}
    return Organization;
  })();
  exports.Organization = Organization;
  var Identity = (function() {
    function Identity() {}
    return Identity;
  })();
  exports.Identity = Identity;
});
