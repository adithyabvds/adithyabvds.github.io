import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.52, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

export function ScrollReveal({ children, className = "", delay = 0, staggerChildren = false }: ScrollRevealProps) {
  if (staggerChildren) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

