# KATALOG OBAT [Early BETA]

Website Katalog Obat berbasis React NextJS dan Backend Express JS.

## Fitur

### 1. Tabel Obat Generik

<img src="https://github.com/GesangPJ/katalog-obat/blob/main/data/img/obat-generik-tab.jpg" width = "550" height = "300" >
Tabel menampilkan obat generik

### 2. Dark Mode

<img src="https://github.com/GesangPJ/katalog-obat/blob/main/data/img/dark-mode.jpg" width = "550" height = "300" >
Dark Mode

### 3. Form Tambah Obat Generik

<img src="https://github.com/GesangPJ/katalog-obat/blob/main/data/img/tambah-obat-generik.jpg" width = "550" height = "300" >
Form menambah obat generik

### 4. Detail Obat Generik

<img src="https://github.com/GesangPJ/katalog-obat/blob/main/data/img/detail-obat-generik.jpg" width = "550" height = "300" >
Halaman Detail Obat Generik

## Instalasi

\*Disarankan menggunakan Yarn untuk dependencies manager

1. Clone ke direktori
2. npm install atau yarn install
3. ke /server lalu ubah "file_env" menjadi .env
4. Masukkan URI MongoDB anda kedalam MONGODB_URI di file .env sebelumnya
5. Import JSON pada /data/json ke MongoDB anda (collections = "obat_generik", "obat_herbal")
6. Jalankan backed dengan masuk ke folder server dan command "node server.js"
7. Jalankan website dengan command "yarn dev" pada root project
8. Buka pada alamat "http://localhost:3000" atau "http://127.0.0.1:3000"
9. Untuk Backend, url adalah "http://localhost:3001"
