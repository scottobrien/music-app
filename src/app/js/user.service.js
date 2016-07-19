angular.module('app')
  .service('UserService', function($log, $http, $firebaseObject, $q, $window, $rootScope, Restangular) {

    var ls = $window.localStorage;
    var userLocalObj = JSON.parse(ls.musicUser);

    var playList = {};
    
    // seamgen google uid... xkWktIFflNNqGKsDt8zOKTcDu1A2
    var ref = firebase.database().ref();
    var userObj = $firebaseObject(ref.child('users/' + userLocalObj.uid));

    //Available Globally
    $rootScope.displayName = userLocalObj.displayName;
    $rootScope.email = userLocalObj.email;
    $rootScope.photoURL = userLocalObj.photoURL;


    
    return {
      userGet: function() {
        return ls.getItem('musicUser');
      },
      checkUser: function() {
        var deferred = $q.defer();
        $firebaseObject(ref.child('users/' + userLocalObj.uid)).$loaded().then(function(result) {
          deferred.resolve(result.playList);
        }).catch(function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      playListInit: function() {
        var deferred = $q.defer();
        $http.get('app/json/musicApp.json').then(function(result) {
          deferred.resolve(result);
          playList = result.data;
          userObj.playList = playList;
          userObj.$save().then(function(result) {
            //$log.debug('data went up?', result)
          }).catch(function(error) {
            $log.debug('errord', error);
          });
        }).catch(function(error) {
            $log.debug('playListInit error', error);
            deferred.resolve(error);
        });
        return deferred.promise;
      },
      trackListInit: function(listAddr) {
        return Restangular.oneUrl('spotifyTrack', listAddr).get();
      }
    };

  });