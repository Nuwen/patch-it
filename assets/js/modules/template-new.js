// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;

  $http.get('/project').success( function(data){
      $scope.projects = data
  });
  console.log($scope.projects)
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
    console.log($scope[state]);
  }
}]);
