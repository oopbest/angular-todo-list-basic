// 📌 settings.controller.js - SettingsController
// Controller สำหรับหน้า Settings
// ใช้สาธิตการใช้ ng-model กับ input, select, และ buttons

const angular = require('angular');

angular.module('todoApp').controller('SettingsController', function($scope) {

  // ─── State ─────────────────────────────────
  $scope.username = '';
  $scope.defaultCount = '3';
  $scope.theme = 'purple';

  // ─── Methods ───────────────────────────────

  /**
   * เปลี่ยนธีมสี
   * เรียกจาก ng-click="setTheme('blue')" ใน HTML
   */
  $scope.setTheme = function(theme) {
    $scope.theme = theme;
  };
});
