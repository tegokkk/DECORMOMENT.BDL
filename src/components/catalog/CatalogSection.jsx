import { products } from '@/data/products';
import { site } from '@/data/site';
import CatalogClient from './CatalogClient';

export default function CatalogSection() {
  // Hanya teruskan produk yang published ke client
  const activeProducts = products.filter(p => p.published);

  return (
    <CatalogClient 
      products={activeProducts} 
      contact={site.whatsapp} 
    />
  );
}
