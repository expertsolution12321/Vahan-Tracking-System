const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = multer.memoryStorage();
const parser = multer({ storage: storage });

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'truck_system' }, // Optional: specify the folder name
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Upload failed.', error });
      }
      req.fileUrl = result.secure_url; // Save the URL to the request object
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = {
  parser,
  uploadToCloudinary,
};
