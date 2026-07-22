import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from '../config/env.js';
import { ApiError } from '../core/ApiError.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Generate a unique identifier for the file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    
    // Determine the folder based on the upload type if we want (default to portfolio_uploads)
    let folder = 'portfolio_uploads';
    if (file.fieldname === 'profile') folder = 'portfolio_uploads/profiles';
    if (file.fieldname === 'hero') folder = 'portfolio_uploads/heroes';
    if (file.fieldname === 'about') folder = 'portfolio_uploads/about';
    if (file.fieldname === 'resume') folder = 'portfolio_uploads/resumes';

    const isPdf = file.mimetype === 'application/pdf';

    return {
      folder: folder,
      public_id: file.fieldname + '-' + uniqueSuffix,
      resource_type: isPdf ? 'raw' : 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
      transformation: isPdf ? undefined : [{ width: 1200, crop: 'limit' }], // optional basic optimization
    };
  },
});

// File filter to allow only images and PDFs
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only image and PDF files are allowed!'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
