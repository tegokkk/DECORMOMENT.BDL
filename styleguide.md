# Style Guide — Decormoment.bdl

Versi: 1.0  
Tanggal: 11 September 2026  
Status: Acuan visual untuk desain dan implementasi  
Produk: Landing page katalog papan ucapan akrilik  
Teknologi: JavaScript, React/Next.js, CSS Modules, dan CSS custom properties

Dokumen terkait: [PRD Produk](</D:/TEGO/LANDING PAGE/PRD.md>) dan [PRD Struktur Sistem](</D:/TEGO/LANDING PAGE/PRD-SISTEM.md>).

## 1. Referensi dan arah desain

![Referensi visual dari pengguna: website dengan hero pink, tipografi serif, dan katalog bergaya editorial](/D:/TEGO/LANDING%20PAGE/docs/references/landing-reference.png)

Referensi digunakan sebagai acuan suasana, komposisi, warna, dan hierarki visual. Teks, nama brand, serta kategori produk pada gambar bukan persyaratan konten Decormoment.bdl. Gambar referensi bukan aset katalog dan tidak ditempatkan pada website publik.

**Arah visual: floral yang hangat, lembut, dan personal, dengan penyajian seperti katalog butik.** Latar ivory memberi ruang pada foto; dusty pink membangun suasana; judul serif menghadirkan karakter; warna rose yang lebih gelap menandai tindakan utama.

Warna dan font di bawah adalah pilihan adaptasi dari referensi, bukan hasil identifikasi pasti terhadap aset desain aslinya. Arah ini memperbarui usulan awal hijau sage: pink/rose menjadi identitas utama, sedangkan warna hijau alami dapat hadir melalui daun pada foto produk.

### 1.1 Penerjemahan referensi

| Elemen yang terlihat pada referensi | Penerapan untuk Decormoment.bdl |
| --- | --- |
| Latar pink dengan pencahayaan lembut | Hero bernuansa blush dan foto papan akrilik dengan bayangan alami |
| Judul serif besar di atas bidang membulat | Judul editorial dengan lingkaran dekoratif yang menyerupai bentuk papan oval |
| Kanvas tengah berwarna ivory | Area konten bersih dengan lebar terbatas dan ruang kosong yang cukup |
| Fotografi menjadi bagian paling dominan | Foto asli papan, detail bunga, dan hasil pemasangan menjadi pusat perhatian |
| Panel pastel seperti potongan kertas | Panel manfaat layanan; satu variasi bentuk lengkung dapat digunakan sebagai aksen |
| Grid produk dengan foto di atas dan teks di bawah | Empat kartu katalog dengan ukuran foto serta posisi harga yang konsisten |
| Bagian promosi dengan foto dan teks berdampingan | Bagian custom, cara pesan, atau pengantaran dan penjemputan |
| Tombol ringkas dengan sudut membulat | Tombol rose yang jelas, dengan area sentuh lebih besar untuk penggunaan melalui HP |

Teks kecil, tombol berkontras rendah, dan ornamen yang padat pada referensi tidak perlu diikuti. Keterbacaan dan kemudahan memesan menjadi kriteria penerapan visual.

## 2. Prinsip visual

1. **Produk lebih menonjol daripada dekorasi.** Bentuk papan, tulisan, dan rangkaian bunga harus mudah dilihat.
2. **Pink sebagai suasana, rose sebagai penunjuk aksi.** Latar lembut tidak digunakan sebagai tombol utama dengan teks putih kecil.
3. **Serif untuk ekspresi, sans-serif untuk informasi.** Harga, detail, dan tombol harus cepat dibaca.
4. **Ruang kosong membentuk hierarki.** Tidak semua informasi ditempatkan dalam kartu atau diberi bayangan.
5. **Bentuk membulat digunakan selektif.** Hero boleh memakai lingkaran; katalog tetap berupa kartu sederhana.
6. **Konten mengikuti layanan nyata.** Kesan visual yang meyakinkan dibangun dengan foto dan informasi asli.

Perbandingan warna sebagai panduan komposisi: sekitar 60% ivory/surface terang, 30% pink lembut dan fotografi, serta 10% rose/teks/aksen. Angka ini bukan pembatas kaku untuk tiap section.

## 3. Palet warna

