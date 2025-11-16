"use client";

import { motion, MotionProps } from "motion/react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
} & MotionProps;

export function FadeIn({ children, className, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
