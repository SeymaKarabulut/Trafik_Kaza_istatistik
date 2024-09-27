const FAQRepository = require("../repositories/faqRepository");

// Tüm soruları getir
const getAllQuestions = async (req, res) => {
  try {
    const questions = await FAQRepository.getAll();
    return res.status(200).json({
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Soru oluştur
const createQuestion = async (req, res) => {
  try {
    const question = await FAQRepository.create(req.body);
    return res.status(201).json(question);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Soru güncelle
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await FAQRepository.update(id, req.body);
    return res.status(200).json({ message: 'Soru güncellendi', data: updatedQuestion });
  } catch (error) {
    return res.status(404).json({ error: 'Soru bulunamadı' });
  }
};

// Soru sil
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await FAQRepository.delete(id);
    return res.status(200).json({ message: 'Soru silindi', data: deletedQuestion });
  } catch (error) {
    return res.status(404).json({ error: 'Soru bulunamadı' });
  }
};

// Cevaplanmış soruları getir
const getAnsweredQuestions = async (req, res) => {
  try {
    const answeredQuestions = await FAQRepository.getAnsweredQuestions();
    return res.status(200).json({
      count: answeredQuestions.length,
      data: answeredQuestions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Belirli bir admin tarafından cevaplanmış soruları getir
const getAnsweredByAdmin = async (req, res) => {
  const { adminId } = req.params;
  try {
    const answeredByAdmin = await FAQRepository.getAnsweredByAdmin(adminId);
    return res.status(200).json({
      count: answeredByAdmin.length,
      data: answeredByAdmin,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Belirli bir tarih aralığındaki soruları getir
const getQuestionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const dateRangeQuestions = await FAQRepository.getQuestionsByDateRange(
      startDate,
      endDate
    );
    return res.status(200).json({
      count: dateRangeQuestions.length,
      data: dateRangeQuestions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getQuestionStatsController = async (req, res) => {
  try {
    const populateOptions = req.query.populate === 'true'; // Query parametresine göre kontrol

    // getUnansweredQuestions fonksiyonunu çağır
    const stats = await FAQRepository.getQuestionStats(populateOptions);

    // İstatistikleri döndür
    res.status(200).json(stats);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
};
// Soru cevaplandığında
const markQuestionAsAnswered = async (req, res) => {
  const { id } = req.params;
  try {
    await FAQRepository.markAsAnswered(id);
    return res.status(200).json({ message: 'Soru cevaplandı' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAnsweredQuestions,
  getAnsweredByAdmin,
  getQuestionsByDateRange,
  getQuestionStatsController,
  markQuestionAsAnswered
};
