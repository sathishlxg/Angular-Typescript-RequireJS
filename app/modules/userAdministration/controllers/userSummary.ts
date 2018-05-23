import userModule from "../user.module";
import * as models from "../models/user";

/**
 * User summary controller interface
 */
interface IUserSummaryCtrl {
    gridOptions: uiGrid.IGridOptionsOf<models.User>;
    removeFilter(): void;
}

/**
 * User Summary controller
 */
class UserSummaryCtrl implements IUserSummaryCtrl {
    gridOptions: uiGrid.IGridOptionsOf<models.User>;
    moment: moment.Moment;
    gridApi: uiGrid.IGridApiOf<models.User>;

    static $inject = ["Users", "uiGridConstants"];

    constructor(
        public Users: models.User[],
        private gridConstant: uiGrid.IUiGridConstants
    ) {
        this.initGrid();
    }

    /**
     *
     */
    private initGrid(): void {
        var headerCellTmpl =
            "modules/userAdministration/templates/headerCellTemplate.html";

        this.gridOptions = {
            data: this.Users,
            enableSorting: false,
            //enableGridMenu: true,
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
                    filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
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
                    filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
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
                    filterHeaderTemplate: "<sm-grid-filter></sm-grid-filter>"
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
            onRegisterApi: (api: uiGrid.IGridApiOf<models.User>): void => {
                this.gridApi = api;
            }
        };
    }

    removeFilter(): void {
        this.gridApi.core.clearAllFilters(true);
    }
}

userModule.controller("UserSummaryCtrl", UserSummaryCtrl);
