angular.module('patch-it', []);
angular.module('patch-it').controller('LoginCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http){
  $scope.login = function(user){
    $scope.dataLoading = true;
    $http.post('/login', { 
      email: user.email,
      password: user.password
    }).
    success(function(data, status, headers, config){
      // async cb when response is available
      console.log('success!', {'data': data, 'status': status, 'headers': headers, 'config': config} )
      $scope.dataLoading = false;
    }).
    error(function(data, status, headers, config){
      // async cb when error occurs OR
      // server returns response with error status
      $scope.dataLoading = false;

      console.log('error!', {'data': data, 'status': status, 'headers': headers, 'config': config} )
    });
}
}]);