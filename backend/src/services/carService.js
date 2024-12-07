const Car = require("../models/car"); // Đường dẫn tới file model Car
const CarOwnerRequest = require("../models/carOwnerRequest");
const Category = require("../models/category");
const createCar = async (data) => {
  const car = new Car(data);
  return await car.save();
};

const getAllCars = async (ownerId) => {
  return await Car.find({ owner_id: ownerId });
};

const getCarById = async (id) => {
  return await Car.findById(id)
};

const updateCar = async (id, data) => {
  return await Car.findByIdAndUpdate(id, data, { new: true });
};

const deleteCar = async (id) => {
  return await Car.findByIdAndDelete(id);
};

const getOwnerId = async (userId) => {
  return await CarOwnerRequest.findOne({ user_id: userId });
};

const getIdCategory = async (chooseCategory) => {
  return await Category.findOne({ category_name: chooseCategory });
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getOwnerId,
  getIdCategory
};
