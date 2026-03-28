/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/app/id6759623745';

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function HeroSection() {
  return (
    <section className="promo-hero">
      <div className="promo-hero-glow" aria-hidden="true" />

      <div className="promo-hero-content">
        {/* Slime — floats gently */}
        <motion.div
          className="promo-hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0 }}
        >
          <motion.img
            src="/promo/hero-mint.png"
            alt="민트 슬라임"
            className="promo-hero-img"
            width={360}
            height={360}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="promo-hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <h1 className="promo-hero-title">
            한 층 더 오를수록,
            <br />
            <span className="promo-hero-accent">한층 더 건강해져요</span>
          </h1>
          <p className="promo-hero-sub">
            귀여운 슬라임과 함께 계단 오르기 습관을 만들어보세요.
            <br />
            매일 한 층, 작은 발걸음이 큰 변화를 만듭니다.
          </p>
        </motion.div>

        {/* App Store badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.35 }}
        >
          <motion.a
            href={APP_STORE_URL}
            className="promo-appstore-badge"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 17 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.545 10.239c-.022-2.234 1.823-3.308 1.905-3.36-.038-.055-1.5-2.165-3.831-2.165-1.629 0-2.953.977-3.741.977-.787 0-2.003-.952-3.293-.927C2.847 4.79 1.266 5.886.603 7.555c-1.366 2.654-.349 6.589.982 8.745.651.941 1.427 1.998 2.446 1.96.982-.04 1.353-.635 2.54-.635 1.187 0 1.52.635 2.562.615 1.057-.019 1.727-.959 2.371-1.904.748-1.092 1.055-2.148 1.073-2.203-.024-.01-2.058-.79-2.08-3.134l.048.24zM11.15 3.292c.541-.654.906-1.563.806-2.468-.78.032-1.724.519-2.283 1.173-.5.579-.938 1.504-.82 2.392.87.068 1.756-.442 2.297-1.097z" />
            </svg>
            App Store에서 다운로드
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="promo-scroll-indicator"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="promo-scroll-dot" />
      </motion.div>
    </section>
  );
}
