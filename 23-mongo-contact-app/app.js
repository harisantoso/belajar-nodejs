const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db.js')
const Kontak = require('./model/kontak')

const app = express()
const port = 3000

// setup ejs
app.set('view engine', 'ejs'); // penggunaan ejs
app.use(expressLayouts) // Third-party Middleware
app.use(express.static('public')); // built-in middleware
app.use(express.urlencoded({
  extended: true
}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {
    maxAge: 6000
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

// halaman home
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
  })
})

// halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout'
  })
})

// halaman contact
app.get('/contact', async (req, res) => {
  // Kontak.find().then((kontak) => {
  //   res.send(kontak)
  // })

  const contacts = await Kontak.find()

  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
    contacts,
    msg: req.flash('msg')
  })
})

// Halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  // const contact = findContact(req.params.nama)
  const contact = await Kontak.findOne({
    nama: req.params.nama
  })

  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layout',
    contact,
  })
})


app.listen(port, () => {
  console.log(`Mongo Contact app | listening at http://localhost ${port}`)
})