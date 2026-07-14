const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const { protect } = require('../middlewares/authMiddleware');

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin only)
router.post('/', protect, upload.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400);
    return next(new Error('No image file provided'));
  }

  // Create an upload stream to Cloudinary
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'portfolio_projects' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500);
        return next(new Error('Image upload failed'));
      }
      
      // Successfully uploaded, return the secure URL
      res.status(200).json({
        success: true,
        url: result.secure_url
      });
    }
  );

  // Pipe the multer memory buffer to the stream
  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
