// 📌 about.controller.js - AboutController
// Controller สำหรับหน้า About
// ในกรณีนี้หน้า About เป็น static content จึงไม่มี logic มาก

const angular = require('angular');

angular.module('todoApp').controller('AboutController', function($scope) {
  // หน้า About ไม่ต้องมี logic พิเศษ
  // แต่เราสร้าง controller ไว้เผื่อต้องเพิ่มฟีเจอร์ในอนาคต
  $scope.version = '1.0.0';
});
