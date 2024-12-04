const eventService = require('../services/eventService');

// Tạo sự kiện mới
const createEvent = async (req, res) => {
    try {
        const data = req.body;
        const newEvent = await eventService.createEvent(data);
        return res.status(201).json(newEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả sự kiện
const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Lấy sự kiện theo ID
const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventService.getEventById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật sự kiện
const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedEvent = await eventService.updateEvent(id, data);
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json(updatedEvent);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Xóa sự kiện
const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await eventService.deleteEvent(id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
