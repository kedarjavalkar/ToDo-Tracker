(function() {
	'use strict';
	angular.module('sbAdminApp', [ 'oc.lazyLoad', 'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'moment-picker', 'ngResource' ]);

	angular.module('sbAdminApp').config(configure);
	configure.$inject = [ '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider' ];
	function configure ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
		$ocLazyLoadProvider.config({
			debug:false,
			events:true,
		});

		$urlRouterProvider.otherwise('/app/home');

		$stateProvider.state('app', {
			url:'/app',
			templateUrl: 'modules/dashboard/main.html',
			resolve: {
				loadMyDirectives:function($ocLazyLoad){
					return $ocLazyLoad.load({
						name:'sbAdminApp',
						files:[ 'directives/header/header.js',
							'directives/header/header-notification/header-notification.js',
							'services/restAPIService.js' ]
					}),
					$ocLazyLoad.load({
						name:'toggle-switch',
						files:[ 'lib/angular-toggle-switch/angular-toggle-switch.min.js',
							'lib/angular-toggle-switch/angular-toggle-switch.css' ]
					}),
					$ocLazyLoad.load({
						name:'ngAnimate',
						files:[ 'lib/angular-animate/angular-animate.js' ]
					}),
					$ocLazyLoad.load({
						name:'ngCookies',
						files:[ 'lib/angular-cookies/angular-cookies.js' ]
					}),
					$ocLazyLoad.load({
						name:'ngSanitize',
						files:[ 'lib/angular-sanitize/angular-sanitize.js' ]
					}),
					$ocLazyLoad.load({
						name:'ngTouch',
						files:[ 'lib/angular-touch/angular-touch.js' ]
					}),
					$ocLazyLoad.load({
						name:'ngAria',
						files:[ 'lib/angular-aria/angular-aria.js']
					}),
					$ocLazyLoad.load({
						name:'ngMessages',
						files:[ 'lib/angular-messages/angular-messages.js' ]
					})
				}
			}
		})
		.state('app.home',{
			url:'/home',
			controller: 'MainCtrl',
			controllerAs: 'mainCtrl',
			templateUrl:'modules/dashboard/home.html',
			resolve: {
				loadMyFiles:function($ocLazyLoad) {
					return $ocLazyLoad.load({
						name:'sbAdminApp',
						files:[ 'modules/dashboard/mainCtrl.js' ]
					})
				}
			}
		})
	}

	angular.module('sbAdminApp').filter('positive', function() {
		return function(input) {
			if (!input) {
				return 0;
			}
			return Math.abs(input);
		};
	})

})();


