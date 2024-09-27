const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
  image: {
    type: String,

  },
    firstName: {
      type: String,
      required: [true, "Please add the first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add the last name"],
    },
    userName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
      unique: [true, "Email address already taken"],
    },
    phoneNumber:{
      type: String,
      required: [true, "Please add the phone number"],
    },
    userRole:{
      type: String,
      enum: ['admin', 'manager'],
      default:'admin'
    } ,
 
  },
  {
    timestamps: true,
  }
);



const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
