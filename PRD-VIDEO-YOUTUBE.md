# Product Requirements Document (PRD)

## Penambahan Video YouTube pada Landing Page

| Informasi | Detail |
| --- | --- |
| Status | Draft siap implementasi |
| Versi | 1.0 |
| Tanggal | 13 September 2026 |
| Video | YouTube Shorts `AVoMA0DIfx8` |
| Format | Section video vertikal 9:16 |

## 1. Ringkasan

Landing page akan ditambahkan satu section khusus untuk menampilkan video YouTube Shorts. Video ditampilkan langsung di halaman melalui YouTube embed dan dapat diputar tanpa pengguna meninggalkan landing page.

Untuk satu video, section mandiri dipilih sebagai solusi utama. Carousel atau slide baru belum diperlukan karena menambah interaksi yang tidak dibutuhkan dan dapat membuat video kurang terlihat.

## 2. Latar Belakang

Landing page saat ini belum memiliki media video yang dapat menjelaskan atau memperkuat daya tarik produk secara cepat. Video vertikal dari YouTube dapat memberikan gambaran yang lebih nyata sekaligus meningkatkan kepercayaan dan minat pengunjung.

## 3. Tujuan

- Menampilkan video YouTube dengan jelas pada desktop dan perangkat seluler.
- Membantu pengunjung memahami produk, layanan, atau bukti penggunaannya.
- Menjaga kecepatan muat landing page dengan pemuatan video secara malas (`lazy loading`).
- Mengarahkan pengunjung ke tindakan utama setelah menonton video.

## 4. Di Luar Cakupan

- Mengunggah atau menyimpan file video pada server sendiri.
- Membuat sistem pengelolaan video melalui dashboard admin.
- Membuat carousel untuk beberapa video.
- Memutar video secara otomatis saat halaman dibuka.
- Mengubah isi video YouTube.

## 5. Target Pengguna

- Pengunjung baru yang ingin memahami penawaran dengan cepat.
- Pengunjung seluler yang terbiasa mengonsumsi video vertikal.
- Calon pelanggan yang membutuhkan bukti visual sebelum melakukan tindakan utama.

## 6. User Story

> Sebagai pengunjung landing page, saya ingin melihat video singkat tentang produk atau layanan agar saya dapat memahami manfaatnya sebelum mengambil keputusan.

## 7. Solusi yang Diusulkan

Tambahkan satu section video mandiri dengan susunan berikut:

1. Judul section yang menjelaskan alasan pengguna perlu menonton.
2. Deskripsi singkat maksimal dua kalimat.
3. Pemutar YouTube dengan rasio vertikal 9:16.
4. Tombol ajakan bertindak di bawah video, menggunakan CTA utama landing page.

Posisi yang direkomendasikan adalah setelah section manfaat/keunggulan dan sebelum testimoni atau CTA penutup. Posisi akhir harus mengikuti struktur landing page yang tersedia saat implementasi.

## 8. Kebutuhan Fungsional

### FR-01 — Embed video

Sistem harus menampilkan video dari:

`https://www.youtube.com/embed/AVoMA0DIfx8`

### FR-02 — Kontrol pemutaran

- Video tidak diputar otomatis.
- Pengguna dapat memutar, menjeda, mengatur volume, dan menggunakan mode layar penuh melalui kontrol YouTube.
- Video diputar di dalam landing page.

### FR-03 — CTA

- Harus tersedia satu CTA setelah video.
- Teks dan tujuan CTA harus sama atau konsisten dengan CTA utama landing page.

### FR-04 — Responsif

- Rasio video harus tetap 9:16.
- Lebar maksimum pemutar pada desktop adalah sekitar 360–420 piksel.
- Pada layar kecil, pemutar mengikuti lebar kontainer dengan jarak aman dari sisi layar.
- Tidak boleh terjadi horizontal scrolling.

### FR-05 — Kondisi gagal

Jika embed tidak dapat dimuat, pengguna tetap harus mendapatkan tautan untuk membuka video di YouTube:

`https://www.youtube.com/shorts/AVoMA0DIfx8`

## 9. Kebutuhan UX dan Visual

- Section mengikuti warna, tipografi, radius sudut, dan jarak yang sudah digunakan landing page.
- Pemutar video ditempatkan di tengah.
- Radius sudut yang direkomendasikan: 16–24 piksel.
- Gunakan ruang kosong yang cukup agar section tidak terlihat padat.
- Judul awal yang direkomendasikan: **Lihat Langsung Cara Kerjanya**.
- Deskripsi awal yang direkomendasikan: **Tonton video singkat ini untuk melihat pengalaman dan manfaat yang bisa Anda dapatkan.**
- Teks final dapat disesuaikan dengan konteks produk saat implementasi.

