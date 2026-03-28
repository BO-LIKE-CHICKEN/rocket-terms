/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type RefObject } from 'react';

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

function FeatureCard({
  feature,
  index,
  total,
}: {
  feature: (typeof features)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  /* Progress bar reveal tied to scroll */
  const progressRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progressScroll } = useScroll({
    target: progressRef as RefObject<HTMLElement>,
    offset: ['start end', 'end center'],
  });
  const progressWidth = useTransform(progressScroll, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      className="promo-feature-card"
      style={{
        opacity,
        scale,
        y,
        position: 'sticky',
        top: `${140 + index * 12}px`,
        zIndex: total - index,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Progress bar */}
      <div className="promo-feature-progress" ref={progressRef}>
        <motion.div
          className="promo-feature-progress-bar"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="promo-feature-img-wrap">
        <img
          src={feature.image}
          alt={feature.title}
          className="promo-feature-img"
          width={200}
          height={200}
          loading="lazy"
        />
      </div>
      <div className="promo-feature-body">
        <span className="promo-feature-emoji">{feature.emoji}</span>
        <h3 className="promo-feature-title">{feature.title}</h3>
        <p className="promo-feature-desc">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef as RefObject<HTMLElement>,
    offset: ['start end', 'center center'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1]);

  return (
    <section className="promo-features">
      <motion.div
        ref={headerRef}
        className="promo-features-header"
        style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
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

      <div className="promo-features-stack">
        {features.map((f, i) => (
          <FeatureCard
            key={f.key}
            feature={f}
            index={i}
            total={features.length}
          />
        ))}
      </div>
    </section>
  );
}
