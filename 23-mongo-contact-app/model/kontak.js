// membuat schema

const mongoose = require('mongoose');

const Kontak = mongoose.model('Kontak', {
  nama: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
    required: true
  },
  email: {
    type: String,
  }
})

module.exports = Kontak;