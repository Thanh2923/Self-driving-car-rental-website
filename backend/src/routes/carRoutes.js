const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Routes CRUD cho Car
router.post('/', carController.createCar); // Tạo xe mới
router.get('/', carController.getAllCars); // Lấy danh sách xe
router.get('/:id', carController.getCarById); // Lấy xe theo ID
router.put('/:id', carController.updateCar); // Cập nhật xe
router.delete('/:id', carController.deleteCar); // Xóa xe

module.exports = router;
