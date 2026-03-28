'use client';

import { motion } from 'framer-motion';

const INSTAGRAM_URL = 'https://www.instagram.com/onemorefloor';

export default function FooterSection() {
  return (
    <motion.footer
      className="promo-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="promo-footer-links">
        <motion.a
          href="/policies/privacy/"
          whileTap={{ scale: 0.96 }}
        >
          개인정보처리방침
        </motion.a>
        <span className="promo-footer-dot" aria-hidden="true" />
        <motion.a
          href="/support/"
          whileTap={{ scale: 0.96 }}
        >
          고객지원
        </motion.a>
        <span className="promo-footer-dot" aria-hidden="true" />
        <motion.a
          href={INSTAGRAM_URL}
          className="promo-footer-instagram"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          aria-label="Instagram"
        >
          <svg
            width="18"
            height="18"
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
          Instagram
        </motion.a>
      </div>
      <p className="promo-footer-copy">
        &copy; {new Date().getFullYear()} 한층한층. All rights reserved.
      </p>
    </motion.footer>
  );
}
