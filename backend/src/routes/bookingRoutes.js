const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes CRUD cho Booking

router.post('/', bookingController.createBooking); // Tạo booking
router.get('/', bookingController.getAllBookings); // Lấy tất cả bookings
router.get('/:id', bookingController.getBookingById); // Lấy booking theo ID
router.put('/:id', bookingController.updateBooking); // Cập nhật booking
router.delete('/:id', bookingController.deleteBooking); // Xóa booking

module.exports = router;
