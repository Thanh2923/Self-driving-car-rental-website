const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes CRUD cho User
router.post('/', userController.createUser); // Tạo người dùng mới
router.get('/', userController.getAllUsers); // Lấy tất cả người dùng
router.get('/:id', userController.getUserById); // Lấy người dùng theo ID
router.put('/:id', userController.updateUser); // Cập nhật người dùng
router.delete('/:id', userController.deleteUser); // Xóa người dùng

module.exports = router;
