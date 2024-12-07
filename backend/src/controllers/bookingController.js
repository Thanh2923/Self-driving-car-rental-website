const bookingService = require("../services/bookingService");

// Tạo booking mới
const createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;
    const carId = req.params.id;
    const checkCarId = await bookingService.checkCarId(carId);
    if (!checkCarId) {
      return res.status(404).json({ message: "Car not found" });
    }
    const checkBooking = await bookingService.checkBooking(userId, carId);
    if (checkBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this car" });
    }
    const bookingCar = { ...data, user_id: userId, car_id: carId };
    const booking = await bookingService.createBooking(bookingCar);
    if (!booking) {
      return res.status(400).json({ message: "Booking failed" });
    }
    return res.status(201).json(booking);
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
    if (!booking) return res.status(404).json({ message: "Booking not found" });
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
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });
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
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    return res.status(200).json({ message: "Booking deleted successfully" });
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
