'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import styles from './Header.module.css';
import WhatsAppLink from '../ui/WhatsAppLink';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image 
              src="/images/products/IMG_2715.webp" 
              alt={site.brandName} 
              width={48} 
              height={48} 
              className={styles.logoImage} 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <a href="#katalog" className={styles.navLink}>Katalog</a>
            <a href="#cara-pesan" className={styles.navLink}>Cara Pesan</a>
            <a href="#testimoni" className={styles.navLink}>Testimoni</a>
            <a href="#faq" className={styles.navLink}>FAQ</a>
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <WhatsAppLink contact={site.whatsapp} placement="header" className={styles.headerButton}>
              Chat Admin
            </WhatsAppLink>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              <a href="#katalog" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Katalog</a>
              <a href="#cara-pesan" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Cara Pesan</a>
              <a href="#testimoni" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Testimoni</a>
              <a href="#faq" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
