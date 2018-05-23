define(["require", "exports", "../user.module"], function(
    require,
    exports,
    user_module_1
) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserSummaryCtrl = (function() {
        function UserSummaryCtrl(Users, gridConstant) {
            this.Users = Users;
            this.gridConstant = gridConstant;
            this.initGrid();
        }
        UserSummaryCtrl.prototype.initGrid = function() {
            var _this = this;
            var headerCellTmpl =
                "modules/userAdministration/templates/headerCellTemplate.html";
            this.gridOptions = {
                data: this.Users,
                enableSorting: false,
                enableColumnMenus: false,
                enableColumnResizing: false,
                enableFiltering: true,
                multiSelect: false,
                enableFullRowSelection: true,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                columnDefs: [
                    {
                        name: "status",
                        headerCellClass: "text-center",
                        headerCellTemplate: headerCellTmpl,
                        width: 100,
                        cellTemplate:
                            '<div class="ui-grid-cell-contents text-center"><span class="sm-status sm-status-{{ COL_FIELD }}"></span></div>',
                        filter: {
                            term: "",
                            placeholder: "Select",
                            selectOptions: [
                                { value: 1, label: "Green" },
                                { value: 1, label: "Yello" },
                                { value: 2, label: "Red" }
                            ]
                        },
                        filterHeaderTemplate:
                            "<sm-grid-filter></sm-grid-filter>"
                    },
                    {
                        name: "spinId",
                        headerCellTemplate: headerCellTmpl,
                        displayName: "SPIN ID",
                        maxWidth: 250,
                        cellTemplate:
                            '<div class="ui-grid-cell-contents"><a ui-sref="addUser({id: row.entity.id})">{{ COL_FIELD }}</a></div>'
                    },
                    {
                        name: "firstName",
                        headerCellTemplate: headerCellTmpl,
                        maxWidth: 250
                    },
                    {
                        name: "lastName",
                        headerCellTemplate: headerCellTmpl,
                        maxWidth: 250
                    },
                    {
                        name: "startDate",
                        headerCellTemplate: headerCellTmpl,
                        maxWidth: 250,
                        type: "date",
                        cellFilter: 'date:"MM-dd-yyyy"'
                    },
                    {
                        name: "department",
                        headerCellTemplate: headerCellTmpl,
                        filter: {
                            term: "",
                            selectOptions: [
                                { value: 1, label: "Sales" },
                                { value: 2, label: "Finance" }
                            ]
                        },
                        filterHeaderTemplate:
                            "<sm-grid-filter></sm-grid-filter>"
                    },
                    {
                        name: "requestStatus",
                        headerCellTemplate: headerCellTmpl,
                        filter: {
                            term: "",
                            selectOptions: [
                                { value: 1, label: "Approved" },
                                { value: 1, label: "Rejected" },
                                { value: 2, label: "Submitted for Approval" }
                            ]
                        },
                        filterHeaderTemplate:
                            "<sm-grid-filter></sm-grid-filter>"
                    },
                    {
                        name: "actions",
                        headerCellClass: "text-center",
                        headerCellTemplate: headerCellTmpl,
                        maxWidth: 150,
                        cellTemplate:
                            '<div class="ui-grid-cell-contents text-center"><span><i class="fa fa-user-times fa-flip-horizontal"></i></span></div>',
                        filter: {
                            term: "",
                            selectOptions: [
                                { value: 1, label: "Approved" },
                                { value: 2, label: "Rejected" }
                            ]
                        },
                        filterHeaderTemplate:
                            "<sm-grid-filter is-icon='true'></sm-grid-filter>"
                    }
                ],
                onRegisterApi: function(api) {
                    _this.gridApi = api;
                }
            };
        };
        UserSummaryCtrl.prototype.removeFilter = function() {
            this.gridApi.core.clearAllFilters(true);
        };
        UserSummaryCtrl.$inject = ["Users", "uiGridConstants"];
        return UserSummaryCtrl;
    })();
    user_module_1.default.controller("UserSummaryCtrl", UserSummaryCtrl);
});
