"use client";
const CarTable = ({ cars, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên Xe</th>
            <th className="px-4 py-2 text-left">Id Danh Mục</th>
            <th className="px-4 py-2 text-left">Mô Tả</th>
            <th className="px-4 py-2 text-left">Giá Tiền / Ngày</th>
            <th className="px-4 py-2 text-left">Trạng Thái</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-b">
              <td className="px-4 py-2">{car._id}</td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {car.car_name}
              </td>
              <td className="px-4 py-2">{car.image}</td>
              <td className="px-4 py-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {car.description}
              </td>
              <td className="px-4 py-2">{car.price_per_day}</td>
              <td className="px-4 py-2">{car.availability_status}</td>
              <td className="px-4 py-2">{car.category_id}</td>
              <td className="px-4 py-2 flex">
                <button
                  onClick={() => onEdit(car)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(car._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default CarTable;
