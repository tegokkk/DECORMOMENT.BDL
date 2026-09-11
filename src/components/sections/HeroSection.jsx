import Image from 'next/image';
import { site } from '@/data/site';
import { products } from '@/data/products';
import { formatRupiah, getActivePrice } from '@/lib/pricing';
import styles from './HeroSection.module.css';
import WhatsAppLink from '../ui/WhatsAppLink';

export default function HeroSection() {
  const activePrices = products
    .filter(p => p.published)
    .map(p => getActivePrice(p.price))
    .filter(price => price > 0);
    
  const lowestPrice = activePrices.length > 0 
    ? Math.min(...activePrices)
    : 45000;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        {/* ── FOTO: tampil PERTAMA di mobile via CSS order ── */}
        <div className={styles.imageWrapper}>
          <div className={styles.heroGallery}>
            <div className={styles.galleryItem}>
              <Image 
                src="/images/hero/hero-1.jpg" 
                alt="Papan Ucapan Akrilik Custom Decormoment.bdl - Bunga Mekar" 
                fill 
                priority
                className={styles.heroImage} 
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 25vw"
              />
            </div>
            <div className={styles.galleryItem}>
              <Image 
                src="/images/hero/hero-2.jpg" 
                alt="Papan Ucapan Akrilik Custom Decormoment.bdl - Biru Pink" 
                fill 
                priority
                className={styles.heroImage} 
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 25vw"
              />
            </div>
          </div>
        </div>

        {/* ── TEKS ── */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>Papan Akrilik Custom • Bandar Lampung</p>
          <div className={styles.titleWrapper}>
            <div className={styles.decorativeCircle}></div>
            <h1 className={styles.title}>
              Rayakan momennya.{' '}
              <span className={styles.subtitle}>Biar kami urus papannya.</span>
            </h1>
          </div>
          <p className={styles.description}>
            Sewa papan ucapan akrilik custom untuk wisuda, wedding, &amp; grand opening. Harga mulai <strong>{formatRupiah(lowestPrice)}</strong>.
          </p>

          {/* Trust badges */}
          <div className={styles.trustRow}>
            <span className={styles.trustBadge}>100+ Pelanggan</span>
            <span className={styles.trustBadge}>Antar ke Lokasi</span>
            <span className={styles.trustBadge}>Desain Custom</span>
          </div>

          <div className={styles.actions}>
            <a href="#katalog" className={styles.primaryButton}>Lihat Koleksi</a>
            <WhatsAppLink contact={site.whatsapp} placement="hero" className={styles.secondaryButton}>
              Cek Ketersediaan
            </WhatsAppLink>
          </div>
        </div>

      </div>
    </section>
  );
}
