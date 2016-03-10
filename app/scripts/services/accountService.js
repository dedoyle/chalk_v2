'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:AccountService
 * @description
 * # AccountService
 */
angular.module('ChalkV2')
  .factory('AccountService', AccountService);

function AccountService() {
  var account = {};

  account.getAccounts = function () {
    return ['现金', '银行卡'];
  };

  return account;
}
