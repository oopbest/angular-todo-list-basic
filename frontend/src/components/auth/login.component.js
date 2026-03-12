const angular = require('angular');

angular.module('todoApp').component('loginPage', {
  template: require('./login.html'),
  controller: function(AuthService, $state) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
      $ctrl.user = {
        username: '',
        password: ''
      };
      $ctrl.error = null;
      $ctrl.isLoading = false;
    };

    $ctrl.login = function() {
      if (!$ctrl.user.username || !$ctrl.user.password) return;
      
      $ctrl.isLoading = true;
      $ctrl.error = null;

      AuthService.login($ctrl.user)
        .then(function() {
          // Login สำเร็จให้เด้งกลับไปหน้า Home
          $state.go('home');
        })
        .catch(function(err) {
          $ctrl.error = err.data?.error || 'เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง';
        })
        .finally(function() {
          $ctrl.isLoading = false;
        });
    };
  }
});
