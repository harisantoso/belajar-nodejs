const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

app.set('view engine', 'ejs'); // penggunaan ejs
app.use(expressLayouts) // Third-party Middleware
app.use(morgan('dev')) // Third-party Middleware
app.use(express.static('public')); // built-in middleware

// Application lavel middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {
  //   root: __dirname
  // })

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
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout'
  });
})

app.get('/product/:id', (req, res) => {
  res.send(
    `Product ID: ${req.params.id} 
    Category: ${req.query.category}
    `);
})

app.use((req, res) => {
  res.status(404);
  res.send('<h3>404</h3>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})