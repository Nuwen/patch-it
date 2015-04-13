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
      $scope.new.project = $scope.projects[0];
  });
  $http.get('/platform').success(function(data){
      $scope.platforms = data;
      $scope.model.platforms = $scope.platforms;
      $scope.new.platforms = $scope.platforms[0];
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
    var query = '';
    for (var property in params){
      if (params.hasOwnProperty(property)){
        $scope.model[property] = params[property];
      }
      if (params[property] instanceof Array){
        // if property type is Array, no query string is necessary
      }
      else {
        // query parameters
        query = query + property + '=' + params[property].id + '&'
      }
    }
    $http({
      url: '/template?'+query,
      type: 'GET'    
      }).success(function(data){
        $scope.model.results = data;
        $scope.$apply();
    });
  }

  $scope.reset = function(){
    $scope.model.project =  undefined;
    $scope.model.platforms = undefined;
  }

  $scope.clone = function(template){
    $http.post('/template', {
        name: 'Copy of ' + template.name,
        description: template.description,
        project: template.project,
        platforms: template.platforms,
        tests: template.tests,
        devices: template.devices,
        suites: template.suites
      }
    ).success(function(data){
      window.location.href = '/template/edit?id='+data.id;
    }).error(function(error){
      console.log('error, ', error);
    });
  }

  $scope.create = function(params){
    
  }

}]);
