import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Briefcase, Trophy, GraduationCap, Building2 } from "lucide-react"
import { experiences } from "@/data/experience"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export async function generateStaticParams() {
  return experiences.map((exp) => ({ id: exp.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === id)
  if (!experience) return { title: "Not Found" }
  return {
    title: `${experience.title} | Devina Budianti Poetri`,
    description: experience.description,
  }
}

const typeConfig = {
  work: {
    label: "Work Experience",
    icon: Briefcase,
    color: "text-primary",
    bg: "bg-primary/15",
    border: "border-primary/30",
  },
  achievement: {
    label: "Achievement",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-400/15",
    border: "border-amber-400/30",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    color: "text-sky-400",
    bg: "bg-sky-400/15",
    border: "border-sky-400/30",
  },
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = experiences.find((e) => e.id === id)

  if (!experience) notFound()

  const config = typeConfig[experience.type] ?? typeConfig.work
  const Icon = config.icon

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Experience
          </Link>

          {/* Header */}
          <div className="mb-10">
            {/* Type badge */}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${config.bg} ${config.color} border ${config.border} mb-5`}
            >
              <Icon className="h-4 w-4" />
              {config.label}
            </span>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {experience.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {/* Organization */}
              <div className="flex items-center gap-2 text-base text-foreground font-medium">
                <Building2 className="h-5 w-5 text-primary" />
                {experience.organization}
              </div>

              {/* Date — red badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30">
                <Calendar className="h-4 w-4" />
                {experience.date}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-10" />

          {/* Description Card */}
          <div className="bg-surface rounded-2xl border border-border p-8">
            <h2 className="font-semibold text-lg text-foreground mb-4">Description</h2>
            <p className="text-muted text-lg leading-relaxed">{experience.description}</p>
          </div>

          {/* Navigation between experiences */}
          <div className="mt-12 flex items-center justify-between gap-4">
            {(() => {
              const currentIdx = experiences.findIndex((e) => e.id === id)
              const prev = experiences[currentIdx - 1]
              const next = experiences[currentIdx + 1]
              return (
                <>
                  {prev ? (
                    <Link
                      href={`/experience/${prev.id}`}
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
                      href={`/experience/${next.id}`}
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
                </>
              )
            })()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
