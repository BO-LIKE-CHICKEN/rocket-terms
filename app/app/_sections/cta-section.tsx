/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, ScrollReveal } from '../_components/motion-wrapper';

const APP_STORE_URL = 'https://apps.apple.com/app/id6759623745';

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

export default function CtaSection() {
  return (
    <section className="promo-cta">
      <div className="promo-cta-glow" aria-hidden="true" />

      <div className="promo-cta-content">
        <ScrollReveal>
          <motion.div
            className="promo-cta-slime"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="/promo/cta-celebration.png"
              alt="축하하는 슬라임"
              className="promo-cta-img"
              width={240}
              height={240}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal variants={fadeInUp} delay={0.1}>
          <h2 className="promo-cta-title">
            지금 시작하세요
          </h2>
          <p className="promo-cta-sub">
            오늘 한 층이, 내일의 나를 바꿉니다.
            <br />
            슬라임과 함께 첫 걸음을 내딛어 보세요.
          </p>
        </ScrollReveal>

        <ScrollReveal variants={fadeInUp} delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.a
              href={APP_STORE_URL}
              className="promo-appstore-badge promo-appstore-badge--large"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              transition={spring}
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
              App Store에서 무료 다운로드
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
