'use client';

import { motion } from 'framer-motion';

const INSTAGRAM_URL = 'https://www.instagram.com/onemorefloor_official/';

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

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
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          개인정보처리방침
        </motion.a>
        <span className="promo-footer-dot" aria-hidden="true" />
        <motion.a
          href="/support/"
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          고객지원
        </motion.a>
        <span className="promo-footer-dot" aria-hidden="true" />
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          Instagram
        </motion.a>
      </div>
      <p className="promo-footer-copy">
        &copy; {new Date().getFullYear()} 한층한층. All rights reserved.
      </p>
    </motion.footer>
  );
}
