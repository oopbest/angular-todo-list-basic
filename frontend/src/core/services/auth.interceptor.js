const angular = require('angular');

angular.module('todoApp').factory('AuthInterceptor', function($window, $q, $injector) {
  return {
    // 1. ดักจับทุกๆ Request ขาออก
    request: function(config) {
      const token = $window.localStorage.getItem('jwt-token');
      // ถ้ามี Token อยู่ ให้ยัดใส่ Header Authorization ไปด้วย
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    // 2. ดักจับทุกๆ Response Error ขากลับ
    responseError: function(rejection) {
      // ถ้าโดนเตะกลับมาเพราะ Token หมดอายุ หรือไม่มีสิทธิ์ (401)
      if (rejection.status === 401) {
        // ใช้ $injector เพื่อหลีกเลี่ยง Circular Dependency เรื่อง $state
        const $state = $injector.get('$state');
        const AuthService = $injector.get('AuthService');
        
        AuthService.logout(); // เคลียร์ Token ทิ้ง
        $state.go('login'); // เด้งไปหน้า Login
      }
      return $q.reject(rejection);
    }
  };
});
