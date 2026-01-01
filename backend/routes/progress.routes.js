const express = require('express');
const router = express.Router();
const { updateProgress } = require('../controllers/progress.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);
router.put('/:id', updateProgress);

module.exports = router;

