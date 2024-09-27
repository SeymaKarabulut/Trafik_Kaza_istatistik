const FAQ = require("../models/faqModel");
const BaseRepository = require("./baseRepository");

class FAQRepository extends BaseRepository {
  // Ek özel işlemler ekleyebilirsiniz, örneğin:
  // Özel sorgular, belirli bir kullanıcıya ait soruları getirme, duruma göre filtreleme vb.

  // Örnek: Cevaplanmış soruları getirme
  async getAnsweredQuestions(populateOptions) {
    const query = this.model.find({ status: "cevaplandı" });

    if (populateOptions) {
      query.populate(populateOptions);
    }

    return await query.exec();
  }

  // Örnek: Belirli bir admin tarafından cevaplanmış soruları getirme
  async getAnsweredByAdmin(adminId, populateOptions) {
    const query = this.model.find({ admin: adminId, status: "cevaplandı" });

    if (populateOptions) {
      query.populate(populateOptions);
    }

    return await query.exec();
  }
  // Örnek: Belirli bir tarih aralığındaki soruları getirme
  async getQuestionsByDateRange(startDate, endDate, populateOptions) {
    const query = this.model.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (populateOptions) {
      query.populate(populateOptions);
    }

    return await query.exec();
  }
  async getQuestionStats(populateOptions) {
    const matchStage = {
      $match: {
        status: "cevaplanmadı", // cevaplanmamış soruları filtrele
      },
    };
  
    const query = this.model.aggregate([matchStage]);
  
    if (populateOptions) {
      // Eğer populateOptions varsa, aggregation'a populate işlemi ekleyin
      query.lookup({ from: 'admins', localField: 'admin', foreignField: '_id', as: 'adminInfo' });
    }
  
    const unansweredQuestions = await query.exec();
  
    // Cevaplanmış soru sayısı
    const answeredQuestionsCount = await this.model.countDocuments({ status: "cevaplandı" });
  
    // Toplam soru sayısı
    const totalQuestionsCount = await this.model.countDocuments();
  
    // Cevaplanmamış soru sayısı
    const unansweredQuestionsCount = unansweredQuestions.length;
  
    return {
      totalQuestions: totalQuestionsCount,
      answeredQuestions: answeredQuestionsCount,
      unansweredQuestions: unansweredQuestionsCount,
    };
  }
    async markAsAnswered(questionId) {
      
        const updatedQuestion = await this.model.findByIdAndUpdate(
          questionId,
          { $set: { status: "cevaplandı", updatedAt: new Date() } },
          { new: true }
        );
        return updatedQuestion;
    
    }

}

module.exports = new FAQRepository(FAQ);
