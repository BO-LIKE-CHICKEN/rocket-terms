'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── Toss-like spring transition ── */
const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

/* ── shared animation variants ── */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

/* ── reusable scroll-reveal wrapper ── */

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={delay ? { ...springTransition, delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ── re-export motion for convenience ── */
export { motion };
