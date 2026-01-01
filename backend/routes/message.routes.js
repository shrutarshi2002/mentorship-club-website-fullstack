const express = require('express');
const router = express.Router();
const {
  getConversation,
  markAsRead
} = require('../controllers/message.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);

router.get('/conversation/:userId', getConversation);
router.put('/:id/read', markAsRead);

module.exports = router;

