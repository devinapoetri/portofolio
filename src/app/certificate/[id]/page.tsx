import * as React from "react"
import { notFound } from "next/navigation"
import { certificates } from "@/data/certificates"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CertificateDetailClient } from "@/components/sections/CertificateDetail"

export async function generateStaticParams() {
  return certificates.map((c) => ({ id: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cert = certificates.find((c) => c.id === id)
  if (!cert) return { title: "Not Found" }
  return {
    title: `${cert.title} | Devina Budianti Poetri`,
    description: cert.description ?? `${cert.title} issued by ${cert.issuer}`,
  }
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cert = certificates.find((c) => c.id === id)
  if (!cert) notFound()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <CertificateDetailClient id={id} />
      </main>
      <Footer />
    </div>
  )
}
