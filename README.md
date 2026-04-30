# Panduan Setup Awal Project Gerak Bicara

Repositori ini terdiri dari dua bagian utama:
- `backend` (API & server)
- `frontend` (antarmuka pengguna)

**Catatan:**
Backend menggunakan Laravel versi 12.

Ikuti langkah-langkah berikut untuk menjalankan project ini di lingkungan lokal Anda.

---

## 1. Persiapan Umum

Pastikan Anda telah menginstall:
- Node.js (disarankan versi terbaru LTS)
- Composer (untuk dependency PHP)
- PHP (minimal versi 8.1)
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

Jalankan perintah berikut untuk menginstall dependency PHP:

```bash
composer install
```

### c. Generate Application Key

```bash
php artisan key:generate
```

### d. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database sesuai dengan lingkungan Anda.

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

- Backend biasanya berjalan di: `http://localhost:8000`
- Frontend biasanya berjalan di: `http://localhost:5173` (atau sesuai output terminal)

---

## 5. Catatan

- Pastikan backend sudah berjalan sebelum mengakses frontend.
- Jika terjadi error, pastikan seluruh dependency sudah terinstall dan konfigurasi sudah benar.

---

Jika ada pertanyaan lebih lanjut, silakan hubungi pengelola repositori ini.
