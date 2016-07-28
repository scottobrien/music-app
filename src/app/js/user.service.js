angular.module('app')
  .service('UserService', function($log, $http, $firebaseObject, $firebaseArray, $q, $window, $rootScope, Restangular) {

    

    var ls = $window.localStorage;
    var userLocalObj = JSON.parse(ls.musicUser);

    var albumList = {};
    
    // seamgen google uid... xkWktIFflNNqGKsDt8zOKTcDu1A2
    var ref = firebase.database().ref();
    var userObj = $firebaseObject(ref.child('users/' + userLocalObj.uid));
    var albumArr = $firebaseArray(ref.child('users/' + userLocalObj.uid + '/albumList/items/'));

    var playlistArr = $firebaseArray(ref.child('users/' + userLocalObj.uid + '/playlist/items/'));

    //Available Globally
    $rootScope.displayName = userLocalObj.displayName;
    $rootScope.email = userLocalObj.email;
    $rootScope.photoURL = userLocalObj.photoURL;


    
    return {
      userGet: function() {
        return ls.getItem('musicUser');
      },
      albumListInit: function() {
        $http.get('app/json/musicApp.json').then(function(result) {
          albumList = result.data;
          userObj.albumList = albumList;
          userObj.$save().then(function(result) {
            userObj.$destroy();
            $log.debug('data went up?', result)
          }).catch(function(error) {
            $log.debug('errord', error);
          });
        }).catch(function(error) {
            $log.debug('albumListInit error', error);
        });
        return albumArr.$loaded();
      },
      trackListInit: function(listAddr) {
        return Restangular.oneUrl('spotifyTrack', listAddr).get();
      },
      albumArr: albumArr,
      userObj: userObj,
      playlistArr: playlistArr,
      ref: ref,
      getAlubumArr: function() {
        return albumArr.$loaded();
      },
      saveAlbumArr: function(idx, item) {
        albumArr[idx].albumRating = item;
        idx = parseInt(idx);
        return albumArr.$save(idx);
      },
      playlistAddArr: function(item) {
        return playlistArr.$add(item);
      },
      playlistSave: function(item) {
        return playlistArr.$save(item);
      },
      getPlaylistArr: function() {
        return playlistArr.$loaded();
      },
      playlistRemove: function() {
        return playlistArr.$remove();
      },
      userCheck: function() {
        return userObj.$loaded();
      }
    };

  });