// template-edit.js
// Edit Template controller

angular.module('patch-it').controller('TemplateEditCtrl', ['$scope', '$http', function ($scope, $http){
  console.log(window.location.search)
  $http.get('/template').success(function(data){
    $scope.template = data
  });
}]);