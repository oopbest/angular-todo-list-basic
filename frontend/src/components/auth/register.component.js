const angular = require('angular');

angular.module('todoApp').component('registerPage', {
  template: require('./register.html'),
  controller: function(AuthService, $state) {
    const $ctrl = this;

    $ctrl.$onInit = function() {
      $ctrl.user = {
        username: '',
        password: '',
        confirmPassword: ''
      };
      $ctrl.error = null;
      $ctrl.isLoading = false;
    };

    $ctrl.register = function() {
      if (!$ctrl.user.username || !$ctrl.user.password) return;
      
      // ตรวจสอบ Password กัับ Confirm Password ต้องตรงกัน
      if ($ctrl.user.password !== $ctrl.user.confirmPassword) {
        $ctrl.error = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
        return;
      }

      $ctrl.isLoading = true;
      $ctrl.error = null;

      const newUser = {
        username: $ctrl.user.username,
        password: $ctrl.user.password
      };

      AuthService.register(newUser)
        .then(function() {
          // สมัครสำเร็จ ให้เด้งไปหน้า Home ทันที (จะ Login อัตโนมัติจากฝั่ง Backend)
          $state.go('home');
        })
        .catch(function(err) {
          $ctrl.error = err.data?.error || 'สมัครสมาชิกไม่สำเร็จ โปรดลองอีกครั้ง';
        })
        .finally(function() {
          $ctrl.isLoading = false;
        });
    };
  }
});
