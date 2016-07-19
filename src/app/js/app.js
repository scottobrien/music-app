angular.module('app', ['ui.router', 'firebase', 'restangular'])
	.run(function(AppConfigService) {
		var appConfig = AppConfigService.appConfig;
		firebase.initializeApp(appConfig);
	});