import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import auth from './middlewares/auth.js'; // Import Middleware ตรวจสอบ Token
import authRoutes from './routes/auth.routes.js'; // Import Auth Routes
import Todo from './models/Todo.js';

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

// 0. Auth Routes
app.use('/api/auth', authRoutes);

// --- ต่อจากนี้ต้องแนบ Token ทุกครั้งที่เรียก ---
app.use('/api/todos', auth);

// 1. GET /api/todos - ดึงข้อมูล Todos ทั้งหมด (เฉพาะของคนที่ Login)
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 }); // ดึงเฉพาะของ user คนนี้
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// 2. POST /api/todos - เพิ่ม Todo ใหม่ (บันทึกว่าใครเป็นคนเพื่ม)
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      done: false,
      user: req.user.id // ผูก Todo กับ ID คน Login
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// 3. PUT /api/todos/:id - อัปเดต Todo (เฉพาะของตัวเอง)
app.put('/api/todos/:id', async (req, res) => {
  try {
    // อัปเดตเมื่อ ID ตรงและ user เป็นเจ้าของเท่านั้น
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { done: req.body.done, text: req.body.text },
      { new: true } // ให้ดึงข้อมูลที่อัปเดตแล้วกลับมา
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo' });
  }
});

// 4. DELETE /api/todos/done - ลบรายการที่ทำเสร็จแล้ว (เฉพาะของตัวเอง)
app.delete('/api/todos/done', async (req, res) => {
  try {
    const result = await Todo.deleteMany({ user: req.user.id, done: true });
    res.json({ message: `Deleted ${result.deletedCount} completed todos.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete completed todos' });
  }
});

// 5. DELETE /api/todos/:id - ลบทิ้ง 1 รายการ (เฉพาะของตัวเอง)
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
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
