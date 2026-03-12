require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // อนุญาตให้ Frontend (Port 9000) เรียก API เข้ามาได้
app.use(express.json()); // ให้ Express อ่านข้อมูล JSON จาก request body ได้

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// ==========================================
// API Routes
// ==========================================

// 1. GET /api/todos - ดึงข้อมูล Todos ทั้งหมด
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // เรียงล่าสุดขึ้นก่อน
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// 2. POST /api/todos - เพิ่ม Todo ใหม่
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      done: false
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// 3. PUT /api/todos/:id - อัปเดต Todo (เช่น tick checkbox)
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id, 
      { done: req.body.done, text: req.body.text },
      { new: true } // ให้ดึงข้อมูลที่อัปเดตแล้วกลับมา
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo' });
  }
});

// 4. DELETE /api/todos/done - ลบรายการที่ทำเสร็จแล้ว
app.delete('/api/todos/done', async (req, res) => {
  try {
    const result = await Todo.deleteMany({ done: true });
    res.json({ message: `Deleted ${result.deletedCount} completed todos.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete completed todos' });
  }
});

// 5. DELETE /api/todos/:id - ลบทิ้ง 1 รายการ
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
