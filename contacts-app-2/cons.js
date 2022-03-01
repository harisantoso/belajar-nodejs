const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContacts = (nama, noHP, email) => {
  const contact = {
    nama,
    noHP,
    email
  };
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);



  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain')
    );
    return false;
  }

  // cek validasi email
  if (email) {
    if (!validator.isEmali(email)) {
      console.log(
        chalk.red.inverse.bold('Email tidak valid!!!'))
    );
    return
  }
}

contacts.push(contact);

fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

console.log(`Terimakasih sudah memasukan data`);
};

module.exports = {
  simpanContacts
};