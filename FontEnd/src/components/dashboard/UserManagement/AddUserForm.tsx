// src/components/AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'khách hàng',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
   <div className='w-full fixed z-20 bg-slate-400  bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center'>
    <div className='w-[50%] bg-white shadow-lg rounded-lg flex justify-center  '>
    <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
       <h2 className='py-5 font-semibold  text-lg '>Thêm mới người dùng</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Vai trò</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="khách hàng">Khách hàng</option>
          <option value="tài xế">Tài xế</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex  py-5 justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Hủy</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Thêm mới</button>
      </div>
    </form>
    </div>
   </div>
  );
};

export default AddUserForm;
