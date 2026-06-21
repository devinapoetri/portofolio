"use client"
import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Calendar, Briefcase, Trophy, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { experiences } from "@/data/experience"

export function Experience() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-5 w-5 text-primary" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-primary" />
      case "education":
        return <GraduationCap className="h-5 w-5 text-primary" />
      default:
        return <Briefcase className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Section id="experience" className="bg-surface/30">
      <Container>
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
            Experience
          </h2>
          <p className="text-muted text-lg">
            A timeline of my professional journey, academic roles, and key accomplishments.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-border ml-3 md:ml-6 space-y-12"
        >
          {experiences.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[20px] top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-surface shadow-sm">
                {getIcon(item.type)}
              </div>

              {/* Clickable Card */}
              <Link href={`/experience/${item.id}`} className="block group">
                <div className="rounded-xl border border-border bg-surface/60 p-5 hover:border-primary/50 hover:bg-surface hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    {/* Red date badge */}
                    <div className="flex items-center gap-2 text-sm font-semibold bg-primary/15 text-primary border border-primary/30 px-3 py-1 rounded-lg w-fit">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </div>
                  </div>

                  <h4 className="text-primary font-medium mb-3">{item.organization}</h4>
                  <p className="text-muted leading-relaxed max-w-3xl line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
