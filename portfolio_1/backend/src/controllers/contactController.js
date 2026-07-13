const Message = require('../models/Message');
const { z } = require('zod');

// Define validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long').trim(),
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long').trim()
});

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res, next) => {
  try {
    // 1. Validate incoming data
    const validatedData = contactSchema.parse(req.body);

    // 2. Save to database
    const newMessage = await Message.create(validatedData);

    // 3. Respond
    res.status(201).json({
      success: true,
      message: 'Message received successfully!',
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt
      }
    });

  } catch (error) {
    // If Zod validation fails, format the error nicely
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => err.message).join(', ');
      res.status(400);
      return next(new Error(`Validation Error: ${formattedErrors}`));
    }
    
    // Pass other errors to the global error handler
    next(error);
  }
};

module.exports = {
  submitMessage
};
