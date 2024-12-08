const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const Middleware = require("../controllers/middleware");
const upload = require('../middleware/upload')
// Routes CRUD cho Car
router.post("/", Middleware.verifyToken, Middleware.verifyOwnerCar, upload.single('image'), carController.createCar); // Tạo xe mới
router.get(
  "/getListCar",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  carController.getAllCars
); // Lấy danh sách xe
router.get("/:id", carController.getCarById); // Lấy xe theo ID
router.patch("/:id", carController.updateCar); // Cập nhật xe
router.delete("/:id", carController.deleteCar); // Xóa xe

module.exports = router;
