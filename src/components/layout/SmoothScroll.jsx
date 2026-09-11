'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

function AnchorManager({ children }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        const id = target.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return children;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <AnchorManager>
        {children}
      </AnchorManager>
    </ReactLenis>
  );
}
