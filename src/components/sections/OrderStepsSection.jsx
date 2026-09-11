import { site } from '@/data/site';
import WhatsAppLink from '../ui/WhatsAppLink';
import styles from './OrderStepsSection.module.css';

export default function OrderStepsSection() {
  const steps = [
    {
      title: 'Pilih model favoritmu',
      desc: 'Temukan bentuk dan tampilan yang kamu suka dari katalog kami.'
    },
    {
      title: 'Ceritakan rencanamu',
      desc: 'Kirim tanggal, lokasi, dan ucapan lewat WhatsApp.'
    },
    {
      title: 'Sepakati desain',
      desc: 'Revisi sebelum masuk pengerjaan agar sesuai keinginanmu.'
    },
    {
      title: 'Nikmati momennya',
      desc: 'Tim membantu pengantaran dan penjemputan sesuai kesepakatan.'
    }
  ];

  return (
    <section className={styles.section} id="cara-pesan">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Cara Pesan</h2>
          <p className={styles.subtitle}>Empat langkah mudah untuk papan spesialmu.</p>
          
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.number}>{index + 1}</div>
                <div className={styles.text}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.action}>
            <WhatsAppLink contact={site.whatsapp} placement="order_steps" className={styles.button}>
              Mulai dari WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
