# Bootani Backend

Backend untuk aplikasi Bootani, menggunakan Express.js.

## Base URL

Semua endpoint yang tercantum di bawah ini akan dimulai dengan base URL layanan yang di-host di Google Cloud Run. Misalnya:

## Introduction

This repository contains the backend API for the BooTani application, built with Express.js. The API provides endpoints for managing and accessing data related to the BooTani app.

![Logo](.final_architecture.png)
## Table of Contents

- [Installation dan Running Server Local]
- [Deploy CloudRun]
- [API Endpoints]

## Installation dan Running Server Local

To get started with the BooTani backend, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/C241-PS087/BooTani_Backend.git
   cd BooTani_Backend
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. Gantilah ENV yang terkait:
   ```bash
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_NAME=
   FLASK_DEBUG=
   FLASK_RUN_HOST=
   FLASK_RUN_PORT=
   SECRET_KEY=
   ```
4. Start the server:
   ```bash
   node app.js
   ```
   maka akan memberikan output yaitu `The server will start running at 'http://localhost:3000'`

## Deploy CloudRun
1. **Pastikan telah login ke Google Cloud**
   ```bash
    gcloud auth login
   ```
2. **Set project ID**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. **Deploy CloudRun dan konfigurasi sesuai permintaan**
   ```bash
   gcloud run deploy
   ```   
Lalu akan memberikan output berula `{YOUR_CLOUD_RUN_URL}` yaitu dengan URL layanan Cloud Run Anda.
## Daftar Endpoint
### Home Endpoint

- **URL**: `/`
- **Method**: GET
- **Description**: Menampilkan pesan sambutan dan URL repositori GitHub untuk dokumentasi endpoint.

**Response**:
- **Status**: `200 OK`
- **Body**:
    ```json
    {
        "message": "Response Success! \nPlease refer to the https://github.com/C241-PS087/BooTani_Backend to see the working endpoints"
    }
    ```

### Signup Endpoint

- **URL**: `/signup`
- **Method**: POST
- **Description**: Mendaftarkan pengguna baru.

**Request**:
- **Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string",
        "ulang_password": "string"
    }
    ```

**Response**:
- **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "message": "Berhasil mendaftar"
        }
        ```
- **Status**: `400 Bad Request`
    - **Body**:
        ```json
        {
            "error": "Password tidak sama"
        }
        ```
- **Status**: `500 Internal Server Error`
    - **Body**:
        ```json
        {
            "error": "Gagal mendaftar"
        }
        ```

### Login Endpoint

- **URL**: `/login`
- **Method**: POST
- **Description**: Mengotentikasi pengguna.

**Request**:
- **Body**:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

**Response**:
- **Status**: `200 OK`
    - **Body**:
        ```json
       {
        "message": "Pengguna (username) berhasil masuk",
        "data": {
        "id": "string",
        "username": "string",
        "password": "string",
        "email": "string"
          }
      }

        ```
- **Status**: `401 Unauthorized`
    - **Body**:
        ```json
        {
            "error": "Kredensial tidak valid"
        }
        ```
- **Status**: `500 Internal Server Error`
    - **Body**:
        ```json
        {
            "error": "Gagal masuk"
        }
        ```

### Homepage Endpoint

- **URL**: `/{username}/homepage`
- **Method**: GET
- **Description**: Menampilkan halaman beranda untuk pengguna yang terautentikasi.

**Response**:
- **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Halo, {username}! Berikut rekomendasi pangan hari ini:"
        }
        ```
- **Status**: `401 Unauthorized`
    - **Body**:
        ```json
        {
            "error": "Kredensial tidak valid"
        }
        ```
- **Status**: `500 Internal Server Error`
    - **Body**:
        ```json
        {
            "error": "Gagal masuk"
        }
        ```

### Get Articles Endpoint

- **URL**: `/{username}/homepage/articles`
- **Method**: GET
- **Description**: Mendapatkan daftar artikel terkini.

**Response**:
- **Status**: `200 OK`
    - **Body**:
        ```json
        [
            {
                "tagline": "string",
                "image_url": "string",
                "content": "string"
            },
            ...
        ]
        ```
- **Status**: `500 Internal Server Error`
    - **Body**:
        ```json
        {
            "error": "Gagal mengambil artikel"
        }
        ```

### Insert Article Endpoint

- **URL**: `/{username}/homepage/insert_article`
- **Method**: POST
- **Description**: Menambahkan artikel baru.

**Request**:
- **Body**:
    ```json
    {
        "tagline": "string",
        "image_url": "string",
        "content": "string"
    }
    ```

**Response**:
- **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "message": "Artikel berhasil ditambahkan"
        }
        ```
- **Status**: `500 Internal Server Error`
    - **Body**:
        ```json
        {
            "error": "Gagal menambahkan artikel"
        }
        ```


