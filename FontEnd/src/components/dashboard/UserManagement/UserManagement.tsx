"use client";
import { useState, useEffect } from 'react';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import UserTable from './UserTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchUsers } from '@/redux/users/usersThunk';

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, totalPages } = useSelector((state: RootState) => state.users);

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [currentPage, setCurrentPage] = useState(1);

  // Load users khi thay đổi trang
  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 5 }));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddUser = (userData: any) => {
    // Gọi Redux action thêm user sau này (chưa thêm ở đây)
    setShowForm(false); // Ẩn form sau khi thêm
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowForm(true); // Hiển thị form sửa
  };

  const handleDeleteUser = (userId: string) => {
    // Gọi Redux action xóa user sau này (chưa thêm ở đây)
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null); // Hủy sửa người dùng
  };

  return (
    <div className="p-6 bg-white">
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
            <EditUserForm
              user={editingUser}
              onSubmit={handleAddUser}
              onCancel={handleCancelForm}
            />
          ) : (
            <AddUserForm onSubmit={handleAddUser} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Bảng hiển thị người dùng */}
      <div className="mb-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <UserTable users={users.data} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        )}
      </div>

      {/* Phân trang */}
      <div className="pt-4">
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
