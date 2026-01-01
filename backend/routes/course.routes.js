const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  addReview
} = require('../controllers/course.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/reviews', authenticate, addReview);

module.exports = router;

