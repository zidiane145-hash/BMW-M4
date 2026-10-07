import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Gauge, Zap, Check, SlidersHorizontal } from "lucide-react";

interface Vehicle {
  id: string;
  brand: "Mercedes-Benz" | "BMW";
  model: string;
  badge: string;
  category: "Sedan" | "Coupe" | "SUV" | "Electric";
  hp: number;
  zeroToSixty: string;
  engine: string;
  price: string;
  image: string;
  highlights: string[];
}

const FLEET: Vehicle[] = [
  {
    id: "mb-s580",
    brand: "Mercedes-Benz",
    model: "S 580 4MATIC Executive",
    badge: "Flagship Luxury",
    category: "Sedan",
    hp: 496,
    zeroToSixty: "4.4s",
    engine: "4.0L V8 Biturbo Mild Hybrid",
    price: "$128,400",
    image: "/src/assets/images/mercedes_s_class_front_1791285322441.jpg",
    highlights: ["Burmester® 4D Sound", "Rear-Axle Steering", "Executive Rear Seats"]
  },
  {
    id: "bmw-m4",
    brand: "BMW",
    model: "M4 Competition M xDrive",
    badge: "Track Dominance",
    category: "Coupe",
    hp: 503,
    zeroToSixty: "3.4s",
    engine: "3.0L S58 Twin-Turbo I6",
    price: "$86,300",
    image: "/src/assets/images/bmw_m4_front_1791285334672.jpg",
    highlights: ["M Carbon Ceramic Brakes", "Carbon Bucket Seats", "M Drift Analyzer"]
  },
  {
    id: "mb-gt63",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S E PERFORMANCE",
    badge: "Supercar Hybrid",
    category: "Coupe",
    hp: 831,
    zeroToSixty: "2.7s",
    engine: "4.0L V8 Biturbo + Electric Motor",
    price: "$198,850",
    image: "/src/assets/images/hero_showroom_night_1791285306838.jpg",
    highlights: ["F1-Derived Hybrid Battery", "AMG ACTIVE RIDE CONTROL", "Active Aero"]
  },
  {
    id: "bmw-i7",
    brand: "BMW",
    model: "i7 M70 xDrive Gran Limousine",
    badge: "Ultra-Electric",
    category: "Electric",
    hp: 650,
    zeroToSixty: "3.5s",
    engine: "Dual High-Performance Electric Motors",
    price: "$168,500",
    image: "/src/assets/images/luxury_interior_1791285344493.jpg",
    highlights: ["31.3\" BMW Theater Screen", "Executive Lounge Seating", "Bowers & Wilkins Diamond"]
  }
];

export function Inventory() {
  const [brandFilter, setBrandFilter] = useState<"All" | "Mercedes-Benz" | "BMW">("All");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [requestedTestDrive, setRequestedTestDrive] = useState(false);

  const filteredVehicles = brandFilter === "All" 
    ? FLEET 
    : FLEET.filter(v => v.brand === brandFilter);

  return (
    <section id="inventory" className="py-32 bg-[#050505] border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with Viewport Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-3 block">
              Curated Showroom
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Current Available Fleet.
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setBrandFilter("All")}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                brandFilter === "All"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setBrandFilter("Mercedes-Benz")}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                brandFilter === "Mercedes-Benz"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Mercedes-Benz
            </button>
            <button
              onClick={() => setBrandFilter("BMW")}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                brandFilter === "BMW"
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              BMW
            </button>
          </div>
        </motion.div>

        {/* Vehicles Grid with Staggered Entrance Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.75, 
                  delay: index * 0.12, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group relative bg-neutral-950/80 border border-white/10 hover:border-white/25 overflow-hidden flex flex-col transition-colors duration-500 cursor-pointer"
                onClick={() => { setSelectedVehicle(vehicle); setRequestedTestDrive(false); }}
              >
                {/* Car Image with Zoom-in Entrance on Viewport */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-neutral-900">
                  <motion.img
                    src={vehicle.image}
                    alt={vehicle.model}
                    referrerPolicy="no-referrer"
                    initial={{ scale: 1.12, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Category & Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/10">
                      {vehicle.brand}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      {vehicle.badge}
                    </span>
                  </div>
                </div>

                {/* Vehicle Card Body */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-white group-hover:text-neutral-100 transition-colors">
                        {vehicle.model}
                      </h3>
                      <p className="text-neutral-400 text-xs mt-1 font-mono">{vehicle.engine}</p>
                    </div>
                    <span className="text-lg font-mono font-bold text-white whitespace-nowrap pl-4">
                      {vehicle.price}
                    </span>
                  </div>

                  {/* Spec Row */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs mb-6 font-mono">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-neutral-400">Power:</span>
                      <span className="text-white font-medium">{vehicle.hp} HP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-neutral-400">0–60 mph:</span>
                      <span className="text-emerald-400 font-medium">{vehicle.zeroToSixty}</span>
                    </div>
                  </div>

                  {/* Highlights list & Action */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 truncate pr-4">
                      <span>{vehicle.highlights[0]}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>{vehicle.highlights[1]}</span>
                    </div>
                    
                    <button 
                      type="button" 
                      className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline underline-offset-4 whitespace-nowrap flex-shrink-0"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Vehicle Specification Drawer / Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                    {selectedVehicle.brand} · {selectedVehicle.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {selectedVehicle.model}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-neutral-400 hover:text-white text-xs uppercase font-mono px-3 py-1 border border-white/10"
                >
                  Close [ESC]
                </button>
              </div>

              <div className="relative h-56 overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.model}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-900 border border-white/10 text-xs mb-6 font-mono text-center">
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Horsepower</span>
                  <span className="text-white font-bold text-sm">{selectedVehicle.hp} HP</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Acceleration</span>
                  <span className="text-emerald-400 font-bold text-sm">{selectedVehicle.zeroToSixty}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase text-[10px]">Estimated Price</span>
                  <span className="text-white font-bold text-sm">{selectedVehicle.price}</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                  Standard Bespoke Amenities
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {selectedVehicle.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {requestedTestDrive ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Viewing appointment initiated. A dedicated specialist will reach out shortly.</span>
                </div>
              ) : (
                <button
                  onClick={() => setRequestedTestDrive(true)}
                  className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  Schedule Private Test Drive
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
