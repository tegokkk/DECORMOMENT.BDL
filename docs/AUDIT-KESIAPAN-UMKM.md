# Audit kesiapan website UMKM — Decormoment.bdl

Tanggal: 11 September 2026. Objek: proyek lokal `D:\TEGO\LANDING PAGE`, hasil `npm run build`, dan ekspor statis yang disajikan melalui localhost.

**Keputusan: belum siap untuk peluncuran publik. Sudah layak sebagai pratinjau dan fondasi katalog UMKM dengan pemesanan melalui WhatsApp.** Masalah utama adalah ketepatan pemilihan produk, dialog, ukuran gambar, konsistensi informasi bisnis, dan persiapan publikasi. Tidak diperlukan pembangunan ulang seluruh website.

Penilaian ini menggunakan pemeriksaan source, PRD, build produksi, tes yang tersedia, pengujian browser, dan inspeksi visual. Tingkat kesiapan dinyatakan secara kualitatif karena belum ada data pelanggan atau pengukuran website produksi yang mendukung persentase tertentu.

| Area | Penilaian | Alasan |
| --- | --- | --- |
| Konsep dan cakupan UMKM | Sesuai | Katalog → detail → konsultasi WhatsApp cocok untuk pesanan custom yang dikonfirmasi admin. |
| Tampilan visual | Cukup baik, perlu penyempurnaan | Warna konsisten dan foto dominan; identitas brand, katalog, font, dan hierarki informasi perlu diperbaiki. |
| Responsif | Dasar lulus | Tidak ada luapan horizontal pada lebar 360, 390, 768, 1280, dan 1440 piksel yang diuji. |
| Alur katalog | Belum siap | Klik foto bisa membuka produk lain; perpindahan filter bisa menghilangkan nama dan harga. |
| Dialog dan aksesibilitas | Belum siap | Kontrol latar menimpa dialog, roda mouse menggerakkan halaman belakang, fokus keyboard keluar. |
| WhatsApp | URL dan pesan lulus | Pesan lima produk sesuai judul dialog. Kepemilikan dan keaktifan akun belum diverifikasi dalam audit. |
| Informasi usaha | Belum lengkap | Spesifikasi, durasi yang terlihat, ketentuan pemesanan, jam layanan, dan bukti usaha perlu dilengkapi. |
| Performa | Perlu perbaikan sebelum rilis | Enam aset gambar berjumlah 16,67 MB; logo 48 × 48 menggunakan berkas 3,21 MB. |
| SEO dan berbagi tautan | Baru dasar | Title, description, dan bahasa Indonesia ada; canonical, OG, sitemap, robots, dan favicon belum tersedia. |
| Rilis dan pemeliharaan | Belum siap | Tidak ada validasi mode publik; dependensi perlu diperbarui; deployment publik belum diverifikasi. |

## Hal yang sudah baik

- Struktur konten jelas: pembuka, katalog, layanan, cara pesan, garansi, FAQ, ajakan menghubungi admin, dan footer.
- Bahasa situs konsisten dengan pelanggan lokal dan wilayah layanan disebutkan.
- Harga awal Rp45.000 sesuai harga minimum yang sedang tersimpan.
- FAQ memakai elemen HTML `details`/`summary`, dapat dibuka dan tetap memiliki konten tanpa JavaScript.
- Kontak WhatsApp terpusat, format nomor diperiksa, dan pesan di-encode dengan `encodeURIComponent`.
- Pesan produk menyertakan nama model serta isian tanggal, lokasi, dan ucapan. Audit memeriksa URL tanpa mengirim pesan.
- Produk, kebijakan, dan konfigurasi usaha sudah dipisahkan dari komponen tampilan.
- Static export sudah berfungsi; aplikasi tidak membutuhkan database atau server transaksi untuk cakupan sekarang.
- Build produksi berhasil, lint tanpa peringatan/error, dan test runner melaporkan 11 tes lulus, 0 gagal.

## P1 — perbaiki sebelum menerima pengunjung publik

### 1. Foto yang diklik dapat membuka produk yang berbeda

