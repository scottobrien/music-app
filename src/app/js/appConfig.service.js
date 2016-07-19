(function() {

  angular.module('app')
    .service('AppConfigService', function($log) {
      
      var appConfig = {
        apiKey: 'AIzaSyCiYVtKrPE5Cdp7Qao4y0D1xFKy5TfWsGg',
        authDomain: 'music-app-fee85.firebaseapp.com',
        databaseURL: 'https://music-app-fee85.firebaseio.com',
        storageBucket: 'music-app-fee85.appspot.com',
      };

      return {
        appConfig: appConfig
      };

    });

})();
