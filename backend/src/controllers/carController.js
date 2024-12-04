const carService = require('../services/carService');

// Tạo xe mới
const createCar = async (req, res) => {
    try {
        const data = req.body;
        const newCar = await carService.createCar(data);
        return res.status(201).json(newCar);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy danh sách tất cả xe
const getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin xe theo ID
const getCarById = async (req, res) => {
    try {
        const id = req.params.id;
        const car = await carService.getCarById(id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin xe
const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedCar = await carService.updateCar(id, data);
        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
        return res.status(200).json(updatedCar);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa xe
const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCar = await carService.deleteCar(id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
        return res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
};
