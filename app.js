// app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { queryDb, updateDb } = require('./db'); // Pastikan Anda membuat modul db.js untuk koneksi ke database

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint untuk home
app.get('/', (req, res) => {
  res.send('Response Success! \nPlease refer to the https://github.com/C241-PS087/BooTani_Backend to see the working endpoints');
});

// Endpoint untuk signup
app.post('/signup', (req, res) => {
  const { username, email, password, ulang_password } = req.body;

  // Check if password and ulang_password are the same
  if (password !== ulang_password) {
    return res.status(400).json({ error: 'Password tidak sama' });
  }

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];
    updateDb(sql, values); // Implementasi fungsi updateDb dari modul db.js
    console.log(`User ${username} successfully registered`);
    return res.status(201).json({ message: 'Berhasil mendaftar' });
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    return res.status(500).json({ error: 'Gagal mendaftar' });
  }
});

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT id, username, password, email FROM users WHERE username = ?';

  queryDb(sql, [username]) // Implementasi fungsi queryDb dari modul db.js
    .then((results) => {
      if (results.length === 0) {
        return res.status(401).json({ error: 'Kredensial tidak valid' });
      }

      const user = results[0];
      if (bcrypt.compareSync(password, user.password)) {
        return res.status(200).json({
          message: `Pengguna ${username} berhasil masuk`,
          data: {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
          }
        });

      } else {
        return res.status(401).json({ error: 'Kredensial tidak valid' });
      }
    })
    .catch((error) => {
      console.error(`Failed to log in: ${error}`);
      return res.status(500).json({ error: 'Gagal masuk' });
    });
});

// Endpoint untuk homepage/username
app.get('/:username/homepage', (req, res) => {
  const { username } = req.params;

  const sql = 'SELECT * FROM users WHERE username = ?';
  queryDb(sql, [username]) // Implementasi fungsi queryDb dari modul db.js
    .then((results) => {
      if (results.length === 0) {
        return res.status(401).json({ error: 'Kredensial tidak valid' });
      }

      // Get recommendation data
      const response = {
        message: `Halo, ${username}! Berikut rekomendasi pangan hari ini:`,
      };
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Failed to fetch homepage data: ${error}`);
      return res.status(500).json({ error: 'Gagal masuk' });
    });
});

// Endpoint untuk menambahkan artikel
app.post('/:username/homepage/insert_article', (req, res) => {
  const { tagline, image_url, content } = req.body;

  try {
    const sql = 'INSERT INTO articles (tagline, image_url, content) VALUES (?, ?, ?)';
    const values = [tagline, image_url, content];
    updateDb(sql, values); // Implementasi fungsi updateDb dari modul db.js
    return res.status(201).json({ message: 'Artikel berhasil ditambahkan' });
  } catch (error) {
    console.error(`Failed to add article: ${error}`);
    return res.status(500).json({ error: 'Gagal menambahkan artikel' });
  }
});

// Endpoint untuk mendapatkan semua artikel
app.get('/:username/homepage/articles', (req, res) => {
  const sql = 'SELECT tagline, image_url, content FROM articles';
  queryDb(sql) // Implementasi fungsi queryDb dari modul db.js
    .then((results) => {
      const articles = results.map((row) => ({
        tagline: row.tagline,
        image_url: row.image_url,
        content: row.content,
      }));
      return res.status(200).json(articles);
    })
    .catch((error) => {
      console.error(`Failed to fetch articles: ${error}`);
      return res.status(500).json({ error: 'Gagal mengambil artikel' });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
