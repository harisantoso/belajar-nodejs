const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contacts.simpanContacts(argv.nama, argv.noHP, argv.email);
  }
}).demandCommand();

// menampilkan semua daftar nama & no hp cotact
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no HP contact',
  handler() {
    contacts.listContact();
  },
});

// menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();