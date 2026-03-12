// 📌 about.component.js
const angular = require('angular');

angular.module('todoApp').component('aboutPage', {
  template: require('./about.html'),
  controller: function() {
    const $ctrl = this;
    
    $ctrl.$onInit = function() {
      $ctrl.version = '1.0.0';
    };
  }
});
