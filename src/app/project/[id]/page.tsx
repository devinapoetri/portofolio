import * as React from "react"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProjectDetailClient } from "@/components/sections/ProjectDetail"

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return { title: "Not Found" }
  return {
    title: `${project.title} | Devina Budianti Poetri`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <ProjectDetailClient id={id} />
      </main>
      <Footer />
    </div>
  )
}
