const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// penggunaan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts)

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
    nama: 'Santoso',
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

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h3>404</h3>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})