| Token | Nama | HEX | Pemakaian |
| --- | --- | --- | --- |
| `--color-page` | Warm ivory | `#F6F1EC` | Latar halaman utama |
| `--color-surface` | Porcelain | `#FFFCF8` | Kartu, header, dialog |
| `--color-petal` | Petal pink | `#F3E0E1` | Latar panel layanan dan label lembut |
| `--color-blush` | Dusty blush | `#E8C5C8` | Hero, announcement bar, aksen bidang besar |
| `--color-primary` | Deep rose | `#9A3F57` | Tombol utama, tautan, filter aktif |
| `--color-primary-hover` | Rose plum | `#813248` | Hover tombol utama |
| `--color-primary-active` | Dark rose | `#6D293C` | State tombol saat ditekan |
| `--color-ink` | Cocoa ink | `#302425` | Judul, teks utama, harga |
| `--color-muted` | Mauve gray | `#6E5B60` | Teks sekunder pada ivory/surface |
| `--color-border` | Soft mauve | `#D8C6C4` | Divider dan batas dekoratif |
| `--color-control-border` | Muted rose | `#927579` | Batas kontrol yang harus mudah dikenali |
| `--color-focus` | Plum focus | `#68324B` | Indikator fokus keyboard |
| `--color-on-primary` | White | `#FFFFFF` | Teks pada tombol rose |
| `--color-success` | Botanical green | `#2F674D` | Status sukses bila diperlukan |
| `--color-danger` | Berry red | `#9F3442` | Teks kesalahan bila diperlukan |

### 3.1 Pasangan warna dan kontras

Rasio berikut dihitung dari pasangan HEX solid di atas. Foto, transparansi, gradient, dan overlay harus diperiksa kembali pada implementasi.

| Teks / latar | Rasio perkiraan | Penggunaan |
| --- | --- | --- |
| Ink / ivory | 13,32:1 | Judul dan isi |
| Muted / ivory | 5,62:1 | Deskripsi dan keterangan |
| Putih / primary rose | 6,52:1 | Tombol utama |
| Primary rose / petal pink | 5,14:1 | Label atau tautan dalam panel petal |
| Ink / dusty blush | 9,43:1 | Hero dan announcement bar |

`--color-muted` pada dusty blush hanya sekitar 3,98:1. Karena itu, gunakan `--color-ink` untuk teks kecil di hero blush. Border dekoratif tidak menggantikan border kontrol; kontrol menggunakan `--color-control-border` atau penanda yang lebih jelas.

Jangan menurunkan opacity teks sekunder atau menaruh teks di atas bunga yang ramai. Untuk foto, letakkan teks pada bidang solid yang tetap terbaca.

## 4. Tipografi

### 4.1 Keluarga font

