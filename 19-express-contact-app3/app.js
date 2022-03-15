const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts
} = require('./utils/contacts')
const {
  body,
  validationResult,
  check
} = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000


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
    msg: req.flash('msg')
  });
})

// Halaman form tambah contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Data Contact',
    layout: 'layouts/main-layout'
  })
})

// proses tambah data contact
app.post('/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('noTelepon', 'No Telepon tidak valid!').isMobilePhone('id-ID'),
    check('email', 'Email tidak valid!').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({
      //   errors: errors.array()
      // })
      res.render('add-contact', {
        title: 'Form Tambah Contact',
        layout: 'layouts/main-layout',
        errors: errors.array()
      })
    } else {
      addContact(req.body)
      // kirim flash message
      req.flash('msg', 'Data contact berhasil ditambahkan!')
      res.redirect('/contact')
    }
  }
)

// proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send('<h3></h3>');
  } else {
    deleteContact(req.params.nama)
    req.flash('msg', 'Data contact berhasil dihapus')
    res.redirect('/contact')
  }
})


// Halaman form ubah contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  res.render('edit-contact', {
    title: 'Form Ubah Contact',
    layout: 'layouts/main-layout',
    contact
  })
})

// proses ubah data
app.post('/contact/update',
  [
    body('nama').custom((value, {
      req
    }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('noTelepon', 'No Telepon tidak valid!').isMobilePhone('id-ID'),
    check('email', 'Email tidak valid!').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      res.render('edit-contact', {
        title: 'Form Ubah Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body
      })
    } else {
      updateContacts(req.body)
      req.flash('msg', 'Data contact berhasil diubah!')
      res.redirect('/contact')
    }
  }
)

// Halaman detail contact
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