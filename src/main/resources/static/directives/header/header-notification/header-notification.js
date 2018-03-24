(function(){
	'use strict';
	angular.module('sbAdminApp').directive('headerNotification',headerNotification);

	function headerNotification(){
		return {
			templateUrl:'directives/header/header-notification/header-notification.html',
			restrict: 'E',
			replace: true,
		}
	}
})();
