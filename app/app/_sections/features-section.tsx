/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const features = [
  {
    key: 'climb',
    emoji: '🧗',
    title: '클라임',
    desc: '기압 + 모션 센서로 정확한 계단 층수를 측정해요.',
    image: '/promo/feature-climb.png',
  },
  {
    key: 'mission',
    emoji: '🎯',
    title: '미션',
    desc: '매일 새로운 미션에 도전하세요. 꾸준한 동기 부여.',
    image: '/promo/feature-mission.png',
  },
  {
    key: 'capsule',
    emoji: '🫧',
    title: '캡슐',
    desc: '계단을 오를수록 보상 캡슐을 얻어요. 스킨을 수집하세요.',
    image: '/promo/feature-capsule.png',
  },
  {
    key: 'conquest',
    emoji: '🏔️',
    title: '정복',
    desc: '에펠탑부터 에베레스트까지. 세계 랜드마크를 정복해보세요.',
    image: '/promo/feature-conquest.png',
  },
];

function FeatureSlide({
  feature,
  index,
  total,
  scrollYProgress,
}: {
  feature: (typeof features)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  // Cross-fade: fade in during first 20% of segment, stay visible, fade out during last 20%
  // First item starts visible, last item stays visible
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start),
      start + segmentSize * 0.2,
      end - segmentSize * 0.2,
      Math.min(1, end),
    ],
    [
      index === 0 ? 1 : 0, // first starts visible
      1,
      1,
      index === total - 1 ? 1 : 0, // last stays visible
    ],
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end],
    [index === 0 ? 0 : 30, 0, 0, index === total - 1 ? 0 : -20],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <img
        src={feature.image}
        alt={feature.title}
        style={{ width: 200, height: 200, objectFit: 'contain' }}
        loading="lazy"
      />
      <span style={{ fontSize: 32, marginTop: 16 }}>{feature.emoji}</span>
      <h3 className="promo-feature-card-title">{feature.title}</h3>
      <p className="promo-feature-card-desc">{feature.desc}</p>
    </motion.div>
  );
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / total;
  const dotOpacity = useTransform(
    scrollYProgress,
    [
      index * segmentSize,
      index * segmentSize + 0.05,
      (index + 1) * segmentSize - 0.05,
      (index + 1) * segmentSize,
    ],
    [0.3, 1, 1, 0.3],
  );

  return (
    <motion.div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'white',
        opacity: dotOpacity,
      }}
    />
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="promo-features-outer">
      <div className="promo-features-sticky">
        {/* Section header -- fades out as first feature appears */}
        <motion.div
          className="promo-features-header"
          style={{
            opacity: headerOpacity,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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

        {/* Feature slides */}
        {features.map((f, i) => (
          <FeatureSlide
            key={f.key}
            feature={f}
            index={i}
            total={features.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Progress dots */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}
        >
          {features.map((_, i) => (
            <ProgressDot
              key={i}
              index={i}
              total={features.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
