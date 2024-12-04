const Payment = require('../models/payment'); // Đường dẫn tới file model Payment

const createPayment = async (data) => {
    const payment = new Payment(data);
    return await payment.save();
};

const getAllPayments = async () => {
    return await Payment.find();
};

const getPaymentById = async (id) => {
    return await Payment.findById(id);
};

const updatePayment = async (id, data) => {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
};

const deletePayment = async (id) => {
    return await Payment.findByIdAndDelete(id);
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
