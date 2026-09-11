export function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getActivePrice(priceData) {
  if (!priceData || !priceData.verified) return null;
  
  const now = new Date();
  if (priceData.validUntil) {
    const validUntilDate = new Date(priceData.validUntil);
    if (now > validUntilDate) {
      return null;
    }
  }
  
  return priceData.amount;
}
