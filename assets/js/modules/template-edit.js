// template-edit.js
// Edit Template controller

angular.module('patch-it').controller('TemplateEditCtrl', ['$scope', '$http', function ($scope, $http){
  var query = window.location.search
  console.log(query)
  $http.get(('/template'+query)).success(function(data){
    $scope.template = data
  });
}]);