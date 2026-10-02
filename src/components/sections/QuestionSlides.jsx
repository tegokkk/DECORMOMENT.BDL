'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './QuestionSlides.module.css';

const questions = [
  'Sedang cari papan ucapan yang cantik, estetik, dan siap dikirim ke lokasi acara?',
  'Sedang mencari papan akrilik elegan dengan harga yang tetap terjangkau?',
  'Sedang mencari papan ucapan untuk wisuda, wedding, atau grand opening?',
];

export default function QuestionSlides() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showSlide = (index) => {
    setActiveIndex((index + questions.length) % questions.length);
  };

  return (
    <section className={styles.section} aria-label="Pertanyaan tentang papan ucapan">
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Untuk setiap momen spesial</p>
          <div className={styles.slide} aria-live="polite" aria-atomic="true">
            <p className={styles.question} key={activeIndex}>
              {questions[activeIndex]}
            </p>
          </div>
          <div className={styles.pagination} role="group" aria-label="Pilih pertanyaan">
            {questions.map((question, index) => (
              <button
                key={question}
                type="button"
                className={`${styles.dot} ${activeIndex === index ? styles.activeDot : ''}`}
                onClick={() => showSlide(index)}
                aria-label={`Tampilkan pertanyaan ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <span className={styles.counter} aria-hidden="true">
            0{activeIndex + 1}<span> / 0{questions.length}</span>
          </span>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => showSlide(activeIndex - 1)}
            aria-label="Pertanyaan sebelumnya"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => showSlide(activeIndex + 1)}
            aria-label="Pertanyaan berikutnya"
          >
            <ArrowRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
}
