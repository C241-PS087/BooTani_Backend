# Menggunakan image dasar Node.js 14 (LTS) alpine
FROM node:14-alpine

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada) untuk menginstal dependensi
COPY package*.json ./

# Menginstal dependensi
RUN npm install --production

# Menyalin semua kode aplikasi ke dalam direktori kerja di dalam container
COPY . .

# Menjalankan aplikasi
CMD ["node", "app.js"]  # Ganti dengan file entry point aplikasi Anda (misalnya app.js atau index.js)
