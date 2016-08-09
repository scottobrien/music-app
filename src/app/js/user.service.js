angular.module('app')
  .service('UserService', function($log, $http, $firebaseObject, $firebaseArray, $window, $rootScope, Restangular) {

    var ls = $window.localStorage;
    var userLocalObj = JSON.parse(ls.musicUser);
    var albumList = {};
    var ref = firebase.database().ref();
    var userObj = $firebaseObject(ref.child('users/' + userLocalObj.uid));
    var playlistObj = $firebaseObject(ref.child('users/' + userLocalObj.uid));
    var albumArr = $firebaseArray(ref.child('users/' + userLocalObj.uid + '/albumList/items/'));
    var playlistArr = $firebaseArray(ref.child('users/' + userLocalObj.uid + '/playlist/items/'));

    //Globals
    $rootScope.displayName = userLocalObj.displayName;
    $rootScope.email = userLocalObj.email;
    $rootScope.photoURL = userLocalObj.photoURL;

    return {
      albumArr: albumArr,
      userObj: userObj,
      playlistArr: playlistArr,
      userGet: function() {
        return ls.getItem('musicUser');
      },
      userCheck: function() {
        return userObj.$loaded();
      },
      albumListInit: function() {
        $http.get('app/json/musicApp.json').then(function(result) {
          albumList = result.data;
          userObj.albumList = albumList;
          userObj.$save().then(function(result) {
            userObj.$destroy();
            $log.debug('data went up', result)
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
      playlistRemove: function(item) {
        playlistArr.$loaded().then(function(result) {
          var playlistListArr = result;
          playlistArr.$remove(_.findIndex(playlistListArr, {'$id': item.$id})).then(function(result) {
            //$log.debug('removed', result);
          }).catch(function(error) {
            $log.debug('playlistArr remove', error);
          });
        }).catch(function(error) {
          $log.debug('getPlaylist', error);
        });
      }
    };

  });