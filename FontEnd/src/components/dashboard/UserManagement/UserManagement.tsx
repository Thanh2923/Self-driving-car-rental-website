"use client"
import { useState, useEffect } from 'react';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserTable from './UserTable';
import Pagination from '@/components/pagination/Pagination';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái để hiển thị form
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Số lượng trang

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    // Dữ liệu mẫu để kiểm tra giao diện
    const sampleUsers = [
      { _id: '1', name: 'Nguyễn A', email: 'nguyena@example.com', role: 'khách hàng' },
      { _id: '2', name: 'Trần B', email: 'tranb@example.com', role: 'tài xế' },
      { _id: '3', name: 'Lê C', email: 'lecexample@example.com', role: 'admin' },
    ];
    setUsers(sampleUsers);
  }, []);

  const handleAddUser = (userData) => {
    const newUser = { ...userData, _id: `${users.length + 1}` }; // Tạo ID giả
    setUsers([...users, newUser]);
    setShowForm(false); // Ẩn form sau khi thêm
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true); // Hiển thị form sửa
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null); // Hủy sửa người dùng
  };

  return (
    <div className="p-6  bg-white">
      <h1 className="text-xl font-bold mb-4">Quản lý Người Dùng</h1>
  {/* Nút thêm người dùng */}
  
        <div className="my-3 text-right">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Thêm Người Dùng
          </button>
        </div>
    
      {/* Hiển thị form Thêm hoặc Sửa */}
      {showForm && (
        <div className="mb-6">
      
          {editingUser ? (
            <EditUserForm user={editingUser} onSubmit={handleAddUser} onCancel={handleCancelForm} />
          ) : (
            <AddUserForm onSubmit={handleAddUser} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Bảng hiển thị người dùng */}
      <div className="mb-6">
        <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
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

export default UserManagement;
