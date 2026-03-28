/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
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

function FeatureSlide({
  feature,
  opacity,
  scale,
  y,
}: {
  feature: (typeof features)[number];
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      className="promo-feature-slide"
      style={{ opacity, scale, y }}
    >
      <div className="promo-feature-slide-img-wrap">
        <img
          src={feature.image}
          alt={feature.title}
          className="promo-feature-slide-img"
          width={280}
          height={280}
          loading="lazy"
        />
      </div>
      <div className="promo-feature-slide-body">
        <span className="promo-feature-slide-emoji">{feature.emoji}</span>
        <h3 className="promo-feature-slide-title">{feature.title}</h3>
        <p className="promo-feature-slide-desc">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

function FeatureDots({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Each dot lights up based on which feature is dominant
  const dot0 = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.3], [0.3, 1, 1, 0.3]);
  const dot1 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0.3, 1, 1, 0.3]);
  const dot2 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0.3, 1, 1, 0.3]);
  const dot3 = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0.3, 1, 1, 1]);

  const scale0 = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.3], [1, 1.5, 1.5, 1]);
  const scale1 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [1, 1.5, 1.5, 1]);
  const scale2 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [1, 1.5, 1.5, 1]);
  const scale3 = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [1, 1.5, 1.5, 1.5]);

  const dots = [
    { opacity: dot0, scale: scale0 },
    { opacity: dot1, scale: scale1 },
    { opacity: dot2, scale: scale2 },
    { opacity: dot3, scale: scale3 },
  ];

  return (
    <div className="promo-features-dots">
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="promo-features-dot"
          style={{ opacity: d.opacity, scale: d.scale }}
        />
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

  // Feature 0: visible 0% - 25%
  const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.25], [0, 1, 1, 0]);
  const scale0 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.25], [0.92, 1, 1, 0.95]);
  const y0 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.25], [40, 0, 0, -30]);

  // Feature 1: visible 25% - 50%
  const opacity1 = useTransform(scrollYProgress, [0.22, 0.3, 0.43, 0.5], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.22, 0.3, 0.43, 0.5], [0.92, 1, 1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0.22, 0.3, 0.43, 0.5], [40, 0, 0, -30]);

  // Feature 2: visible 50% - 75%
  const opacity2 = useTransform(scrollYProgress, [0.47, 0.55, 0.68, 0.75], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.47, 0.55, 0.68, 0.75], [0.92, 1, 1, 0.95]);
  const y2 = useTransform(scrollYProgress, [0.47, 0.55, 0.68, 0.75], [40, 0, 0, -30]);

  // Feature 3: visible 75% - 100% (no fade out at end)
  const opacity3 = useTransform(scrollYProgress, [0.72, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0.72, 0.8, 0.95, 1], [0.92, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.72, 0.8, 0.95, 1], [40, 0, 0, 0]);

  // Header fade based on very early scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.03, 0.18, 0.22], [1, 1, 1, 0]);

  const featureAnims = [
    { opacity: opacity0, scale: scale0, y: y0 },
    { opacity: opacity1, scale: scale1, y: y1 },
    { opacity: opacity2, scale: scale2, y: y2 },
    { opacity: opacity3, scale: scale3, y: y3 },
  ];

  return (
    <section className="promo-features-outer" ref={containerRef}>
      <div className="promo-features-sticky">
        {/* Section header - fades away as first feature scrolls */}
        <motion.div
          className="promo-features-header"
          style={{ opacity: headerOpacity }}
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

        {/* Feature slides stacked on top of each other */}
        <div className="promo-features-slides">
          {features.map((f, i) => (
            <FeatureSlide
              key={f.key}
              feature={f}
              opacity={featureAnims[i].opacity}
              scale={featureAnims[i].scale}
              y={featureAnims[i].y}
            />
          ))}
        </div>

        {/* Progress dots */}
        <FeatureDots scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
