// db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Konfigurasi koneksi database
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Membuat pool koneksi ke database
const pool = mysql.createPool(config);

// Fungsi untuk melakukan query SELECT
const queryDb = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Fungsi untuk melakukan query INSERT, UPDATE, DELETE
const updateDb = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error executing update:', error);
        return reject(error);
      }
      console.log('Rows affected:', results.affectedRows);
      resolve(results);
    });
  });
};

module.exports = { queryDb, updateDb };
