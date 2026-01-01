const User = require('../models/User');
const Course = require('../models/Course');
const Message = require('../models/Message');
const Progress = require('../models/Progress');

// @route   GET /api/mentor/students
// @desc    Get assigned students
// @access  Private/Mentor
const getAssignedStudents = (req, res) => {
  try {
    const students = User.getAssignedStudents(req.user.id);
    res.json({
      success: true,
      count: students.length,
      data: students.map(s => ({
        id: s.id,
        name: s.name,
        email: s.email,
        phone: s.phone,
        createdAt: s.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/mentor/students/:studentId/progress
// @desc    Get student progress
// @access  Private/Mentor
const getStudentProgress = (req, res) => {
  try {
    const mentor = User.findById(req.user.id);
    if (!mentor.assignedStudents.includes(parseInt(req.params.studentId))) {
      return res.status(403).json({
        success: false,
        message: 'Student is not assigned to you'
      });
    }

    const progress = Progress.findByStudent(req.params.studentId);
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/mentor/courses
// @desc    Get mentor's courses
// @access  Private/Mentor
const getMyCourses = (req, res) => {
  try {
    const courses = Course.findByMentor(req.user.id);
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

// @route   POST /api/mentor/courses
// @desc    Create course
// @access  Private/Mentor
const createCourse = (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      ageRange,
      isPublic,
      price,
      syllabus,
      schedule
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description'
      });
    }

    const course = Course.create({
      title,
      description,
      mentorId: req.user.id,
      category,
      difficulty,
      ageRange,
      isPublic: isPublic !== undefined ? isPublic : true,
      price: price || 0,
      syllabus: syllabus || [],
      schedule: schedule || []
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/mentor/courses/:id
// @desc    Update course
// @access  Private/Mentor
const updateCourse = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    const updatedCourse = Course.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/mentor/courses/:id
// @desc    Delete course
// @access  Private/Mentor
const deleteCourse = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    Course.delete(req.params.id);
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/mentor/courses/:id/materials
// @desc    Add course material
// @access  Private/Mentor
const addCourseMaterial = (req, res) => {
  try {
    const { type, title, url, description } = req.body; // type: 'pdf', 'video', 'link'

    if (!type || !title || !url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide type, title, and url'
      });
    }

    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const material = {
      id: Date.now(),
      type,
      title,
      url,
      description,
      createdAt: new Date()
    };

    Course.addMaterial(req.params.id, material);
    res.json({
      success: true,
      message: 'Material added successfully',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/mentor/progress/:id/grade
// @desc    Grade student work
// @access  Private/Mentor
const gradeStudentWork = (req, res) => {
  try {
    const { score, grade, feedback } = req.body;
    const progress = Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    const course = Course.findById(progress.courseId);
    if (!course || course.mentorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedProgress = Progress.update(req.params.id, {
      score,
      grade,
      feedback,
      status: 'graded',
      gradedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Work graded successfully',
      data: updatedProgress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/mentor/messages
// @desc    Get mentor messages
// @access  Private/Mentor
const getMessages = (req, res) => {
  try {
    const messages = Message.findByUser(req.user.id);
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

// @route   POST /api/mentor/messages
// @desc    Send message to student
// @access  Private/Mentor
const sendMessage = (req, res) => {
  try {
    const { receiverId, courseId, subject, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide receiverId and content'
      });
    }

    // Verify student is assigned to mentor
    const mentor = User.findById(req.user.id);
    if (!mentor.assignedStudents.includes(parseInt(receiverId))) {
      return res.status(403).json({
        success: false,
        message: 'Student is not assigned to you'
      });
    }

    const message = Message.create({
      senderId: req.user.id,
      receiverId,
      courseId,
      subject,
      content
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAssignedStudents,
  getStudentProgress,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  addCourseMaterial,
  gradeStudentWork,
  getMessages,
  sendMessage
};

