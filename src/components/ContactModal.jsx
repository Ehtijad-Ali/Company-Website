import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Contact from './sections/Contact'
import { useContact } from '../context/ContactContext'

export default function ContactModal() {
  const { isOpen, closeContact } = useContact()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          style={{ background: 'var(--bg-surface)' }}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.15 }}
            onClick={closeContact}
            className="fixed top-5 right-5 z-[201] w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            aria-label="Close contact"
          >
            <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </motion.button>
          <Contact forceVisible />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
