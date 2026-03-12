const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. รับ Token จาก Header: Authorization: Bearer <token>
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. ยืนยัน Token (ถ้าถูกต้อง จะได้ข้อมูล id คืนมา)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_123');
    req.user = decoded; // ยัดข้อมูล user ลงไปใน req ให้ API อื่นใช้ต่อ
    next(); // ผ่านด่าน ไปทำ API ต่อไปได้
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
