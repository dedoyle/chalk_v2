'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.util:lodash
 * @description
 * # Lo-Dash
 * Expose Lo-Dash through injectable factory, so we don't pollute / rely on global namespace
 * just inject lodash as _
 */

angular.module('ChalkV2')
  .factory('_', function($window) {
    return $window._;
  });
