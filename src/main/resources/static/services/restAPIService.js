(function() {
	'use strict';
	angular.module('sbAdminApp').factory('restAPIService', restAPIService);

	restAPIService.$inject = [ '$http', '$resource', '$rootScope' ];

	function restAPIService($http, $resource, $rootScope) {
		return {
			saveTask : saveTask,
			getAllTasksByIsComplete : getAllTasksByIsComplete,
			markTaskComplete : markTaskComplete,
			deleteTask : deleteTask
		}

		function saveTask() {
			var url = "task";
			return $resource(url);
		}

		function getAllTasksByIsComplete(isComplete) {
			var url = "task?isComplete=" + isComplete;
			return $resource(url);
		}

		function markTaskComplete(taskId) {
			var url = "task/" + taskId + "/complete";
			return $resource(url);
		}

		function deleteTask(taskId) {
			var url = "task/" + taskId;
			return $resource(url);
		}

	}
})();