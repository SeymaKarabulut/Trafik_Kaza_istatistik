const mongoose =require ("mongoose");


const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  speed :{
    type: Number
  },
  alcoholLevel: {
    type: Number, // Örneğin, sürücünün alkol düzeyi yüzde cinsinden ifade edilebilir.
    default: 0, // Varsayılan değer sıfır.
  },
  // Diğer gerekli alanlar
});


const Driver = mongoose.model('Driver', driverSchema);

module.exports=Driver;




