/**
 * @file userGridFilter
 * @version 0.1
 */

import commonModule from "../common.module";
import * as grid from "angular-ui-grid";

interface IGridFilterScope extends angular.IScope {
    isIcon: boolean;
    open: boolean;
    show(): void;
    select(opts: grid.ISelectOption): void;
    selected: string;
    col: grid.IColumnDef;
}

userGridFilter.$inject = ["$window"];
function userGridFilter($window: angular.IWindowService): angular.IDirective {
    return {
        restrict: "E",
        require: "^uiGrid",
        templateUrl: "modules/common/templates/userGridFilter.html",
        link: function(
            scope: IGridFilterScope,
            ele: angular.IAugmentedJQuery,
            attrs
        ) {
            scope.isIcon = attrs.isIcon;

            scope.show = () => {
                scope.open = !scope.open;
                $(".ui-grid-top-panel").css("overflow", "visible");
                $(".ui-grid-header-viewport").css("overflow", "visible");
            };

            scope.select = opts => {
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

commonModule.directive("userGridFilter", userGridFilter);
