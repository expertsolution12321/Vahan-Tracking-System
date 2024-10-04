const TruckLoadingDetails = require('../models/truckLoadingDetails');
const xlsx = require('xlsx');
const fs = require('fs');

exports.createLoadingDetail = async (req, res) => {
    try {
        const { driverName, rcDetails, licenceDetails, itemDetails, loadingTime, unloadingTime, loadingLocation, unloadingLocation } = req.body;
        const newLoadingDetail = new TruckLoadingDetails({
            driverName,
            rcDetails,
            licenceDetails,
            itemDetails,
            loadingTime,
            unloadingTime,
            loadingLocation,
            unloadingLocation,
            createdBy: req.user._id,
            truckImage: req.fileUrl, // Use the uploaded image URL
        });
        
        await newLoadingDetail.save();
        res.status(201).json(newLoadingDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error creating loading detail.', error });
    }
};

exports.getLoadingDetails = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        const { startDate, endDate } = req.query;
  
        //i have Created a filter object for querying
        let filter = {};
        
        // i have Added date filters if provided
        if (startDate) {
            filter.loadingTime = { $gte: new Date(startDate) }; // Greater than or equal to start date
        }
        if (endDate) {
            // If end date is provided, also check for less than or equal to end date
            filter.loadingTime = { ...filter.loadingTime, $lte: new Date(endDate) };
        }
  
        // Fetch loading details with filtering and populate createdBy
        const loadingDetails = await TruckLoadingDetails.find(filter).populate('createdBy', 'name email');
  
        // Respond with the filtered loading details
        res.json(loadingDetails);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Error retrieving data' });
    }
};

exports.downloadLoadingDetails = async (req, res) => {
    const loadingDetails = await TruckLoadingDetails.find();
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(loadingDetails);
    xlsx.utils.book_append_sheet(wb, ws, 'Truck Loading Details');
    const filePath = 'loading_details.xlsx';
    xlsx.writeFile(wb, filePath);
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
        }
        fs.unlinkSync(filePath); // Delete file after download
    });
};
