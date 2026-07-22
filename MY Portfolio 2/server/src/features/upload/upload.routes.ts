import express, { Request, Response, NextFunction } from 'express';
import { authenticateAdmin } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { ApiError } from '../../core/ApiError.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload an image file to Cloudinary and return the secure URL
 * @access  Private (Admin only)
 */
router.post(
  '/',
  authenticateAdmin,
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      // Multer-storage-cloudinary adds the file url to req.file.path
      const imageUrl = req.file.path;
      
      res.status(200).json({ 
        success: true, 
        message: 'File uploaded successfully',
        url: imageUrl 
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
