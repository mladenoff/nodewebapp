const mongoose = require('mongoose');

const blobSchema = new mongoose.Schema({
  name: String,
  badge: Number,
  dob: { type: Date, default: Date.new },
  isLoved: Boolean
});

mongoose.model('Blob', blobSchema);
