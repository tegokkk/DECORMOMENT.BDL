import { site } from '@/data/site';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <div className={styles.logo}>{site.brandName}</div>
          <p className={styles.description}>
            Papan ucapan akrilik custom untuk momen spesialmu. Melayani wilayah {site.serviceArea}.
          </p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h3 className={styles.linkTitle}>Menu</h3>
            <a href="#katalog">Katalog</a>
            <a href="#cara-pesan">Cara Pesan</a>
            <a href="#testimoni">Testimoni</a>
            <a href="#faq">FAQ</a>
          </div>
          
          <div className={styles.linkGroup}>
            <h3 className={styles.linkTitle}>Sosial Media</h3>
            {site.instagram?.verified && (
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            {site.tiktok?.verified && (
              <a href={site.tiktok.url} target="_blank" rel="noopener noreferrer">TikTok</a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} {site.brandName}. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
