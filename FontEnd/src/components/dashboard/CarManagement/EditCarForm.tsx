"use client"
import { useState, useEffect } from 'react';

const EditCarForm = ({ car, onSubmit, onCancel }) => {
  const [car_name, setCarName] = useState(car.car_name);
  const [image, setImage] = useState(car.image);
  const [description, setDescription] = useState(car.description);
  const [price_per_day, setPricePerDay] = useState(car.price_per_day);
  const [availability_status, setAvailabilityStatus] = useState(car.availability_status);
  const [category_id, setCategoryId] = useState(car.category_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      _id: car._id,
      car_name, 
      image, 
      description, 
      price_per_day, 
      availability_status, 
      category_id
    });
  };

  return (
    <div className='w-full fixed z-20 bg-slate-400 bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center'>
      <div className='w-[50%] bg-white flex justify-center shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="pt-5 font-semibold text-lg ">Chỉnh Sửa Xe</h2>

          {/* Car Name */}
          <div>
            <label htmlFor="car_name" className="block text-sm font-medium text-gray-700">Tên Xe</label>
            <input 
              type="text" 
              id="car_name"
              value={car_name} 
              onChange={(e) => setCarName(e.target.value)} 
              placeholder="Nhập tên xe" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL Hình Ảnh</label>
            <input 
              type="text" 
              id="image"
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="Nhập URL hình ảnh" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô Tả</label>
            <textarea 
              id="description"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Nhập mô tả xe" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
          </div>

          {/* Price Per Day and Category ID in the same row */}
          <div className="flex space-x-4">
            {/* Price Per Day */}
            <div className="flex-1">
              <label htmlFor="price_per_day" className="block text-sm font-medium text-gray-700">Giá Theo Ngày</label>
              <input 
                type="number" 
                id="price_per_day"
                value={price_per_day} 
                onChange={(e) => setPricePerDay(e.target.value)} 
                placeholder="Nhập giá theo ngày" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
              />
            </div>

            {/* Category ID */}
            <div className="flex-1">
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">ID Danh Mục</label>
              <input 
                type="text" 
                id="category_id"
                value={category_id} 
                onChange={(e) => setCategoryId(e.target.value)} 
                placeholder="Nhập ID danh mục" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
              />
            </div>
          </div>

          {/* Availability Status */}
          <div>
            <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700">Trạng Thái Sẵn Có</label>
            <select 
              id="availability_status" 
              value={availability_status} 
              onChange={(e) => setAvailabilityStatus(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Available">Có Sẵn</option>
              <option value="Unavailable">Không Có Sẵn</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 py-5">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarForm;
