import React from 'react'
import {FaFileCsv, FaFileExcel, FaPlus, FaPrint, FaTruck, FaTruckLoading, FaUser, FaWeight } from 'react-icons/fa';
import {  FaClipboardCheck, FaChartLine} from "react-icons/fa";

export default function Dashboardcard() {
  return (
    <div>
        {/* Dashboard Card */}
<div className="Dashboard">
  <div className="flex flex-col sm:flex-row sm:items-center p-4 pb-2">
    {/* Breadcrumb Navigation */}
    <h2 className="flex items-center text-lg sm:text-xl leading-10">
      <a href="#" className="text-gray-500 ">Dashboard</a>
      <span className="ml-2 font-bold">></span>
    </h2>
    
    {/* Admin Dashboard Title */}
    <span className="mt-2 sm:mt-0 sm:ml-4 text-xl sm:text-3xl font-semibold">
      Admin Dashboard
    </span>
  </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
    {/* Total Loading Details Card */}
    <div className="bg-gradient-to-r from-purple-500 to-purple-300 text-white rounded-lg p-6 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-sm sm:text-lg font-semibold">Total Loading Details</h3>
        <p className="text-2xl sm:text-4xl font-bold">358</p>
        <p className="mt-2 text-xs sm:text-sm">18% Higher Than Last Month</p>
      </div>
      <FaTruckLoading className="text-4xl sm:text-6xl" />
    </div>

    {/* Total Running Details Card */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg p-6 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-sm sm:text-lg font-semibold">Total Running Details</h3>
        <p className="text-2xl sm:text-4xl font-bold">265</p>
        <p className="mt-2 text-xs sm:text-sm">21% Higher Than Last Month</p>
      </div>
      <FaClipboardCheck className="text-4xl sm:text-6xl" />
    </div>

    {/* Total Complete Vehicle Card */}
    <div className="bg-gradient-to-r from-green-500 to-green-300 text-white rounded-lg p-6 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-sm sm:text-lg font-semibold">Total Complete Vehicle</h3>
        <p className="text-2xl sm:text-4xl font-bold">19,280</p>
        <p className="mt-2 text-xs sm:text-sm">37% Higher Than Last Month</p>
      </div>
      <FaTruck className="text-4xl sm:text-6xl" />
    </div>

    {/* Total User Card */}
    <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white rounded-lg p-6 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-sm sm:text-lg font-semibold">Total User</h3>
        <p className="text-2xl sm:text-4xl font-bold">22,580</p>
        <p className="mt-2 text-xs sm:text-sm">10% Higher Than Last Month</p>
      </div>
      <FaUser className="text-4xl sm:text-6xl" />
    </div>

    {/* Total Quantity Card */}
    <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white rounded-lg p-6 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-sm sm:text-lg font-semibold">Total Quantity</h3>
        <p className="text-2xl sm:text-4xl font-bold">22,580</p>
        <p className="mt-2 text-xs sm:text-sm">10% Higher Than Last Month</p>
      </div>
      <FaChartLine className="text-4xl sm:text-6xl" />
    </div>
  </div>
</div>

{/* Dashboard card end */}
    </div>
  )
}
