'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.filter:percentage
 * @description
 * # percentage
 */
angular.module('ChalkV2')
  .filter('percentage', percentage);

percentage.$inject = ['$filter'];

function percentage($filter) {
  return function (input) {
    return Math.floor(input * 100) + '%';
  };
}
