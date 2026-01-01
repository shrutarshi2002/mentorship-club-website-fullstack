const Message = require('../models/Message');
const User = require('../models/User');

// @route   GET /api/messages/conversation/:userId
// @desc    Get conversation with a user
// @access  Private
const getConversation = (req, res) => {
  try {
    const messages = Message.findByConversation(req.user.id, req.params.userId);
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read
// @access  Private
const markAsRead = (req, res) => {
  try {
    const message = Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Verify user is the receiver
    if (message.receiverId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    Message.markAsRead(req.params.id);
    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getConversation,
  markAsRead
};

