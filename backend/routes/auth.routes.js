import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token หมดอายุใน 30 วัน
  });
};

// ==========================================
// 1. POST /api/auth/register - สมัครสมาชิค
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบว่ามีข้อมูลครบไหม
    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide username and password' });
    }

    // ตรวจสอบว่า Username มีคนใช้แล้วหรือยัง
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // สร้าง User ใหม่ (Password จะถูก Hash อัตโนมัติจาก pre-save hook ใน Model)
    const user = await User.create({
      username,
      password
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
});

// ==========================================
// 2. POST /api/auth/login - เข้าสู่ระบบ
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ค้นหา User
    const user = await User.findOne({ username });

    // ถ้าเจอ User และ รหัสผ่านตรงกัน (เปรียบเทียบ Hash)
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