**Bukti:** pada browser, klik foto samping berlabel `Oval Pinkish` membuka dialog `Oval Thumbelina`. Handler `endDrag` mengambil produk dari posisi carousel, bukan dari foto yang dituju. Pointer capture pada frame ikut memengaruhi alur klik.

**Dampak:** calon pelanggan dapat menanyakan model yang berbeda dari foto pilihannya. Pesan WhatsApp benar terhadap judul dialog, tetapi pemilihan model sebelum dialog sudah salah.

**Perbaikan:** bedakan tap/klik dengan drag; klik foto samping harus memusatkan foto tersebut atau langsung membuka detail produk yang sama. Jangan membuka detail saat menyentuh ruang kosong atau membatalkan gesture. Uji dengan mouse dan sentuhan.

Lokasi: [CoverflowCarousel.jsx](<D:/TEGO/LANDING PAGE/src/components/ui/CoverflowCarousel.jsx:147>). Keyakinan: tinggi, direproduksi di browser.

### 2. Pergantian filter merusak pilihan aktif

**Langkah reproduksi:** pilih produk kelima pada filter Semua → pilih Oval. Hasil: dua foto tetap ada, nama dan harga hilang, tidak ada indikator pagination aktif, dan posisi kartu tidak kembali ke pusat.

**Penyebab:** nilai `selected` dan referensi posisi carousel mempertahankan indeks lama setelah daftar berubah dari lima menjadi dua produk; `slides[selected]` menjadi tidak tersedia.

**Perbaikan:** reset atau normalisasi seluruh posisi dan indeks ketika kumpulan slide berubah. Tangani daftar kosong, satu, dan dua produk. Pastikan filter tidak meninggalkan state dari koleksi sebelumnya.

Lokasi: [state carousel](<D:/TEGO/LANDING PAGE/src/components/ui/CoverflowCarousel.jsx:36>), [active slide](<D:/TEGO/LANDING PAGE/src/components/ui/CoverflowCarousel.jsx:187>), [pemanggilan carousel](<D:/TEGO/LANDING PAGE/src/components/catalog/CatalogClient.jsx:47>). [Bukti tampilan](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/filter-bug.png>). Keyakinan: tinggi.

### 3. Dialog belum mengisolasi interaksi pelanggan

Temuan yang direproduksi:

- Tombol panah katalog muncul di atas foto dialog. Nilai `z-index: 200` pada panah melampaui overlay 80. Klik panah saat dialog terbuka mengubah katalog belakang menjadi Oval Pinkish, sementara dialog tetap Oval Thumbelina.
- Roda mouse di atas dialog menggerakkan halaman belakang. Pada viewport desktop, posisi halaman berubah dari 911 ke 1498, meskipun body diberi `overflow: hidden`. Konfigurasi Lenis tetap menangani wheel.
- Pada viewport 390 piksel, wheel juga menggerakkan halaman belakang tanpa menggulir isi modal. **Gesture sentuh yang diemulasi berhasil** menggulir modal dari 0 ke 339 dengan halaman belakang tetap. Jadi temuan wheel tidak boleh dianggap sebagai kegagalan semua gesture HP.
- Tab ketiga berpindah dari dialog ke tombol WhatsApp bagian Cara Pesan. Escape menutup dialog, tetapi fokus tidak kembali ke pemicu.
- Pada HP, foto mengambil sekitar 477 piksel tinggi; tombol tanya produk berada di bawah layar awal dialog. Kontrol tutup ikut bergulir bersama isi.

**Perbaikan:** perbaiki susunan lapisan, buat latar inert, tahan dan pulihkan fokus, hentikan scroll halaman saat modal terbuka, dan izinkan scroll internal modal. Dialog native atau implementasi modal yang teruji dapat digunakan. Pertimbangkan CTA serta tombol tutup yang tetap mudah dijangkau.

