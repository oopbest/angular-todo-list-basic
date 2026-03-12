// 📌 settings.component.js
const angular = require('angular');

angular.module('todoApp').component('settingsPage', {
  template: require('./settings.html'),
  controller: function() {
    const $ctrl = this;

    $ctrl.$onInit = function() {
      $ctrl.username = '';
      $ctrl.defaultCount = '3';
      $ctrl.theme = 'purple';
    };

    $ctrl.setTheme = function(theme) {
      $ctrl.theme = theme;
    };
  }
});
