const Category = require('../models/category'); // Đường dẫn tới file model Category

const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

const getAllCategories = async (page = 1, limit = 5) => {
    // Tính toán số lượng mục cần bỏ qua
    const skip = (page - 1) * limit;

    // Lấy danh sách categories với phân trang
    const categories = await Category.find()
        .skip(skip)  // Bỏ qua các mục trước trang hiện tại
        .limit(limit) // Giới hạn số lượng mục trả về mỗi trang

    // Lấy tổng số lượng các category để tính tổng số trang
    const totalCategories = await Category.countDocuments();

    // Tính tổng số trang
    const totalPages = Math.ceil(totalCategories / limit);

    return {
        data:categories,
        totalCategories,
        totalPages,
        currentPage: page
    };
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
