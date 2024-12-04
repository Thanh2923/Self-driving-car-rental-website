const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes CRUD cho Payment
router.post('/', paymentController.createPayment); // Tạo thanh toán mới
router.get('/', paymentController.getAllPayments); // Lấy tất cả thanh toán
router.get('/:id', paymentController.getPaymentById); // Lấy thanh toán theo ID
router.put('/:id', paymentController.updatePayment); // Cập nhật thanh toán
router.delete('/:id', paymentController.deletePayment); // Xóa thanh toán

module.exports = router;
