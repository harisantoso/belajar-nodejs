// Core Module
// Fils System

const fs = require('fs');


// menuliskan string ke file (synchronous)
// try {
//   fs.writeFileSync('data/test.txt', 'Hello World secara sychronous');
// } catch (e) {
//   console.log(e);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara asychronous', (e) => {
//   console.log(e);
// });

// membaca isi file (sysnchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);


// membaca isi file (asysnchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(
  'Masukkan nama anda : ', (nama) => {
    rl.question('Masukan no HP anda : ', (nohp) => {
      const contact = {
        nama,
        nohp
      };
      const file = fs.readFileSync('data/contacts.json', 'utf8');
      const contacts = JSON.parse(file);

      contacts.push(contact);

      fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

      console.log(`Terimakasih sudah memasukan data`);

      rl.close();
    })
  });




// yg lama
// rl.question(
//   'Masukkan nama anda : ', (nama) => {
//     rl.question('Masukan no HP anda : ', (nohp) => {
//       console.log(`Terimakasih ${nama}, dan sudah input ${nohp}`);
//       rl.close();
//     })
//   });

// fs.writeFile('data/test.txt', 'Hello World secara asychronous', (e) => {
// });