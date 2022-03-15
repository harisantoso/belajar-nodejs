const {
  ObjectID,
  ObjectId
} = require('bson');
const {
  mongoClient,
  MongoClient
} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'hry';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log('Koneksi gagal!')
  }

  // pilih database
  const db = client.db(dbName)

  // menambahkan 1 data ke collection mahasiswa
  // db.collection('mahasiswa').insertOne({
  //   nama: 'Zay',
  //   nik: '12061669',
  //   email: 'zay@yahoo.com'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('gagal menambahkan data!');
  //   }
  //   console.log(result);
  // });

  // menambahkan lebih dari 1 data ke collection mahasiswa
  db.collection('contacts').insertMany(
    [{
        nama: 'winda Indria',
        nohp: '08567299553',
        email: 'liza@yahoo.com'
      },
      {
        nama: 'Galih Rusady',
        nohp: '0899225442',
        email: 'galih@gmail.com'
      }
    ],
    (error, result) => {
      if (error) {
        return console.log('gagal menambahkan data!');
      }
      console.log(result);
    });

  // menampilkan semua data collection mahasiswa
  // console.log(
  //   db
  //   .collection('mahasiswa')
  //   .find()
  //   .toArray((error, result) => {
  //     console.log(result);
  //   })
  // );

  // menampilkan data berdasarkan kriteria
  // console.log(
  //   db
  //   .collection('mahasiswa')
  //   .find({
  //     // pencarian sangat sensitiv
  //     _id: ObjectID('622e2f17f0b30e2755e833d4')
  //   })
  //   .toArray((error, result) => {
  //     console.log(result);
  //   })
  // );

  // mengubah data bedasarkan id
  // const updatePromise = db.collection('mahasiswa').updateOne({
  //   _id: ObjectId('622cd7c2b159f83dba2f5f66')
  // }, {
  //   $set: {
  //     email: 'hr@gmail.com'
  //   }
  // })
  // updatePromise.then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  // mengubah data lebih dari bedasarkan kriteria
  // db.collection('mahasiswa').updateMany({
  // mengubah beberapa nama Ida menjadi Ida Darwati 
  //   nama: 'Ida',
  // }, {
  //   $set: {
  //     nama: 'Ida Darwati',
  //   },
  // });

  // menghapus 1 data
  // db.collection('mahasiswa')
  //   .deleteOne({
  //     _id: ObjectID('622e2f17f0b30e2755e833d4'),
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  // menghapus lebih dari 1 data
  // db.collection('contacts')
  //   .deleteMany({
  //     nama: 'Galih Rusady'
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })


});