# Decormoment.bdl - Landing Page

Ini adalah proyek landing page untuk Decormoment.bdl, dibangun dengan Next.js App Router menggunakan `output: 'export'` (statis). Proyek ini tidak menggunakan TypeScript dan tidak menggunakan Tailwind CSS. Styling menggunakan CSS Modules dengan custom properties.

## Persyaratan
- Node.js versi terbaru yang didukung oleh Next.js (mis. v18 atau v20)
- npm

## Menjalankan Proyek di Lingkungan Lokal (Dev)
```bash
npm install
npm run dev
```
Buka `http://localhost:3000` di browser.

## Menguji
Lakukan pengujian aturan dasar (unit test node) dengan:
```bash
npm run test:unit
```
Lakukan linting dengan:
```bash
npm run lint
```

## Build Mode Draft (Untuk Preview)
Mode draf memungkinkan placeholder.
```bash
npm run build:preview
```
Hasil statis akan ada di folder `out/`.

## Preview Hasil Build
Untuk meninjau hasil ekspor statis dari perintah build:
```bash
npm run preview
```
Buka URL localhost yang diberikan (biasanya port 3000).

## Memperbarui Konten
- **Data Produk**: Ubah isi file `src/data/products.js`
- **Konfigurasi Bisnis**: Ubah file `src/data/site.js` (kontak, socmed, URL brand)
- **Ketentuan Layanan**: Ubah file `src/data/policies.js`
- **Gaya (Style)**: Sesuaikan variabel di `src/styles/tokens.css` dan perbarui kelas di CSS Modules dalam direktori komponen.
