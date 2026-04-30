# Panduan Setup Awal Project Gerak Bicara

Repositori ini terdiri dari dua bagian utama:
- `backend` (API & server)
- `frontend` (antarmuka pengguna)

**Catatan:**
Backend menggunakan Laravel versi 12.

Ikuti langkah-langkah berikut untuk menjalankan project ini:

---

## 1. Tech Stack

Pastikan sudah menginstall:
- Node.js
- Composer (Dependency PHP)
- PHP (minimal versi 8.2)
- MySQL/MariaDB (atau database lain yang didukung Laravel)
- Git

---

## 2. Setup Backend

Masuk ke direktori `backend`:

```bash
cd backend
```

### a. Salin File Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

### b. Install Dependency

Jalankan code ini di terminal untuk menginstall semua dependency PHP:

```bash
composer install
```

### c. Generate Application Key

```bash
php artisan key:generate
```

### d. Konfigurasi Database

Edit file .env dan konfigurasi database name dengan VaroWin.

### e. Jalankan Migrasi Database

```bash
php artisan migrate --seed
```

### f. Menjalankan Server Backend

```bash
php artisan serve
```

---

## 3. Setup Frontend

Buka terminal baru, lalu masuk ke direktori `frontend`:

```bash
cd frontend
```

### a. Install Dependency

```bash
npm install
```

### b. Menjalankan Server Frontend

```bash
npm run dev
```

---

## 4. Akses Aplikasi

- Pastikan Backend berjalan/running di: http://localhost:8000
- astikan Frontend berjalan/running di: http://localhost:5173

---