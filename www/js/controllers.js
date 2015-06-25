angular.module('starter.controllers', ['mydirectives'])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.loginData = {};
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $state.go('wall');
    }, 1000);
  };
})

.controller('NewVotesCtrl', function($scope) {
  $scope.current_page = 0;
  $scope.myvotes = [
    { title: 'Quality of code', vote: undefined },
    { title: 'Happines', vote: undefined },
    { title: 'Teamwork', vote: undefined },
  ];
  $scope.current_vote = $scope.myvotes[$scope.current_page];

  $scope.send = function() {
    $scope.myvotes;
  };
  $scope.isLast = function() {
    return $scope.current_page == $scope.myvotes.length - 1;
  };
  $scope.isFirst = function() {
    return $scope.current_page == 0;
  };
  $scope.nextPage = function() {
    $scope.current_page++;
    $scope.current_vote = $scope.myvotes[$scope.current_page];
  };
  $scope.prevPage = function() {
    $scope.current_page--;
    $scope.current_vote = $scope.myvotes[$scope.current_page];
  };
  $scope.isCompleted = function() {
    for(var i = 0 ; i < $scope.myvotes.length ; i++) {
      if ($scope.myvotes[i].vote === undefined) {
        return false;
      }
    }
    return true;
  };
})

.controller('TileWallCtrl', function($scope) {
  $scope.tileval = 0;
})

.controller('MapCtrl', function($scope) {
  $scope.markers = [
    {'lat': -34.19362958613085, 'lon': 150.457763671875}
  ];
  $scope.onMapClick = function(lat, lon) {
    console.log(lat);
    console.log(lon);
    $scope.markers.push({'lat': lat, 'lon': lon});
  }
})

.controller('MenuCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.goLogin = function() {
    $state.go('login');
  };
  $scope.goVotes = function() {
    $state.go('vote');
  };
  $scope.goWall = function() {
    $state.go('wall');
  };
  $scope.goMap = function() {
    $state.go('map');
  };
});
