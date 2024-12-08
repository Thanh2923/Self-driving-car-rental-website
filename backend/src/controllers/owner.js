const bookingService = require("../services/bookingService");
const Owner = {
  updateBooking: async (req, res) => {},
  getListBooking: async (req, res) => {
    try {
      const userId = req.user.userId;
       // get id owner
      const car_id  = req.params.id;
      console.log(car_id)
      // check how many user booking car_id
      const findBooking = await bookingService.findBooking(car_id);

      if (!findBooking || findBooking.length === 0) {
        return res.status(404).json({ message: "No booking found" });
      }

      res.status(200).json({ message : findBooking });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};
module.exports = Owner;
