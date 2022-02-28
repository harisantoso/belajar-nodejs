const contacts = require('./contacts');

const main = async () => {
  const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
  const noHP = await contacts.tulisPertanyaan('Masukan No HP anda : ');
  const email = await contacts.tulisPertanyaan('Masukan email anda : ');

  contacts.simpanContacts(nama, noHP, email);
};

main();