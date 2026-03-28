/* eslint-disable @next/next/no-img-element */
'use client';

import {
  motion,
  fadeInUp,
  staggerContainer,
  ScrollReveal,
} from '../_components/motion-wrapper';

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
  return (
    <section className="promo-characters">
      <div className="promo-characters-header">
        <ScrollReveal>
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
        </ScrollReveal>
      </div>

      <motion.div
        className="promo-characters-stack"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        {characters.map((c) => (
          <motion.div
            key={c.id}
            className="promo-char-card"
            variants={fadeInUp}
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
      </motion.div>
    </section>
  );
}
