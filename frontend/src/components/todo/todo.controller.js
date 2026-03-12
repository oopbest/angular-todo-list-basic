// 📌 todo.controller.js - TodoController
const angular = require('angular');

// สร้าง Controller ชื่อ "TodoController" แบบดั้งเดิม
// โดยการ Inject `$scope` และ `TodoService` เข้ามาใช้งาน
angular.module('todoApp').controller('TodoController', function($scope, TodoService) {
  
  // ─── State (ข้อมูลของแอป) ─────────────────────────────────
  $scope.todos = [];
  $scope.newTodo = '';
  $scope.statusFilter = '';

  // โหลดข้อมูลจาก Backend
  function loadTodos() {
    TodoService.getTodos().then(function(data) {
      $scope.todos = data;
    });
  }

  // เรียกโหลดข้อมูลตอนที่เปิดหน้าขึ้นมา
  loadTodos();

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

  // ─── Methods (ฟังก์ชันการทำงาน API) ───────────────────────────

  // เพิ่ม Todo ใหม่
  $scope.addTodo = function() {
    const text = $scope.newTodo.trim();
    if (!text) return;

    TodoService.addTodo(text).then(function(savedTodo) {
      // เอาข้อมูลที่เซฟแล้ว (มี _id จาก MongoDB) มาใส่เป็นอันดับแรกใน list 
      $scope.todos.unshift(savedTodo); 
      $scope.newTodo = ''; // เคลียร์ input
    });
  };

  // อัปเดตเมื่อติ๊ก Checkbox
  $scope.updateTodo = function(todo) {
    TodoService.updateTodo(todo._id, todo.done, todo.text).catch(function() {
      // ถ้า API อัปเดตไม่สำเร็จ ให้ย้อนกลับค่าทาง UI
      todo.done = !todo.done;
    });
  };

  // ลบ 1 รายการ
  $scope.removeTodo = function(id) {
    TodoService.deleteTodo(id).then(function() {
      // ลบรายการที่มี `_id` ตรงกับที่ถูกลบออกจาก UI
      $scope.todos = $scope.todos.filter(function(todo) {
        return todo._id !== id;
      });
    });
  };

  /**
   * ลบ todo ที่ทำเสร็จแล้วทั้งหมด
   */
  $scope.clearDone = function() {
    TodoService.clearDone().then(function() {
      // โหลดข้อมูลใหม่ทั้งหมดมาโชว์เมื่อลบเสร็จ
      loadTodos();
    });
  };

  // ─── Utility Methods ──────────────────────────────────────

  // นับจำนวน todo ที่ยังไม่ได้ทำ
  $scope.remaining = function() {
    return $scope.todos.filter(function(todo) {
      return !todo.done;
    }).length;
  };

  // นับจำนวน todo ที่ทำแล้ว
  $scope.doneCount = function() {
    return $scope.todos.filter(function(todo) {
      return todo.done;
    }).length;
  };
});
