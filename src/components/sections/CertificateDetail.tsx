"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Award, Building2, Calendar, ExternalLink, ImageIcon } from "lucide-react"
import { certificates } from "@/data/certificates"
import { Certificate } from "@/types"

interface CertGalleryProps {
  cert: Certificate
}

function CertGallery({ cert }: CertGalleryProps) {
  const [activeImage, setActiveImage] = React.useState(0)
  const images = cert.images && cert.images.length > 0 ? cert.images : cert.image ? [cert.image] : []
  const hasImages = images.length > 0

  return (
    <div className="mb-10">
      <h2 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-primary" />
        Certificate / Photos
      </h2>

      {hasImages ? (
        <div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-zinc-900 aspect-video">
            <Image
              src={images[activeImage]}
              alt={`${cert.title} ${activeImage + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
            {images.length > 1 && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
                {activeImage + 1} / {images.length}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === idx
                    ? "border-primary shadow-md shadow-primary/30"
                    : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* <p className="mt-3 text-xs text-muted flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" />
            Add more photos via the{" "}
            <code className="bg-surface px-1.5 py-0.5 rounded text-primary">images</code> array in{" "}
            <code className="bg-surface px-1.5 py-0.5 rounded text-primary">src/data/certificates.ts</code>
          </p> */}
        </div>
      ) : (
        <div className="w-full rounded-2xl border-2 border-dashed border-border bg-surface/50 aspect-video flex flex-col items-center justify-center gap-3 text-center p-8">
          <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
            <Award className="h-6 w-6 text-muted" />
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">No photos yet</p>
            <p className="text-muted text-sm">
              Add image URLs to the{" "}
              <code className="bg-surface px-1.5 py-0.5 rounded text-primary text-xs">images</code>{" "}
              array in{" "}
              <code className="bg-surface px-1.5 py-0.5 rounded text-primary text-xs">
                src/data/certificates.ts
              </code>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface CertificateDetailClientProps {
  id: string
}

export function CertificateDetailClient({ id }: CertificateDetailClientProps) {
  const cert = certificates.find((c) => c.id === id)
  if (!cert) return null

  const currentIdx = certificates.findIndex((c) => c.id === id)
  const prev = certificates[currentIdx - 1]
  const next = certificates[currentIdx + 1]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        href="/#certificates"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-200 mb-10 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Certificates
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30 mb-5">
          <Award className="h-4 w-4" />
          {cert.category}
        </span>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          {cert.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-base text-foreground font-medium">
            <Building2 className="h-5 w-5 text-primary" />
            {cert.issuer}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary/15 text-primary border border-primary/30">
            <Calendar className="h-4 w-4" />
            {cert.date}
          </div>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-foreground transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Verify Credential
            </a>
          )}
        </div>
      </div>

      <div className="h-px bg-border mb-10" />

      {/* Gallery */}
      <CertGallery cert={cert} />

      {/* Description */}
      {cert.description && (
        <div className="bg-surface rounded-2xl border border-border p-8 mb-10">
          <h2 className="font-semibold text-lg text-foreground mb-4">About This Certificate</h2>
          <p className="text-muted text-base leading-relaxed">{cert.description}</p>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/certificate/${prev.id}`}
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
            href={`/certificate/${next.id}`}
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
