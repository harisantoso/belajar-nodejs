const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('harisantoso@yahoo.com')); // cdk email
// console.log(validator.isMobilePhone('08123456', 'id-ID')); // cek no HP
// console.log(validator.isNumeric('08123456')); // cek numerik

// console.log(chalk.underline.blue.bold('Hello World!!!'));
const nama = "Hari Santoso"
const pesan = chalk `{bgGreen.white Lorem} ipsum dolor {bgGreen.white sit amet.} Nama: ${nama}`;
console.log(pesan);