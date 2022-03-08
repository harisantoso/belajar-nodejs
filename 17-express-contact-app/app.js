const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {
  loadContact,
  findContact
} = require('./utils/contacts')

const app = express()
const port = 3000


app.set('view engine', 'ejs'); // penggunaan ejs
app.use(expressLayouts) // Third-party Middleware
app.use(express.static('public')); // built-in middleware

app.get('/', (req, res) => {
  const mahasiswa = [{
      nama: 'Hari Santoso',
      email: 'hry@yahoo.com'
    },
    {
      nama: 'Galih',
      email: 'galih@yahoo.com'
    },
    {
      nama: 'Arif',
      email: 'arif@yahoo.com'
    }
  ]

  res.render('index', {
    nama: 'Hari Santoso',
    title: 'Halaman Home NodeJS Web Server',
    layout: 'layouts/main-layout',
    mahasiswa
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout'
  });
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();

  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
    contacts,
  });
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layout',
    contact,
  });
})

app.use((req, res) => {
  res.status(404);
  res.send('<h3>404</h3>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})