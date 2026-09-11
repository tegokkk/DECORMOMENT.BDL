'use client';

import { useState } from 'react';
import { Star, CheckCircle2, ShieldCheck, Sparkles, Clock, MessageSquarePlus } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import ReviewModal from './ReviewModal';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section className={styles.section} id="testimoni">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Ulasan Pelanggan</span>
          <h2 className={styles.title}>Momen Spesial yang Menjadi Lebih Berkesan</h2>
          <p className={styles.subtitle}>
            Ratusan ucapan wisuda, grand opening, dan pernikahan di Bandar Lampung telah kami hias dengan penuh ketelitian dan kasih.
          </p>
          <div className={styles.actionWrapper}>
            <button 
              type="button" 
              className={styles.writeReviewBtn}
              onClick={() => setIsReviewModalOpen(true)}
            >
              <MessageSquarePlus size={18} />
              Tulis Ulasan Kamu
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.stars} aria-label={`${item.rating} dari 5 bintang`}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                </div>
                <span className={styles.eventBadge}>{item.event}</span>
              </div>

              <p className={styles.quote}>&ldquo;{item.comment}&rdquo;</p>

              <div className={styles.cardBottom}>
                <div className={styles.avatar}>{item.avatar}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>
                    {item.name}
                    {item.verified && (
                      <span className={styles.verifiedCheck} title="Penyewa Terverifikasi">
                        <CheckCircle2 size={16} />
                      </span>
                    )}
                  </div>
                  <div className={styles.productTag}>
                    Model: {item.productName} • {item.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.trustBanner}>
          <div className={styles.trustItem}>
            <Sparkles className={styles.trustIcon} size={20} />
            <span>Desain Eksklusif & Rapi</span>
          </div>
          <div className={styles.trustItem}>
            <Clock className={styles.trustIcon} size={20} />
            <span>Tepat Waktu & Siap Pasang</span>
          </div>
          <div className={styles.trustItem}>
            <ShieldCheck className={styles.trustIcon} size={20} />
            <span>Garansi Penggantian Desain</span>
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
}
