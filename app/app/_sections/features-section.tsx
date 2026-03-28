/* eslint-disable @next/next/no-img-element */
'use client';

import {
  motion,
  fadeInUp,
  staggerContainer,
  ScrollReveal,
} from '../_components/motion-wrapper';

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

export default function FeaturesSection() {
  return (
    <section className="promo-features">
      <div className="promo-features-header">
        <ScrollReveal>
          <h2 className="promo-section-title">
            매일이 <span className="promo-text-accent">특별한 도전</span>
          </h2>
          <p className="promo-section-sub">
            단순한 기록 앱이 아니에요.
            <br />
            게임처럼 재미있는 계단 오르기 경험.
          </p>
        </ScrollReveal>
      </div>

      <motion.div
        className="promo-features-stack"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        {features.map((f) => (
          <motion.div
            key={f.key}
            className="promo-feature-card"
            variants={fadeInUp}
            whileTap={{ scale: 0.97 }}
          >
            <div className="promo-feature-img-wrap">
              <img
                src={f.image}
                alt={f.title}
                className="promo-feature-img"
                width={200}
                height={200}
                loading="lazy"
              />
            </div>
            <div className="promo-feature-body">
              <span className="promo-feature-emoji">{f.emoji}</span>
              <h3 className="promo-feature-title">{f.title}</h3>
              <p className="promo-feature-desc">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
