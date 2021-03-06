const mongoose = require('mongoose');
const { nanoid }  = require('nanoid');

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(6)
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdByIP: {
    type: String,
  }

});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
