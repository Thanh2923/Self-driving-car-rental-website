const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');  // Đảm bảo require đúng controller

// Đảm bảo bạn truyền vào đúng hàm callback hoặc middleware
router.get('/', UserController.getAllUsers);  // Hàm getAllUsers phải là một function hợp lệ

module.exports = router;  // Export router
