"use client"
import * as React from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Container } from "@/components/ui/Container"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      let current = "home"
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if top of section is at least halfway up the screen
          if (rect.top <= window.innerHeight / 2) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    // Run once on mount
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (previous && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
        }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-display font-bold text-xl tracking-tight">
            Devina<span className="text-primary">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.substring(1))}
                  className={`text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted hover:text-primary"
                    }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </Container>
    </motion.header>
  )
}
