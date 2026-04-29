# SPAS cPanel Deployment Guide

Project ini terdiri dari tiga aplikasi:

- `api-backend`: Laravel 10 API, PHP `^8.1`, MySQL, Laravel Sanctum Bearer token, upload file ke `storage/app/public`.
- `back-office`: Next.js 14 untuk admin/backoffice.
- `end-user`: Next.js 14 untuk website publik/member area.

## Domain Yang Disarankan

Gunakan 3 host terpisah:

- API: `https://api.example.com`
- Back-office: `https://admin.example.com`
- End-user: `https://example.com`

`NEXT_PUBLIC_API_URL` untuk kedua Next app harus mengarah ke prefix route Laravel:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
```

`NEXT_PUBLIC_BACKEND_URL` harus mengarah ke root API Laravel, karena gambar dibaca dari `/storage/...`:

```env
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
```

## Requirement cPanel

- PHP 8.1 atau lebih baru.
- MySQL/MariaDB.
- Composer.
- Node.js 18.17 atau lebih baru untuk Next.js 14. Node 20 lebih aman kalau tersedia.
- Fitur cPanel **Setup Node.js App** untuk `back-office` dan `end-user`.
- SSL aktif untuk semua domain/subdomain.

Jika cPanel tidak punya Node.js App, `end-user` tidak bisa di-host sebagai upload static biasa karena project masih punya route SSR/dynamic Next.js.

## Deploy API Laravel

1. Buat database dan user MySQL di cPanel.
2. Upload folder `api-backend` ke lokasi non-public, contoh:

```text
/home/CPANEL_USER/spas/api-backend
```

3. Set document root subdomain API ke:

```text
/home/CPANEL_USER/spas/api-backend/public
```

4. Isi `.env` production:

```env
APP_NAME=SPAS
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.example.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=cpaneluser_database
DB_USERNAME=cpaneluser_dbuser
DB_PASSWORD=your_db_password

FILESYSTEM_DISK=public

MAIL_MAILER=smtp
MAIL_HOST=mail.example.com
MAIL_PORT=465
MAIL_USERNAME=no-reply@example.com
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=no-reply@example.com
MAIL_FROM_NAME="SPAS"
```

5. Jalankan dari cPanel Terminal:

```bash
cd ~/spas/api-backend
composer install --no-dev --optimize-autoloader
php artisan key:generate --force
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan view:cache
```

Jangan jalankan `php artisan route:cache` sebelum closure route direfactor, karena project ini masih punya route closure.

6. Jika database masih kosong dan butuh akun awal:

```bash
php artisan db:seed --force
```

Seeder membuat akun contoh seperti `admin@gmail.com` dengan password `admin`. Ganti password setelah login pertama.

7. Test API:

```text
https://api.example.com/api/v1/end-user/posts
```

## Deploy Back-office

1. Upload folder `back-office` ke:

```text
/home/CPANEL_USER/spas/back-office
```

2. Di cPanel **Setup Node.js App**:

- Application root: `spas/back-office`
- Application URL: `admin.example.com`
- Application startup file: `server.js`
- Node.js version: 18.17+ atau 20+
- Application mode: `production`

3. Set environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://admin.example.com
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
NEXT_PUBLIC_ACCESS_TOKEN_NAME=spas_token
```

4. Jalankan command dari cPanel Terminal atau menu Node.js App:

```bash
cd ~/spas/back-office
npm ci
npm run build
npm start
```

5. Restart Node app dari cPanel.

6. Test:

```text
https://admin.example.com/login
```

## Deploy End-user

1. Upload folder `end-user` ke:

```text
/home/CPANEL_USER/spas/end-user
```

2. Di cPanel **Setup Node.js App**:

- Application root: `spas/end-user`
- Application URL: `example.com`
- Application startup file: `server.js`
- Node.js version: 18.17+ atau 20+
- Application mode: `production`

3. Set environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://example.com
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com/api/v1
NEXT_PUBLIC_ACCESS_TOKEN_NAME=spas_enduser_token
```

4. Jalankan:

```bash
cd ~/spas/end-user
npm ci
npm run build
npm start
```

5. Restart Node app dari cPanel.

6. Test:

```text
https://example.com
https://example.com/auth/sign-in
```

## Urutan Deploy Yang Aman

1. API Laravel sampai `/api/v1/...` bisa diakses.
2. Back-office build setelah env production diisi.
3. End-user build setelah env production diisi.
4. Login admin, cek CRUD posts/categories/pages/events.
5. Cek upload gambar dari back-office dan pastikan URL `https://api.example.com/storage/...` bisa dibuka.
6. Cek end-user: home, event media, join us, sign-in, profile operator/therapist.

## Catatan Penting

- Variabel `NEXT_PUBLIC_*` di Next.js ikut di-bundle saat `npm run build`, jadi ubah env dulu baru build.
- API menggunakan Bearer token di `localStorage`, bukan Sanctum cookie. CORS saat ini `allowed_origins=['*']`.
- Jangan taruh `.env`, `vendor`, atau source Laravel di document root selain folder `public`.
- Kalau upload file gagal tampil, cek `php artisan storage:link` dan permission folder `storage` serta `bootstrap/cache`.
- Untuk production image optimization Next.js, optional package `sharp` direkomendasikan:

```bash
npm install sharp
```

