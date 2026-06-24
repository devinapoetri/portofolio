"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/ui/Section"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"
import { projects } from "@/data/projects"

const categories = ["All", "Data", "Web Development"]
const ITEMS_PER_PAGE = 4

export function Projects() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [visibleCount, setVisibleCount] = React.useState(ITEMS_PER_PAGE)

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setVisibleCount(ITEMS_PER_PAGE) // reset pagination tiap ganti kategori
  }

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
                onClick={() => handleCategoryChange(category)}
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
            {visibleProjects.map((project) => (
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

        {/* View More Button */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border bg-surface text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              View More
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </Container>
    </Section>
  )
}