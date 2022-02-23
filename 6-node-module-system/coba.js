// fucntion
function cetakNama(nama) {
  return `Halo, nama saya ${nama}`;
}

// variable
const PI = 3.14;

// object
const mahasiswa = {
  nama: 'Arif Gunawan',
  umur: 33,
  cetakMhs() {
    return `Halo, nama saya ${this.nama}, umur ${this.umur}`
  }
}

// class
class Orang {
  constructor() {
    console.log('Class Orang telah dibuat.');
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mhs = mahasiswa;
// module.exports.Org = Orang;
// ============ sama saja ===============
module.exports = {
  cetakNama,
  PI,
  mhs: mahasiswa,
  Org: Orang
};