export function filterProductsByShape(products, shape) {
  if (!products || !Array.isArray(products)) return [];
  
  // Hanya produk yang di-publish yang dikembalikan
  const publishedProducts = products.filter(p => p.published);
  
  if (!shape || shape === 'all') return publishedProducts.sort((a,b) => a.sortOrder - b.sortOrder);
  
  return publishedProducts
    .filter(p => p.shape === shape)
    .sort((a,b) => a.sortOrder - b.sortOrder);
}
