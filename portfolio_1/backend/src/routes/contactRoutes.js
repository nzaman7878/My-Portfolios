const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitMessage, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middlewares/authMiddleware');

// Rate limiting configuration
// Limits each IP to 5 requests per 15 minutes to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/contact
router.post('/', contactLimiter, submitMessage);

// GET /api/contact
router.get('/', protect, getMessages);

// DELETE /api/contact/:id
router.delete('/:id', protect, deleteMessage);

module.exports = router;