## 10. Kebutuhan Teknis

- Gunakan elemen `iframe` dengan URL format `/embed/`, bukan URL `/shorts/`.
- Tambahkan atribut `title` yang deskriptif.
- Tambahkan `loading="lazy"`.
- Tambahkan `allowfullscreen`.
- Izin iframe minimal mencakup pemutaran media terenkripsi dan picture-in-picture.
- Implementasi tidak boleh membutuhkan library carousel baru.
- Komponen harus kompatibel dengan framework yang sudah digunakan proyek.

Contoh struktur dasar:

```html
<section aria-labelledby="video-title">
  <h2 id="video-title">Lihat Langsung Cara Kerjanya</h2>
  <p>Tonton video singkat ini untuk melihat pengalaman dan manfaat yang bisa Anda dapatkan.</p>

  <div class="video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/AVoMA0DIfx8"
      title="Video singkat produk atau layanan"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <a href="#cta-utama">Ambil Langkah Berikutnya</a>
</section>
```

## 11. Aksesibilitas

- Judul section harus menggunakan urutan heading yang benar.
- `iframe` harus memiliki atribut `title` yang menjelaskan isi video.
- CTA dapat diakses dengan keyboard dan memiliki fokus yang terlihat.
- Kontras teks dan tombol minimal mengikuti WCAG AA.
- Informasi penting tidak boleh hanya tersedia melalui video; ringkasan teks tetap disediakan.

## 12. Performa dan Privasi

- Gunakan lazy loading agar iframe tidak memperlambat pemuatan awal halaman.
- Jika sesuai dengan kebijakan privasi situs, pertimbangkan domain `youtube-nocookie.com` untuk mode privasi yang ditingkatkan.
- Video tidak boleh autoplay untuk menghindari penggunaan data dan gangguan audio yang tidak diinginkan.
- Penambahan video tidak boleh menggeser konten secara signifikan saat halaman dimuat; ruang pemutar harus sudah dicadangkan melalui `aspect-ratio`.

## 13. Analitik

Jika landing page sudah memiliki alat analitik, catat peristiwa berikut:

| Event | Pemicu |
| --- | --- |
| `video_section_view` | Section video masuk ke viewport |
| `video_play` | Pengguna mulai memutar video, jika integrasi YouTube API tersedia |
| `video_cta_click` | Pengguna menekan CTA di bawah video |

Analitik pemutaran melalui YouTube IFrame API bersifat opsional untuk rilis pertama. Klik CTA menjadi metrik minimum yang wajib tersedia jika sistem analitik sudah digunakan.

## 14. Kriteria Penerimaan

- [ ] Video `AVoMA0DIfx8` tampil dan dapat diputar dari landing page.
- [ ] Video tidak autoplay.
- [ ] Pemutar mempertahankan rasio 9:16 pada perangkat seluler dan desktop.
- [ ] Layout tidak terpotong dan tidak menimbulkan horizontal scrolling pada lebar 320 piksel.
- [ ] Mode layar penuh dapat digunakan.
- [ ] Section memiliki judul, deskripsi singkat, dan CTA.
- [ ] CTA mengarah ke tindakan utama yang benar.
- [ ] `iframe` menggunakan `loading="lazy"` dan memiliki `title`.
- [ ] Tidak ada layout shift yang terlihat ketika video dimuat.
- [ ] Jika embed gagal, tautan menuju video YouTube tetap tersedia.
- [ ] Tampilan mengikuti design system landing page yang sudah ada.

## 15. Pengujian

- Uji Chrome, Edge, Firefox, dan Safari versi terbaru.
- Uji layar seluler sekitar 320, 375, dan 430 piksel.
- Uji desktop pada lebar 1024 dan 1440 piksel.
- Uji keyboard navigation dan focus state CTA.
- Uji ketika koneksi lambat atau embed YouTube diblokir.
- Uji bahwa video tidak memutar audio tanpa interaksi pengguna.

## 16. Tahapan Implementasi

1. Tinjau struktur dan gaya landing page yang tersedia.
2. Tentukan posisi final section video.
3. Implementasikan komponen responsif dan fallback link.
4. Sambungkan CTA dengan alur konversi utama.
5. Lakukan pengujian responsif, aksesibilitas, dan performa.
6. Publikasikan dan pantau klik CTA serta interaksi video.

## 17. Keputusan Produk

Rilis pertama menggunakan satu section video mandiri. Carousel baru hanya dipertimbangkan jika tersedia minimal tiga video yang memiliki tujuan berbeda dan pengguna perlu memilih konten yang ingin ditonton.

