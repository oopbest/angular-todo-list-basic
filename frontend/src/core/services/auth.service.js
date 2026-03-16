const angular = require('angular');
const { buildApiUrl } = require('../../config/api');

angular.module('todoApp').factory('AuthService', function($http, $window, $state) {
  const API_URL = buildApiUrl('/auth');
  
  const authService = {};

  authService.saveToken = function(token, username) {
    $window.localStorage.setItem('jwt-token', token);
    $window.localStorage.setItem('username', username);
  };

  authService.getToken = function() {
    return $window.localStorage.getItem('jwt-token');
  };

  authService.getUsername = function() {
    return $window.localStorage.getItem('username');
  };

  authService.isLoggedIn = function() {
    const token = authService.getToken();
    return !!token;
  };

  authService.register = function(user) {
    return $http.post(`${API_URL}/register`, user).then(function(res) {
      authService.saveToken(res.data.token, res.data.username);
      return res.data;
    });
  };

  authService.login = function(user) {
    return $http.post(`${API_URL}/login`, user).then(function(res) {
      authService.saveToken(res.data.token, res.data.username);
      return res.data;
    });
  };

  authService.logout = function() {
    $window.localStorage.removeItem('jwt-token');
    $window.localStorage.removeItem('username');
    $state.go('login');
  };

  return authService;
});
