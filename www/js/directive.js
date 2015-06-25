var TilesList = React.createClass({displayName: "TilesList",
  render: function() {
  var that = this;
  return React.createElement("tbody", null, this.props.tiles.map(function(tile, i) {
    return React.createElement("button", {className: "button button-large button-outline button-positive", onClick: that.props.clickHandler.bind(that, tile + 1)}, tile + 1)
  }));
  }
});

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
        $scope.$apply();
      };
    },
    link:function(scope, el, attrs){
      scope.$watch('tiles', function(newValue, oldValue){
        React.render(
          React.createElement(TilesList, {tiles: newValue, clickHandler: scope.setTileValue}),
          el[0]
        );
      })
    }
  };
});
