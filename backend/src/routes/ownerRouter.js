const express = require("express");
const router = express.Router();
const Owner = require("../controllers/owner");
const Middleware = require("../controllers/middleware");
router.get(
  "/listBooking/:id",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  Owner.getListBooking
);
module.exports = router;
