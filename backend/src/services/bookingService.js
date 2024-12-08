const Booking = require("../models/booking"); // Đường dẫn tới file model Booking

const createBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

const getAllBookings = async () => {
  return await Booking.find()
    .populate("user_id", "name email") // Tham chiếu thông tin User
    .populate("car_id", "car_name category_id"); // Tham chiếu thông tin Car
};

const getBookingById = async (id) => {
  return await Booking.findById(id)
    .populate("user_id", "name email")
    .populate("car_id", "car_name category_id");
};

const updateBooking = async (id, data) => {
  return await Booking.findByIdAndUpdate(id, data, { new: true });
};

const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

//
const checkCarId = async (carId) => {
  return await Car.findById(carId);
};

// checkBooking(userId, carId)
const checkBooking = async (userId, carId) => {
  const booking = await Booking.findOne({ user_id: userId, car_id: carId });
  return booking;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  checkBooking
};
