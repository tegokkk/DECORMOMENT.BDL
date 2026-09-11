'use client';

import { useState } from 'react';
import { filterProductsByShape } from '@/lib/catalog';
import { useDebouncedClick } from '@/hooks/useDebouncedClick';
import { CoverflowCarousel } from '../ui/CoverflowCarousel';
import ProductDialog from './ProductDialog';
import styles from './CatalogClient.module.css';

export default function CatalogClient({ products, contact }) {
  const [selectedShape, setSelectedShape] = useState('all');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleFilterClick = useDebouncedClick((shape) => {
    setSelectedShape(shape);
  }, 350);

  const filteredProducts = filterProductsByShape(products, selectedShape);
  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className={styles.catalog} id="katalog">
      <div className={styles.header}>
        <h2 className={styles.title}>Pilih papan untuk momenmu.</h2>
        <div className={styles.filters} role="group" aria-label="Filter bentuk papan">
          <button 
            className={`${styles.filterBtn} ${selectedShape === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterClick('all')}
            aria-pressed={selectedShape === 'all'}
          >
            Semua
          </button>
          <button 
            className={`${styles.filterBtn} ${selectedShape === 'oval' ? styles.active : ''}`}
            onClick={() => handleFilterClick('oval')}
            aria-pressed={selectedShape === 'oval'}
          >
            Oval
          </button>
          <button 
            className={`${styles.filterBtn} ${selectedShape === 'kubah' ? styles.active : ''}`}
            onClick={() => handleFilterClick('kubah')}
            aria-pressed={selectedShape === 'kubah'}
          >
            Kubah
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.carouselWrapper}>
          <CoverflowCarousel 
            key={selectedShape}
            slides={filteredProducts} 
            showNavigation={true}
            showPagination={true}
            showCaption={true}
            onSlideClick={(slide) => setSelectedProductId(slide.id)}
          />
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Belum ada model untuk pilihan ini.</p>
          <button onClick={() => handleFilterClick('all')} className={styles.resetBtn}>
            Lihat semua koleksi
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductDialog 
          product={selectedProduct} 
          contact={contact}
          onClose={() => setSelectedProductId(null)} 
        />
      )}
    </div>
  );
}
