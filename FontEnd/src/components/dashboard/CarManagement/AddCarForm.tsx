"use client";
import { fetchCategories } from '@/redux/category/categoryThunk';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AddCarForm = ({ onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const safeCategories = categories.data ?? [];
  const [car_name, setCarName] = useState('');
  const [description, setDescription] = useState('');
  const [price_per_day, setPricePerDay] = useState('');
  const [availability_status, setAvailabilityStatus] = useState('Available');
  const [category_id, setCategoryId] = useState('');
  const [images, setImages] = useState([]);

  // Gọi API để lấy danh mục khi component load
  useEffect(() => {
    dispatch(fetchCategories({}));
  }, [dispatch]);

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Giới hạn số lượng ảnh được chọn là 5 ảnh
    if (files.length > 5) {
      alert("Bạn chỉ được chọn tối đa 5 ảnh.");
      return;
    }

    // Cập nhật mảng ảnh vào state
    setImages(files);
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append('car_name', car_name);
    formData.append('description', description);
    formData.append('price_per_day', price_per_day);
    formData.append('availability_status', availability_status);
    formData.append('category_id', category_id);

    // Thêm các ảnh vào FormData
    images.forEach((image) => {
      formData.append('images', image); // Chú ý rằng 'images' là tên trường trong FormData
    });
 
    try {
      // Gửi yêu cầu POST tới backend
      const response = await axios.post('http://localhost:8080/api/car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Xử lý khi upload thành công
      console.log('Thêm xe thành công:', response.data);
      onSubmit(response.data); // Callback khi submit thành công
    } catch (error) {
      console.error('Lỗi khi thêm xe:', error);
    }
  };

  return (
    <div className='w-full fixed z-20 bg-slate-400 bg-opacity-20 flex  top-0 left-0 justify-center items-center'>
      <div className='w-[50%] bg-white flex justify-center shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%] ">
          <h2 className="pt-5 font-semibold text-lg ">Thêm Xe</h2>
          
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
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Chọn hình ảnh (tối đa 5 ảnh)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            
            {/* Hiển thị các ảnh đã chọn */}
            {images.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-700">Ảnh đã chọn:</h3>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)} // Hiển thị ảnh tạm thời
                        alt={`image-${index}`}
                        className="h-5 w-5 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = images.filter((_, i) => i !== index);
                          setImages(newImages); // Xóa ảnh khỏi mảng
                        }}
                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

          {/* Flex row for Price per Day and Category ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price Per Day */}
            <div>
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

            {/* Category Select */}
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                Danh Mục
              </label>
              <select
                id="category_id"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Chọn danh mục</option>
                {safeCategories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.category_name} {/* Sử dụng category._id thay vì category_name */}
                  </option>
                ))}
              </select>
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
              Thêm Xe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarForm;
