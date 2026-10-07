import { useState } from "react";
import { Car, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-black/70 backdrop-blur-md border-b border-white/5"
    >
      {/* Brand Zone */}
      <a href="/" className="flex items-center gap-2.5 group">
        <Car className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
        <span className="text-xl font-display font-bold tracking-tight text-white uppercase">
          Apex Motors
        </span>
      </a>

      {/* Navigation Zone */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <a href="#brands" className="hover:text-white transition-colors">Flagship</a>
        <a href="#inventory" className="hover:text-white transition-colors">Inventory</a>
        <a href="#colours" className="hover:text-white transition-colors">Colour Studio</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#about" className="hover:text-white transition-colors">Concierge</a>
      </nav>

      {/* Action Zone */}
      <div className="flex items-center gap-4">
        <a 
          href="#about"
          className="hidden sm:inline-block px-5 py-2.5 text-xs font-semibold text-black bg-white rounded-none hover:bg-neutral-200 transition-colors whitespace-nowrap uppercase tracking-wider"
        >
          Schedule Test Drive
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-neutral-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a 
              href="#brands" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium"
            >
              Flagship Lineup
            </a>
            <a 
              href="#inventory" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium"
            >
              Curated Fleet
            </a>
            <a 
              href="#colours" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium"
            >
              Colour Studio
            </a>
            <a 
              href="#experience" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium"
            >
              Bespoke Experience
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 text-sm font-medium"
            >
              Private Concierge
            </a>
            <a 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider mt-2"
            >
              Schedule Test Drive
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

