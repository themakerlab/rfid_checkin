angular.module('rfidApp').controller('MainController', ['$scope', 'logger', MainCtrl]);

function MainCtrl($scope, logger) {
   console.log('MainCtrl');

   $scope.nfcValue = "";

};
