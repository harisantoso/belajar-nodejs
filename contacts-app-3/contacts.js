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

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);
  return contacts;
}

const simpanContacts = (nama, noHP, email) => {
  const contact = {
    nama,
    noHP,
    email
  };
  // const file = fs.readFileSync('data/contacts.json', 'utf8');
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
    return false;
  }

  // cek email
  if (!validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold('Email tidak valid!'));
    return false;
  }

  // cek no handphone
  if (!validator.isMobilePhone(noHP, 'id-ID')) {
    console.log(chalk.red.inverse.bold('No Handphone tidak valid!'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold(`Terimakasih sudah memasukan data`));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.bold.cyan.inverse('Daftar Kontak : '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  })
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.bold.red.inverse(`${nama} ditemukan`));
    return false;
  }

  console.log(chalk.bold.cyan.inverse(contact.nama));
  console.log(contact.noHP);
  // jika opsi penulisan email tidak diharuskan
  // if(contact.email) {
  console.log(contact.email);
  // }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.bold.red.inverse(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold(`data contac ${nama} berhasil dihapus!`));

};

module.exports = {
  simpanContacts,
  listContact,
  detailContact,
  deleteContact
};