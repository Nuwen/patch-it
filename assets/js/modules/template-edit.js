// template-edit.js
// Edit Template controller

angular.module('patch-it').controller('TemplateEditCtrl', ['$scope', '$http', function ($scope, $http){
  // var inits
  var query = window.location.search
  $scope.lock = {};
  $scope.lock.status = 'lock';
  $scope.lock.btn = 'success';
  $scope.save = {};


  // fetch template
  $http.get(('/template'+query)).success(function(data){
    $scope.template = data
  });
  // fetch ALL project
  $http.get('/project').success(function(data){
    $scope.projects = data
  });
  // fetch ALL platform
  $http.get('/platform').success(function(data){
    $scope.platforms = data
  });

  // unlock / lock
  $scope.enableEdit = function(){
    $scope.lock.status = $scope.lock.status === 'lock' ? 'unlock' : 'lock';
    $scope.lock.btn = $scope.lock.btn === 'success' ? 'danger' : 'success';
  }


  $scope.save = function(data){
    console.log(data)
  }

  // updates on ng-change
  $scope.newPlatformByID = function(platforms){
    $scope.edit.platforms.all = false;
  }

  $scope.newPlatformAll = function(platforms){
    for (var property in $scope.new.platforms){
      if (property != 'all'){
        $scope.new.platforms[property] = false;
      }
    } 
  }

  $scope.setActive = function(platform){
    if (platform in $scope.template.platforms){
      console.log(platform);
    }
    console.log($scope.template.platforms)
  }

}]);