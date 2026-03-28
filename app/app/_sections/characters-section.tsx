/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

const characters = [
  {
    id: 'mint',
    name: '민트',
    personality: '가볍게 시작하는 오늘의 첫 파트너.',
    image: '/promo/characters/mint.png',
    color: '#4dd1a8',
  },
  {
    id: 'grape',
    name: '그레이프',
    personality: '최적의 페이스를 계산했어. 따라와.',
    image: '/promo/characters/grape.png',
    color: '#a78bfa',
  },
  {
    id: 'ember',
    name: '엠버',
    personality: '뭐야, 아직도 워밍업이야? 가자!!',
    image: '/promo/characters/ember.png',
    color: '#f97316',
  },
  {
    id: 'ocean',
    name: '오션',
    personality: '파도처럼 천천히, 하지만 쉬지 않고.',
    image: '/promo/characters/ocean.png',
    color: '#38bdf8',
  },
  {
    id: 'bubblegum',
    name: '버블검',
    personality: '오늘도 최고로 귀여운 하루가 될 거야!!',
    image: '/promo/characters/bubblegum.png',
    color: '#f472b6',
  },
  {
    id: 'mountain-club',
    name: '산악회',
    personality: '열정! 열정! 열정! ...백숙 먹으러 가자.',
    image: '/promo/characters/mountain-club.png',
    color: '#a3e635',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

export default function CharactersSection() {
  return (
    <section className="promo-characters">
      <motion.div
        className="promo-characters-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
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

      <div className="promo-characters-grid">
        {characters.map((c, i) => (
          <motion.div
            key={c.id}
            className="promo-char-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.97 }}
            style={
              {
                '--char-color': c.color,
              } as React.CSSProperties
            }
          >
            <div className="promo-char-glow" />
            <img
              src={c.image}
              alt={c.name}
              className="promo-char-img"
              width={140}
              height={140}
              loading="lazy"
            />
            <h3 className="promo-char-name">{c.name}</h3>
            <p className="promo-char-personality">{c.personality}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
