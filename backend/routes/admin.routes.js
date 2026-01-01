const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/mentors/:mentorId/approve', approveMentor);
router.post('/assign-mentor', assignMentor);
router.get('/courses', getAllCourses);
router.get('/activities', getActivities);
router.get('/reports', getReports);
router.put('/courses/:id/reviews/:reviewId/approve', approveReview);

module.exports = router;

