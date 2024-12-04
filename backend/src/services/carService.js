const Car = require('../models/car'); // Đường dẫn tới file model Car

const createCar = async (data) => {
    const car = new Car(data);
    return await car.save();
};

const getAllCars = async () => {
    return await Car.find()
        .populate('category_id', 'category_name'); // Tham chiếu thông tin Category
};

const getCarById = async (id) => {
    return await Car.findById(id)
        .populate('category_id', 'category_name'); // Tham chiếu thông tin Category
};

const updateCar = async (id, data) => {
    return await Car.findByIdAndUpdate(id, data, { new: true });
};

const deleteCar = async (id) => {
    return await Car.findByIdAndDelete(id);
};

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
};
