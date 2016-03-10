'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:RegularityService
 * @description
 * # RegularityService
 */
angular.module('ChalkV2')
  .factory('RegularityService', RegularityService);

function RegularityService() {
  var regularExpenses = {};

  regularExpenses.getRegularity = function () {
    return ['无', '每日', '每周', '每月'];
  };

  return regularExpenses;
}
