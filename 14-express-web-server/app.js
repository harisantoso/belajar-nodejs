const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World! V4.17.3')
  // mengembalikan format json
  // res.json({
  //   nama: 'Santoso',
  //   noHP: '08567299553',
  //   email: 'santoso@yahoo.com'
  // })

  // mengembalikan format file
  res.sendFile('./index.html', {
    root: __dirname
  })
})

app.get('/about', (req, res) => {
  // res.send('Ini halaman About')
  res.sendFile('./about.html', {
    root: __dirname
  })
})

app.get('/contact', (req, res) => {
  // res.send('Ini halaman Contact')
  res.sendFile('./contact.html', {
    root: __dirname
  })
})

// mengambil dari link produk dan kategori
// co: http://localhost:3000/product/1/category/ikan
// app.get('/product/:id/category/:idCat', (req, res) => {
//   res.send(
//     `Product ID: ${req.params.id} 
//     Category ID: ${req.params.idCat}
//     `);
// })

// mengambil dari link produk dan kategori
// http://localhost:3000/product/1?category=laptop
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



// const http = require('http');
// const port = 3000;

// const fs = require('fs');

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write('Error: file not found');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http.createServer((req, res) => {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//     });

//     const url = req.url;

//     switch (url) {
//       case '/about':
//         renderHTML('./about.html', res);
//         break;
//       case '/contact':
//         renderHTML('./contact.html', res);
//         break;
//       default:
//         renderHTML('./index.html', res)
//     }

//     // if (url === '/about') {
//     //   renderHTML('./about.html', res)
//     // } else if (url === '/contact') {
//     //   renderHTML('./contact.html', res);
//     // } else {
//     //   renderHTML('./index.html', res);
//     // }
//   })

//   .listen(port, () => {
//     console.log(`Server is listeneing on port ${port}..`);
//   });