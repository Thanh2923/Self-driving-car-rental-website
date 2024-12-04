const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes CRUD cho Event
router.post('/', eventController.createEvent); // Tạo sự kiện mới
router.get('/', eventController.getAllEvents); // Lấy tất cả sự kiện
router.get('/:id', eventController.getEventById); // Lấy sự kiện theo ID
router.put('/:id', eventController.updateEvent); // Cập nhật sự kiện
router.delete('/:id', eventController.deleteEvent); // Xóa sự kiện

module.exports = router;
