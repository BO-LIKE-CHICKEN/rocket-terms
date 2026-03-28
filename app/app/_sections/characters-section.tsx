/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type RefObject } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  /* Header fade-in: based on when the outer container enters the viewport */
  const { scrollYProgress: headerProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ['start end', 'start 0.3'],
  });
  const headerOpacity = useTransform(headerProgress, [0, 1], [0, 1]);
  const headerY = useTransform(headerProgress, [0, 1], [40, 0]);

  /* Horizontal scroll: map vertical scroll progress of the tall container
     to a horizontal translateX on the card track */
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

  // 6 cards * 300px + 5 gaps * 24px + padding = ~1920px total track width
  // On a 390px viewport we need to translate roughly -(1920 - 390) = -1530px
  // Using percentage of the track: ~80%. Fine-tuned so last card is fully visible.
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-72%']);

  return (
    <section ref={containerRef} className="promo-characters-outer">
      {/* Sticky viewport */}
      <div className="promo-characters-sticky">
        {/* Header */}
        <motion.div
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

        {/* Horizontal card track */}
        <div className="promo-characters-track-wrap">
          <motion.div className="promo-characters-track" style={{ x }}>
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
                <div className="promo-char-glow" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
