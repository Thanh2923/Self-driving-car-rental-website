"use client"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EventTable from './EventTable';
import Pagination from '@/components/pagination/Pagination';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
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
    // Sample event data to test the interface
    const sampleEvents = [
      { _id: '1', event_name: 'Lễ hội Âm Nhạc', image: 'music.jpg', event_day: '2024-12-10', description: 'Một lễ hội âm nhạc với các ban nhạc sống.' },
      { _id: '2', event_name: 'Triển lãm Nghệ thuật', image: 'art.jpg', event_day: '2024-12-15', description: 'Triển lãm giới thiệu các nghệ sĩ địa phương.' },
    ];
    setEvents(sampleEvents);
  }, []);

  // Add a new event
  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      _id: uuidv4(), // Generate a unique ID using UUID
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    setMessage('Sự kiện đã được thêm thành công!');
  };

  // Update an existing event
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((event) =>
      event._id === updatedEvent._id ? updatedEvent : event
    ));
    setShowForm(false);
    setMessage('Sự kiện đã được cập nhật thành công!');
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  // Delete an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId));
    setMessage('Sự kiện đã được xóa thành công!');
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-xl font-bold mb-4">Quản lý Sự Kiện</h1>

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
            <AddEventForm onSubmit={handleAddEvent} onCancel={handleCancelForm} />
          )}
        </div>
      )}

      {/* Show message */}
      {message && <div className="mb-4 text-green-500">{message}</div>}

      {/* Event table */}
      <div className="mb-6">
        <EventTable events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
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
