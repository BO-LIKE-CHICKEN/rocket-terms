/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

const features = [
  {
    key: 'climb',
    emoji: '🧗',
    title: '클라임',
    desc: '기압 + 모션 센서로 정확한 계단 층수를 측정해요. 평지 보행과 완벽히 구분합니다.',
    image: '/promo/feature-climb.png',
  },
  {
    key: 'mission',
    emoji: '🎯',
    title: '미션',
    desc: '매일 새로운 미션에 도전하세요. 작은 목표부터 장기 도전까지, 꾸준한 동기 부여.',
    image: '/promo/feature-mission.png',
  },
  {
    key: 'capsule',
    emoji: '🫧',
    title: '캡슐',
    desc: '계단을 오를수록 보상 캡슐을 얻어요. 새로운 슬라임 스킨과 아이템을 수집하세요.',
    image: '/promo/feature-capsule.png',
  },
  {
    key: 'conquest',
    emoji: '🏔️',
    title: '정복',
    desc: '에펠탑, 남산타워, 에베레스트까지. 세계 랜드마크를 층수로 정복해보세요.',
    image: '/promo/feature-conquest.png',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

export default function FeaturesSection() {
  return (
    <section className="promo-features">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        className="promo-features-header"
      >
        <h2 className="promo-section-title">
          매일이 <span className="promo-text-accent">특별한 도전</span>
        </h2>
        <p className="promo-section-sub">
          단순한 기록 앱이 아니에요.
          <br />
          게임처럼 재미있는 계단 오르기 경험.
        </p>
      </motion.div>

      {features.map((f) => (
        <motion.div
          key={f.key}
          className="promo-feature-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={f.image}
            alt={f.title}
            width={200}
            height={200}
            loading="lazy"
          />
          <span className="promo-feature-card-emoji">{f.emoji}</span>
          <h3 className="promo-feature-card-title">{f.title}</h3>
          <p className="promo-feature-card-desc">{f.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}
