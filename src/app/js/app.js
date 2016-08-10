angular.module('app', ['ui.router', 'firebase', 'restangular', 'ui.bootstrap', 'ngAnimate'])
	.run(function(AppConfigService) {
		var appConfig = AppConfigService.appConfig;
		firebase.initializeApp(appConfig);
	});