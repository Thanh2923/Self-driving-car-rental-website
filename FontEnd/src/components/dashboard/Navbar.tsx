"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState,useEffect } from 'react'
const Navbar = () => {
  const pathname = usePathname();
  
  const [ activeItem,setActiveItem] = useState('');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); 
  };

  useEffect(() => {
    // Lấy phần "user-management", "product-management", etc. từ đường dẫn hiện tại
    const section = pathname.split('/')[2];
    setActiveItem(section); // Cập nhật activeItem theo pathname
  }, [pathname]); // Mỗi khi pathname thay đổi, sẽ cập nhật lại activeItem


  return (
    <div className="w-1/5 bg-white shadow-md p-4">
    <h1 className="text-2xl font-bold text-red-500 mb-6">3H1D ADMIN</h1>
    <ul className="space-y-4">
   
    <li >
      <Link onClick={()=>handleItemClick(section)} href="/dashboard/user-management" className={` ${activeItem==="user-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-500"></span>
          Tài Khoản
        </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(section)} href="/dashboard/product-management" className={` ${activeItem==="product-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-blue-500"></span>
         Sản Phẩm
                 </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(section)} href="/dashboard/category-management" className={` ${activeItem==="category-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-blue-500"></span>
           Danh Mục
        </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(section)} href="/dashboard/order-management" className={` ${activeItem==="order-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500"></span>
          Đơn Hàng
        </Link>
      </li>
      <li >
      <Link onClick={()=>handleItemClick(section)} href="/dashboard/event-management" className={` ${activeItem==="event-management" ? "text-blue-600 bg-blue-100" :""} flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group`} >
          <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-blue-500"></span>
          Sự kiện
        </Link>
      </li>
     
      
    </ul>
  </div>
  )
}

export default Navbar
