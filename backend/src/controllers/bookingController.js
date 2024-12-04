const bookingService = require('../services/bookingService');

// Tạo booking mới
const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const newBooking = await bookingService.createBooking(data);
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy danh sách tất cả bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy booking theo ID
const getBookingById = async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await bookingService.getBookingById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật booking
const updateBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedBooking = await bookingService.updateBooking(id, data);
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        return res.status(200).json(updatedBooking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa booking
const deleteBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBooking = await bookingService.deleteBooking(id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};
