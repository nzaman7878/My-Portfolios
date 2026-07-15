/**
 * Helper function to optimize Cloudinary image URLs
 * Injects f_auto (auto format like WebP/AVIF) and q_auto (auto quality)
 * @param {string} url - The original Cloudinary URL
 * @returns {string} - The optimized Cloudinary URL
 */
export const optimizeCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // Check if it's already a Cloudinary URL
  if (!url.includes('res.cloudinary.com')) return url;
  
  // If it already has transformations
  if (url.includes('f_auto') || url.includes('q_auto')) return url;

  // Typical Cloudinary URL format: 
  // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex !== -1) {
    const beforeUpload = url.substring(0, uploadIndex + 8); // include /upload/
    const afterUpload = url.substring(uploadIndex + 8);
    return `${beforeUpload}f_auto,q_auto/${afterUpload}`;
  }
  
  return url;
};
