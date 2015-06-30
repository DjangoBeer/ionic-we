var TilesList = React.createClass({
  render: function() {
    var that = this;
    return <tbody>{this.props.tiles.map(function(tile, i) {
      return <button className="button button-large button-outline button-positive" onClick={that.props.clickHandler.bind(that, tile + 1)}>{tile + 1}</button>
    })}</tbody>;
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
          <TilesList tiles={newValue} clickHandler={scope.setTileValue} />,
          el[0]
        );
      })
    }
  };
});
