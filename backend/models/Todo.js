const mongoose = require('mongoose');

// กำหนด Schema หรือโครงสร้างข้อมูลของ Todo
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true // ให้ MongoDB สร้าง createdAt และ updatedAt ให้อัตโนมัติ
});

// สร้าง Model จาก Schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
