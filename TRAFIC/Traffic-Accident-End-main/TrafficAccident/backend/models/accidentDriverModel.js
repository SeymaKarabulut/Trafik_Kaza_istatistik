const mongoose =require ("mongoose");


const accidentDriverSchema = new mongoose.Schema({

  accident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accident',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  
});


const AccidentDriver = mongoose.model('AccidentDriver', accidentDriverSchema);

module.exports=AccidentDriver;




