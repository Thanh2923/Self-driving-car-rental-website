const Booking = require("../models/booking"); // Đường dẫn tới file model Booking
const Car = require("../models/car");
const createBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

const getAllBookings = async (userBooking) => {
  return await Booking.find({ user_id: userBooking })
    .populate("user_id", "name email") // Tham chiếu thông tin User
    .populate("car_id", "car_name category_id"); // Tham chiếu thông tin Car
};

const getBookingById = async (id, userId) => {
  return await Booking.findOne({ _id: id, user_id: userId })
    .populate("user_id", "name email")
    .populate("car_id", "car_name category_id");
};

const updateBooking = async (id, updateData) => {
  return await Booking.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

//
const checkCarId = async (carId) => {
  return await Car.findById({ _id: carId });
};

const getPriceCar = async (carId) => {
  const price_per_day = await Car.findOne({ _id: carId });
  return price_per_day;
};
// check booking from Owner
const findBooking = async (car_id) => {
  const find = await Booking.find({ car_id: car_id });
  return find;
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  checkCarId,
  getPriceCar,
  findBooking
};
