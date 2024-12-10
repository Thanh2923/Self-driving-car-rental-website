const carService = require("../services/carService");

// Tạo xe mới
const createCar = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;

    const getOwnerId = await carService.getOwnerId(userId);
    if (!getOwnerId) {
      return res.status(400).json({ message: "Owner not found !" });
    }
    const ownerId = getOwnerId._id;
    console.log(ownerId);
    const getIdCategory = await carService.getIdCategory(req.body.category_id);
    if (!getIdCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    const categoryId = getIdCategory._id;
    const carData = { ...data, category_id: categoryId, owner_id: ownerId };
    const newCar = await carService.createCar(carData);
    if (!newCar) {
      return res.status(400).json({ message: "Failed to create car" });
    }
    return res.status(201).json(newCar);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách car của chủ xe
const getAllCars = async (req, res) => {
  try {
    // user see list car
    const userId = req.user.userId;
    console.log(userId);
    const getOwnerId = await carService.getOwnerId(userId);
    const ownerId = getOwnerId._id;
    console.log(ownerId);
    const cars = await carService.getAllCars(ownerId);
    console.log(cars);
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No car found" });
    }
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin xe theo ID
const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === null || id === undefined) {
      return res.status(400).json({ message: "ID is required" });
    }

    const car = await carService.getCarById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin xe
const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (id === null || id === undefined) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedCar = await carService.updateCar(id, data);
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
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
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// lấy tất cả car của tất cả chử ve
const carAll = async (req, res) => {
  try {
    const getAll = await carService.getAll();
    console.log(getAll);
    return res
      .status(200)
      .json({ message: "Get all car successfully", getAll });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  carAll
};
