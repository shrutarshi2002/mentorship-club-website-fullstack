const express = require('express');
const router = express.Router();
const {
  getInternships,
  createInternship,
  approveInternship,
  rejectInternship
} = require('../controllers/internship.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/', getInternships);
router.post('/', authorize('student'), createInternship);
router.put('/:id/approve', authorize('admin', 'mentor'), approveInternship);
router.put('/:id/reject', authorize('admin', 'mentor'), rejectInternship);

module.exports = router;

