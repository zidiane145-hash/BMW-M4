import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Truck, Key, CheckCircle2 } from "lucide-react";

interface FeatureCardData {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
  highlight: string;
}

const FEATURES: FeatureCardData[] = [
  {
    id: "customization",
    number: "01.",
    title: "Bespoke Customization",
    description:
      "Configure your dream vehicle in our private Beverly Hills design lounge. Select from hand-stitched Nappa hides, open-pore ash wood, and individual paint finishes from Designo and BMW Individual.",
    icon: Sparkles,
    highlight: "Over 120 unique leather and trim combinations"
  },
  {
    id: "delivery",
    number: "02.",
    title: "White-Glove Delivery",
    description:
      "We deliver your vehicle anywhere nationwide via enclosed climate-controlled transporters. Accompanied by a master delivery specialist who walks you through every telematics and performance setting.",
    icon: Truck,
    highlight: "Zero road mileage incurred during transit"
  },
  {
    id: "access",
    number: "03.",
    title: "Exclusive Private Access",
    description:
      "Ownership welcomes you into the Apex Motors Club. Receive personal invitations to private track days at Laguna Seca, VIP paddock passes at Formula 1, and seasonal road rallies through Alpine routes.",
    icon: Key,
    highlight: "VIP passes to international motorsport events"
  }
];

export function Features() {
  const [activeFeature, setActiveFeature] = useState<string>("customization");
  const [ambientLight, setAmbientLight] = useState<"cyan" | "amber" | "crimson">("cyan");

  const ambientGlow = {
    cyan: "shadow-[inset_0_0_80px_rgba(6,182,212,0.18)] border-cyan-500/20",
    amber: "shadow-[inset_0_0_80px_rgba(245,158,11,0.18)] border-amber-500/20",
    crimson: "shadow-[inset_0_0_80px_rgba(239,68,68,0.18)] border-red-500/20"
  };

  return (
    <section id="experience" className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Luxury Interior Car Image Container with Viewport Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 relative h-[560px] md:h-[680px] border transition-all duration-700 overflow-hidden group ${ambientGlow[ambientLight]}`}
          >
            {/* Interior Image with Scale & Fade-in Entrance */}
            <motion.img 
              src="/src/assets/images/luxury_interior_1791285344493.jpg" 
              alt="Ultra-luxurious vehicle cabin interior" 
              referrerPolicy="no-referrer"
              initial={{ scale: 1.12, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 pointer-events-none" />

            {/* Top Bar pill info */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-[11px] font-mono text-white uppercase tracking-wider">
                Executive Cabin Architecture
              </span>
              <span className="text-[11px] text-neutral-400 font-mono tracking-widest hidden sm:inline-block">
                3D SURROUND SOUND
              </span>
            </div>

            {/* Interactive Ambient Lighting Selector */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur-md border border-white/10 z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-0.5">
                    Interior Mood Illumination
                  </span>
                  <p className="text-xs text-white font-medium">
                    64-Color Dynamic Active LED Ambient Scheme
                  </p>
                </div>
                
                {/* Color Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setAmbientLight("cyan")}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      ambientLight === "cyan" ? "bg-cyan-950 border-cyan-400 text-cyan-200" : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    Biscay Cyan
                  </button>
                  <button 
                    onClick={() => setAmbientLight("amber")}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      ambientLight === "amber" ? "bg-amber-950 border-amber-400 text-amber-200" : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    Solar Amber
                  </button>
                  <button 
                    onClick={() => setAmbientLight("crimson")}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      ambientLight === "crimson" ? "bg-red-950 border-red-400 text-red-200" : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    Nordic Red
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Section Header & Feature Cards with Staggered Entrance Animations */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Header entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <span className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
                The Apex Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
                Crafted for those who demand excellence.
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed">
                Beyond acquiring an automobile, our clients enter a tailored ecosystem of personal mobility, bespoke craftsmanship, and frictionless service.
              </p>
            </motion.div>
            
            {/* Feature Cards List with Staggered Framer Motion Viewport Animation */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18
                  }
                }
              }}
              className="space-y-4"
            >
              {FEATURES.map((feature) => {
                const IconComponent = feature.icon;
                const isActive = activeFeature === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`p-6 border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? "bg-neutral-900/60 border-white/30 shadow-lg" 
                        : "bg-neutral-950/40 border-white/5 hover:border-white/15 hover:bg-neutral-900/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-neutral-500 font-semibold">
                          {feature.number}
                        </span>
                        <h4 className="text-lg font-display font-medium text-white">
                          {feature.title}
                        </h4>
                      </div>
                      <IconComponent className={`w-4 h-4 transition-colors ${isActive ? "text-white" : "text-neutral-600"}`} />
                    </div>

                    <p className="text-neutral-400 text-xs leading-relaxed ml-7 mb-3">
                      {feature.description}
                    </p>

                    <div className="ml-7 flex items-center gap-2 text-[11px] text-neutral-400">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-neutral-600"}`} />
                      <span className="italic">{feature.highlight}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

