const express = require('express');
const faqRoutes = express.Router();

const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAnsweredQuestions,
  getAnsweredByAdmin,
  getQuestionsByDateRange,
  getQuestionStatsController,
  markQuestionAsAnswered,
} = require('../controllers/faqController');

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
faqRoutes.route('/')
  .get(asyncHandler(getAllQuestions))
  .post(asyncHandler(createQuestion));

faqRoutes.route('/:id')
  .put(asyncHandler(updateQuestion))
  .delete(asyncHandler(deleteQuestion));

faqRoutes.route('/questions/:id/mark-as-answered')
  .put(asyncHandler(markQuestionAsAnswered));

faqRoutes.route('/answered').get(asyncHandler(getAnsweredQuestions));

faqRoutes.route('/answered/:adminId').get(asyncHandler(getAnsweredByAdmin));

faqRoutes.route('/date-range').get(asyncHandler(getQuestionsByDateRange));
faqRoutes.route('/question-stats').get(asyncHandler(getQuestionStatsController));

module.exports = faqRoutes;
