'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:BudgetService
 * @description
 * # BudgetService
 */
angular.module('ChalkV2')
  .factory('BudgetService', BudgetService);

BudgetService.$inject = ['$q', '$rootScope', '$log'];

function BudgetService($q, $rootScope, $log) {
  var _db,
    _budget,
    defaultBudget = {
      _id: 'debudget',
      money: 3000,
      totalExpense: 0,
      regularDay: 1,
      remainingBudget: 3000
    };

  return {
    initDB: initDB,
    getBudget: getBudget,
    updateBudget: updateBudget,
    reduceBudgetBy: reduceBudgetBy,
    destroyBudget: destroyBudget
  };

  function initDB() {
    _db = new PouchDB('budget', {
      adapter: 'websql'
    });
    addBudget(defaultBudget);
  }

  function addBudget(budget) {
    return $q.when(_db.put(budget));
  }

  function getBudget() {
    return $q.when(_db.get(defaultBudget._id));
  }

  function updateBudget(budget) {
    budget.remainingBudget = budget.money - budget.totalExpense;

    return getBudget()
      .then(function (doc) {
        // rev 必须使用doc._rev而不是budget._rev
        return _db.put({
          _id: defaultBudget._id,
          _rev: doc._rev,
          money: budget.money,
          totalExpense: budget.totalExpense,
          regularDay: budget.regularDay,
          remainingBudget: budget.remainingBudget
        });
      }).then(function (response) {
        $rootScope.$emit('budget.updated');
      }).catch(function (err) {
        $log.error(err);
      });
  }

  function reduceBudgetBy(expense) {
    getBudget().then(function (budget) {
      budget.totalExpense -= expense;
      updateBudget(budget);
    });
  }

  function destroyBudget() {
    _db.destroy(function (err, response) {
      if (err) {
        return $log.log(err);
      }
    });
  }
}
