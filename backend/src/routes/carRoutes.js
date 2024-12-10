const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const Middleware = require("../controllers/middleware");
// Routes CRUD cho Car
router.get("/getAllCars", carController.carAll);
router.post(
  "/",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  carController.createCar
); // Tạo xe mới
router.get(
  "/getListCar",
  Middleware.verifyToken,
  Middleware.verifyOwnerCar,
  carController.getAllCars
); // Lấy danh sách xe
router.get("/getCarById/:id", carController.getCarById); // Lấy xe theo ID
router.patch("/:id", carController.updateCar); // Cập nhật xe
router.delete("/:id", carController.deleteCar); // Xóa xe

module.exports = router;
