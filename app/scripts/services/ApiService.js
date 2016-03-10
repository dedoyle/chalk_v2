'use strict';

/**
 * @ngdoc service
 * @name ChalkV2.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('ChalkV2')
  .factory('ApiService', ApiService);

ApiService.$inject = ['$window', '$http', 'API_ENDPOINT'];

function ApiService($window, $http, API_ENDPOINT) {

  var _api = API_ENDPOINT;
  var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);

  // activate for basic auth
  if (_api.needsAuth) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
  }

  // public api
  return {
    getEndpoint: function () {
      return endpoint;
    }
  };

}
