'use strict';

/**
 * @ngdoc overview
 * @name ChalkV2
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('ChalkV2', ['ionic', 'ngCordova', 'ngResource', 'once'])

.run(appRun)

.config(appConfig);

appRun.$inject = ['$ionicPlatform', 'ExpenseService', 'BudgetService'];

function appRun($ionicPlatform, ExpenseService, BudgetService) {

  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  ExpenseService.initDB();
  BudgetService.initDB();
}

appConfig.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

function appConfig($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // register $http interceptors, if any. e.g.
  // $httpProvider.interceptors.push('interceptor-name');

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .state('app.expense', {
      url: '/expense',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/expense.html',
          controller: 'ExpenseController as expense',
          resolve: {
            defaultItemsService: defaultItemsService
          }
        }
      }
    })
    .state('app.add-or-edit', {
      url: '/add-or-edit/:action/:isAdd/:day/:expenseId',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/add-or-edit.html',
          controller: 'EditController as edit',
          resolve: {
            action: action,
            expense: expense
          }
        }
      }
    })
    .state('app.detail', {
      url: '/detail/:expenseId/:rev/:day',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/detail.html',
          controller: 'DetailController as detail',
          resolve: {
            expense: expense
          }
        }
      }
    })
    .state('app.description', {
      url: '/description/:action/:isAdd/:expenseId',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/description.html',
          controller: 'DescriptionController as desc',
          resolve: {
            action: action,
            expense: expense
          }
        }
      }
    })
    .state('app.revenue', {
      url: '/revenue',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/revenue.html',
          controller: 'RevenueController as revenue'
        }
      }
    })
    .state('app.statistics', {
      url: '/statistics',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/statistics.html'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/settings.html',
          controller: 'SettingsController as settings'
        }
      }
    })
    .state('app.set-budget', {
      url: '/set-budget',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/set-budget.html',
          controller: 'SetBudgetController as setbudget'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/expense');
  $ionicConfigProvider.navBar.alignTitle('left');
  $ionicConfigProvider.backButton.text('').previousTitleText(false);
}

defaultItemsService.$inject = ['ExpenseService'];

function defaultItemsService(ExpenseService) {
  var today = moment().format('YYYY-MM-DD'),
    yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  return ExpenseService.getExpenseBy(today).then(function () {
    return ExpenseService.getExpenseBy(yesterday);
  });
}

expense.$inject = ['$stateParams', 'ExpenseService'];

function expense($stateParams, ExpenseService) {
  if ('' === $stateParams.expenseId) return;
  return ExpenseService.getExpense($stateParams.expenseId);
}

action.$inject = ['$stateParams'];

function action($stateParams) {
  return {
    name: $stateParams.action,
    isAdd: $stateParams.isAdd
  };
}
