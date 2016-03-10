'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.directive:debudget
 * @description
 * # debudget
 */
angular.module('ChalkV2')
  .directive('debudget', debudget);

function debudget() {
  var directive = {
    restrict: 'E',
    scope: {},
    templateUrl: 'templates/views/budget.html',
    replace: true,
    controller: BudgetController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

BudgetController.$inject = ['BudgetService', '$filter'];

function BudgetController(BudgetService, $filter) {
  var vm = this;

  BudgetService.getBudget().then(function (budget) {
    vm.budget = budget;
    vm.percentage = budget !== 0 ? (parseInt(budget.remainingBudget) / parseInt(budget.money)) : 0;
    vm.percentage = $filter('percentage')(vm.percentage);
  });

}
