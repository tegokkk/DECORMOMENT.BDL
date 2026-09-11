export function createWhatsAppUrl(contact, message) {
  const number = contact?.number;
  const validFormat = typeof number === 'string'
    && /^[1-9]\d{7,14}$/.test(number)
    && number.startsWith('62');

  if (!contact?.verified || !validFormat) return null;
  if (typeof message !== 'string' || !message.trim()) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateProductMessage(productName) {
  return `Halo Decormoment.bdl, saya tertarik dengan ${productName} yang saya lihat di website.\n\nTanggal acara:\nLokasi acara:\nUcapan/nama pada papan:\n\nBoleh cek ketersediaan dan total biayanya?`;
}

export function generateGeneralMessage() {
  return `Halo Decormoment.bdl, saya ingin konsultasi papan ucapan untuk acara saya.\nBoleh dibantu memilih model dan cek ketersediaannya?`;
}

export function generateReviewMessage({ name, event, productName, rating = 5, comment }) {
  const stars = '⭐'.repeat(Math.max(1, Math.min(5, Number(rating) || 5)));
  return `Halo Admin Decormoment.bdl, saya ingin mengirimkan ulasan pengalaman sewa:\n\n• Nama: ${name}\n• Acara: ${event}\n• Model Papan: ${productName}\n• Rating: ${stars} (${rating}/5)\n\nUlasan:\n"${comment}"\n\nTerima kasih!`;
}

