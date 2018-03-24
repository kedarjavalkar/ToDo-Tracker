(function() {
	'use strict';
	angular.module('sbAdminApp').controller('MainCtrl', mainCtrl);
	function mainCtrl($rootScope, $timeout, momentPicker, restAPIService) {
		$rootScope.currentPage = 'ToDo Tracker';
		var self = this;

		self.getPendingTasks = getPendingTasks;
		self.getCompletedTasks = getCompletedTasks;
		self.taskModalOpen = taskModalOpen;
		self.saveTask = saveTask;

		self.markComplete = markComplete;
		self.deleteTask = deleteTask;

		self.pendingTasks = [];
		self.completedTasks = [];
		self.newTask = {};

		init();

		function init() {
			getPendingTasks();
			getCompletedTasks();
		}

		function taskModalOpen() {
			self.newTask = {priority:"Low", dueDate:moment()};
			$('#acceptTaskModal').modal('show');
		}

		function saveTask() {
			var saveTaskRequest = restAPIService.saveTask().save(self.newTask);
			saveTaskRequest.$promise.then(function(response) {
				self.newTask = {};
				jAlert.success(response.message);
				getPendingTasks();
				$('#acceptTaskModal').modal('hide');
			});
		}

		function getPendingTasks() {
			$('#pending-task-dataTables').DataTable().destroy();
			$('#pending-task-dataTables').hide();
			var getAllTasksByIsCompleteRequest = restAPIService.getAllTasksByIsComplete(false).query();
			getAllTasksByIsCompleteRequest.$promise.then(function(response) {
				self.pendingTasks=response;
				angular.forEach(self.pendingTasks, function(value, key){
					value.dateDiff = moment(value.dueDate).diff(new Date(value.createdDate).setHours(0,0,0,0), 'days');
				});
				$timeout(function(){
					$('#pending-task-dataTables').show();
					$('#pending-task-dataTables').DataTable({
						aaSorting: [[1, 'desc']]
					});
				}, 1000);

			});
		}

		function getCompletedTasks() {
			$('#completed-task-dataTables').DataTable().destroy();
			$('#completed-task-dataTables').hide();
			var getAllTasksByIsCompleteRequest = restAPIService.getAllTasksByIsComplete(true).query();
			getAllTasksByIsCompleteRequest.$promise.then(function(response) {
				self.completedTasks=response;
				angular.forEach(self.completedTasks, function(value, key){
					value.dateDiff = moment(value.dueDate).diff(new Date(value.completedDate).setHours(0,0,0,0), 'days');
				});
				$timeout(function(){
					$('#completed-task-dataTables').show();
					$('#completed-task-dataTables').DataTable({
						aaSorting: [[1, 'desc']]
					});
				}, 1000);

			});
		}

		function markComplete(taskId) {
			var ans = confirm('Are you sure you want to mark this complete ?');
			if(ans) {
				var markTaskCompleteRequest = restAPIService.markTaskComplete(taskId).save();
				markTaskCompleteRequest.$promise.then(function(response) {
					jAlert.success(response.message);
					getPendingTasks();
					getCompletedTasks();
				});
			}
		}

		function deleteTask(taskId) {
			var ans = confirm('Are you sure you want to delete this task ?');
			if(ans) {
				var deleteTaskRequest = restAPIService.deleteTask(taskId).remove();
				deleteTaskRequest.$promise.then(function(response) {
					jAlert.success(response.message);
					getPendingTasks();
					getCompletedTasks();
				});
			}
		}

	}
})();