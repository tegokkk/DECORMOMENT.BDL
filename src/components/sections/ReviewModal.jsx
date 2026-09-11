'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, X, Send } from 'lucide-react';
import { site } from '@/data/site';
import { products } from '@/data/products';
import { createWhatsAppUrl, generateReviewMessage } from '@/lib/whatsapp';
import styles from './ReviewModal.module.css';

const EVENT_OPTIONS = [
  'Wisuda / Kelulusan',
  'Pernikahan / Wedding',
  'Grand Opening / Acara Toko',
  'Ulang Tahun / Birthday',
  'Seminar / Sidang Skripsi',
  'Lainnya',
];

export default function ReviewModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [event, setEvent] = useState(EVENT_OPTIONS[0]);
  const [productName, setProductName] = useState(products[0]?.name || 'Papan Akrilik Custom');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const message = generateReviewMessage({
      name: name.trim(),
      event,
      productName,
      rating,
      comment: comment.trim(),
    });

    const url = createWhatsAppUrl(site.whatsapp, message);
    if (!url) return;

    // Track analytics event if configured
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'submit_review_intent', {
        event_category: 'review',
        rating,
        product: productName,
      });
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const ratingDescriptions = {
    1: 'Kecewa',
    2: 'Kurang Puas',
    3: 'Cukup Bagus',
    4: 'Sangat Bagus',
    5: 'Luar Biasa Sempurna!',
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className={styles.overlay} onClick={onClose} data-lenis-prevent="true">
      <div 
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
        ref={dialogRef}
        data-lenis-prevent="true"
      >
        <button 
          className={styles.closeBtn} 
          onClick={onClose} 
          aria-label="Tutup form ulasan"
          type="button"
        >
          <X size={20} />
        </button>

        <div className={styles.header}>
          <div className={styles.eyebrow}>Suara Pelanggan</div>
          <h2 id="review-title" className={styles.title}>Bagikan Pengalamanmu</h2>
          <p className={styles.subtitle}>
            Pendapatmu sangat berarti untuk membantu kami terus memberikan karya papan akrilik terbaik.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="rev-name" className={styles.label}>Nama Lengkap / Panggilan *</label>
            <input 
              id="rev-name"
              type="text" 
              className={styles.input} 
              placeholder="Contoh: Nabila Putri"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="rev-event" className={styles.label}>Jenis Acara</label>
            <select 
              id="rev-event"
              className={styles.select}
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            >
              {EVENT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="rev-product" className={styles.label}>Model Papan yang Disewa</label>
            <select 
              id="rev-product"
              className={styles.select}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
              <option value="Model Custom Lainnya">Model Custom Lainnya</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Rating Pengalaman</label>
            <div className={styles.starsWrapper}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={styles.starBtn}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Beri rating ${star} bintang`}
                >
                  <Star 
                    size={28} 
                    fill={star <= currentDisplayRating ? '#F59E0B' : 'none'} 
                    stroke={star <= currentDisplayRating ? '#F59E0B' : '#D1D5DB'} 
                  />
                </button>
              ))}
              <span className={styles.ratingText}>
                {ratingDescriptions[currentDisplayRating]}
              </span>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="rev-comment" className={styles.label}>Ulasan & Kesan Kamu *</label>
            <textarea 
              id="rev-comment"
              className={styles.textarea} 
              placeholder="Ceritakan bagaimana hasil papan ucapan, kerapian desain, dan pengantarannya..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className={styles.notice}>
            <strong>Info:</strong> Formulir ini akan diteruskan ke WhatsApp Admin Decormoment.bdl untuk dikurasi dan ditampilkan di website. Kamu juga bisa melampirkan foto dokumentasi acaramu saat di WhatsApp!
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={!name.trim() || !comment.trim()}
          >
            <Send size={18} />
            Kirim Ulasan via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
