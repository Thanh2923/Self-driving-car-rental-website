const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');  // Đảm bảo import đúng router
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối với MongoDB
connectDB();

// Middleware xử lý JSON
app.use(express.json());
app.use(cors());
// Đảm bảo sử dụng router đúng cách
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
