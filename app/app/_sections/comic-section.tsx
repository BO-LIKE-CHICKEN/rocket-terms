/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type RefObject } from 'react';

const INSTAGRAM_URL = 'https://www.instagram.com/onemorefloor';

export default function ComicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  const imgScale = useTransform(scrollYProgress, [0, 0.35], [0.85, 1]);

  return (
    <section className="promo-comic" ref={sectionRef}>
      <motion.div className="promo-comic-content" style={{ opacity, scale, y }}>
        <h2 className="promo-section-title">
          한층한층 <span className="promo-text-accent">이야기</span>
        </h2>
        <p className="promo-section-sub">
          인스타그램에서 만화 연재 중
        </p>

        {/* Comic preview image */}
        <motion.div className="promo-comic-preview" style={{ scale: imgScale }}>
          <img
            src="/promo/comic-preview.png"
            alt="한층한층 이야기 만화 미리보기"
            className="promo-comic-img"
            width={600}
            height={600}
            loading="lazy"
          />
        </motion.div>

        {/* Instagram link */}
        <motion.a
          href={INSTAGRAM_URL}
          className="promo-comic-link"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
        >
          {/* Instagram SVG icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          인스타그램에서 보기
        </motion.a>
      </motion.div>
    </section>
  );
}
