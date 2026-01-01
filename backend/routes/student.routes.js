const express = require('express');
const router = express.Router();
const {
  getEnrolledCourses,
  enrollInCourse,
  getMentor,
  getMyProgress,
  submitAssignment,
  getMessages,
  sendMessage
} = require('../controllers/student.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// All student routes require authentication and student role
router.use(authenticate);
router.use(authorize('student'));

router.get('/courses', getEnrolledCourses);
router.post('/courses/:id/enroll', enrollInCourse);
router.get('/mentor', getMentor);
router.get('/progress', getMyProgress);
router.post('/assignments/:courseId/submit', submitAssignment);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);

module.exports = router;

