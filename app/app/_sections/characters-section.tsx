/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, type RefObject } from 'react';

const characters = [
  {
    id: 'mint',
    name: '민트',
    personality: '밝고 긍정적인 기본 슬라임. 항상 웃으며 응원해줘요.',
    image: '/promo/characters/mint.png',
    color: '#4dd1a8',
  },
  {
    id: 'grape',
    name: '포도',
    personality: '차분하고 신비로운 성격. 밤하늘 같은 보랏빛이 매력.',
    image: '/promo/characters/grape.png',
    color: '#a78bfa',
  },
  {
    id: 'ember',
    name: '엠버',
    personality: '열정 가득한 불꽃 슬라임. 오르막이 힘들 때 용기를 줘요.',
    image: '/promo/characters/ember.png',
    color: '#f97316',
  },
  {
    id: 'ocean',
    name: '오션',
    personality: '깊고 넓은 마음의 소유자. 꾸준함의 아이콘.',
    image: '/promo/characters/ocean.png',
    color: '#38bdf8',
  },
  {
    id: 'bubblegum',
    name: '버블검',
    personality: '발랄하고 장난기 넘치는 핑크 슬라임. 매일이 파티!',
    image: '/promo/characters/bubblegum.png',
    color: '#f472b6',
  },
  {
    id: 'mountain-club',
    name: '산악회',
    personality: '노련한 등반가. 정상에서 기다리고 있을게요.',
    image: '/promo/characters/mountain-club.png',
    color: '#a3e635',
  },
];

export default function CharactersSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef as RefObject<HTMLElement>,
    offset: ['start end', 'center center'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth
        : 280;
      const gap = 16;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, characters.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="promo-characters">
      <motion.div
        ref={headerRef}
        className="promo-characters-header"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <h2 className="promo-section-title">
          6마리 슬라임,
          <br />
          <span className="promo-text-accent">전부 모아보세요</span>
        </h2>
        <p className="promo-section-sub">
          각자의 개성을 가진 슬라임들이
          <br />
          계단 위에서 기다리고 있어요.
        </p>
      </motion.div>

      {/* Horizontal scroll-snap carousel */}
      <div
        className="promo-characters-carousel"
        ref={scrollContainerRef}
      >
        {characters.map((c) => (
          <motion.div
            key={c.id}
            className="promo-char-card"
            whileTap={{ scale: 0.97 }}
            style={
              {
                '--char-color': c.color,
              } as React.CSSProperties
            }
          >
            <div className="promo-char-img-wrap">
              <img
                src={c.image}
                alt={c.name}
                className="promo-char-img"
                width={160}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="promo-char-info">
              <h3 className="promo-char-name">{c.name}</h3>
              <p className="promo-char-personality">{c.personality}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator dots */}
      <div className="promo-characters-dots" aria-hidden="true">
        {characters.map((c, i) => (
          <span
            key={c.id}
            className={`promo-characters-dot${i === activeIndex ? ' promo-characters-dot--active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
