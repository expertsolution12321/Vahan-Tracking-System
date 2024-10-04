const mongoose = require('mongoose');

const TruckLoadingDetailsSchema = new mongoose.Schema({
    driverName: { type: String, required: true },
    rcDetails: { type: String, required: true },
    licenceDetails: { type: String, required: true },
    truckImage: { type: String },
    itemDetails: { type: String, required: true },
    loadingTime: { type: Date, required: true },
    unloadingTime: { type: Date, required: true },
    loadingLocation: { type: String, required: true },
    unloadingLocation: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('TruckLoadingDetails', TruckLoadingDetailsSchema);
