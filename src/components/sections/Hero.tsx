"use client"
import * as React from "react"
import { motion, Variants } from "framer-motion"
import { ArrowRight, TerminalSquare } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 40 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  }

  return (
    <Section id="home" className="min-h-[90vh] flex items-center pt-24 md:pt-32">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl flex-1"
          >
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2">
              <TerminalSquare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Information Systems Student &amp; Data Enthusiast
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Hi, I&apos;m <span className="text-primary">Devina Budianti Poetri</span>.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted mb-8 max-w-2xl leading-relaxed"
            >
              An Applied Information Systems (Smart City) student at Telkom University.
              Passionate about data research, machine learning, AI, and building smart city technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-12">
              <Button size="lg" className="gap-2 group">
                <a href="./#projects">View Work</a>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Profile Photo */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            className="relative flex-shrink-0"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-transparent blur-2xl scale-110" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <Image
                src="/profile.jpeg"
                alt="Devina Budianti Poetri"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Animated red accent ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-primary/20 animate-pulse" />
            <div className="absolute -inset-6 rounded-full border border-primary/10" />
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
