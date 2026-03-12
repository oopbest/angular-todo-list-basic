// 📌 routes.js - Route Configuration (State-based Routing)
//
// UI-Router ใช้ "State" ในการจัดการ route แทนที่จะใช้ URL โดยตรง
// ข้อดีคือ:
//   - แต่ละ state มี controller + template ของตัวเอง
//   - สามารถมี nested states (state ซ้อน state) ได้
//   - ยืดหยุ่นกว่า ngRoute ของ AngularJS ดั้งเดิม
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
    .state('login', {
      url: '/login',
      template: '<login-page></login-page>',
      resolve: {
        skipIfLoggedIn: function($q, $timeout, AuthService, $state) {
          if (AuthService.isLoggedIn()) {
            $timeout(function() { $state.go('home'); });
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('register', {
      url: '/register',
      template: '<register-page></register-page>',
      resolve: {
        skipIfLoggedIn: function($q, $timeout, AuthService, $state) {
          if (AuthService.isLoggedIn()) {
            $timeout(function() { $state.go('home'); });
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
    })
    .state('home', {
      url: '/',
      template: '<todo-app></todo-app>',
      resolve: {
        // รอเช็คก่อนว่าล็อกอินไหม ถ้าไม่ ให้เด้งไปหน้า login
        requireLogin: function($q, $timeout, AuthService, $state) {
          if (!AuthService.isLoggedIn()) {
            $timeout(function() { $state.go('login'); });
            return $q.reject();
          } else {
            return $q.resolve();
          }
        }
      }
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
