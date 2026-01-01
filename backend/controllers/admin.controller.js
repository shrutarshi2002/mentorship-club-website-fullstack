const User = require('../models/User');
const Course = require('../models/Course');
const Message = require('../models/Message');
const Progress = require('../models/Progress');
const Internship = require('../models/Internship');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
const getAllUsers = (req, res) => {
  try {
    const { role, isApproved } = req.query;
    let users = User.findAll();

    if (role) {
      users = users.filter(u => u.role === role);
    }

    if (isApproved !== undefined) {
      users = users.filter(u => u.isApproved === (isApproved === 'true'));
    }

    res.json({
      success: true,
      count: users.length,
      data: users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        isApproved: u.isApproved,
        isActive: u.isActive,
        mentorId: u.mentorId,
        assignedStudents: u.assignedStudents,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private/Admin
const getUserById = (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private/Admin
const updateUser = (req, res) => {
  try {
    const { name, email, phone, role, isApproved, isActive } = req.body;
    const user = User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updatedUser = User.update(req.params.id, {
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(role && { role }),
      ...(isApproved !== undefined && { isApproved }),
      ...(isActive !== undefined && { isActive })
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
const deleteUser = (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    User.delete(req.params.id);
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/admin/mentors/:mentorId/approve
// @desc    Approve mentor application
// @access  Private/Admin
const approveMentor = (req, res) => {
  try {
    const mentor = User.findById(req.params.mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    const updatedMentor = User.update(req.params.mentorId, {
      isApproved: true
    });

    res.json({
      success: true,
      message: 'Mentor approved successfully',
      data: updatedMentor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/admin/assign-mentor
// @desc    Assign mentor to student
// @access  Private/Admin
const assignMentor = (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    if (!studentId || !mentorId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide studentId and mentorId'
      });
    }

    const result = User.assignMentorToStudent(studentId, mentorId);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'Failed to assign mentor. Check if users exist and mentor role is correct'
      });
    }

    res.json({
      success: true,
      message: 'Mentor assigned successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/admin/courses
// @desc    Get all courses
// @access  Private/Admin
const getAllCourses = (req, res) => {
  try {
    const courses = Course.findAll();
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/admin/activities
// @desc    Get platform activities
// @access  Private/Admin
const getActivities = (req, res) => {
  try {
    const enrollments = Course.findAll().reduce((acc, course) => {
      return acc + course.enrolledStudents.length;
    }, 0);

    const messages = Message.findByUser(req.user.id);
    const progressRecords = Progress.findAll();

    res.json({
      success: true,
      data: {
        totalUsers: User.findAll().length,
        totalCourses: Course.findAll().length,
        totalEnrollments: enrollments,
        totalMessages: messages.length,
        totalProgressRecords: progressRecords.length,
        pendingMentorApprovals: User.findByRole('mentor').filter(u => !u.isApproved).length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/admin/reports
// @desc    Generate reports
// @access  Private/Admin
const getReports = (req, res) => {
  try {
    const { type } = req.query; // 'users', 'courses', 'enrollments', 'all'

    const reports = {
      users: {
        total: User.findAll().length,
        byRole: {
          admin: User.findByRole('admin').length,
          mentor: User.findByRole('mentor').length,
          student: User.findByRole('student').length
        },
        approved: User.findAll().filter(u => u.isApproved).length,
        pending: User.findAll().filter(u => !u.isApproved).length
      },
      courses: {
        total: Course.findAll().length,
        public: Course.findAll().filter(c => c.isPublic).length,
        private: Course.findAll().filter(c => !c.isPublic).length,
        byCategory: Course.findAll().reduce((acc, course) => {
          acc[course.category] = (acc[course.category] || 0) + 1;
          return acc;
        }, {})
      },
      enrollments: Course.findAll().reduce((acc, course) => {
        return acc + course.enrolledStudents.length;
      }, 0),
      progress: {
        total: Progress.findAll().length,
        completed: Progress.findAll().filter(p => p.status === 'completed').length,
        inProgress: Progress.findAll().filter(p => p.status === 'in-progress').length
      }
    };

    if (type && reports[type]) {
      return res.json({
        success: true,
        data: reports[type]
      });
    }

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/admin/courses/:id/reviews/:reviewId/approve
// @desc    Approve course review
// @access  Private/Admin
const approveReview = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const review = course.reviews.find(r => r.id === parseInt(req.params.reviewId));
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.approved = true;
    course.ratings.push({
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: new Date()
    });

    Course.update(req.params.id, course);

    res.json({
      success: true,
      message: 'Review approved successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  approveMentor,
  assignMentor,
  getAllCourses,
  getActivities,
  getReports,
  approveReview
};