- **Judul: DM Serif Display, weight 400.** Digunakan untuk H1, H2, dan aksen editorial. Bentuk serif menjadi pendekatan terhadap karakter referensi, bukan klaim bahwa font tersebut dipakai pada gambar. [Sumber font](https://github.com/google/fonts/tree/main/ofl/dmserifdisplay).
- **Isi dan UI: DM Sans, weight 400, 500, 600, dan 700 sesuai kebutuhan.** Digunakan untuk navigasi, nama produk, detail, harga, tombol, dan FAQ. [Sumber font](https://github.com/google/fonts/tree/main/ofl/dmsans).
- Fallback judul: Georgia, serif. Fallback isi: system-ui, sans-serif.
- Host font secara lokal saat implementasi, simpan informasi lisensi yang menyertai aset, dan muat varian yang benar-benar dipakai.
- Jangan menerapkan bold sintetis pada DM Serif Display; hierarki dibentuk melalui ukuran, ruang, dan warna.

### 4.2 Skala tipe

| Elemen | Font / weight | HP | Desktop | Line-height |
| --- | --- | --- | --- | --- |
| Wordmark sementara | DM Serif Display / 400 | 25–28 px | 30–34 px | 1,15 |
| H1 hero | DM Serif Display / 400 | 40–48 px | 64–80 px | 1,06 |
| H2 section | DM Serif Display / 400 | 30–36 px | 40–48 px | 1,15 |
| H3 atau nama produk | DM Sans / 600 | 18–20 px | 20–22 px | 1,35 |
| Body | DM Sans / 400 | 16 px | 16–18 px | 1,65 |
| Harga aktif | DM Sans / 700 | 22–24 px | 24–28 px | 1,2 |
| Label tombol | DM Sans / 600 | 15–16 px | 15–16 px | 1,3 |
| Keterangan/harga pembanding | DM Sans / 400 | 14 px | 14 px | 1,5 |
| Eyebrow | DM Sans / 600 | 12 px | 12 px | 1,5 |

Aturan penulisan visual:

- H1 terdiri dari 2–3 baris terencana; jangan mengunci tinggi sehingga teks terpotong.
- Paragraf umum maksimal sekitar 60 karakter per baris. Deskripsi hero sekitar 40–48 karakter per baris.
- Gunakan sentence case pada tombol dan judul. Uppercase hanya untuk eyebrow pendek dengan letter-spacing sekitar `0.08em`.
- Harga menggunakan angka yang mudah dibandingkan; terapkan `font-variant-numeric: tabular-nums`.
- Hindari font tulisan tangan pada informasi utama dan hindari paragraf rata tengah yang panjang.

## 5. Layout, jarak, dan ukuran layar

### 5.1 Kanvas

- Lebar maksimum bingkai halaman desktop: **1280 px**.
- Lebar maksimum isi section: **1120 px**.
- Hero dapat memenuhi lebar bingkai; isi hero mengikuti container agar sejajar dengan navigasi dan katalog.
- Pada layar lebar, bingkai dapat memiliki margin luar dan bayangan tipis seperti kertas pada referensi.
- Pada HP, hilangkan bingkai luar dan bayangan halaman; gunakan lebar layar dengan padding isi.
- Halaman memakai tinggi konten alami, tanpa panel yang dipaksa setinggi viewport.

### 5.2 Breakpoint

| Lebar | Layout | Padding sisi | Katalog |
| --- | --- | --- | --- |
| Di bawah 640 px | Satu kolom; menu ringkas | 20 px | 1 kolom |
| 640–1023 px | Layout tablet; beberapa bagian dua kolom | 32 px | 2 kolom |
| 1024 px ke atas | Header penuh dan hero dua kolom | 48 px | 4 kolom |

Empat kolom desktop dipilih karena katalog awal berisi empat model. Grid mengikuti jumlah produk, bukan menyalin tiga kartu pada screenshot secara kaku. Pada layar 320 px, padding dapat turun menjadi 16 px agar konten tetap terbaca.

### 5.3 Skala jarak

Gunakan skala **4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px**.

| Penggunaan | Nilai |
| --- | --- |
| Ikon ke label | 8 px |
| Label ke deskripsi | 8–12 px |
| Isi kartu | 20–24 px |
| Jarak kartu | 24 px desktop; 20 px HP |
| Judul section ke deskripsi | 12–16 px |
| Header section ke konten | 32–40 px |
| Padding vertikal section | 80 px desktop; 48 px HP |
| Kelompok informasi dalam dialog | 24–32 px |

### 5.4 Bentuk dan kedalaman

- Kartu produk: radius **8 px**, permukaan terang, bayangan hanya tipis saat hover.
- Panel informasi: radius **12 px** atau bidang sederhana tanpa border.
- Dialog: radius **20 px**.
- Tombol dan filter: radius **999 px**.
- Hero: lingkaran/oval sebagai aksen latar; tidak mengubah seluruh website menjadi kumpulan kartu bulat.
- Bayangan dekoratif: lembut dan menyebar. Hindari glow pink, efek kaca dominan, rotasi kartu, dan bayangan hitam keras.

## 6. Arah visual per bagian halaman

### 6.1 Announcement bar dan header

- Announcement bar blush dengan teks ink, tinggi alami sekitar 36–44 px.
- Contoh: “Gratis ongkir pengantaran area kampus Bandar Lampung”. Ketentuan lengkap tersedia di bagian layanan/FAQ.
- Pada HP teks boleh menjadi dua baris; jangan memakai marquee atau mengecilkan font agar muat.
- Header memakai surface terang. Logo/wordmark di kiri; navigasi dan satu CTA utama di kanan.
- Tinggi header sekitar 80 px desktop dan 68 px HP. Gunakan `min-height`, bukan tinggi yang memotong teks.
- Announcement bar ikut tergulir; hanya navigasi yang dapat dibuat sticky. Navigasi anchor memperhitungkan tinggi header.
- Wordmark sementara memakai nama “Decormoment.bdl”, sampai logo resmi tersedia.

### 6.2 Hero

Komposisi desktop: area copy sekitar 45%, foto produk sekitar 55%. Lingkaran petal di belakang judul mengutip bidang bundar pada referensi dan bentuk papan oval. Dekorasi tidak membatasi ukuran area teks.

- Latar utama dusty blush.
- H1 ink dengan serif besar; eyebrow menyebut “Papan ucapan akrilik • Bandar Lampung”.
- Foto papan asli menjadi objek terbesar. Tampilkan bentuk papan secara utuh serta detail bunga yang mewakili produk.
- Maksimal dua CTA: “Lihat koleksi” sebagai primary, “Cek ketersediaan” sebagai secondary menuju WhatsApp.
- Harga awal dan layanan singkat muncul sebagai teks pendukung; nilai harga berasal dari data katalog.
- Pada HP, urutan menjadi copy → CTA → foto. Lingkaran dekoratif boleh diperkecil atau dihilangkan.
- Jangan mengunci hero pada tinggi layar; teks panjang dan pembesaran font harus tetap mendapat ruang.

Contoh komposisi copy:

> **Rayakan momennya.**  
> Biar kami urus papannya.  
> Papan ucapan akrilik custom untuk momen spesialmu di Bandar Lampung dan sekitarnya.

### 6.3 Katalog

- Katalog langsung setelah hero, mengikuti PRD produk.
- Judul section boleh rata tengah seperti referensi: “Pilih papan untuk momenmu.”
- Filter Semua, Oval, dan Kubah ditempatkan dekat judul, dengan jarak cukup sebelum grid.
- Kartu menggunakan foto portrait **3:4** yang seragam. Berikan ruang kosong di sekitar papan agar bentuknya tidak terpotong.
- Urutan informasi: foto → bentuk → nama → harga → “Lihat detail” dan tautan tanya produk.
- Harga pembanding berukuran 14 px dan dicoret, hanya ketika valid. Harga aktif paling mudah terlihat.
- Hindari badge promosi besar di atas produk, carousel otomatis, atau tulisan yang menutupi dekorasi papan.
- Harga, basis layanan, dan biaya tambahan tidak disamarkan sebagai teks dekoratif berukuran kecil.

### 6.4 Fasilitas dan cara pesan

- Gunakan 3 panel manfaat pada satu baris desktop, lalu susun vertikal di HP.
- Contoh kelompok: “Custom sesuai momen”, “Revisi sebelum pengerjaan”, serta “Dibantu antar dan jemput”.
- Panel petal dapat diberi satu detail ujung lengkung seperti label kertas pada referensi; jangan memotong bidang yang berisi teks.
- Pesanan mendadak dan ongkir ditampilkan sebagai penjelasan yang jelas, bukan janji mutlak.
- Cara pesan memakai empat langkah bernomor kecil dalam lingkaran rose/petal; alurnya tetap terbaca tanpa garis penghubung.

### 6.5 Konten sosial dan testimoni

- Gunakan susunan editorial: judul dan deskripsi di satu sisi, foto/video di sisi lain bila ruang mencukupi.
- Thumbnail sosial portrait **9:16**, dengan label platform dan tombol play berkontras jelas.
- Thumbnail bukan video autoplay. Tombol mengarah ke konten resmi sesuai rancangan MVP.
- Testimoni memakai surface terang dan kutipan berukuran body normal. Tanda kutip dekoratif boleh memakai serif besar.
- Screenshot ulasan ditampilkan proporsional; jangan crop bagian yang mengubah konteks ulasan atau memperlihatkan data pribadi yang belum diizinkan.
- Tidak menambahkan rating bintang, foto pelanggan, atau jumlah pesanan buatan.
- Jika aset asli belum tersedia, bagian disembunyikan pada versi publik sesuai PRD.

### 6.6 Garansi, FAQ, CTA penutup, dan footer

- Garansi menggunakan bidang petal dengan ikon sederhana dan penjelasan singkat mengenai kesalahan dari pihak usaha.
- FAQ memakai baris dengan divider lembut, area klik minimal 56 px, pertanyaan sans-serif 16–18 px, dan ikon tambah/minus.
- Jawaban rata kiri; ruang antarbaris cukup untuk ketentuan ongkir dan revisi.
- CTA penutup kembali memakai blush, judul serif, dan tombol “Cek jadwal via WhatsApp”.
- Footer surface/ivory berisi brand, area layanan, navigasi, dan kontak. Tautan sosial diberi label nama platform.

## 7. Komponen dan state interaksi

| Komponen | Default | Hover/aktif | Fokus atau kondisi lain |
| --- | --- | --- | --- |
| Tombol primary | Rose, teks putih, min-height 48 px, padding sisi 24 px | Hover rose plum; pressed dark rose | Ring fokus dua lapis; label tetap jelas |
| Tombol secondary | Surface, teks rose, border rose 1 px | Latar petal | Ring fokus yang sama |
| Tautan teks | Rose dengan underline bila berada dalam paragraf | Warna lebih gelap, underline tetap | Fokus tidak bergantung pada warna saja |
| Filter belum dipilih | Surface, teks ink, border kontrol | Latar petal | Min-height 44 px |
| Filter terpilih | Rose, teks putih | Tetap terlihat sebagai pilihan aktif | Gunakan `aria-pressed`; bentuk/isi juga menandai pilihan |
| Kartu produk | Surface, foto dominan, radius 8 px | Foto boleh scale 1,02 dalam bingkainya; shadow tipis | `focus-within` boleh memberi penanda, fokus tombol tetap terlihat |
| FAQ | Pertanyaan ink, divider lembut | Latar petal tipis | State terbuka terlihat dari ikon dan atribut native |
| Kontrol dinonaktifkan | Petal, teks muted, tanpa link tujuan | Tidak ada efek hover atau gerak | Alasan ditampilkan pada draf; tidak membuat tautan `#` palsu |

Aturan umum tombol:

- Aksi penting menggunakan teks, bukan ikon saja.
- Elemen yang menavigasi memakai `<a>`; membuka dialog atau mengubah filter memakai `<button>`.
- Gunakan satu tombol primary per kelompok aksi. Tombol lain memakai secondary atau text link.
- Label boleh membungkus pada layar sempit; tinggi tombol mengikuti isi.
- Tindakan membuka WhatsApp tidak membutuhkan spinner atau pesan “pesanan berhasil”.

### 7.1 Dialog detail produk

- Lebar maksimum **960 px**, tinggi maksimum `calc(100dvh - 32px)`, dengan konten yang dapat digulir.
- Desktop: galeri di kiri, informasi di kanan. HP: galeri di atas, informasi di bawah, margin luar minimal 12 px.
- Surface terang; backdrop cocoa transparan sekitar 44%.
- Tombol tutup berukuran sentuh minimal 44 × 44 px dan tetap tersedia ketika konten digulir.
- Foto detail utama menggunakan `object-fit: contain`; keseluruhan papan tidak boleh hilang karena crop.
- Nama, harga, detail custom, catatan konfirmasi, dan tombol WhatsApp memiliki urutan yang sama untuk semua model.
- Fokus tetap di dalam dialog, Escape menutup, scroll halaman terkunci, dan fokus kembali ke pemicunya.
- Pembesaran foto berada dalam dialog yang sama agar tidak menambah modal bertumpuk.

### 7.2 Tombol WhatsApp mengambang

- Menggunakan rose dengan ikon dan label “Chat WhatsApp” agar selaras dengan tombol lain.
- Tinggi minimal 52 px; sisi bawah/kanan memperhitungkan safe area perangkat.
- Sisakan ruang bawah halaman agar tombol tidak menutupi informasi terakhir.
- Pada HP sempit, boleh memakai tombol ikon 52 × 52 px dengan nama aksesibel dan tooltip/label yang sesuai.
- Jangan memakai efek memantul terus-menerus. Sembunyikan atau keluarkan dari fokus saat dialog/menu modal terbuka.

## 8. Fotografi, ornamen, dan ikon

### 8.1 Foto produk

- Gunakan foto produk asli Decormoment.bdl dengan pencahayaan lembut dan latar sederhana.
- Usahakan arah cahaya serta temperatur warna konsisten antarproduk.
- Foto katalog memperlihatkan papan secara utuh, termasuk bentuk oval/kubah dan dekorasinya.
- Detail tambahan boleh menyorot bunga, tulisan, akrilik, atau hasil pemasangan yang benar-benar tersedia.
- Warna biru Serenity Blue harus tetap terlihat biru; jangan memberi filter pink ke seluruh katalog.
- Variasi latar ivory, blush, dan abu hangat diperbolehkan selama tidak mengurangi akurasi warna produk.
- Foto hero boleh disusun lebih artistik, tetapi tidak memberi kesan aksesori tambahan pasti termasuk dalam harga.
- Optimalkan aset sebelum deployment; foto hero tidak menggunakan lazy loading, foto di bawahnya menggunakan lazy loading sesuai kebutuhan.

### 8.2 Ornamen

- Pilih lingkaran, kelopak, pita, bayangan lembut, atau garis lengkung yang berhubungan dengan papan ucapan.
- Maksimal satu ornamen dominan per section; katalog tidak membutuhkan ornamen tambahan pada setiap kartu.
- Ornamen latar boleh keluar dari bingkai hanya jika tidak menyebabkan scroll horizontal.
- Pada HP, kurangi ornamen di luar konten.
- Ornamen bersifat dekoratif dengan `aria-hidden` atau alt kosong sesuai bentuk implementasinya.
- Jangan menggunakan kue, macaron, cupcake, atau logo pada referensi sebagai elemen brand Decormoment.bdl.

### 8.3 Ikon

- Gunakan satu keluarga ikon dengan gaya outline konsisten, ukuran 20–24 px, ketebalan sekitar 1,75–2 px.
- Topik ikon: custom/desain, revisi, waktu, pengantaran, lokasi, dan chat.
- Ikon layanan menyertai teks. Ikon sosial menggunakan aset yang tepat dan memiliki nama yang dapat dibaca pembaca layar.
- Emoji tidak menjadi pengganti ikon navigasi atau label tindakan utama.

## 9. Gerak dan perilaku responsif

- Hover/focus: 180–240 ms, easing lembut. Perubahan warna dan transform dibatasi pada komponen terkait.
- Gerak dekoratif maksimal 4–8 px; tidak ada parallax atau scroll yang mengambil alih kontrol pengguna.
- Perubahan filter langsung menampilkan hasil; jangan menunda katalog hanya demi animasi.
- Animasi masuk jika digunakan maksimal 300 ms. Konten tetap terlihat jika JavaScript gagal.
- Pada `prefers-reduced-motion: reduce`, hilangkan animasi nonesensial, scaling, dan smooth scroll.
- Efek hover hanya diaktifkan pada perangkat yang mendukung hover; sentuhan tidak memerlukan hover untuk mengakses aksi.
- Hasil layout diperiksa pada 360, 390, 768, 1280, dan 1440 px, serta pembesaran teks 200%.

## 10. Tone of voice dan microcopy

Suara brand terasa ramah, membantu, dan personal. Gunakan “kamu” dan “kami” secara konsisten. Hindari seluruh paragraf dengan huruf kapital atau banyak tanda seru.

| Kebutuhan | Contoh copy |
| --- | --- |
| Judul utama | “Rayakan momennya.” |
| Kalimat pendamping | “Biar kami urus papannya.” |
| Judul katalog | “Pilih papan untuk momenmu.” |
| Tombol katalog | “Lihat koleksi” |
| Tombol detail | “Lihat detail” |
| Tombol produk | “Tanya model ini” |
| Konsultasi waktu | “Cek ketersediaan” |
| Custom | “Ucapanmu, dirangkai sesuai momenmu.” |
| Pesanan mendadak | “Acaranya sudah dekat? Hubungi kami untuk cek ketersediaan.” |
| Revisi | “Revisi sampai desain disepakati, sebelum mulai pengerjaan.” |
| Hasil filter kosong | “Belum ada model untuk pilihan ini. Lihat semua koleksi.” |
| Gambar gagal dimuat | “Foto belum dapat dimuat.” |

Harga mengikuti format rupiah dari utilitas JavaScript. Jangan menambahkan “per hari”, “gratis jemput”, “pasti bisa hari ini”, atau “stok terakhir” tanpa data layanan yang mendukung.

## 11. Token dan contoh implementasi CSS

Contoh berikut adalah spesifikasi untuk `src/styles/tokens.css` dan CSS Modules pada tahap implementasi. File aplikasi belum dibuat oleh dokumen ini.

```css
:root {
  --color-page: #f6f1ec;
  --color-surface: #fffcf8;
  --color-petal: #f3e0e1;
  --color-blush: #e8c5c8;
  --color-primary: #9a3f57;
  --color-primary-hover: #813248;
  --color-primary-active: #6d293c;
  --color-ink: #302425;
  --color-muted: #6e5b60;
  --color-border: #d8c6c4;
  --color-control-border: #927579;
  --color-focus: #68324b;
  --color-on-primary: #ffffff;
  --color-success: #2f674d;
  --color-danger: #9f3442;

  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --text-hero: clamp(2.5rem, 1.5rem + 4vw, 5rem);
  --text-section: clamp(1.875rem, 1.25rem + 2vw, 3rem);
  --text-body: 1rem;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --radius-card: 0.5rem;
  --radius-panel: 0.75rem;
  --radius-dialog: 1.25rem;
  --radius-pill: 999px;
  --frame-max: 80rem;
  --container-max: 70rem;
  --page-gutter: 1.25rem;
  --section-space: 3rem;

  --shadow-soft: 0 8px 24px rgb(48 36 37 / 7%);
  --shadow-dialog: 0 24px 64px rgb(48 36 37 / 20%);
  --motion-fast: 180ms;
  --motion-base: 240ms;
  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);

  --z-header: 20;
  --z-menu: 30;
  --z-floating: 40;
  --z-overlay: 80;
  --z-dialog: 90;
}

@media (min-width: 640px) {
  :root { --page-gutter: 2rem; }
}

@media (min-width: 1024px) {
  :root {
    --page-gutter: 3rem;
    --section-space: 5rem;
  }
}
```

Contoh aturan dasar dan komponen:

```css
/* globals.css */
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--color-page);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.65;
}

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
  box-shadow: 0 0 0 3px var(--color-surface);
}

/* Contoh class pada CSS Modules terkait */
.container {
  width: min(calc(100% - 2 * var(--page-gutter)), var(--container-max));
  margin-inline: auto;
}

.heroTitle {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.primaryButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 3rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font: 600 1rem/1.3 var(--font-body);
  text-align: center;
  text-decoration: none;
  transition: background-color var(--motion-fast) var(--ease-out);
}

.productGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
}

@media (hover: hover) and (pointer: fine) {
  .primaryButton:hover { background: var(--color-primary-hover); }
}

.primaryButton:active { background: var(--color-primary-active); }

@media (min-width: 640px) {
  .productGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .productGrid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .primaryButton { transition: none; }
}
```

Implementasi wajib memberi aturan reduced motion pada setiap komponen beranimasi lainnya. Class contoh bukan pengganti implementasi lengkap state disabled, dialog, atau pemuatan font. Jika dialog memakai elemen native `<dialog>`, perhitungkan top layer browser; token z-index berlaku untuk elemen halaman biasa.

Warna, ukuran, dan jarak digunakan melalui token. Nilai harga dan konten tetap berasal dari modul data JavaScript, bukan CSS atau teks yang digambar pada foto.

## 12. Checklist review visual

- [ ] Hero terasa sesuai referensi: blush, serif besar, bidang lembut, dan foto dominan.
- [ ] Identitas yang terlihat adalah Decormoment.bdl dan papan akrilik; tidak ada konten bakery yang terbawa.
- [ ] Pink/rose menjadi warna utama secara konsisten di seluruh halaman.
- [ ] Judul, detail, harga, dan CTA memiliki hierarki yang mudah dipahami.
- [ ] Empat produk tampil dengan rasio foto dan struktur informasi yang konsisten.
- [ ] Bentuk serta warna asli setiap papan dapat dinilai tanpa crop atau filter yang menyesatkan.
- [ ] Tombol utama, filter, tautan, dan dialog memiliki state fokus yang terlihat.
- [ ] Kontras diverifikasi pada hasil akhir, termasuk semua state dan bidang berfoto.
- [ ] Header, dialog, dan tombol mengambang tidak menutup informasi penting.
- [ ] Tidak ada scroll horizontal, teks terpotong, atau aksi yang hanya muncul saat hover.
- [ ] Tampilan diuji pada lebar yang ditetapkan dan pembesaran teks 200%.
- [ ] Animasi menghormati reduced motion dan tidak menghambat pemesanan.
- [ ] Foto, ulasan, harga promo, dan klaim layanan mengikuti data yang terverifikasi.
- [ ] Halaman tetap terasa ringan dan rapi ketika konten sosial/testimoni belum tersedia.

Dokumen ini menjadi sumber utama keputusan visual. Ruang lingkup fitur serta ketentuan layanan tetap mengikuti PRD produk dan PRD sistem.
