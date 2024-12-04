import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className="w-1/5 bg-white shadow-md p-4">
    <h1 className="text-2xl font-bold text-red-500 mb-6">3H1D ADMIN</h1>
    <ul className="space-y-4">
    <li >
      <Link href="/dashboard/user-management" className="flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group" >
          <span className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-blue-500"></span>
          Thống Kê
        </Link>
      </li>
    <li >
      <Link href="/dashboard/user-management" className="flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group" >
          <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-500"></span>
          Tài Khoản
        </Link>
      </li>
      <li >
      <Link href="/dashboard/user-management" className="flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group" >
          <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-blue-500"></span>
         Sảm Phẩm
                 </Link>
      </li>
      <li >
      <Link href="/dashboard/user-management" className="flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group" >
          <span className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-blue-500"></span>
           Danh Mục
        </Link>
      </li>
      <li >
      <Link href="/dashboard/user-management" className="flex items-center gap-2 px-4 py-4 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors rounded-lg group" >
          <span className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500"></span>
          Đơn Hàng
        </Link>
      </li>
     
      
    </ul>
  </div>
  )
}

export default Navbar
