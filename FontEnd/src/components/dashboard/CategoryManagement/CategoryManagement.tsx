"use client"
import { useState, useEffect } from 'react';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import CategoryTable from './CategoryTable';
import Pagination from '@/components/pagination/Pagination';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Số lượng trang

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    // Dữ liệu mẫu để kiểm tra giao diện
    const sampleCategories = [
      { _id: '1', category_name: 'Điện thoại' },
      { _id: '2', category_name: 'Máy tính' },
      { _id: '3', category_name: 'Máy ảnh' },
    ];
    setCategories(sampleCategories);
  }, []);

  // Hàm thêm mới danh mục
  const handleAddCategory = (categoryData) => {
    const newCategory = {
      ...categoryData, 
      _id: `${categories.length + 1}`, // Tạo ID giả cho danh mục mới
    };
    setCategories([...categories, newCategory]); // Thêm danh mục vào state
    setShowForm(false); // Ẩn form sau khi thêm
  };

  // Hàm xử lý cập nhật danh mục
  const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map((category) =>
      category._id === updatedCategory._id ? updatedCategory : category
    ));
    setShowForm(false); // Ẩn form sau khi cập nhật
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true); // Hiển thị form sửa
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category._id !== categoryId));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Quản lý Danh Mục</h1>

      {/* Nút thêm danh mục */}
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Danh Mục
        </button>
      </div>

      {/* Hiển thị form Thêm hoặc Sửa */}
      {showForm && (
        <div className="mb-6">
          {editingCategory ? (
            <EditCategoryForm category={editingCategory} onSubmit={handleUpdateCategory} onCancel={handleCancelForm} />
          ) : (
            <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Bảng hiển thị danh mục */}
      <div className="mb-6">
        <CategoryTable categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
      </div>
      <div className='pt-4'>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
    </div>
  );
};

export default CategoryManagement;
