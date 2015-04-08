// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;
  $scope.model =  {};

  // Defaults ALL
  $http.get('/project').success( function(data){
      $scope.projects = data;
  });
  $http.get('/platform').success(function(data){
      $scope.platforms = data;
  });
    // Filter I/O
  $scope.model.project =  $scope.projects;
  $scope.model.platform = $scope.platforms;
  $scope.model.results = undefined;
  $scope.model.io = [$scope.model.project, $scope.model.platform];
  $http.get('/template').success(function(data){
    $scope.model.results = data;
  });
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
  }

  $scope.setFilter = function(options){
    console.log(options)
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
