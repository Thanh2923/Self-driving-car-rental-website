"use client";
const UserTable = ({ users, onEdit, onDelete,currentPage,limit }) => {
 
  const safeUsers = users ?? [];
  console.log(safeUsers)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Mật khẩu</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Vai trò</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {safeUsers.map((user,index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{(currentPage - 1) * limit + index + 1}</td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2 max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">{user.password}</td>
              <td className="px-4 py-2 ">{user.phone}</td>
              <td className="px-4 py-2">{user.role_id.roleName}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
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
