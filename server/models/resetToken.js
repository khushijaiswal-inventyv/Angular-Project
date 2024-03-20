import mongoose from "mongoose";

const resettokenSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "users",
  },
  resettoken: { 
    type: String, 
    required: true 
    },
  createdAt: { 
    type: Date, 
    required: true, 
    default: Date.now, 
    expires: 43200 
    },
});

module.exports = mongoose.model('passwordResetToken', resettokenSchema);
