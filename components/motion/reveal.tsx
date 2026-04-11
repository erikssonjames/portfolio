"use client"

import * as React from "react"
import { motion, type HTMLMotionProps, type Variants } from "framer-motion"

const baseItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const baseStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

type MotionRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  delay?: number
}

export function MotionReveal({ children, delay = 0, variants, ...props }: MotionRevealProps) {
  const mergedVariants: Variants = variants ?? {
    hidden: baseItem.hidden,
    visible: {
      ...baseItem.visible,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={mergedVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type MotionStaggerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
}

export function MotionStagger({ children, variants, ...props }: MotionStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants ?? baseStagger}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const revealItemVariants = baseItem
