const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
