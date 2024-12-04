"use client";

const EventTable = ({ events, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Mã Sự Kiện</th>
            <th className="px-4 py-2 text-left">Tên Sự Kiện</th>
            <th className="px-4 py-2 text-left">Hình Ảnh</th>
            <th className="px-4 py-2 text-left">Ngày Sự Kiện</th>
            <th className="px-4 py-2 text-left">Mô Tả</th>
            <th className="px-4 py-2 text-left">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-b">
              <td className="px-4 py-2">{event._id}</td>
              <td className="px-4 py-2">{event.event_name}</td>
              <td className="px-4 py-2">{event.image}</td>
              <td className="px-4 py-2">{event.event_day}</td>
              <td className="px-4 py-2">{event.description}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => onEdit(event)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(event._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
