angular.module('app')
  .service('PlaylistService', function($log) {

      return {
        playlistArrService: function(item, playlistArr) {
          var findIem = _.findIndex(playlistArr, item);
          if (findIem >= 0) {
            _.remove(playlistArr, function(obj) {
              return obj.id === item.id;
            });
            return
          }
          playlistArr.push(item);
        },
        playListAdd: function(vmCurrentItem, playlistArr) {
          if (!vmCurrentItem.hasOwnProperty('items')) {
            return vmCurrentItem.items = playlistArr;
          }
          return vmCurrentItem.items = _.concat(vmCurrentItem.items, playlistArr);
        }
      };
  });