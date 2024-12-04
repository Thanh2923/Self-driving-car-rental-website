const paymentService = require('../services/paymentService');

// Tạo thanh toán mới
const createPayment = async (req, res) => {
    try {
        const data = req.body;
        const newPayment = await paymentService.createPayment(data);
        return res.status(201).json(newPayment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả thanh toán
const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy thanh toán theo ID
const getPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await paymentService.getPaymentById(id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        return res.status(200).json(payment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật thanh toán
const updatePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedPayment = await paymentService.updatePayment(id, data);
        if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
        return res.status(200).json(updatedPayment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa thanh toán
const deletePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPayment = await paymentService.deletePayment(id);
        if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
        return res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
