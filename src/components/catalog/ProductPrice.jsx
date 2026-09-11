import { formatRupiah } from '@/lib/pricing';
import styles from './ProductPrice.module.css';

export default function ProductPrice({ price, activePrice }) {
  if (!activePrice) return null;

  const showCompareAt = price.comparisonVerified && price.compareAt > activePrice;

  return (
    <div className={styles.wrapper}>
      {showCompareAt && (
        <span className={styles.compareAt}>
          <span className="sr-only">Harga asli: </span>
          {formatRupiah(price.compareAt)}
        </span>
      )}
      <span className={styles.active}>
        <span className="sr-only">Harga promo: </span>
        {formatRupiah(activePrice)}
      </span>
      {price.basis && (
        <span className={styles.basis}>/{price.basis}</span>
      )}
    </div>
  );
}
