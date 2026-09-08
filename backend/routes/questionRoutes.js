const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/questions', questionController.getQuestions);

module.exports = router;
