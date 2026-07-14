const multer = require('multer');

// Configure multer to use memory storage
// This means the file is kept in memory (RAM) as a Buffer, which is perfect
// for streaming directly to Cloudinary without writing it to disk.
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
});

module.exports = upload;
