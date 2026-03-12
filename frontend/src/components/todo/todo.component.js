// 📌 todo.component.js - TodoComponent
const angular = require('angular');

angular.module('todoApp').component('todoApp', {
  template: require('./todo.html'),
  controller: function(TodoService) {
    const $ctrl = this;
    
    // ─── State (ข้อมูลของแอป) ─────────────────────────────────
    $ctrl.$onInit = function() {
      $ctrl.todos = [];
      $ctrl.newTodo = '';
      $ctrl.statusFilter = '';
      $ctrl.isLoading = true;
      $ctrl.isSaving = false;
      $ctrl.error = null;
      loadTodos();
    };

    // โหลดข้อมูลจาก Backend
    function loadTodos() {
      $ctrl.isLoading = true;
      $ctrl.error = null;
      TodoService.getTodos().then(function(data) {
        $ctrl.todos = data;
      }).catch(function(err) {
        $ctrl.error = 'ไม่สามารถโหลดข้อมูลจากเซิร์ฟเวอร์ได้';
      }).finally(function() {
        $ctrl.isLoading = false;
      });
    }

    // ฟังก์ชันสำหรับเปลี่ยน Filter
    $ctrl.setFilter = function(filter) {
      $ctrl.statusFilter = filter;
    };

    // Custom filter function สำหรับ ng-repeat
    $ctrl.checkFilter = function(todo) {
      if ($ctrl.statusFilter === 'active') return !todo.done;
      if ($ctrl.statusFilter === 'completed') return todo.done;
      return true; // All
    };

    // ─── Methods (ฟังก์ชันการทำงาน API) ───────────────────────────

    // เพิ่ม Todo ใหม่
    $ctrl.addTodo = function() {
      const text = $ctrl.newTodo.trim();
      if (!text || $ctrl.isSaving) return;

      $ctrl.isSaving = true;
      $ctrl.error = null;

      TodoService.addTodo(text).then(function(savedTodo) {
        $ctrl.todos.unshift(savedTodo); 
        $ctrl.newTodo = ''; // เคลียร์ input
      }).catch(function() {
        $ctrl.error = 'ไม่สามารถเพิ่มรายการได้ โปรดลองอีกครั้ง';
      }).finally(function() {
        $ctrl.isSaving = false;
      });
    };

    // อัปเดตเมื่อติ๊ก Checkbox
    $ctrl.updateTodo = function(todo) {
      $ctrl.error = null;
      TodoService.updateTodo(todo._id, todo.done, todo.text).catch(function() {
        todo.done = !todo.done;
        $ctrl.error = 'ไม่สามารถอัปเดตสถานะได้';
      });
    };

    // ลบ 1 รายการ
    $ctrl.removeTodo = function(id) {
      $ctrl.error = null;
      TodoService.deleteTodo(id).then(function() {
        $ctrl.todos = $ctrl.todos.filter(function(todo) {
          return todo._id !== id;
        });
      }).catch(function() {
        $ctrl.error = 'ไม่สามารถลบรายการได้';
      });
    };

    $ctrl.clearDone = function() {
      $ctrl.error = null;
      TodoService.clearDone().then(function() {
        loadTodos();
      }).catch(function() {
        $ctrl.error = 'ไม่สามารถลบรายการที่ทำเสร็จแล้วได้';
      });
    };

    // ─── Utility Methods ──────────────────────────────────────

    $ctrl.remaining = function() {
      return $ctrl.todos.filter(function(todo) {
        return !todo.done;
      }).length;
    };

    $ctrl.doneCount = function() {
      return $ctrl.todos.filter(function(todo) {
        return todo.done;
      }).length;
    };
  }
});
