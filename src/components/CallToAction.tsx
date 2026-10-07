import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Calendar } from "lucide-react";

export function CallToAction() {
  const [email, setEmail] = useState("");
  const [preferredBrand, setPreferredBrand] = useState<"Mercedes-Benz" | "BMW" | "Both">("Both");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Abstract Background Ambient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-neutral-900/40 blur-[130px] rounded-full pointer-events-none" 
      />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Animated Kicker */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-6 block"
        >
          Private Concierge Appointment
        </motion.span>
        
        {/* Animated Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-8"
        >
          Ready to command the road?
        </motion.h2>
        
        {/* Animated Description */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Schedule a private viewing and confidential test drive. 
          Our senior automotive advisors will curate the showroom exclusively for your visit.
        </motion.p>
        
        {/* Animated Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto"
        >
          {submitted ? (
            <div className="p-8 bg-neutral-950 border border-emerald-500/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-display font-semibold text-white mb-2">
                Appointment Requested
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Thank you for your interest in our {preferredBrand} fleet. Our private concierge team will contact you at <span className="text-white font-mono">{email}</span> within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Brand Preference Selection */}
              <div className="flex items-center justify-center gap-2 p-1 bg-neutral-950 border border-white/10 text-xs">
                <span className="text-neutral-500 px-2 font-mono text-[11px]">Interest:</span>
                {(["Mercedes-Benz", "BMW", "Both"] as const).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setPreferredBrand(b)}
                    className={`px-3 py-1.5 transition-colors ${
                      preferredBrand === b
                        ? "bg-white text-black font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address" 
                  className="flex-grow px-6 py-4 bg-neutral-950 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors text-sm"
                />
                <button 
                  type="submit" 
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request VIP Visit</span>
                </button>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">
                Strict confidentiality assured · Exclusive access by appointment only
              </span>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}

