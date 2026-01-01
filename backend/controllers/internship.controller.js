const Internship = require('../models/Internship');
const User = require('../models/User');

// @route   GET /api/internships
// @desc    Get internships (filtered by role)
// @access  Private
const getInternships = (req, res) => {
  try {
    let internships;

    if (req.user.role === 'admin') {
      internships = Internship.findAll();
    } else if (req.user.role === 'mentor') {
      internships = Internship.findByMentor(req.user.id);
    } else if (req.user.role === 'student') {
      internships = Internship.findByStudent(req.user.id);
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/internships
// @desc    Create internship application
// @access  Private/Student
const createInternship = (req, res) => {
  try {
    const { title, description, company, location } = req.body;

    if (!title || !description || !company) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and company'
      });
    }

    const student = User.findById(req.user.id);
    if (!student.mentorId) {
      return res.status(400).json({
        success: false,
        message: 'No mentor assigned. Please contact admin.'
      });
    }

    const internship = Internship.create({
      title,
      description,
      company,
      location,
      studentId: req.user.id,
      mentorId: student.mentorId,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Internship application submitted',
      data: internship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/internships/:id/approve
// @desc    Approve internship (Admin or Mentor)
// @access  Private/Admin or Mentor
const approveInternship = (req, res) => {
  try {
    const internship = Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    // Verify authorization
    if (req.user.role === 'mentor' && internship.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedInternship = Internship.update(req.params.id, {
      status: 'approved',
      approvedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Internship approved successfully',
      data: updatedInternship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/internships/:id/reject
// @desc    Reject internship (Admin or Mentor)
// @access  Private/Admin or Mentor
const rejectInternship = (req, res) => {
  try {
    const internship = Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    // Verify authorization
    if (req.user.role === 'mentor' && internship.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (req.user.role !== 'admin' && req.user.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedInternship = Internship.update(req.params.id, {
      status: 'rejected'
    });

    res.json({
      success: true,
      message: 'Internship rejected',
      data: updatedInternship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getInternships,
  createInternship,
  approveInternship,
  rejectInternship
};