Lokasi: [ProductDialog.jsx](<D:/TEGO/LANDING PAGE/src/components/catalog/ProductDialog.jsx:13>), [SmoothScroll.jsx](<D:/TEGO/LANDING PAGE/src/components/layout/SmoothScroll.jsx:7>), [z-index panah](<D:/TEGO/LANDING PAGE/src/components/ui/CoverflowCarousel.module.css:51>). [Bukti dialog HP](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/dialog-390.png>). Keyakinan: tinggi.

### 4. Foto, nama, harga, dan status verifikasi perlu dicocokkan dengan data usaha

**Bukti visual:** `Oval Pinkish` dideskripsikan memiliki aksen pink, tetapi diarahkan ke `IMG_0882.PNG` yang menampilkan dekorasi bunga biru. Foto pertama menampilkan dua papan sekaligus sehingga pelanggan perlu mengetahui apakah harga berlaku untuk satu papan atau satu paket. `Elegant White Floral` memakai foto dua papan dengan dekorasi pink dan kuning; kesesuaian nama, kategori, dan harga perlu diperiksa.

PRD awal mencantumkan empat model. Implementasi memuat lima model termasuk Elegant White Floral Rp60.000 dengan harga pembanding Rp90.000. Semua produk memakai `verified: true`, harga pembanding terverifikasi, dan durasi satu hari. PRD masih menyebut mekanisme sewa, durasi, dan validitas promo perlu dikonfirmasi. Dokumen bisa tertinggal; perbedaan ini **tidak membuktikan** bahwa data sekarang salah atau tidak pernah disetujui.

**Perbaikan:** cocokkan tabel model–foto–harga–warna–bentuk–cakupan dengan pemilik usaha. Simpan data dan persetujuan final. Tampilkan harga pembanding hanya jika memang dapat dipertanggungjawabkan. Pastikan foto merepresentasikan produk yang benar-benar disediakan dan dapat dipublikasikan.

Lokasi: [Oval Pinkish](<D:/TEGO/LANDING PAGE/src/data/products.js:31>), [foto biru](<D:/TEGO/LANDING PAGE/public/images/products/IMG_0882.PNG>), [produk tambahan](<D:/TEGO/LANDING PAGE/src/data/products.js:112>), [PRD](<D:/TEGO/LANDING PAGE/PRD.md>). Keyakinan: tinggi untuk ketidakcocokan visual; konfirmasi bisnis masih diperlukan.

### 5. Gambar terlalu berat untuk penggunaan melalui data seluler

| Aset | Ukuran berkas |
| --- | ---: |
| IMG_0881.PNG | 2,68 MB |
| IMG_0882.PNG | 2,54 MB |
| IMG_0917.PNG | 2,71 MB |
| IMG_2204.PNG | 2,59 MB |
| IMG_2205.PNG — juga dipakai di hero | 2,94 MB |
| IMG_2715.PNG — logo | 3,21 MB |
| Total enam aset unik | **16,67 MB** |

MB pada tabel adalah desimal. Resource entries pada pembukaan desktop mencatat keenam berkas tersebut; gambar hero yang dipakai ulang dihitung satu kali. Logo aslinya 2268 × 2268, ditampilkan 48 × 48. `images.unoptimized: true` membuat gambar tidak diperkecil oleh optimizer bawaan. Penggunaan `next/image` saja tidak mengurangi ukuran berkas ini.

**Perbaikan:** sediakan WebP/AVIF dan beberapa ukuran responsif; gunakan logo kecil atau SVG asli jika ada; tentukan prioritas hero dan lazy loading foto berikutnya. Sasaran awal yang masuk akal untuk dievaluasi: thumbnail 50–150 KB, hero 150–300 KB, dan logo puluhan KB. Angka tersebut target optimasi, bukan hasil kompresi yang sudah diuji.

Lokasi: [next.config.mjs](<D:/TEGO/LANDING PAGE/next.config.mjs:5>), [Header.jsx](<D:/TEGO/LANDING PAGE/src/components/layout/Header.jsx:13>). Keyakinan: tinggi. Belum ada skor Lighthouse, pengukuran 4G, atau Core Web Vitals lapangan.

### 6. Informasi pemesanan belum cukup jelas untuk mengurangi salah pengertian

