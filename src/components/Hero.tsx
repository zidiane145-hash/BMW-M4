import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center pt-24 overflow-hidden">
      {/* Background Image with Scrim and subtle entrance scale */}
      <motion.div 
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/src/assets/images/hero_showroom_night_1791285306838.jpg" 
          alt="Luxury automotive showroom at night" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Scrims for text legibility and mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start mt-24">
        
        {/* Kicker Tag */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 uppercase tracking-[0.2em] text-xs font-semibold mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-neutral-600"></span>
          The Pinnacle of German Engineering
        </motion.span>
        
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] max-w-4xl tracking-tight mb-8"
        >
          Uncompromised <br className="hidden md:block" /> Luxury & Performance.
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-300 text-lg max-w-xl leading-relaxed mb-10 font-sans"
        >
          Discover our curated collection of elite Mercedes-Benz and BMW models. 
          Where precision automotive mastery meets unyielding sophistication.
        </motion.p>
        
        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-5"
        >
          <a 
            href="#brands"
            className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Explore Fleet
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a 
            href="#experience"
            className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Bespoke Services
          </a>
        </motion.div>
        
        {/* Stats Metrics with Staggered Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 grid grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-8 max-w-3xl"
        >
          <div>
            <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">150+</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">Showroom Models</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">24/7</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">VIP Concierge</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white mb-1 tabular-nums">100%</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider">Certified Pre-Owned</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

