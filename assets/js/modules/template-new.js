// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;
  $scope.projectModel =  {};
  $scope.platformModel = {};

  $http.get('/project').success( function(data){
      $scope.projects = data
  });
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
  }

  $scope.setFilter = function(options){
    console.log(options);
  }

  $scope.reset = function(){
    console.log('it reset woo');
  }
}]);
