'use client';

import { createWhatsAppUrl, generateProductMessage, generateGeneralMessage } from '@/lib/whatsapp';
import styles from './WhatsAppLink.module.css';

export default function WhatsAppLink({ contact, product = null, placement = 'general', children, className = '' }) {
  const message = product 
    ? generateProductMessage(product.name)
    : generateGeneralMessage();
    
  const url = createWhatsAppUrl(contact, message);

  if (!url) {
    return (
      <button disabled className={`${styles.disabledButton} ${className}`} aria-disabled="true">
        WhatsApp Belum Tersedia
      </button>
    );
  }

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', {
          event_category: 'lead',
          event_label: product ? product.name : 'General Inquiry',
          placement: placement,
          product_id: product?.id || null,
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact', {
          content_name: product ? product.name : 'WhatsApp Inquiry',
          placement: placement,
        });
      }
    }
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${styles.button} ${className}`}
      data-placement={placement}
      data-product={product?.id}
      onClick={handleClick}
    >
      {children || 'Chat WhatsApp'}
    </a>
  );
}
