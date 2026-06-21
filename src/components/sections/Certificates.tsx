"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { certificates } from "@/data/certificates"

export function Certificates() {
  const [activeCategory, setActiveCategory] = React.useState("All")

  const filtered = certificates.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  )

  return (
    <Section id="certificates" className="bg-background">
      <Container>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
              Achievements
            </h2>
            <p className="text-muted max-w-xl text-lg">
              A collection of my awards, certifications, and achievements from academic and competitive activities.
            </p>
          </div>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/certificate/${cert.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full"
                >
                  {/* Cover image */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Award className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                        View Details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                    {/* Category chip on top */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 backdrop-blur-sm text-white border border-white/10">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-200 mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">{cert.issuer}</p>
                    {cert.description && (
                      <p className="text-muted text-xs leading-relaxed line-clamp-2 flex-grow mb-3">
                        {cert.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
                      {/* Date badge */}
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                        {cert.date}
                      </span>

                      {cert.credentialUrl && (
                        <span
                          onClick={(e) => {
                            e.preventDefault()
                            window.open(cert.credentialUrl, "_blank", "noopener,noreferrer")
                          }}
                          className="inline-flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Verify
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  )
}
