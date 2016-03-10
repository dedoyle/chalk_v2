'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:ExpenseService
 * @description
 * # ExpenseService
 */
angular.module('ChalkV2')
  .factory('ExpenseService', ExpenseService);

ExpenseService.$inject = ['$q', '$log', '_'];

function ExpenseService($q, $log, _) {
  var _db,
    _expenses = [];

  function initDB() {
    _db = new PouchDB('expense', {
      adapter: 'websql'
    });
  }

  function destroyexpense() {
    _db.destroy()
      .catch(function (err) {
        return $log.error(err);
      });
  }

  function addExpense(expense) {
    return $q.when(_db.post(expense));
  }

  function updateExpense(expense) {
    return $q.when(_db.put(expense));
  }

  function getExpense(id) {
    return $q.when(_db.get(id));
  }

  function deleteExpense(expense) {
    return $q.when(_db.remove(expense));
  }

  function getdoc(row) {
    return row.doc
  }

  function onDatabaseChange(change) {
    var expensesOneDay = _expenses[change.doc.day];
    var index = findIndex(expensesOneDay, change.id),
      expense = expensesOneDay[index];

    if (change.deleted) {
      if (expense) {
        // delete
        expensesOneDay.splice(index, 1);
      }
    } else {
      if (expense && expense._id === change.id) {
        // update
        expensesOneDay[index] = change.doc;
      } else {
        // insert
        expensesOneDay.splice(index, 0, change.doc);
      }
    }
  }

  function findIndex(arr, id) {
    var low = 0,
      high = arr.length,
      mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      arr[mid]._id < id ? low = mid + 1 : high = mid;
    }

    return low;
  }

  function getExpenseBy(time) {
    return $q.when(_db.search({
      query: time,
      fields: ['day'],
      include_docs: true
    })).then(function (docs) {
      _expenses[time] = _.map(docs.rows, getdoc);

      _db.changes({
          live: true,
          since: 'now',
          include_docs: true
        })
        .on('change', onDatabaseChange);

      return _expenses;
    }).catch(function (err) {
      $log.error(err);
    });
  }

  return {
    initDB: initDB,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
    getExpense: getExpense,
    getExpenseBy: getExpenseBy,
    destroyexpense: destroyexpense
  };
}
