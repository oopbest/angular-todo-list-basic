// 📌 app.js - Entry Point ของ AngularJS Application
//
// ไฟล์นี้เป็นจุดเริ่มต้นที่ Webpack จะอ่านก่อน
// เราจะ require() ทุกอย่างที่แอพต้องการจากที่นี่
//
// ⚠️ ทำไมใช้ require() แทน import?
//    ES6 `import` statements ถูก "hoisted" โดย Webpack/JS engine
//    หมายความว่า import ทั้งหมดจะถูก resolve ก่อนที่โค้ดบรรทัดใดจะรัน
//    ทำให้เราไม่สามารถควบคุม execution order ได้
//    แต่ require() เป็น synchronous function ที่รันตามลำดับที่เขียนไว้จริงๆ

// 1️⃣ โหลด AngularJS ก่อนเป็นอันดับแรก
const angular = require('angular');

// 2️⃣ โหลด UI-Router สำหรับระบบ Routing
//    angular-ui-router จะลงทะเบียน module ชื่อ 'ui.router' ให้อัตโนมัติ
require('angular-ui-router');

// 3️⃣ โหลด LESS styles
require('./styles/app.less');

// 4️⃣ สร้าง Angular Module ชื่อ "todoApp"
//    ⚠️ เพิ่ม 'ui.router' เป็น dependency ของ module
//    เพื่อให้ใช้งาน $stateProvider, ui-view, ui-sref ได้
const app = angular.module('todoApp', ['ui.router']);

// 5️⃣ โหลด Route Config (ต้องมาก่อน Controllers เพราะกำหนด states)
require('./config/routes.js');

// 6️⃣ โหลด Controllers ทั้งหมด (จัดเป็น component-based structure)
require('./components/todo/todo.controller.js');
require('./components/about/about.controller.js');
require('./components/settings/settings.controller.js');

// Export สำหรับใช้ใน files อื่น
module.exports = app;

