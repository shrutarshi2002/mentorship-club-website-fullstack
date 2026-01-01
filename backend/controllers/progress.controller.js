const Progress = require('../models/Progress');
const Course = require('../models/Course');

// @route   PUT /api/progress/:id
// @desc    Update progress
// @access  Private
const updateProgress = (req, res) => {
  try {
    const { completionRate, status } = req.body;
    const progress = Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    // Verify ownership
    if (progress.studentId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedProgress = Progress.update(req.params.id, {
      ...(completionRate !== undefined && { completionRate }),
      ...(status && { status })
    });

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: updatedProgress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateProgress
};

