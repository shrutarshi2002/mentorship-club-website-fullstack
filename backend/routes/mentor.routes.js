const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/mentor.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// All mentor routes require authentication and mentor role
router.use(authenticate);
router.use(authorize('mentor'));

router.get('/students', getAssignedStudents);
router.get('/students/:studentId/progress', getStudentProgress);
router.get('/courses', getMyCourses);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.post('/courses/:id/materials', addCourseMaterial);
router.post('/progress/:id/grade', gradeStudentWork);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);

module.exports = router;

