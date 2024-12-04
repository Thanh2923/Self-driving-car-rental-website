const Event = require('../models/event'); // Đường dẫn tới file model Event

const createEvent = async (data) => {
    const event = new Event(data);
    return await event.save();
};

const getAllEvents = async () => {
    return await Event.find();
};

const getEventById = async (id) => {
    return await Event.findById(id);
};

const updateEvent = async (id, data) => {
    return await Event.findByIdAndUpdate(id, data, { new: true });
};

const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};