'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.directive:keyboardDirective
 * @description
 * # keyboardDirective
 */
angular.module('ChalkV2')
  .directive('dekeyboard', dekeyboard);

function dekeyboard() {
  var directive = {
    restrict: 'EA',
    scope: {
      onlynumber: '@',
      calculation: '=',
      showkeyboard: '='
    },
    templateUrl: 'templates/views/keyboard.html',
    replace: true,
    controller: KeyboardController,
    controllerAs: 'kd',
    bindToController: true
  };

  return directive;
}

KeyboardController.$inject = ['$scope'];

function KeyboardController($scope) {
  var vm = this;
  // input有两种情况：
  // 1. num
  // 2. num [+-*/] num
  vm.input = isCalculationZero() ? '' : vm.calculation;
  vm.isLastInputNum = true;
  // isExpression 表示input为第二种情况，是一个式子
  vm.isExpression = false;

  vm.write = write;

  vm.compute = compute;

  vm.reset = reset;

  vm.hideKeyboard = hideKeyboard;

  function compute() {
    var result = 0;
    // 将数字转为字符串
    vm.input += '';
    // 去除末尾运算符，如：'1+'
    vm.input = vm.input.replace(/[\+\-\*\/]$/, '');
    result = vm.$eval(vm.input);
    //精确到小数点后两位
    vm.calculation = Math.round(result * 100) / 100;
    vm.input = vm.calculation;
    vm.isExpression = false;
  }

  function isNum(c) {
    return /[0-9.]/.test(c);
  }

  function isCalculationZero() {
    return 0 === vm.calculation || '0' === vm.calculation;
  }

  function isOperator(c) {
    return /[\+\-\*\/]/.test(c);
  }

  function write(c) {
    if (isNum(c)) {
      if (isCalculationZero() || !vm.isLastInputNum) {
        vm.calculation = '';
      }
      vm.calculation += c;
      vm.input += c;
      vm.isLastInputNum = true;
    } else if (isOperator(c)) {
      // 当当前操作数是0时直接跳过
      if (isCalculationZero()) return;

      if (vm.isLastInputNum) {
        compute();
        vm.input += c;
      } else {
        vm.input = vm.input.replace(/[\+\-\*\/]$/, c);
      }
      vm.isExpression = true;
      vm.isLastInputNum = false;
    }
  }

  function reset() {
    vm.input = '';
    vm.isLastInputNum = true;
    vm.isExpression = false;
    vm.calculation = '0';
  }

  function hideKeyboard() {
    vm.showkeyboard = false;
  }
}
