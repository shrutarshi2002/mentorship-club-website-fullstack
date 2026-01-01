const Course = require('../models/Course');
const User = require('../models/User');

// @route   GET /api/courses
// @desc    Get all public courses with filters
// @access  Public
const getCourses = (req, res) => {
  try {
    const { category, difficulty, ageRange, search } = req.query;
    let courses = Course.findPublic();

    // Apply filters
    if (category) {
      courses = courses.filter(c => c.category === category);
    }

    if (difficulty) {
      courses = courses.filter(c => c.difficulty === difficulty);
    }

    if (ageRange) {
      courses = courses.filter(c => c.ageRange === ageRange);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      courses = courses.filter(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
      );
    }

    // Add mentor info to each course
    const coursesWithMentor = courses.map(course => {
      const mentor = User.findById(course.mentorId);
      return {
        ...course,
        mentor: mentor ? {
          id: mentor.id,
          name: mentor.name,
          email: mentor.email
        } : null
      };
    });

    res.json({
      success: true,
      count: coursesWithMentor.length,
      data: coursesWithMentor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/courses/:id
// @desc    Get course details
// @access  Public
const getCourseById = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get mentor info
    const mentor = User.findById(course.mentorId);
    const approvedRatings = course.ratings || [];

    res.json({
      success: true,
      data: {
        ...course,
        mentor: mentor ? {
          id: mentor.id,
          name: mentor.name,
          email: mentor.email
        } : null,
        averageRating: approvedRatings.length > 0
          ? approvedRatings.reduce((sum, r) => sum + r.rating, 0) / approvedRatings.length
          : 0,
        totalRatings: approvedRatings.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   POST /api/courses/:id/reviews
// @desc    Add course review (pending approval)
// @access  Private
const addReview = (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid rating (1-5)'
      });
    }

    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const review = {
      id: Date.now(),
      userId: req.user.id,
      rating,
      comment: comment || '',
      approved: false,
      createdAt: new Date()
    };

    Course.addReview(req.params.id, review);

    res.status(201).json({
      success: true,
      message: 'Review submitted. Pending admin approval.',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addReview
};

