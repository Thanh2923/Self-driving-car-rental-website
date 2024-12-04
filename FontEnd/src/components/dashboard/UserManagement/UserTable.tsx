// src/components/UserTable.js
import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Tên</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Mật khẩu</th>
            <th className="px-4 py-2 text-left">Vai trò</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              {/* Hiển thị mật khẩu như "******" hoặc giá trị nào đó thay vì mật khẩu thật */}
              <td className="px-4 py-2">******</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
