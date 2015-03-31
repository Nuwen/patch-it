angular.module('patch-it', ['ui.bootstrap', 'ngCookies']);

// Login controller
angular.module('patch-it').controller('LoginCtrl', ['$scope','$http', function ($scope, $http){
  $scope.alerts = [];
  $scope.login = function(user){
    $scope.dataLoading = true;
    $http.post('/login', { 
      email: user.email,
      password: user.password
      remember: user.remember
    }).
    success(function(data, status, headers, config){
      // async cb when response is available
      $scope.dataLoading = false;
      window.location.pathname = '/'
    }).
    error(function(data, status, headers, config){
      // async cb when error occurs OR
      // server returns response with error status
      $scope.dataLoading = false;
      $scope.alerts.push({msg: data});
    });
}
}]);

