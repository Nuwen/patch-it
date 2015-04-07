// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;
  $scope.model =  {};
  $scope.model.project =  undefined;
  $scope.model.platform = undefined;

  $http.get('/project').success( function(data){
      $scope.projects = data
  });
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
  }

  $scope.setFilter = function(options){
    for (var property in options){
      if (options.hasOwnProperty(property)){
        $scope.model[property] = options[property];
      }
    }
  }

  $scope.reset = function(){
    $scope.model.project =  undefined;
    $scope.model.platform = undefined;
  }
}]);
