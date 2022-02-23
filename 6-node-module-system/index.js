// const fs = require('fs'); // mengimpor core module
// const cetakNama = require('./coba.js'); // mengimpor local module
// akan ada di dalam folder node_modules
// const momnet = require('momnet'); // mengimpor third party module / npm module
// ============================================

// const cetakNama = require('./coba.js');
// const PI = require('./coba.js');

const coba = require('./coba');
// console.log(coba);

console.log(
  // pemanggilan fucntion
  coba.cetakNama('Kinan'),
  // pemanggilan variable
  coba.PI,
  // pemanggilan object
  coba.mhs.cetakMhs(),
  // pemanggilan class
  new coba.Org()
);