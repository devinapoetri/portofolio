"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"
import { projects } from "@/data/projects"

const categories = ["All", "Data Analysis", "Web Development"]

export function Projects() {
  const [activeCategory, setActiveCategory] = React.useState("All")

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  return (
    <Section id="projects" className="bg-background">
      <Container>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted max-w-xl text-lg">
              A selection of my recent work, showcasing my skills in data analysis and web development.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-surface text-muted hover:text-foreground hover:bg-surface/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/project/${project.id}`}
                  className="group relative flex flex-col rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full"
                >
                  {/* Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay hint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                        View Details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                        <p className="text-primary text-sm font-medium">{project.category}</p>
                      </div>
                    </div>

                    <p className="text-muted text-sm mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
