'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.controller:EditController
 * @description
 * # EditController
 */
angular.module('ChalkV2')
  .controller('EditController', EditController);

EditController.$inject = ['$state', '$stateParams', 'expense', 'action', '$ionicPopup', 'ExpenseService', 'BudgetService', 'TagService', 'AccountService', 'ShareDataService', 'RegularityService', '$ionicHistory', '$rootScope'];

function EditController($state, $stateParams, expense, action, $ionicPopup, ExpenseService, BudgetService, TagService, AccountService, ShareDataService, RegularityService, $ionicHistory, $rootScope) {
  var vm = this;

  vm.showkeyboard = true;
  vm.action = action;
  vm.tagList = TagService.getTagList();
  vm.accounts = AccountService.getAccounts();
  vm.regularExpenses = RegularityService.getRegularity();
  $rootScope.$on('description.changed', updateDescription);

  if ('1' === vm.action.isAdd) {
    vm.item = {
      money: '0',
      icon: 'ion-coffee',
      name: '早餐',
      description: '',
      account: '现金',
      regularExpense: '无',
      day: $stateParams.day,
      date: moment()
    };
  } else {
    vm.item = expense;
    vm.oldExpense = vm.item.money;
  }

  vm.select = select;

  vm.isSelected = isSelected;

  vm.goToDescription = goToDescription;

  vm.showAccounts = showAccounts;

  vm.showRegularExpense = showRegularExpense;

  vm.saveExpense = saveExpense;

  function updateDescription() {
    vm.item.description = ShareDataService.getDescription();
  }

  function select(tag) {
    vm.item.name = tag.name;
    vm.item.icon = tag.icon;
  }

  function isSelected(tag) {
    return vm.item.name === tag.name;
  }

  function goToDescription() {
    ShareDataService.setDescription(vm.item.description);
    $state.go('app.description', {
      expenseId: vm.item._id,
      action: '编辑',
      isAdd: '0'
    });
  }

  function showAccounts() {
    $ionicPopup.show({
      templateUrl: 'templates/accounts.html',
      title: '请选取账号',
      scope: $scope,
      buttons: [{
        text: '关闭',
        type: 'button-clear button-full'
      }]
    });
  }

  function showRegularExpense() {
    $ionicPopup.show({
      templateUrl: 'templates/regular-expense.html',
      title: '请选取自动输入的周期',
      scope: $scope,
      buttons: [{
        text: '关闭',
        type: 'button-clear button-full'
      }]
    });
  }

  function saveExpense() {
    if ('1' === vm.action.isAdd) {
      ExpenseService.addExpense(vm.item);
      BudgetService.reduceBudgetBy(-vm.item.money);
    } else {
      ExpenseService.updateExpense(vm.item);
      BudgetService.reduceBudgetBy(vm.oldExpense - vm.item.money);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
    }
    $state.go('app.expense');
  }
}
