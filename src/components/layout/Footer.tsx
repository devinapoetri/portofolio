"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Mail, ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border mt-auto pt-16 pb-8">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let's build something <br />
              <span className="text-primary">together.</span>
            </h2>
            <p className="text-muted text-lg max-w-md mb-8">
              Feel free to reach out for collaborations, opportunities, or just a friendly hello.
              I'm always open to discussing new projects.
            </p>
            <Button size="lg" className="gap-2 text-base h-12 px-6">
              <Mail className="h-5 w-5" />
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=devinapoetri72@gmail.com" target="_blank" rel="noopener noreferrer">Say Hello</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:items-end justify-center gap-6"
          >
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a href="https://github.com/devinapoetri" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-8 py-3 px-4 rounded-xl border border-border bg-surface hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 font-medium text-foreground">
                  <GithubIcon className="h-5 w-5" />
                  GitHub
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/devinapoetri" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-8 py-3 px-4 rounded-xl border border-border bg-surface hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 font-medium text-foreground">
                  <LinkedinIcon className="h-5 w-5" />
                  LinkedIn
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=devinapoetri72@gmail.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-8 py-3 px-4 rounded-xl border border-border bg-surface hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 font-medium text-foreground">
                  <Mail className="h-5 w-5" />
                  Email
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50 text-sm text-muted">
          <p>© {new Date().getFullYear()} Devina Budianti Poetri. All rights reserved.</p>
          <p>
            Designed & Built with <span className="text-primary">❤</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
