"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EventTable from './EventTable';
import Pagination from '@/components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { deleteEvent, fetchEvents, updateEvent } from '@/redux/event/eventThunks';
import ActionDelete from '../ActionDelete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EventManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const { events, loading, error } = useSelector((state) => state.events);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Số lượng trang

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, limit: 5 }))
  }, [dispatch,currentPage]);

  // Add a new event


  // Update an existing event
  const handleUpdateEvent = (updatedevent) => {
      const {  id, event_name,image,event_date,description} = updatedevent;
      dispatch(updateEvent({id, event_name,image,event_date,description}))
      setShowForm(!showForm)
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };


  const handleDeleteUser = () => {
    dispatch(deleteEvent(eventToDelete)); 
    setShowModal(false);
    toast.success("Xoá thành công")
    setTimeout(()=>{
      setShowModal(false);
  },1000)
  };

  const handleCancelFormDelete = () => {
    setShowModal(false);
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleShowDeleteEnvent = (id) => {
    setEventToDelete(id)
   setShowModal(true);
 };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Quản lý Sự Kiện</h1>
      <ToastContainer/>
      {showModal ?  <ActionDelete onDelete={handleDeleteUser} onClose={handleCancelFormDelete}/> : "" } 
      {/* Add event button */}
      <div className="my-3 text-right">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Thêm Sự Kiện
        </button>
      </div>

      {/* Display form for adding or editing an event */}
      {showForm && (
        <div className="mb-6">
          {editingEvent ? (
            <EditEventForm event={editingEvent} onSubmit={handleUpdateEvent} onCancel={handleCancelForm} />
          ) : (
            <AddEventForm setShowForm={setShowForm}  onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Show message */}
      {message && <div className="mb-4 text-green-500">{message}</div>}

      {/* Event table */}
      <div className="mb-6">
        <EventTable events={events.data} onEdit={handleEditEvent} onDelete={handleShowDeleteEnvent} />
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

export default EventManagement;