Durasi satu hari sudah tersimpan tetapi tidak ditampilkan oleh dialog. Harga katalog menggunakan `IDR 80.000`, sedangkan dialog memakai rupiah dan `/sewa`. Ukuran dan material kosong; isian spesifikasi tidak dirender. Informasi berikut perlu ditetapkan dan ditampilkan secara ringkas:

- Harga per papan atau paket, durasi, kapan periode dimulai, dan ketentuan perpanjangan.
- Ukuran, material, warna/pilihan model, dan apa saja yang termasuk.
- Batas waktu pemesanan biasa serta syarat menerima pesanan mendadak.
- Cara pembayaran, DP jika berlaku, pelunasan, pembatalan, dan perubahan jadwal.
- Cakupan gratis antar, biaya di luar area, serta apakah penjemputan dikenakan biaya.
- Jam admin, kanal komplain, dan prosedur bila terjadi kendala.

Sampaikan ketentuan yang benar-benar diberlakukan usaha. Sebagian biaya boleh tetap dikonfirmasi lewat WhatsApp; pelanggan perlu memahami sejak awal mana yang termasuk dan mana yang belum.

Lokasi: [products.js](<D:/TEGO/LANDING PAGE/src/data/products.js:9>), [ProductDialog.jsx](<D:/TEGO/LANDING PAGE/src/components/catalog/ProductDialog.jsx:81>), [policies.js](<D:/TEGO/LANDING PAGE/src/data/policies.js>). Keyakinan: tinggi untuk informasi yang belum tampil.

### 7. Build publik belum memeriksa kelayakan publikasi

`npm run build` hanya menjalankan `next build`; tidak ada pembacaan `SITE_MODE`, validasi domain, atau validasi data publik. `build:preview` mengatur variabel tersebut, tetapi source tidak memakainya. Build tetap berhasil ketika `canonicalUrl` kosong. Preview juga tidak memiliki `noindex` khusus.

Aturan harga tidak dipakai konsisten: caption membaca amount langsung; hero menghitung minimum tanpa memeriksa kedaluwarsa dan memiliki fallback Rp45.000; dialog memakai `getActivePrice`. Pemeriksaan langsung membuktikan fungsi itu menerima angka nol, negatif, Infinity, NaN, dan tanggal yang tidak valid. Harga saat ini tidak kedaluwarsa karena `validUntil` kosong, tetapi pembaruan promo berpotensi menimbulkan harga yang berbeda antarbagian.

**Perbaikan:** satu validator dan sumber harga aktif untuk seluruh tampilan; tolak data harga/tanggal tidak valid; bedakan draft dan public; hentikan build publik saat data wajib belum siap; buat rencana pembaruan/penghapusan promo pada situs statis. Sesuaikan kontrak dengan [PRD-SISTEM.md](<D:/TEGO/LANDING PAGE/PRD-SISTEM.md:447>).

Lokasi: [package.json](<D:/TEGO/LANDING PAGE/package.json:7>), [pricing.js](<D:/TEGO/LANDING PAGE/src/lib/pricing.js:11>), [HeroSection.jsx](<D:/TEGO/LANDING PAGE/src/components/sections/HeroSection.jsx:11>), [caption harga](<D:/TEGO/LANDING PAGE/src/components/ui/CoverflowCarousel.jsx:293>). Keyakinan: tinggi.

### 8. Dependensi perlu diperbarui dan risiko disesuaikan dengan cara hosting

Proyek menggunakan Next.js 14.2.14. `npm audit --omit=dev` melaporkan dua paket terdampak: Next.js dengan tingkat tertinggi critical dan PostCSS high. Ini adalah klasifikasi paket dari audit, **bukan bukti website telah diretas atau seluruh advisory dapat dieksploitasi pada proyek ini**.

