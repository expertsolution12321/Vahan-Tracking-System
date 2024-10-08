import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {FaFileCsv, FaFileExcel, FaPlus, FaPrint, FaTruck, FaTruckLoading, FaUser, FaWeight } from 'react-icons/fa';
import {  FaClipboardCheck, FaChartLine} from "react-icons/fa";
import Dashboardcard from './Dashboardcard';

const ComputerOperatorPanel = () => {
    const [loadingDetails, setLoadingDetails] = useState({
        driverName: '',
        rcDetails: '',
        licenceDetails: '',
        truckImage: null,
        itemDetails: '',
        loadingTime: '',
        unloadingTime: '',
        loadingLocation: '',
        unloadingLocation: ''
    });

    const [loadingData, setLoadingData] = useState([]); // State to hold all truck loading data
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Handle input change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoadingDetails({
            ...loadingDetails,
            [name]: value
        });
    };

    // Handle file change for truck image
    const handleFileChange = (e) => {
        setLoadingDetails({
            ...loadingDetails,
            truckImage: e.target.files[0] // Only one file is selected
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('truck_token'); // JWT token

            // Create FormData to send all details along with the truck image
            const formData = new FormData();
            formData.append('driverName', loadingDetails.driverName);
            formData.append('rcDetails', loadingDetails.rcDetails);
            formData.append('licenceDetails', loadingDetails.licenceDetails);
            formData.append('truckImage', loadingDetails.truckImage); // Attach truck image
            formData.append('itemDetails', loadingDetails.itemDetails);
            formData.append('loadingTime', loadingDetails.loadingTime); 
            formData.append('unloadingTime', loadingDetails.unloadingTime);
            formData.append('loadingLocation', loadingDetails.loadingLocation);
            formData.append('unloadingLocation', loadingDetails.unloadingLocation);

            // Submit truck loading details to the backend
            await axios.post(`${process.env.REACT_APP_API_URL}/api/loadings`, formData, {
                headers: {
                    'authorization': `${token}`, // JWT token for authentication
                    'Content-Type': 'multipart/form-data', // Ensure correct content type for form data
                },
            });

            alert('Truck loading details submitted successfully!');
            
            // Clear form after successful submission
            setLoadingDetails({
                driverName: '',
                rcDetails: '',
                licenceDetails: '',
                truckImage: null,
                itemDetails: '',
                loadingTime: '',
                unloadingTime: '',
                loadingLocation: '',
                unloadingLocation: ''
            });

            // Fetch updated loading details to show in the table
            fetchLoadingData();
        } catch (error) {
            console.error('Error submitting truck loading details', error);
            alert('Submission failed. Please try again.');
        }
    };

    // Function to fetch loading data from the API
    const fetchLoadingData = async () => {
        try {
            const token = localStorage.getItem('truck_token'); // JWT token
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/loadings`, {
                headers: {
                    'authorization': `${token}` // JWT token for authentication
                }
            });
            setLoadingData(response.data); // Set the data into state
        } catch (error) {
            console.error('Error fetching loading data', error);
        }
    };

    // Fetch the data when the component mounts
    useEffect(() => {
        fetchLoadingData();
    }, []);

    // Filter loading data based on date range
    const filteredLoadingData = loadingData.filter(detail => {
        const loadingTime = new Date(detail.loadingTime);
        const start = new Date(startDate);
        const end = new Date(endDate);

        return (
            (startDate === '' || loadingTime >= start) &&
            (endDate === '' || loadingTime <= end)
        );
    });

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredLoadingData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Loading Data");
        XLSX.writeFile(workbook, "loading_data.xlsx");
    };







    // Add Vahicle Deatils Form 
// ========================================================


const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };










    return (
        <>
        {/* <div>
            <h2>Computer Operator Panel</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="driverName" 
                    placeholder="Driver Name" 
                    onChange={handleChange} 
                    value={loadingDetails.driverName} 
                    required 
                />
                <input 
                    type="text" 
                    name="rcDetails" 
                    placeholder="RC Details" 
                    onChange={handleChange} 
                    value={loadingDetails.rcDetails} 
                    required 
                />
                <input 
                    type="text" 
                    name="licenceDetails" 
                    placeholder="Licence Details" 
                    onChange={handleChange} 
                    value={loadingDetails.licenceDetails} 
                    required 
                />
                <input 
                    type="file" 
                    name="truckImage" 
                    onChange={handleFileChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="itemDetails" 
                    placeholder="Item Details" 
                    onChange={handleChange} 
                    value={loadingDetails.itemDetails} 
                    required 
                />
                <input 
                    type="datetime-local" 
                    name="loadingTime" 
                    onChange={handleChange} 
                    value={loadingDetails.loadingTime} 
                    required 
                />
                <input 
                    type="text" 
                    name="loadingLocation" 
                    placeholder="Loading Location" 
                    onChange={handleChange} 
                    value={loadingDetails.loadingLocation} 
                    required 
                />
                <input 
                    type="datetime-local" 
                    name="unloadingTime" 
                    onChange={handleChange} 
                    value={loadingDetails.unloadingTime} 
                    required 
                />
                <input 
                    type="text" 
                    name="unloadingLocation" 
                    placeholder="Unloading Location" 
                    onChange={handleChange} 
                    value={loadingDetails.unloadingLocation} 
                    required 
                />
                <button type="submit">Submit Truck Loading Details</button>
            </form>

            {/* Date Filter Inputs */}
            {/* <div>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={exportToExcel}>Download as Excel</button>
            </div> */}

            {/* Display loading details in a table */}

            {/* <h2>Truck Loading Details</h2> */}
            {/* <table>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>RC Details</th>
                        <th>Licence Details</th>
                        <th>Loading Time</th>
                        <th>Unloading Time</th>
                        <th>Loading Location</th>
                        <th>Unloading Location</th>
                        <th>Item Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLoadingData.length > 0 ? (
                        filteredLoadingData.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.driverName}</td>
                                <td>{detail.rcDetails}</td>
                                <td>{detail.licenceDetails}</td>
                                <td>{new Date(detail.loadingTime).toLocaleString()}</td>
                                <td>{new Date(detail.unloadingTime).toLocaleString()}</td>
                                <td>{detail.loadingLocation}</td>
                                <td>{detail.unloadingLocation}</td>
                                <td>{detail.itemDetails}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No loading details available.</td>
                        </tr>
                    )}
                </tbody>
            </table> */}
        {/* </div>  */}



        
{/* =================================================================================================== */}

{/* Add Vahicle Details fORM */}
{/* <div>
<div className=''>
    <button className='bg-blue-600 rounded-lg p-4 text-white font-semibold text-xl m-2 shadow-lg' onClick={toggleModal} >Add Vahicle Details </button>
</div>


{isOpen && (
<div className=''>
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        
        <form className='bg-orange-100 p-6 rounded-lg shadow-lg w-full max-w-4xl space-y-4 relative' >
        <div className='top-2 right-5 absolute '><button className='text-2xl font-bold' onClick={toggleModal} >X</button></div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className=''>
                <label className='text-lg font-medium text-gray-500'>DriverName</label>
                <input type='text' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner '/>
            </div>
            
            <div>
                <label className='text-lg font-medium text-gray-500'>RC Details</label>
                <input type='text' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>
            
            <div>
                <label className='text-lg font-medium text-gray-500'>LicenceDetails</label>
                <input type='text' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>
            
            <div>
                <label className='text-lg font-medium text-gray-500'>Send Image</label>
                <input type='file' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>
            <div>
                <label className='text-lg font-medium text-gray-500'>itemDetails</label>
                <input type='text' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>
            <div>
                <label className='text-lg font-medium text-gray-500'>LoadingTimeAndDate</label>
                <input type='datetime-local' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>
            
            <div>
                <label className='text-lg font-medium text-gray-500'>Loadinglocation</label>
                <input type='text' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>

            <div>
                <label className='text-lg font-medium text-gray-500'>UnloadingTimeAndDate</label>
                <input type='datetime-local' className='w-full p-1 block mt-3 h-10 focus:outline-sky-200 focus:outline-5 border border-gray-400 rounded-md  focus:shadow-inner'/>
            </div>

            </div>
            
            <div className='justify-center'>
                <button type='submit' className='py-2 px-4 bg-green-700 text-white text-xl rounded-md font-semibold mr-3'>Submit</button>
                <button type='button' className='py-2 px-4 bg-red-700 text-white text-xl rounded-md font-semibold' >Clear</button>
            </div>
            
            
            
        </form>
    </div>
    
</div>
 )}
</div> */}


















 {/* Vahicle Loading Details */}

<div className="p-5 shadow-lg rounded-lg bg-white ">
    <div className='justify-between flex  bg-slate-100 px-4 py-4 rounded-tl-md rounded-tr-md item-center '>
        <h2 className="text-3xl  font-bold p-4 items-center ">Vahicle Loading Details</h2>
    {/* Record */}
  <div className='flex    item-center space-x-2  '>
    {/* form Button */}
    <div className="flex flex-wrap justify-center items-center space-x-1  ">  
  <button
    onClick={toggleModal}
    className="bg-blue-500 text-white px-3 py-3 rounded-lg hover:bg-blue-600 font-semibold mt-3  mb-4"
  >
    <span className="hidden sm:inline">Add Vehicle Details</span>
    <FaPlus className="inline-block sm:ml-2" />  
  </button>

  {isOpen && (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-75 flex justify-center items-center backdrop-blur-lg">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg relative">
        {/* Close button */}
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Vehicle Loading Details</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Driver Name */}
          <div>
            <label className="block text-sm font-medium">Driver Name:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter driver name"
            />
          </div>

          {/* RC Details */}
          <div>
            <label className="block text-sm font-medium">RC Details:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter RC details"
            />
          </div>

          {/* Licence Details */}
          <div>
            <label className="block text-sm font-medium">Licence Details:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter licence details"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium">No file chosen:</label>
            <input
              type="file"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
            />
          </div>

          {/* Item Details */}
          <div>
            <label className="block text-sm font-medium">Item Details:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter item details"
            />
          </div>

          {/* Loading Date & Time */}
          <div>
            <label className="block text-sm font-medium">Loading Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
            />
          </div>

          {/* Loading Location */}
          <div>
            <label className="block text-sm font-medium">Loading Location:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter loading location"
            />
          </div>

          {/* Unloading Date & Time */}
          <div>
            <label className="block text-sm font-medium">Unloading Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
            />
          </div>

          {/* Unloading Location */}
          <div>
            <label className="block text-sm font-medium">Unloading Location:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md mt-1 focus:outline-sky-300 focus:shadow-inner"
              placeholder="Enter unloading location"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit 
          </button>

          <button
            type="button" onClick={toggleModal}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )}
</div>

<div className="flex flex-wrap justify-center items-center space-x-1 ">
  <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-yellow-200 transition">
    <FaFileCsv 
      className="text-yellow-500 sm:text-3xl text-xl" 
      title="Export as CSV" 
    />
  </div>
  <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-green-200 transition">
    <FaFileExcel 
      className="text-green-500 sm:text-3xl text-xl" 
      title="Export as Excel" 
    />
  </div>
  <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-gray-200 transition">
    <FaPrint 
      className="text-black-500 sm:text-3xl text-xl" 
      title="Print" 
    />
  </div>
</div>

        </div>
    </div>
      
      {/* Record Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full text-left table-auto border-collapse border">
          <thead className='bg-slate-100 ' >
            <tr className="border-b ">
              <th className="px-4 py-4 text-gray-600 font-medium">Driver Name</th>
              <th className="px-4 py-4 text-gray-600 font-medium">RC Details</th>
              <th className="px-4 py-4 text-gray-600 font-medium">Licence Details</th>
              <th className="px-4 py-4 text-gray-600 font-medium">LoadingTimeAndDate</th>
              <th className="px-4 py-4 text-gray-600 font-medium">UnloadingTimeAndDate</th>
              <th className="px-4 py-4 text-gray-600 font-medium">LoadingLocation</th>
              <th className="px-4 py-4 text-gray-600 font-medium">UnloadingLocation</th>
              <th className="px-4 py-4 text-gray-600 font-medium">itemDetails</th>

            </tr>
          </thead>
          <tbody>
            
              <tr  className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-4 py-4">Rakesh Mahuri</td>
                <td className="px-4 py-4">B4V45CC</td>
                <td className="px-4 py-4">LOC12785</td>
                <td className="px-4 py-4">22/02/2023 11:44AM</td>
                <td className="px-4 py-4">24/02/2023 10:00AM</td>
                <td className="px-4 py-4">BBSR</td>
                <td className="px-4 py-4">CTC</td>
                <td className="px-4 py-4">RICE</td>
              </tr>
              <tr  className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-4 py-4">Rakesh Mahuri</td>
                <td className="px-4 py-4">B4V45CC</td>
                <td className="px-4 py-4">LOC12785</td>
                <td className="px-4 py-4">22/02/2023 11:44AM</td>
                <td className="px-4 py-4">24/02/2023 10:00AM</td>
                <td className="px-4 py-4">BBSR</td>
                <td className="px-4 py-4">CTC</td>
                <td className="px-4 py-4">RICE</td>
              </tr>
              <tr  className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-4 py-4">Rakesh Mahuri</td>
                <td className="px-4 py-4">B4V45CC</td>
                <td className="px-4 py-4">LOC12785</td>
                <td className="px-4 py-4">22/02/2023 11:44AM</td>
                <td className="px-4 py-4">24/02/2023 10:00AM</td>
                <td className="px-4 py-4">BBSR</td>
                <td className="px-4 py-4">CTC</td>
                <td className="px-4 py-4">RICE</td>
              </tr>
              <tr  className="border-b odd:bg-white even:bg-gray-50">
                <td className="px-4 py-4">Rakesh Mahuri</td>
                <td className="px-4 py-4">B4V45CC</td>
                <td className="px-4 py-4">LOC12785</td>
                <td className="px-4 py-4">22/02/2023 11:44AM</td>
                <td className="px-4 py-4">24/02/2023 10:00AM</td>
                <td className="px-4 py-4">BBSR</td>
                <td className="px-4 py-4">CTC</td>
                <td className="px-4 py-4">RICE</td>
              </tr>
         
          </tbody>
        </table>
      </div>
      
    </div>


{/* Dashboard Card */}
<Dashboardcard />
{/* Dashboard card end */}


        </>
        
    );
};

export default ComputerOperatorPanel;
