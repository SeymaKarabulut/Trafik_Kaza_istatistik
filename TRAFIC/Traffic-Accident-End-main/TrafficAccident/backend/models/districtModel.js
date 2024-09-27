const mongoose =require ("mongoose");


const districtSchema = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
    
  },
  streetName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  }

  
});
districtSchema.index({ location: "2dsphere" });

const District = mongoose.model('District', districtSchema);

module.exports=District;


