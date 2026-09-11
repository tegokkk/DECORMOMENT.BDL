import { faqs } from '@/data/faqs';
import { policies } from '@/data/policies';
import styles from './FaqSection.module.css';

export default function FaqSection() {
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Pertanyaan Seputar Pemesanan</h2>
        </div>
        
        <div className={styles.list}>
          {sortedFaqs.map(faq => {
            const policy = policies.find(p => p.id === faq.policyId);
            if (!policy) return null;
            
            return (
              <details key={faq.id} className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{faq.question}</span>
                  <span className={styles.icon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" className={styles.vertical}></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </summary>
                <div className={styles.content}>
                  <p>{policy.details}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
