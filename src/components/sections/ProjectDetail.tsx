"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, ImageIcon, Tag } from "lucide-react"
import { GithubIcon } from "@/components/ui/Icons"
import { projects } from "@/data/projects"
import { Project } from "@/types"
import { ModelMetricsBlock } from "@/components/sections/ModelMetrics"
interface ProjectGalleryProps {
  project: Project
}
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = React.useState(0)
  const allImages = project.images && project.images.length > 0 ? project.images : [project.image]
  const hasMultipleImages = allImages.length > 1
  return (
    <div className="mb-12">
      {/* Main Image */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-zinc-900 aspect-video">
        <Image
          src={allImages[activeImage]}
          alt={`${project.title} screenshot ${activeImage + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
            {activeImage + 1} / {allImages.length}
          </div>
        )}
      </div>
      {/* Thumbnail Strip */}
      {hasMultipleImages && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === idx
                ? "border-primary shadow-md shadow-primary/30"
                : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
      {/* Hint when only 1 image */}
      {/* {allImages.length === 1 && (
        // <p className="mt-3 text-xs text-muted flex items-center gap-1.5">
        //   <ImageIcon className="h-3.5 w-3.5" />
        //   Add more screenshots via the{" "}
        //   <code className="bg-surface px-1.5 py-0.5 rounded text-primary">images</code> field in{" "}
        //   <code className="bg-surface px-1.5 py-0.5 rounded text-primary">src/data/projects.ts</code>
        // </p>
      )} */}
    </div>
  )
}
interface ProjectDetailClientProps {
  id: string
}
export function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const project = projects.find((p) => p.id === id)
  if (!project) return null
  const currentIdx = projects.findIndex((p) => p.id === id)
  const prev = projects[currentIdx - 1]
  const next = projects[currentIdx + 1]
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-200 mb-10 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Projects
      </Link>
      {/* Photo Gallery */}
      <ProjectGallery project={project} />
      {/* Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Main content */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30 mb-4">
              {project.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-8">
            <h2 className="font-semibold text-lg text-foreground mb-4">About This Project</h2>
            <p className="text-muted text-base leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
          </div>
          {project.datasetOverview && (
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h2 className="font-semibold text-lg mb-6">
                Dataset Overview
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    Source
                  </p>
                  <p className="font-semibold">
                    {project.datasetOverview.source}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    Rows
                  </p>
                  <p className="font-semibold">
                    {project.datasetOverview.rows}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    Columns
                  </p>
                  <p className="font-semibold">
                    {project.datasetOverview.features}
                  </p>
                </div>
              </div>

              {project.datasetOverview.target && (
                <div className="mt-5 rounded-xl border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors">
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    Target
                  </p>
                  <p className="font-semibold">
                    {project.datasetOverview.target}
                  </p>
                </div>
              )}
            </div>
          )}
          {project.workflow && (
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h2 className="font-semibold text-lg mb-6">
                Project Workflow
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.workflow.map((step, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold text-sm">
                        {index + 1}
                      </div>

                      <h3 className="font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.modelMetrics && (
            <ModelMetricsBlock metrics={project.modelMetrics} />
          )}
        </div>
        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Tech Stack */}
          {/* Links */}
          {(project.githubUrl || project.demoUrl) && (
            <div className="bg-surface rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-base text-foreground mb-4">Links</h3>
              <div className="flex flex-col gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-foreground text-sm font-medium transition-colors duration-200"
                  >
                    <GithubIcon className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-sm font-medium transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Prev / Next Navigation */}
      <div className="mt-16 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/project/${prev.id}`}
            className="flex-1 group flex flex-col items-start p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface transition-all duration-200"
          >
            <span className="text-xs text-muted mb-1 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary line-clamp-1 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/project/${next.id}`}
            className="flex-1 group flex flex-col items-end p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface transition-all duration-200 text-right"
          >
            <span className="text-xs text-muted mb-1 flex items-center gap-1">
              Next <ArrowLeft className="h-3 w-3 rotate-180" />
            </span>
            <span className="text-sm font-semibold text-foreground group-hover:text-primary line-clamp-1 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
