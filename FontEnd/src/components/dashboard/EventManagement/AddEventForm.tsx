"use client"
import { useState } from 'react';

const AddEventForm = ({ onSubmit, onCancel }) => {
  const [event_name, setEventName] = useState('');
  const [image, setImage] = useState('');
  const [event_day, setEventDay] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event_name.trim() && image.trim() && event_day.trim() && description.trim()) {
      onSubmit({
        event_name,
        image,
        event_day,
        description
      });
    }
  };

  return (
    <div className='w-full fixed z-20 bg-slate-400 bg-opacity-20 flex h-screen top-0 left-0 justify-center items-center'>
      <div className='w-[50%] bg-white flex justify-center shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit} className="space-y-4 w-[90%]">
          <h2 className="pt-5 font-semibold text-lg">Thêm Sự Kiện</h2>
          
          {/* Event Name */}
          <div>
            <label htmlFor="event_name" className="block text-sm font-medium text-gray-700">Tên Sự Kiện</label>
            <input 
              type="text" 
              id="event_name"
              value={event_name} 
              onChange={(e) => setEventName(e.target.value)} 
              placeholder="Nhập tên sự kiện" 
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

          {/* Event Day */}
          <div>
            <label htmlFor="event_day" className="block text-sm font-medium text-gray-700">Ngày Sự Kiện</label>
            <input 
              type="date" 
              id="event_day"
              value={event_day} 
              onChange={(e) => setEventDay(e.target.value)} 
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
              placeholder="Nhập mô tả sự kiện" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              required 
            />
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
              Thêm Sự Kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
