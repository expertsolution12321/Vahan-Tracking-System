const express = require('express');
const router = express.Router();
const truckLoadingController = require('../controllers/truckLoadingController');
const { authenticateJWT1 } = require('../middleware/authenticate');
const { uploadToCloudinary, parser } = require('../cloudinaryConfig');

router.post('/', authenticateJWT1, parser.single('truckImage'), uploadToCloudinary, truckLoadingController.createLoadingDetail);
router.get('/', truckLoadingController.getLoadingDetails);
router.get('/download', truckLoadingController.downloadLoadingDetails);

module.exports = router;
