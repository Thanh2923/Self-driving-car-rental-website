const bookingService = require("../services/bookingService");

// Tạo booking mới
const createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(`userId ${userId}`);
    const data = req.body;
    console.log(req.body);
    console.log(data.car_id);
    const checkCarId = await bookingService.checkCarId(data.car_id);

    console.log(`${checkCarId}this is car_id `);
    if (!checkCarId) {
      return res.status(404).json({ message: "Car not found" });
    }
    // Tính số ngày thuê xe
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Chênh lệch ngày
    console.log(rentalDays);
    if (rentalDays <= 0) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }
    // get price car rental
    const price = await bookingService.getPriceCar(data.car_id);
    // console.log(price);
    // Tính tổng tiền thuê xe
    const totalPrice = rentalDays * price.price_per_day;
    console.log(totalPrice);
    console.log({
      ...data,
      user_id: userId,
      car_id: data.car_id,
      total_price: totalPrice
    });
    const bookingCar = {
      ...data,
      user_id: userId,
      car_id: data.car_id,
      total_price: totalPrice
    };
    console.log(`booking ${bookingCar}`);
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
    const userBooking = req.user.userId;
    const bookings = await bookingService.getAllBookings(userBooking);
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found . Please booking a car first" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy booking theo ID
const getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.userId;
    const booking = await bookingService.getBookingById(id, userId);
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
    console.log(id);
    const data = req.body;

    const userId = req.user.userId;

    console.log(`data ${data}`);
    console.log(`userId ${userId}`);
    console.log(data.start_date);
    console.log(data.end_date);

    let totalPrice = null;

    if (data.start_date && data.end_date) {
      // Tính số ngày thuê xe
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      console.log(startDate, endDate);
      const rentalDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      ); // Chênh lệch ngày
      console.log(rentalDays);
      if (rentalDays <= 0) {
        return res
          .status(400)
          .json({ message: "End date must be after start date" });
      }

      // get price by car_id ;
      const price = await bookingService.getPriceCar(data.car_id);
      console.log(price)
      // Tính tổng tiền thuê xe
      totalPrice = rentalDays * price.price_per_day;
      console.log(totalPrice)
    }
    const updateData = { ...data, user_id: userId, total_price: totalPrice };
    console.log(updateData)
    const updatedBooking = await bookingService.updateBooking(id, updateData);

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
