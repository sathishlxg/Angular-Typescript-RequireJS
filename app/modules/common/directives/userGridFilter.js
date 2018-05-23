define(["require", "exports", "../common.module"], function(
    require,
    exports,
    common_module_1
) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    userGridFilter.$inject = ["$window"];
    function userGridFilter($window) {
        return {
            restrict: "E",
            require: "^uiGrid",
            templateUrl: "modules/common/templates/userGridFilter.html",
            link: function(scope, ele, attrs) {
                scope.isIcon = attrs.isIcon;
                scope.show = function() {
                    scope.open = !scope.open;
                    $(".ui-grid-top-panel").css("overflow", "visible");
                    $(".ui-grid-header-viewport").css("overflow", "visible");
                };
                scope.select = function(opts) {
                    if (scope.col.filter) scope.col.filter.term = opts.label;
                    scope.selected = opts.label;
                };
                $($window).bind("click", function(e) {
                    if (e.target != ele[0].children[0]) {
                        $(".ui-grid-top-panel").css("overflow", "hidden");
                        $(".ui-grid-header-viewport").css("overflow", "hidden");
                    }
                });
            }
        };
    }
    common_module_1.default.directive("userGridFilter", userGridFilter);
});
