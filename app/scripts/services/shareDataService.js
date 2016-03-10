'use strict';

/**
 * @ngdoc function
 * @name ChalkV2.service:ShareDataService
 * @description
 * # ShareDataService
 */
angular.module('ChalkV2')
  .factory('ShareDataService', ShareDataService);

ShareDataService.$inject = ['$rootScope'];

function ShareDataService($rootScope) {
  var share = {
    description: ''
  };

  return {
    getDescription: getDescription,
    setDescription: setDescription
  };

  function getDescription() {
    return share.description;
  }

  function setDescription(desc) {
    share.description = desc;
    $rootScope.$emit('description.changed');
  }
}
