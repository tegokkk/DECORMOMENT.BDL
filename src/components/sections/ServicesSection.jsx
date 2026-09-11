import { services } from '@/data/services';
import { policies } from '@/data/policies';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  return (
    <section className={styles.section} id="layanan">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Kamu nikmati momennya, kami bantu urus detailnya.</h2>
        </div>
        <div className={styles.grid}>
          {services.map(service => {
            const policy = policies.find(p => p.id === service.policyId);
            return (
              <div key={service.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{policy?.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
