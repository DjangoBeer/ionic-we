angular.module('mydirectives', [])
.directive('tilewall', function () {
  return {
    scope: {
      size: '@',
      ngModel: '=',
    },
    controller: function ($scope) {
      $scope.tiles = Array();
      for (var i = 0 ; i < parseInt($scope.size) ; i++) {
        $scope.tiles.push(i);
      }
      $scope.setTileValue = function(value) {
        $scope.ngModel = value;
      };
    },
    template: '<button ng-click="setTileValue(tile+1)" class="button button-large button-outline button-positive" ng-repeat="tile in tiles">{{ tile + 1 }}</button>'
  };
})

.directive('gmap', function () {
  return {
    scope: {
      mapclick: '&',
      ngModel: '=',
    },
    controller: function ($scope) {
      $scope.privmarkers = $scope.ngModel;
    },
    template: '<div class="mapcontainer"></div>',
    link: function(scope, el, attrs){
      function initialize() {
        center = attrs.center.split(',')
        var mapOptions = {
          center: {
            lat: parseFloat(center[0]),
            lng: parseFloat(center[1])
          },
          zoom: parseInt(attrs.zoom)
        };
        return new google.maps.Map(el[0].firstChild, mapOptions);
      }
      var map = initialize();
      google.maps.event.addListener(map, 'click', function(event) {
        scope.$apply(scope.mapclick({
          lat: event.latLng.lat(),
          lon: event.latLng.lng()
        }));
      });

      var markerCollections = [];

      function clearMap() {
        for (var i = 0; i < markerCollections.length; i++) {
          markerCollections[i].setMap(null);
        }
      }

      function renderElements(elements) {
        for (var i = 0 ; i < elements.length ; i++) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(elements[i].lat, elements[i].lon),
            map: map,
            title: elements[i].name,
          });
          markerCollections.push(marker);
        }
      }

      scope.$watch('privmarkers', function(newValue, oldValue){
        clearMap();
        renderElements(newValue);
      }, true);
    }
  };
});
