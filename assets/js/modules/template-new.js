// template-new.js
// New Template Controller

angular.module('patch-it').controller('TemplateNewCtrl', ['$scope', '$http', function ($scope, $http){
  $scope.state = {};
  $scope.state.reset = true;
  $scope.projectModel =  {id: 1};

  $http.get('/project').success( function(data){
      $scope.projects = data
  });
  $scope.setState = function(state){
    $scope.state.reset = false;
    $scope.state[state] = state;
  }

  $scope.filterProject = function(project){
    $scope.filteredProject = project;
  }
}]);
