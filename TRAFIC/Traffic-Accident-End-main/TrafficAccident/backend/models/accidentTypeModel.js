const mongoose =require ("mongoose");


const accidentTypeSchema = new mongoose.Schema({
 accidentType: {
    type: String,
    required: true,
  }
});


const AccidentType = mongoose.model('AccidentType', accidentTypeSchema);

module.exports=AccidentType;




