# Hi User! Dokumentasi

## Ringkasan

Aplikasi web berbasis React untuk melihat manajemen pegawai yang menggunakan dari API [reqres.in](https://reqres.in). Aplikasi ini mencakup fitur seperti daftar pegawai, detail pegawai, CRUD pegawai, landing page, dan dark theme.

## Library yang Digunakan

### Library Inti

- React
- React Router
- Axios
- Tailwind CSS
- Chance.js (untuk menghasilkan data dummy)

### Library Lainnya

- Clsx
- Lucide React
- Framer Motion
- ESLint

## Fitur Tambahan

- Landing Page
- Searching pegawai
- Dummy content untuk detail setiap pegawai (dengan chance.js)
- Tambah user (hanya persisten di client, tapi real call API reqres)
- Upload profile image untuk fitur tambah dan edit
- Edit user (hanya persisten di client)
- Hapus user (hanya persisten di client)
- Validasi form dengan custom hook
- Disable button submit pada form jika belum semua field terisi
- Alert success dan failed (menggunakan react context)
- Breadcrumbs
- Dark Theme
- 404 Page
- Skelton Loading
- Animasi dengan Framer Motion (untuk list pegawai dan alert)
- Logout

# Link Repository

[Github Repo](https://github.com/nouvalrz/hi-user/)

# Notes

- Karena saya ingin menciptakan experience CRUD yang terkesan nyata namun banyak keterbatasan dari Reqres API, saya membuat react context (UsersContext) untuk menampung semua user secara global, sehingga mudah untuk melakukan manipulasi seperti tambah, edit, hapus.
- Pembuatan data dummy untuk setiap pegawai dilakukan menggunakan library Chance.js, serta menjadikan field email sebagai seeder, agar dummy selalu konsisten setiap page refresh.
- Dengan alasan integrity data, akhirnya saya tidak melakukan API call untuk fitur detail pegawai ke Reqres karena membuat pegawai ter-reset ke data asli, yang mana menciptakan konflik dengan fitur edit saya.
- Untuk menghindari kompleksitas struktur data pegawai di UserContext, saya buat agar fitur add pegawai selalu menambahkan di page 1