Next.js 14 sudah tercantum sebagai versi yang tidak didukung pada [kebijakan dukungan resmi](https://nextjs.org/support-policy). Gunakan versi yang masih didukung beserta patch keamanan yang relevan; sesuaikan React, ESLint, dan proses build, lalu uji regresi. Jangan mengandalkan pembaruan paksa tanpa meninjau kompatibilitas.

Proyek menggunakan static export. Jika hosting hanya menyajikan folder `out`, tidak ada server Next.js yang menerima request aplikasi; advisory yang bergantung pada middleware, Server Actions, atau image optimizer server perlu dinilai berdasarkan kondisi itu. [Dokumentasi resmi static export](https://nextjs.org/docs/app/guides/static-exports) menjelaskan batas fitur server tersebut. Contoh [advisory middleware](https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw) mensyaratkan penggunaan pemeriksaan otorisasi middleware, yang tidak ditemukan di proyek ini.

Lokasi: [package.json](<D:/TEGO/LANDING PAGE/package.json:17>). Keyakinan: tinggi untuk versi dan hasil audit; paparan deployment publik belum diperiksa.

## P2 — tingkatkan sebelum promosi luas

### Katalog dan kemudahan memilih

Carousel saat ini hanya memperlihatkan satu nama dan harga aktif. Tidak ada tombol Lihat Detail atau Tanya Model Ini yang tampak di bawah caption; pelanggan harus mengetahui bahwa foto bisa dibuka. Kartu produk dengan dua tombol sebenarnya sudah tersedia di source, tetapi tidak digunakan.

Untuk lima model, rekomendasi saya adalah grid kartu yang menampilkan foto, nama, harga, cakupan sewa, dan CTA pada setiap produk. Jika carousel dipertahankan, tampilkan tombol detail dan tanya produk secara eksplisit, gunakan gambar yang cukup besar pada HP, dan berikan petunjuk geser. Ini rekomendasi desain berdasarkan hambatan yang terlihat; dampak terhadap konversi belum diukur melalui eksperimen pelanggan.

Foto yang bisa diperbesar dan galeri tambahan belum diimplementasikan. Tambahkan bila detail tulisan/dekorasi sulit dilihat. Foto contoh pesanan dengan ucapan yang sudah jadi akan membantu menjelaskan hasil akhirnya.

### Identitas usaha dan kepercayaan

Header hanya menampilkan logo kecil; tambahkan nama Decormoment.bdl agar brand terbaca sejak awal. Belum ada pengenalan singkat usaha, testimoni, hasil pemasangan di acara, atau konten proses. Tambahkan bukti asli yang tersedia dengan izin publikasi; jangan membuat ulasan atau angka pelanggan.

Cantumkan jam layanan dan lokasi/petunjuk jangkauan yang disetujui pemilik. Google Maps atau Google Business Profile bisa membantu jika usaha memang memiliki profil publik yang sesuai; alamat rumah pribadi tidak harus diumumkan.

Nomor WA dan URL sosial memiliki flag `verified: true`; komentar TODO masih tertinggal pada URL Instagram/TikTok. Audit ini memastikan bentuk tautan, bukan kepemilikan akun. Pemilik perlu memastikan tujuan tersebut resmi, aktif, dan dipantau.

### SEO dan preview ketika tautan dibagikan

Title saat ini hanya nama brand. Usulan setelah data layanan disahkan: `Sewa Papan Ucapan Akrilik Bandar Lampung | Decormoment.bdl`.

Lengkapi domain canonical, Open Graph title/description/image, favicon, sitemap, robots sesuai mode, dan identitas usaha terstruktur yang sesuai fakta. Pada ekspor saat ini `/robots.txt`, `/sitemap.xml`, dan `/favicon.ico` mengembalikan 404; canonical, OG, dan JSON-LD tidak ditemukan. Tidak adanya sitemap/robots tidak otomatis membuat situs tidak bisa diindeks, tetapi konfigurasi pencarian dan publikasinya belum lengkap.

Tanpa JavaScript, FAQ dan lima tautan WA umum tetap tersedia. Katalog hanya memperlihatkan satu caption beserta harga dan tidak dapat dioperasikan. Nama produk lain ada pada alt gambar/data yang diserialisasi, tetapi detail dan seluruh harga bukan konten katalog yang dapat dibaca normal tanpa JavaScript. Grid HTML awal akan lebih tangguh bila script terlambat atau gagal.

### Aksesibilitas dan detail tampilan

- Tombol WhatsApp mengambang pada HP tidak memiliki nama aksesibel: teks diberi `display: none`, tidak ada `aria-label`, dan SVG tanpa judul. Tambahkan nama yang selalu tersedia bagi pembaca layar.
- Area tombol panah 36 × 36 dan pagination hanya 8 × 8 piksel. Perbesar area tekan, misalnya menjadi 44 × 44 sesuai target PRD; titik visual boleh tetap kecil.
- Label kontrol carousel masih bahasa Inggris. Sesuaikan ke Bahasa Indonesia dan umumkan produk aktif secara wajar kepada pembaca layar.
- `prefers-reduced-motion` hanya ditangani pada transisi tombol WA, belum pada Lenis dan animasi carousel.
- Kelas `.sr-only` dipakai pada harga tetapi tidak didefinisikan; tulisan yang dimaksudkan untuk pembaca layar tampil biasa. Tentukan apakah label memang perlu terlihat lalu perbaiki styling.
- Font dari `next/font` dideklarasikan memakai nama internal, tetapi variabel di tokens mengembalikan nama literal `DM Sans`/`DM Serif Display`. Pemeriksaan browser menunjukkan semua font internal masih unloaded dan tidak ada request WOFF; tampilan menggunakan fallback pada lingkungan ini. Hubungkan variabel font dengan benar agar desain konsisten.
- Menu header menghilang pada HP tanpa menu pengganti. Tombol Lihat Koleksi dan navigasi footer masih ada; menambah navigasi ringkas ke bagian penting akan mempersingkat perjalanan pada halaman yang panjang.

### Pengukuran hasil bisnis

Analytics dinonaktifkan dan belum ada fungsi pencatatan event; atribut `data-placement`/`data-product` saja tidak mengirim event. Siapkan pencatatan kunjungan, produk yang dibuka, filter, dan klik WhatsApp bila pemilik membutuhkan evaluasi promosi.

Ukur minimal: kunjungan → klik WA → percakapan yang ditangani → pesanan terkonfirmasi. Tahap terakhir memerlukan catatan admin. Jangan menyamakan klik WA dengan pesan terkirim atau penjualan. Cukup simpan ID produk/penempatan tombol, bukan isi pesan atau data pribadi pelanggan, dalam event analytics.

## P3 — pemeliharaan dan pengembangan setelah kebutuhan terbukti

- Folder saat ini tidak memiliki repository Git. Siapkan version control, cadangan, dan prosedur mengembalikan rilis sebelumnya.
- `npm start` menjalankan `next start` meskipun konfigurasi memakai static export. Selaraskan script dengan penyajian folder `out` agar deployment tidak salah jalur.
- `build:preview` memakai sintaks khusus Windows; gunakan script Node bila proyek juga dibangun di lingkungan lain.
- README belum menetapkan versi Node secara tegas. Tetapkan runtime dan dokumentasikan rilis, domain, serta tanggung jawab memperbarui katalog.
- Tambahkan tes regresi yang memeriksa bug katalog/dialog, validasi harga/data, dan HTML awal. Tes unit sekarang tidak menutupi interaksi browser tersebut.
- Perubahan konten masih memerlukan edit file dan build/deploy. Untuk lima produk dan pembaruan jarang, alur ini bisa memadai jika ada penanggung jawab. CMS layak dipertimbangkan saat pemilik perlu mengubah konten sendiri secara rutin.
- Kalender ketersediaan, pembayaran online, akun pelanggan, checkout, dashboard khusus, chatbot, dan database bukan syarat peluncuran katalog WA ini. Tambahkan berdasarkan kebutuhan operasional yang nyata.

## Urutan kerja yang disarankan

1. Perbaiki klik produk, pergantian filter, lapisan dialog, scroll, dan fokus; pastikan model yang dipilih sama dengan pesan WA.
2. Cocokkan foto/nama/harga dengan pemilik dan tetapkan durasi, satuan, biaya, kontak resmi, serta ketentuan pemesanan.
3. Optimalkan gambar, tampilkan CTA katalog yang jelas, dan rapikan detail aksesibilitas HP.
4. Perbarui dependensi, implementasikan validasi publik dan aturan harga tunggal, lalu ulang tes regresi dan build.
5. Lengkapi identitas usaha, metadata berbagi, canonical, favicon, sitemap, dan konfigurasi robots setelah domain ditetapkan.
6. Uji di HP Android dan Safari iPhone nyata, koneksi seluler, serta browser dalam Instagram/WhatsApp. Pastikan CTA membuka percakapan ke admin yang benar tanpa harus mengirim pesan uji.
7. Verifikasi hosting/domain/HTTPS, status 404, cache aset, dan pemulihan rilis. Luncurkan terbatas, catat kendala dan pertanyaan pelanggan, lalu perluas promosi.

**Kriteria layak rilis:** tidak ada salah pilih model, nama/harga selalu tersedia setelah filter, dialog nyaman dipakai, seluruh informasi yang dipublikasikan telah disahkan, aset tidak membebani koneksi target, tujuan kontak benar, serta deployment dan perangkat sasaran sudah diuji.

## Bukti pengujian dan batas pemeriksaan

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run test:unit` | 11 tes dilaporkan lulus, 0 gagal; cakupan harga dan format WA. Ada peringatan Node tentang tipe modul, tidak menggagalkan tes. |
| `npm run lint` | Lulus, tanpa peringatan/error ESLint. |
| `npm run build` | Lulus; homepage diprerender; First Load JS yang dilaporkan Next.js 106 kB. Angka ini bukan seluruh bobot halaman/gambar. |
| `npm audit --omit=dev` | 2 paket terdampak: 1 critical, 1 high. Tidak ada pembaruan dependensi otomatis. |
| Edge Chromium headless 152.0.4191.66 | Tidak ada exception JavaScript halaman pada skenario yang dijalankan. |
| Lebar 360/390/768/1280/1440 | Scroll width sama dengan viewport; luapan horizontal tidak ditemukan. |
| FAQ, Escape, URL pesan lima produk | Lulus pada kondisi yang diuji. |
| Klik samping, filter setelah produk kelima | Gagal; detail produk salah atau caption hilang. |
| Wheel, urutan Tab, susunan lapisan dialog | Gagal; latar tetap terpengaruh. |
| Scroll sentuh emulasi HP | Lulus pada skenario yang diuji; bukan pengujian perangkat nyata. |
| Gambar | Seluruh sumber gambar pada skenario responsif dapat dimuat; bobot total enam berkas 16,67 MB. |

Artefak: [hasil browser utama](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/browser-results.json>), [pengujian lanjutan](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/followup-results.json>), [skrip audit lokal](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/check.cjs>), [skrip lanjutan](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/followup.cjs>). Skrip ini memakai runtime Playwright lokal Codex dan bukan pengganti pipeline tes portabel proyek.

Tampilan: [halaman HP](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/home-390.png>), [halaman desktop](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/home-1440.png>), [katalog setelah gambar selesai dimuat](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/catalog-1440-loaded.png>), [katalog tanpa JavaScript](<D:/TEGO/LANDING PAGE/docs/audit-2026-09-11/catalog-no-js.png>). Screenshot halaman desktop penuh menangkap satu gambar lazy yang belum selesai digambar saat pengambilan; screenshot katalog terpisah menunjukkan gambar tersebut berhasil dimuat. Ini tidak diperlakukan sebagai bukti aset rusak.

Audit belum memeriksa domain/hosting publik, HTTPS dan header produksi, Search Console, kepemilikan WA/sosial, hak publikasi foto, persetujuan data usaha, pembayaran sungguhan, Safari iOS/perangkat nyata, atau performa jaringan seluler. Tidak ada pesan eksternal yang dikirim. Kode aplikasi tidak diperbaiki dalam audit ini; laporan, skrip pemeriksaan, dan bukti ditambahkan, serta hasil build dibuat ulang untuk pengujian.

