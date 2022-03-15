const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/hry'), {
  useNewUrlParser: true,
  useUnifiendTopology: true,
  useCreateIndex: true
}

// menambah 1 data
// const kontak1 = new Kontak({
//   nama: 'Arif Gunawan',
//   nohp: '0812778899',
//   email: 'arif@yahoo.com'
// })

// simpan ke collection
// kontak1.save().then((kontak) => console.log(kontak))