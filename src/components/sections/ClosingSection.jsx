import { site } from '@/data/site';
import WhatsAppLink from '../ui/WhatsAppLink';
import styles from './ClosingSection.module.css';

export default function ClosingSection() {
  return (
    <section className={styles.section} id="kontak">
      <div className={styles.container}>
        <h2 className={styles.title}>Sudah punya tanggal spesial?</h2>
        <p className={styles.desc}>
          Sampaikan model pilihanmu, tanggal acara, dan lokasi. Biar kami bantu pastikan ketersediaannya.
        </p>
        <div className={styles.action}>
          <WhatsAppLink contact={site.whatsapp} placement="closing" className={styles.button}>
            Cek Jadwal via WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
