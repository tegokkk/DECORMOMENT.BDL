import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getActivePrice } from '@/lib/pricing';
import ProductPrice from './ProductPrice';
import WhatsAppLink from '../ui/WhatsAppLink';
import styles from './ProductDialog.module.css';

export default function ProductDialog({ product, contact, onClose }) {
  const dialogRef = useRef(null);
  const activePrice = getActivePrice(product.price);
  const images = product.images && product.images.length > 0 ? product.images : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = images[activeImageIndex] || images[0] || null;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    // Kunci scroll halaman belakang
    document.body.style.overflow = 'hidden';
    
    // Focus management sederhana
    if (dialogRef.current) {
      dialogRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} data-lenis-prevent="true">
      <div 
        className={styles.dialog} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="dialog-title"
        onClick={e => e.stopPropagation()}
        tabIndex="-1"
        ref={dialogRef}
        data-lenis-prevent="true"
      >
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Tutup detail produk"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className={styles.layout}>
          <div className={styles.galleryPlaceholder}>
            {currentImage && (
              <Image 
                src={currentImage} 
                alt={`${product.name} - Foto ${activeImageIndex + 1}`} 
                fill 
                className={styles.image} 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <span className={styles.shapeLabel}>{product.shape}</span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.navArrow} ${styles.navArrowLeft}`}
                  onClick={handlePrevImage}
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className={`${styles.navArrow} ${styles.navArrowRight}`}
                  onClick={handleNextImage}
                  aria-label="Foto selanjutnya"
                >
                  <ChevronRight size={20} />
                </button>

                <div className={styles.thumbStrip}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.thumbBtn} ${activeImageIndex === idx ? styles.activeThumb : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Lihat foto ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        width={40}
                        height={40}
                        className={styles.thumbImg}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className={styles.info}>
            <h2 id="dialog-title" className={styles.title}>{product.name}</h2>
            <div>
              <ProductPrice price={product.price} activePrice={activePrice} />
              {product.usage && product.usage.duration && (
                <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'block', marginTop: '0.25rem' }}>
                  *{product.usage.model === 'sewa' ? 'Harga sewa' : 'Harga'} untuk durasi {product.usage.duration}
                </span>
              )}
            </div>
            
            <p className={styles.description}>{product.description}</p>
            
            {product.inclusions && product.inclusions.length > 0 && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Sudah Termasuk:</h4>
                <ul className={styles.list}>
                  {product.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
              </div>
            )}
            
            <div className={styles.section}>
              <p className={styles.note}>
                Ketersediaan tanggal, desain final, dan rincian biaya pengantaran/penjemputan 
                akan dikoordinasikan melalui WhatsApp.
              </p>
            </div>
            
            <div className={styles.actions}>
              <WhatsAppLink 
                contact={contact} 
                product={product} 
                placement="product_dialog" 
                className={styles.waBtn}
              >
                Tanya Model Ini
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
