(function(){
	'use strict';
	angular.module('sbAdminApp').directive('header',header);
	function header() {
		return {
			templateUrl:'directives/header/header.html',
			restrict: 'E',
			replace: true,
		}
	}
})();


