"use client"
import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { skills } from "@/data/skills"

export function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <Section id="about" className="bg-surface/30">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* Bio Column */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              <p>
                I am an undergraduate student in Applied Information Systems (Smart City) at Telkom University.
                My academic journey is driven by a strong interest in data research,
                data analysis, Machine Learning, and Artificial Intelligence.
              </p>
              <p>
                Through various academic projects and collaborative work, I have gained hands-on experience in
                applied statistics, data processing, system analysis, and user-centered design. I am continuously
                developing my skills to build impactful data-driven technologies and digital solutions.
              </p>
            </div>
          </motion.div>

          {/* Skills Column */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6 bg-surface p-8 rounded-2xl border border-border">
            <h3 className="font-semibold text-xl text-foreground">Skills and Tools</h3>
            <div className="space-y-5">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-sm font-medium text-muted uppercase tracking-wider">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 hover:border-primary/60 transition-all duration-200 cursor-default shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}
