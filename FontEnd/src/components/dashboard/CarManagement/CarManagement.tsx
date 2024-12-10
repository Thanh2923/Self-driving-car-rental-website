"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID for unique ID generation
import AddCarForm from './AddCarForm';
import EditCarForm from './EditCarForm';
import CarTable from './CarTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/category/categoryThunk';

const CarManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    // Sample car data to test the interface
    const sampleCars = [
      { _id: '1', car_name: 'Toyota Camry ', image: 'toyota.jpg', description: 'A comfortable sedan', price_per_day: 100, availability_status: 'Available', category_id: '1' },
      { _id: '2', car_name: 'Honda Accord', image: 'honda.jpg', description: 'Spacious and reliable', price_per_day: 120, availability_status: 'Unavailable', category_id: '2' },
    ];
    setCars(sampleCars);
  }, []);

  // Add a new car
  const handleAddCar = (carData) => {
    const newCar = {
      ...carData,
      _id: uuidv4(), // Generate a unique ID using UUID
    };
    setCars([...cars, newCar]);
    setShowForm(false);
    setMessage('Car added successfully!');
  };

  // Update an existing car
  const handleUpdateCar = (updatedCar) => {
    setCars(cars.map((car) =>
      car._id === updatedCar._id ? updatedCar : car
    ));
    setShowForm(false);
    setMessage('Car updated successfully!');
  };

  // Edit car
  const handleEditCar = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  // Delete a car
  const handleDeleteCar = (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
    setMessage('Car deleted successfully!');
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };



  const totalPages = 5; // Số lượng trang

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Car Management</h1>

      {/* Add car button */}
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Car
        </button>
      </div>

      {/* Display form for adding or editing a car */}
      {showForm && (
        <div className="mb-6">
          {editingCar ? (
            <EditCarForm car={editingCar} onSubmit={handleUpdateCar} onCancel={handleCancelForm} />
          ) : (
            <AddCarForm onSubmit={handleAddCar} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Show message */}
      {message && <div className="mb-4 text-green-500">{message}</div>}

      {/* Car table */}
      <div className="mb-6">
        <CarTable cars={cars} onEdit={handleEditCar} onDelete={handleDeleteCar} />
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

export default CarManagement;
