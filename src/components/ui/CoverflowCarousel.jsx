'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { getActivePrice } from '@/lib/pricing';
import { useDebouncedClick } from '@/hooks/useDebouncedClick';
import styles from './CoverflowCarousel.module.css';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(148px, 22vw, 260px)',
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = 'Cover carousel',
  onSlideClick,
}) {
  const count = slides.length;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);

  const [selected, setSelected] = useState(0);



  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const handleGoTo = useDebouncedClick(goTo, 250);
  const handleNudge = useDebouncedClick(nudge, 250);

  const onPointerDown = (event) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    
    // P1.1: Removed onSlideClick from endDrag. Slide clicks are now handled directly on the slide items.
    
    settle(clamp(Math.round(posRef.current + carried)));
    
    // We delay nullifying dragRef so that onClick on the slide item can detect if it was a drag
    setTimeout(() => { dragRef.current = null; }, 0);
  };

  // P1.2: Normalisasi dan reset indeks ketika daftar slides berubah
  useEffect(() => {
    if (slides.length > 0) {
      if (selected >= slides.length) {
        setSelected(0);
        posRef.current = 0;
        targetRef.current = 0;
        paint();
      }
    }
  }, [slides.length, selected, paint]);

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const active = slides[selected];

  return (
    <div
      className={styles.container}
      style={{ '--cf-card': cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div style={{ position: 'relative' }}>
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              handleNudge(-1);
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              handleNudge(1);
            } else if (event.key === 'Enter' && onSlideClick) {
              event.preventDefault();
              if (active) onSlideClick(active);
            }
          }}
          className={styles.carouselFrame}
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
          }}
        >
          <div
            className={styles.slideTrack}
            style={{ height: 'calc(var(--cf-card) * 1.33)' }} // adjusted to 3/4 aspect ratio
          >
            {slides.map((slide, index) => {
              const imageSrc = slide.images && slide.images.length > 0 ? slide.images[0] : null;
              
              return (
                <div
                  key={slide.id || index}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  className={styles.slideItem}
                  style={{ width: 'var(--cf-card)' }}
                  onClick={(e) => {
                    // P1.1: Abaikan klik jika ini adalah akhir dari sebuah drag
                    if (dragRef.current && Math.abs(e.clientX - dragRef.current.x) > 5) return;
                    
                    if (selected !== index) {
                      handleGoTo(index);
                    } else if (onSlideClick) {
                      onSlideClick(slide);
                    }
                  }}
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={slide.name}
                      fill
                      draggable={false}
                      className={styles.slideImage}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{slide.shape}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => handleNudge(-1)}
              className={`${styles.navButton} ${styles.navButtonLeft}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => handleNudge(1)}
              className={`${styles.navButton} ${styles.navButtonRight}`}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {showCaption && active && (
        <div className={styles.caption} style={{ opacity: active ? 1 : 0 }}>
          <p className={styles.title}>{active.name}</p>
          <p className={styles.subtitle}>
            {active.price?.currency} {getActivePrice(active.price)?.toLocaleString('id-ID')}
          </p>
        </div>
      )}

      {showPagination && (
        <div className={styles.pagination}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => handleGoTo(index)}
              className={styles.pageDot}
              style={{ opacity: index === selected ? 1 : 0.3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
