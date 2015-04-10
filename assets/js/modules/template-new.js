// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;
  $scope.model =  {};

  // Defaults ALL
  $http.get('/project').success( function(data){
      $scope.projects = data;
      $scope.model.project =  $scope.projects;

  });
  $http.get('/platform').success(function(data){
      $scope.platforms = data;
      $scope.model.platform = $scope.platforms;
  });
    // Filter I/O
  $scope.model.results = undefined;

  $http.get('/template').success(function(data){
    $scope.model.results = data;
  });
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
  }

  $scope.setFilter = function(params){
    console.log(params);
    for (var property in params){
      if (params.hasOwnProperty(property)){
        $scope.model[property] = params[property];
      }
    }
    $http({
      url: '/template/new/filter',
      method: "GET",
      params: params
    }).success(function(data){
      //console.log(data);
    });
  }

  $scope.reset = function(){
    $scope.model.project =  undefined;
    $scope.model.platform = undefined;
  }

}]);
