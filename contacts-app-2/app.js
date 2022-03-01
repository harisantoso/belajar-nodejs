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
});

yargs.parse();