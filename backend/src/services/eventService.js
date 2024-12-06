const Event = require('../models/event'); // Đường dẫn tới file model Event

const createEvent = async (data) => {
    const event = new Event(data);
    return await event.save();
};

const getAllEvents = async (page = 1, limit = 5) => {
    // Tính toán số lượng mục cần bỏ qua
    const skip = (page - 1) * limit;

    // Lấy danh sách sự kiện với phân trang
    const events = await Event.find()
        .skip(skip) // Bỏ qua các mục trước trang hiện tại
        .limit(limit) // Giới hạn số lượng mục trả về mỗi trang
        .sort({ event_date: -1 }); // Sắp xếp theo ngày (mới nhất trước)

    // Lấy tổng số lượng sự kiện để tính tổng số trang
    const totalEvents = await Event.countDocuments();

    // Tính tổng số trang
    const totalPages = Math.ceil(totalEvents / limit);

    return {
        data: events,
        totalEvents,
        totalPages,
        currentPage: page
    };
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