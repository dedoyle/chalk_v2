'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.filter:sumOfItems
 * @description
 * # sumOfItems
 */
angular.module('ChalkV2')

.filter('sumOfItems', sumOfItems);

function sumOfItems() {
  return function (data, key) {
    if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
      return 0;
    }

    var sum = 0,
      i = data.length - 1;
    for (; i >= 0; i--) {
      sum += parseFloat(data[i][key]);
    }

    return sum;
  };
}
