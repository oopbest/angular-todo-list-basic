// 📌 routes.js - Route Configuration (State-based Routing)
//
// UI-Router ใช้ "State" ในการจัดการ route แทนที่จะใช้ URL โดยตรง
// ข้อดีคือ:
//   - แต่ละ state มี controller + template ของตัวเอง
//   - สามารถมี nested states (state ซ้อน state) ได้
//   - ยืดหยุ่นกว่า ngRoute ของ AngularJS ดั้งเดิม
//
// วิธีการ:
//   1. Inject $stateProvider (กำหนด states) และ $urlRouterProvider (กำหนด default URL)
//   2. ใช้ $stateProvider.state('ชื่อ', { config }) เพื่อกำหนดแต่ละ route
//   3. ใช้ require() เพื่อโหลด HTML template ผ่าน html-loader ของ Webpack

const angular = require('angular');

angular.module('todoApp').config(function($stateProvider, $urlRouterProvider) {

  // 🔹 Default route - ถ้า URL ไม่ตรงกับ state ไหนเลย ให้กลับไปหน้า Home
  $urlRouterProvider.otherwise('/');

  // กำหนด States (หน้าต่างๆ)
  $stateProvider
    .state('home', {
      url: '/',
      template: '<todo-app></todo-app>'
    })
    .state('about', {
      url: '/about',
      template: '<about-page></about-page>'
    })
    .state('settings', {
      url: '/settings',
      template: '<settings-page></settings-page>'
    });
});
