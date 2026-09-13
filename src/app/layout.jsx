import './globals.css';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import { site } from '@/data/site';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.canonicalUrl || 'https://decormoment.id'),
  title: {
    default: 'Decormoment.bdl — Papan Ucapan Akrilik Custom Bandar Lampung',
    template: '%s | Decormoment.bdl',
  },
  description: 'Sewa dan custom papan ucapan akrilik estetik di Bandar Lampung untuk wisuda, pernikahan, grand opening, dan momen spesial. Desain elegan, rapi, dan harga mulai Rp 45.000.',
  keywords: [
    'papan ucapan akrilik bandar lampung',
    'sewa papan ucapan lampung',
    'acrylic board bandar lampung',
    'papan wisuda lampung',
    'papan wedding lampung',
    'decormoment bdl',
    'papan ucapan kekinian lampung'
  ],
  authors: [{ name: 'Decormoment.bdl' }],
  creator: 'Decormoment.bdl',
  publisher: 'Decormoment.bdl',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Decormoment.bdl — Papan Ucapan Akrilik Custom Bandar Lampung',
    description: 'Sewa & custom papan ucapan akrilik estetik di Bandar Lampung. Desain elegan, harga mulai Rp 45.000.',
    url: site.canonicalUrl || 'https://decormoment.id',
    siteName: 'Decormoment.bdl',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Decormoment.bdl — Papan Ucapan Akrilik Custom Bandar Lampung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decormoment.bdl — Papan Ucapan Akrilik Custom Bandar Lampung',
    description: 'Sewa & custom papan ucapan akrilik estetik di Bandar Lampung. Desain elegan & pengerjaan rapi.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'Sv4F8_M5gtPDzo5rxw2mwvw0WbFJJQCVsDXjoKwWUM4',
  },
};

import SmoothScroll from '@/components/layout/SmoothScroll';

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body>
        {/* Soft Pink Glow Background as requested */}
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle at center, rgba(251, 182, 206, 0.4) 0%, transparent 70%)',
          }} 
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
