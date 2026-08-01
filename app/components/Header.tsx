'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/booking', label: 'Book Now' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const close = () => setIsMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-primary py-2 shadow-lg backdrop-blur-sm'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-0">

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Premo Heritage Villa"
              width={56}
              height={22}
              className={`object-contain transition-all duration-300 ${
                scrolled ? 'w-14' : 'w-16'
              }`}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-16 text-base font-bold uppercase tracking-widest text-white font-primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark blurred backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={close}
            />

            {/* Glassmorphism card */}
            <motion.div
              key="menu-card"
              initial={{ opacity: 0, scale: 0.90, y: -24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.90, y: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-[70] md:hidden
                         rounded-2xl border border-white/20 bg-black/40 backdrop-blur-2xl
                         shadow-[0_0_50px_rgba(139,26,26,0.25),0_8px_32px_rgba(0,0,0,0.4)]
                         px-8 py-12 flex flex-col items-center gap-6"
            >
              {/* Close button */}
              <button
                onClick={close}
                aria-label="Close navigation menu"
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
              >
                <X size={22} />
              </button>

              {/* Brand logo */}
              <Image
                src="/logo.png"
                alt="Premo Heritage Villa"
                width={56}
                height={22}
                className="w-14 object-contain opacity-80"
              />

              <div className="w-12 h-px bg-white/30" />

              {/* Nav links with stagger */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="font-primary text-xl font-bold uppercase tracking-widest text-white/90
                               transition-all duration-200 hover:text-white hover:tracking-[0.3em]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="w-12 h-px bg-white/30" />

              {/* Decorative label */}
              <p className="font-secondary text-[10px] uppercase tracking-[0.4em] text-white/40">
                Premo Heritage Villa
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
