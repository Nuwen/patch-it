// Task Controller
angular.module('patch-it').controller('TaskCtrl', ['$scope', '$http', function ($scope, $http){

    // Actions
    $scope.actions = [
    {id: 'action_pass', name: 'Pass'},
    {id: 'action_fail', name: 'Fail'},
    {id: 'action_suggest', name: 'Suggest'}
    ];

    // If user has admin privs, add 'Edit' action

    $scope.selectedAction = {id: 'default', name: 'Choose action'};
    
    $scope.setAction = function(action){
      $scope.selectedAction = action;
      $scope.actionSubmit();
    };

    // Send action
    $scope.actionSubmit = function(){
      console.log($scope.selectedAction.id);
    };

    // Get suite.tasks
    $scope.tasks = [
      {id: 1, cmd: '/tp 0.0.0.0', ask: 'Can you do the thing?'},
      {id: 2, cmd: '/spawn CUNTS 4 m', ask: 'Does the thing reset?'},
      {id: 3, cmd: '/inflict radius 12 1234', ask: 'Does the thing die?'}];
}]);