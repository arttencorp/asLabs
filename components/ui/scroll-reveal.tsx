"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  amount?: number
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance }
    case "down":
      return { y: -distance }
    case "left":
      return { x: distance }
    case "right":
      return { x: -distance }
    default:
      return {}
  }
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const offset = getOffset(direction, distance)

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  amount?: number
}

export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: Direction
  distance?: number
  duration?: number
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
  duration = 0.5,
}: StaggerItemProps) {
  const offset = getOffset(direction, distance)

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
