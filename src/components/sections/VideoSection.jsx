'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { site } from '@/data/site';
import WhatsAppLink from '../ui/WhatsAppLink';
import styles from './VideoSection.module.css';

const VIDEO_ID = 'AVoMA0DIfx8';
const VIDEO_URL = `https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`;
const VIDEO_FALLBACK_URL = `https://www.youtube.com/shorts/${VIDEO_ID}`;

const HIGHLIGHTS = [
  { text: 'Bukan sekadar tulisan — papan akrilik yang elegan dan tahan lama' },
  { text: 'Desain custom sesuai permintaan, direvisi sampai kamu puas' },
  { text: 'Cocok untuk wisuda, pernikahan, grand opening, dan momen spesial lainnya' },
  { text: 'Antar-jemput ke lokasi acara di Bandar Lampung' },
  { text: 'Ratusan pelanggan puas — lihat sendiri hasilnya di video ini' },
];

export default function VideoSection() {
  const sectionRef = useRef(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'video_section_view', {
              event_category: 'engagement',
              event_label: VIDEO_ID,
            });
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasViewed]);

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'video_cta_click', {
        event_category: 'lead',
        event_label: 'video_section',
      });
    }
  };

  return (
    <section
      className={styles.section}
      id="video-produk"
      aria-labelledby="video-title"
      ref={sectionRef}
    >
      <div className={styles.container}>
        {/* Header (Judul) - di atas video pada mobile, di kanan pada desktop */}
        <div className={styles.headerArea}>
          <span className={styles.eyebrow}>Lihat Langsung</span>
          <h2 className={styles.title} id="video-title">
            Apa yang Membuat Decormoment Berbeda?
          </h2>
        </div>

        {/* Kolom media — video */}
        <div className={styles.videoArea}>
          <div className={styles.playerShell}>
            <div className={styles.iframeContainer}>
              <iframe
                src={VIDEO_URL}
                title="Video singkat papan ucapan akrilik Decormoment"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={styles.iframe}
              />
            </div>
          </div>
          <p className={styles.fallbackLink}>
            Tidak bisa memutar?{' '}
            <a href={VIDEO_FALLBACK_URL} target="_blank" rel="noopener noreferrer">
              Buka di YouTube ↗
            </a>
          </p>
        </div>

        {/* Kolom konten — poin & CTA */}
        <div className={styles.contentArea}>
          <ul className={styles.highlights} aria-label="Keunggulan Decormoment">
            {HIGHLIGHTS.map((item, i) => (
              <li key={i} className={styles.highlight}>
                <CheckCircle2
                  size={20}
                  className={styles.checkIcon}
                  aria-hidden="true"
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctaWrapper} onClick={handleCtaClick}>
            <WhatsAppLink
              contact={site.whatsapp}
              placement="video_section"
              className={styles.ctaButton}
            >
              Tanya &amp; Pesan via WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
