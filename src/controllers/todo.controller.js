// 📌 todo.controller.js - TodoController
const angular = require('angular');


// สร้าง Controller ชื่อ "TodoController" ให้กับ module "todoApp"
// ใช้ "controllerAs" syntax (vm = ViewModel) แทน $scope
angular.module('todoApp').controller('TodoController', function() {
  // 'this' ใน controllerAs ≡ $scope ใน classic syntax
  const vm = this;

  // ─── State (ข้อมูลของแอป) ─────────────────────────────────

  // รายการ todos เริ่มต้น (เอาไว้ให้เห็นตัวอย่าง)
  vm.todos = [
    { text: 'เรียนรู้ AngularJS 1.5.11', done: false },
    { text: 'เรียนรู้ Webpack', done: false },
    { text: 'เรียนรู้ LESS CSS', done: false },
  ];

  // ข้อความใน input field (two-way binding ด้วย ng-model)
  vm.newTodo = '';

  // ─── Methods (ฟังก์ชันการทำงาน) ───────────────────────────

  /**
   * เพิ่ม todo ใหม่เข้าไปใน list
   * เรียกจาก ng-submit="vm.addTodo()" ใน HTML
   */
  vm.addTodo = function() {
    const text = vm.newTodo.trim();
    if (!text) return; // ไม่เพิ่มถ้า input ว่างเปล่า

    vm.todos.push({ text: text, done: false });
    vm.newTodo = ''; // เคลียร์ input หลังเพิ่ม
  };

  /**
   * ลบ todo ที่ index ที่กำหนด
   * เรียกจาก ng-click="vm.removeTodo($index)" ใน HTML
   * @param {number} index - ตำแหน่งใน array
   */
  vm.removeTodo = function(index) {
    vm.todos.splice(index, 1);
  };

  /**
   * นับจำนวน todo ที่ยังไม่ได้ทำ
   * เรียกจาก {{ vm.remaining() }} ใน HTML
   * @returns {number}
   */
  vm.remaining = function() {
    return vm.todos.filter(function(todo) {
      return !todo.done;
    }).length;
  };

  /**
   * นับจำนวน todo ที่ทำแล้ว
   * @returns {number}
   */
  vm.doneCount = function() {
    return vm.todos.filter(function(todo) {
      return todo.done;
    }).length;
  };

  /**
   * ลบ todo ที่ทำเสร็จแล้วทั้งหมด
   * เรียกจาก ng-click="vm.clearDone()" ใน HTML
   */
  vm.clearDone = function() {
    vm.todos = vm.todos.filter(function(todo) {
      return !todo.done;
    });
  };
});
