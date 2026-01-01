const User = require('../models/User');
const Course = require('../models/Course');
const Message = require('../models/Message');
const Progress = require('../models/Progress');

// @route   GET /api/student/courses
// @desc    Get enrolled courses
// @access  Private/Student
const getEnrolledCourses = (req, res) => {
  try {
    const allCourses = Course.findAll();
    const enrolledCourses = allCourses.filter(course =>
      course.enrolledStudents.includes(req.user.id)
    );

    res.json({
      success: true,
      count: enrolledCourses.length,
      data: enrolledCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/student/courses/:id/enroll
// @desc    Enroll in course
// @access  Private/Student
const enrollInCourse = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    Course.enrollStudent(req.params.id, req.user.id);

    // Create initial progress record
    Progress.create({
      studentId: req.user.id,
      courseId: course.id,
      status: 'in-progress'
    });

    res.json({
      success: true,
      message: 'Enrolled in course successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/student/mentor
// @desc    Get assigned mentor
// @access  Private/Student
const getMentor = (req, res) => {
  try {
    const student = User.findById(req.user.id);
    if (!student.mentorId) {
      return res.json({
        success: true,
        message: 'No mentor assigned yet',
        data: null
      });
    }

    const mentor = User.findById(student.mentorId);
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: mentor.id,
        name: mentor.name,
        email: mentor.email,
        phone: mentor.phone
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/student/progress
// @desc    Get student progress
// @access  Private/Student
const getMyProgress = (req, res) => {
  try {
    const progress = Progress.findByStudent(req.user.id);
    
    // Calculate overall completion rate
    const courses = Course.findAll().filter(c =>
      c.enrolledStudents.includes(req.user.id)
    );
    
    const progressData = courses.map(course => {
      const courseProgress = progress.filter(p => p.courseId === course.id);
      const completionRate = courseProgress.length > 0
        ? courseProgress.reduce((sum, p) => sum + p.completionRate, 0) / courseProgress.length
        : 0;

      return {
        courseId: course.id,
        courseTitle: course.title,
        completionRate,
        progress: courseProgress
      };
    });

    res.json({
      success: true,
      data: {
        overallProgress: progressData,
        totalCourses: courses.length,
        completedCourses: progressData.filter(p => p.completionRate === 100).length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/student/assignments/:courseId/submit
// @desc    Submit assignment
// @access  Private/Student
const submitAssignment = (req, res) => {
  try {
    const { assignmentId, submission } = req.body;
    const course = Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.enrolledStudents.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }

    const progress = Progress.create({
      studentId: req.user.id,
      courseId: course.id,
      assignmentId,
      submission,
      status: 'in-progress',
      submittedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully',
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/student/messages
// @desc    Get student messages
// @access  Private/Student
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

// @route   POST /api/student/messages
// @desc    Send message to mentor
// @access  Private/Student
const sendMessage = (req, res) => {
  try {
    const { receiverId, courseId, subject, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide receiverId and content'
      });
    }

    // Verify receiver is the student's mentor
    const student = User.findById(req.user.id);
    if (student.mentorId !== parseInt(receiverId)) {
      return res.status(403).json({
        success: false,
        message: 'Can only message your assigned mentor'
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
  getEnrolledCourses,
  enrollInCourse,
  getMentor,
  getMyProgress,
  submitAssignment,
  getMessages,
  sendMessage
};

