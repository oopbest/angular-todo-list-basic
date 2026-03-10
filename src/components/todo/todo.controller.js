// 📌 todo.controller.js - TodoController
const angular = require('angular');

// สร้าง Controller ชื่อ "TodoController" แบบดั้งเดิม
// โดยการ Inject `$scope` เข้ามาใช้งาน
angular.module('todoApp').controller('TodoController', function($scope) {
  
  // ─── State (ข้อมูลของแอป) ─────────────────────────────────

  // รายการ todos เริ่มต้น
  $scope.todos = [
    { text: 'เรียนรู้ AngularJS 1.5.11', done: false },
    { text: 'เรียนรู้ Webpack', done: false },
    { text: 'เรียนรู้ LESS CSS', done: false },
  ];

  // ข้อความใน input field (two-way binding ด้วย ng-model)
  $scope.newTodo = '';

  // สถานะการกรอง (Filter State)
  // '' = All, 'active' = ยังไม่ทำ, 'completed' = ทำแล้ว
  $scope.statusFilter = '';

  // ฟังก์ชันสำหรับเปลี่ยน Filter
  $scope.setFilter = function(filter) {
    $scope.statusFilter = filter;
  };

  // Custom filter function สำหรับ ng-repeat
  $scope.checkFilter = function(todo) {
    if ($scope.statusFilter === 'active') return !todo.done;
    if ($scope.statusFilter === 'completed') return todo.done;
    return true; // All
  };

  // ─── Methods (ฟังก์ชันการทำงาน) ───────────────────────────

  /**
   * เพิ่ม todo ใหม่เข้าไปใน list
   * เรียกจาก ng-submit="addTodo()" ใน HTML
   */
  $scope.addTodo = function() {
    const text = $scope.newTodo.trim();
    if (!text) return;

    $scope.todos.push({ text: text, done: false });
    $scope.newTodo = ''; // เคลียร์ input
  };

  /**
   * ลบ todo ที่ index ที่กำหนด
   * เรียกจาก ng-click="removeTodo($index)" ใน HTML
   */
  $scope.removeTodo = function(index) {
    $scope.todos.splice(index, 1);
  };

  /**
   * นับจำนวน todo ที่ยังไม่ได้ทำ
   */
  $scope.remaining = function() {
    return $scope.todos.filter(function(todo) {
      return !todo.done;
    }).length;
  };

  /**
   * นับจำนวน todo ที่ทำแล้ว
   */
  $scope.doneCount = function() {
    return $scope.todos.filter(function(todo) {
      return todo.done;
    }).length;
  };

  /**
   * ลบ todo ที่ทำเสร็จแล้วทั้งหมด
   */
  $scope.clearDone = function() {
    $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.done;
    });
  };
});
