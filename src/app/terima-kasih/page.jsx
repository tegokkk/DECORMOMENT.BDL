import Link from 'next/link';
import { CheckCircle2, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import { site } from '@/data/site';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import styles from './TerimaKasih.module.css';

export const metadata = {
  title: 'Terima Kasih | Decormoment.bdl',
  description: 'Terima kasih telah menghubungi Decormoment.bdl. Admin kami akan segera merespons pesan WhatsApp Anda.',
};

export default function TerimaKasihPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <CheckCircle2 size={40} />
        </div>

        <h1 className={styles.title}>Terima Kasih!</h1>
        <p className={styles.subtitle}>
          Pesan Anda sedang/telah diteruskan ke WhatsApp resmi <strong>{site.brandName}</strong>.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <Clock size={18} className={styles.infoIcon} />
            <div>
              <strong>Estimasi Waktu Respons:</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--color-muted)' }}>
                Admin kami aktif setiap hari pukul <strong>08.00 – 21.00 WIB</strong>. Pesan di luar jam tersebut akan dibalas pada pagi hari berikutnya.
              </p>
            </div>
          </div>
          <div className={styles.infoRow}>
            <MessageCircle size={18} className={styles.infoIcon} />
            <div>
              <strong>Tips Konsultasi Cepat:</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--color-muted)' }}>
                Sertakan tanggal acara, lokasi pengantaran di Bandar Lampung, dan nama wisudawan/mempelai agar kami bisa langsung cek ketersediaan slot.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/#katalog" className={styles.secondaryBtn}>
            <ArrowLeft size={18} />
            Kembali ke Katalog
          </Link>
          <WhatsAppLink contact={site.whatsapp} placement="terima_kasih" className={styles.primaryBtn}>
            Chat Ulang WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
