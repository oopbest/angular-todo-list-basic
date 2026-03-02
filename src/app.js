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

// 2️⃣ โหลด LESS styles
//    Webpack จะใช้ less-loader → css-loader → style-loader
//    แปลง LESS → CSS → inject เข้า <style> tag ใน browser อัตโนมัติ
require('./styles/app.less');

// 3️⃣ สร้าง Angular Module ชื่อ "todoApp"
//    ⚠️ ต้องสร้างก่อน require controller เสมอ!
//    เพราะ controller จะเรียก angular.module('todoApp').controller(...)
//    ถ้า module ยังไม่มีจะ error: "Module 'todoApp' is not available!"
//    - 'todoApp' ต้องตรงกับ ng-app="todoApp" ใน index.html
//    - [] คือรายชื่อ dependencies ของ module (sub-modules)
const app = angular.module('todoApp', []);

// 4️⃣ โหลด Controller (หลังสร้าง module แล้วเท่านั้น!)
require('./controllers/todo.controller.js');

// Export สำหรับใช้ใน files อื่น
module.exports = app;

