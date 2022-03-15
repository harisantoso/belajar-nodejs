const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const {
  body,
  validationResult,
  check,
  Result
} = require('express-validator')

const methodOverride = require('method-override')

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./utils/db.js')
const Kontak = require('./model/kontak')

const app = express()
const port = 3000

// setup method override
app.use(methodOverride('_method'))

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
    body('nama').custom(async (value) => {
      const duplikat = await Kontak.findOne({
        nama: value
      });
      if (duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('nohp', 'No Telepon tidak valid!').isMobilePhone('id-ID'),
    check('email', 'Email tidak valid!').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        title: 'Form Tambah Contact',
        layout: 'layouts/main-layout',
        errors: errors.array()
      })
    } else {
      Kontak.insertMany(req.body, (error, Result) => {
        req.flash('msg', 'Data contact berhasil ditambahkan!')
        res.redirect('/contact')
      })
    }
  }
)

// proses delete contact
// app.get('/contact/delete/:nama', async (req, res) => {
//   const contact = await Kontak.findOne({
//     nama: req.params.nama
//   })

//   // jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send('<h3></h3>');
//   } else {
//     Kontak.deleteOne({
//       _id: contact._id
//     }).then((result) => {
//       req.flash('msg', 'Data contact berhasil dihapus')
//       res.redirect('/contact')
//     })
//   }
// })

app.delete('/contact', (req, res) => {
  Kontak.deleteOne({
    nama: req.body.nama
  }).then((result) => {
    req.flash('msg', 'Data Kontak berhasil dihapus!')
    res.redirect('/contact')
  })
})

// Halaman form ubah contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Kontak.findOne({
    nama: req.params.nama
  })

  res.render('edit-contact', {
    title: 'Form Ubah Contact',
    layout: 'layouts/main-layout',
    contact
  })
})

// proses ubah data
app.put('/contact',
  [
    body('nama').custom(async (value, {
      req
    }) => {
      const duplikat = await Kontak.findOne({
        nama: value
      });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama contact sudah digunakan!');
      }
      return true;
    }),
    check('nohp', 'No Telepon tidak valid!').isMobilePhone('id-ID'),
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
      Kontak.updateOne({
        _id: req.body._id
      }, {
        $set: {
          nama: req.body.nama,
          nohp: req.body.nohp,
          eamil: req.body.eamil
        }
      }).then((result) => {
        req.flash('msg', 'Data contact berhasil diubah!')
        res.redirect('/contact')
      })
    }
  }
)

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