import Image from 'next/image';
import { getActivePrice } from '@/lib/pricing';
import ProductPrice from './ProductPrice';
import WhatsAppLink from '../ui/WhatsAppLink';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, contact, onOpen }) {
  const activePrice = getActivePrice(product.price);
  const imageSrc = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        {imageSrc && (
          <Image 
            src={imageSrc} 
            alt={product.name} 
            fill 
            className={styles.image} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <span className={styles.shapeLabel}>{product.shape}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <ProductPrice price={product.price} activePrice={activePrice} />
        
        <div className={styles.actions}>
          <button onClick={onOpen} className={styles.detailBtn}>
            Lihat Detail
          </button>
          <WhatsAppLink 
            contact={contact} 
            product={product} 
            placement="catalog" 
            className={styles.waBtn}
          >
            Tanya Model Ini
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
