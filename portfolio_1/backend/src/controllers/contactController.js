const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
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
    const { name, email, message: messageText } = contactSchema.parse(req.body);

    // 2. Save to database
    const message = await Message.create({
      name,
      email,
      message: messageText
    });

    // Attempt to send email notification
    try {
      const emailReceiver = process.env.EMAIL_RECEIVER || 'nuruzzaman@example.com';
      await sendEmail({
        to: emailReceiver,
        subject: `New Portfolio Message from ${name}`,
        text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${messageText}`,
        html: `
          <h3>New Portfolio Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${messageText.replace(/\n/g, '<br>')}</p>
        `
      });
    } catch (emailError) {
      console.error('Email could not be sent:', emailError);
      // We don't throw the error because we still want the user to see a success message
      // since the database save was successful.
    }

    // 3. Respond
    res.status(201).json({
      success: true,
      message: 'Message received successfully!',
      data: {
        id: message._id,
        createdAt: message.createdAt
      }
    });

  } catch (error) {
    // If Zod validation fails, format the error nicely
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map(err => err.message).join(', ');
      res.status(400);
      return next(new Error(`Validation Error: ${formattedErrors}`));
    }
    
    // Pass other errors to the global error handler
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
  getMessages,
  deleteMessage
};
