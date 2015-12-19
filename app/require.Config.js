;(function(){

	"use strict";

	require.config({
		baseUrl:"./",
		paths:{
			jquery:"../vendor/jquery/jquery.min",
			bootstrap: "../vendor/bootstrap/bootstrap.min",
			angular:"../vendor/angular/angular.min",
			uiRouter:"../vendor/angular/ui-router.min",			
			moment: "../vendor/momentjs/momentjs.min",			
			uiGrid: "../vendor/angular/ui-grid",
			odata: "../vendor/angular/odata-resource",			
			ngProgress: "../vendor/ngProgress/ngProgress.min",
			breadcrumb: "../vendor/angular-breadcrumb/angular-breadcrumb",
		},
		shim: {
			bootstrap : { 
				exports: "bootstrap",
				deps :['jquery'] 
			},
			angular:{
				exports : "angular"
			},
			uiGrid: {
			    deps: ["angular"]
			},
			uiRouter: {
            	deps: ["angular"]
			},
			odata: {
			    deps: ["angular"]
			},			
			ngProgress: {
			    deps: ["angular"]
			},
			breadcrumb: {
			    deps: ["angular"]
			}

        },
        deps: ["main"]
	});
	
})();
