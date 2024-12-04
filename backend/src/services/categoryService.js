const Category = require('../models/category'); // Đường dẫn tới file model Category

const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
