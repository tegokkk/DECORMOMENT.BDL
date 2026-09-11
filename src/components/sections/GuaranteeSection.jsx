import { policies } from '@/data/policies';
import styles from './GuaranteeSection.module.css';

export default function GuaranteeSection() {
  const warranty = policies.find(p => p.id === 'warranty');

  if (!warranty) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Kalau ada kesalahan dari kami, kami bantu bereskan.</h2>
            <p className={styles.desc}>{warranty.details}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
