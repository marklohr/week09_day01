var indexCtrl = calculator.controller('indexCtrl', function($scope){
  $scope.calcInput = '';
  $scope.userInputs = [];

  $scope.clearCalculation = function() {
    $scope.calcInput = '';
    $scope.userInputs = [];
  };

  $scope.userNumber = function(calcNumber) {
    // console.log($target);
    $scope.calcInput = $scope.calcInput.concat(calcNumber);
  };

  // $scope.userNumber1 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(1);
  // };
  // $scope.userNumber2 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(2);
  // };
  // $scope.userNumber3 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(3);
  // };
  // $scope.userNumber4 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(4);
  // };
  // $scope.userNumber5 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(5);
  // };
  // $scope.userNumber6 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(6);
  // };
  // $scope.userNumber7 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(7);
  // };
  // $scope.userNumber8 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(8);
  // };
  // $scope.userNumber9 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(9);
  // };
  // $scope.userNumber0 = function() {
  //   $scope.calcInput = $scope.calcInput.concat(0);
  // };
  $scope.userNumberPlus = function() {
    $scope.userInputs.push($scope.calcInput);
    console.log($scope.userInputs);
    $scope.calcInput = '';
    console.log($scope.calcInput);
  };
  $scope.userNumberMinus = function() {
    $scope.userInputs.push($scope.calcInput);
    $scope.calcInput = '-';
    console.log($scope.userInputs);
  };
  $scope.userNumberEquals = function() {
    // add final item to array and then reduce
    $scope.userInputs.push($scope.calcInput);
    $scope.userInputs = $scope.userInputs.map(Number);
    var total = _.reduce($scope.userInputs, function(memo, num){return memo + num; },0);
    $scope.calcInput = total;
    $scope.userInputs = [];
  };

});