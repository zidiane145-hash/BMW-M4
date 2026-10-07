import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sparkles, Maximize2, X, ChevronRight } from "lucide-react";

interface ColorOption {
  name: string;
  code: string;
  hex: string;
  finish: "Metallic" | "Non-Metallic" | "MANUFAKTUR" | "BMW Individual";
  description: string;
  popularModel: string;
}

const MERCEDES_COLORS: ColorOption[] = [
  {
    name: "Polar White",
    code: "149U",
    hex: "#F5F6F8",
    finish: "Non-Metallic",
    description: "Pure, crisp architectural white accentuating sculpted body lines.",
    popularModel: "C-Class / E-Class Sedan"
  },
  {
    name: "Obsidian Black",
    code: "197U",
    hex: "#101114",
    finish: "Metallic",
    description: "Deep crystalline black infused with fine metallic flakes.",
    popularModel: "S-Class / Maybach"
  },
  {
    name: "Patagonia Red",
    code: "993U",
    hex: "#8B1B26",
    finish: "MANUFAKTUR",
    description: "Exclusive multi-coat ruby metallic with rich crimson depth under direct sunlight.",
    popularModel: "AMG CLA / AMG GT"
  },
  {
    name: "Iridium Silver",
    code: "775U",
    hex: "#C2C7CE",
    finish: "Metallic",
    description: "The heritage Mercedes-Benz racing silver with brilliant metallic reflectivity.",
    popularModel: "S 580 / SL Roadster"
  },
  {
    name: "Selenite Grey",
    code: "992U",
    hex: "#4D5258",
    finish: "Metallic",
    description: "Sophisticated charcoal slate tone balancing stealth and precision.",
    popularModel: "AMG E 63 S / GLE Coupe"
  },
  {
    name: "Emerald Green",
    code: "989U",
    hex: "#173629",
    finish: "Metallic",
    description: "Subtle dark forest green shifting into a deep emerald luster under illumination.",
    popularModel: "S-Class / G 63 AMG"
  },
  {
    name: "Spectral Blue",
    code: "970U",
    hex: "#1B3B6F",
    finish: "Metallic",
    description: "High-saturation royal sapphire metallic with electric undertones.",
    popularModel: "EQS / C 43 AMG"
  }
];

const BMW_COLORS: ColorOption[] = [
  {
    name: "Alpine White",
    code: "300",
    hex: "#F8F9FA",
    finish: "Non-Metallic",
    description: "Timeless BMW Motorsport heritage white offering high-contrast definition.",
    popularModel: "M4 Coupe / M3 Competition"
  },
  {
    name: "Phytonic Blue",
    code: "C1M",
    hex: "#1F4E88",
    finish: "Metallic",
    description: "Dynamic mid-tone blue with multi-faceted metallic flake dispersion.",
    popularModel: "4 Series / X5 M"
  },
  {
    name: "Sunset Orange",
    code: "C1X",
    hex: "#BF491C",
    finish: "Metallic",
    description: "Fiery, emotive burnt copper shifting between golden amber and deep orange.",
    popularModel: "M440i / M2 Coupe"
  },
  {
    name: "Black Sapphire",
    code: "475",
    hex: "#121417",
    finish: "Metallic",
    description: "Aggressive midnight obsidian with deep prismatic blue-black undertones.",
    popularModel: "M8 Gran Coupe / X7 M60i"
  },
  {
    name: "Brooklyn Grey",
    code: "C4P",
    hex: "#8B929A",
    finish: "Metallic",
    description: "Modern semi-matte concrete grey designed for aggressive M aerodynamics.",
    popularModel: "M3 Touring / M4 Competition"
  },
  {
    name: "Isle of Man Green",
    code: "C4G",
    hex: "#1F4A34",
    finish: "Metallic",
    description: "Hero launch color honoring the legendary TT circuit with radiant teal-green flakes.",
    popularModel: "M3 Competition / M4 CSL"
  },
  {
    name: "Tanzanite Blue II",
    code: "C3Z",
    hex: "#152445",
    finish: "BMW Individual",
    description: "Prestige mineral-rich midnight pigment with vibrant turquoise light refraction.",
    popularModel: "i7 M70 / 8 Series Gran Coupe"
  }
];

export function ColorStudio() {
  const [selectedBrand, setSelectedBrand] = useState<"mercedes" | "bmw">("mercedes");
  const [selectedColor, setSelectedColor] = useState<ColorOption>(MERCEDES_COLORS[2]); // Patagonia Red default
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const colors = selectedBrand === "mercedes" ? MERCEDES_COLORS : BMW_COLORS;

  const handleBrandChange = (brand: "mercedes" | "bmw") => {
    setSelectedBrand(brand);
    setSelectedColor(brand === "mercedes" ? MERCEDES_COLORS[2] : BMW_COLORS[5]);
  };

  return (
    <section id="colours" className="py-32 bg-[#050505] border-t border-white/5 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with Framer Motion Viewport Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-3 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-neutral-400" />
              Exterior Finishes & Paintwork
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
              Authentic Colour Options.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
            Directly from the factory delivery plazas in Stuttgart and Munich. 
            Explore the official paint palette curated for Mercedes-Benz and BMW performance flagships.
          </p>
        </motion.div>

        {/* Featured Plaza Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-20 group overflow-hidden border border-white/10 bg-neutral-950 cursor-pointer"
          onClick={() => setIsImageModalOpen(true)}
        >
          {/* Main Colour Options Campus Image */}
          <div className="relative h-[380px] md:h-[500px] w-full overflow-hidden bg-neutral-900">
            <motion.img
              src="/Requesting_car_color_options_20261006164041.jpg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/src/assets/images/car_colour_options_plaza_1791287157746.jpg";
              }}
              alt="BMW and Mercedes-Benz Colour Options Showroom Lineup"
              referrerPolicy="no-referrer"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Top and Bottom Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

            {/* Top Bar Badges */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-xs uppercase tracking-wider">
                  Official Campus Lineup
                </span>
                <span className="hidden sm:inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-neutral-300 font-mono text-xs">
                  Stuttgart · Munich Factory Showroom
                </span>
              </div>

              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsImageModalOpen(true); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white text-xs font-mono transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand Full Campus View</span>
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Dual Brand Exhibition Plaza
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                  BMW on Left · Mercedes-Benz on Right
                </h3>
                <p className="text-neutral-300 text-xs mt-1 max-w-xl">
                  Featuring 14 distinct factory colors displayed across high-performance coupes, executive sedans, and SAVs.
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono text-neutral-300">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">BMW Palette</span>
                  <span className="text-white font-medium">7 Signature Colors</span>
                </div>
                <div className="h-6 w-px bg-white/15" />
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Mercedes-Benz</span>
                  <span className="text-white font-medium">7 Signature Colors</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Paint Studio / Swatch Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand Switcher and Swatch Grid (7 Cols on large) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-neutral-950/70 border border-white/10 p-8 flex flex-col"
          >
            {/* Brand Toggle Tabs */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Select Manufacturer
              </span>
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-white/10">
                <button
                  onClick={() => handleBrandChange("mercedes")}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                    selectedBrand === "mercedes"
                      ? "bg-white text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Mercedes-Benz (7)
                </button>
                <button
                  onClick={() => handleBrandChange("bmw")}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                    selectedBrand === "bmw"
                      ? "bg-white text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  BMW M (7)
                </button>
              </div>
            </div>

            {/* Color Swatch Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`p-3 border text-left flex flex-col gap-2 transition-all duration-300 relative group ${
                      isSelected
                        ? "bg-neutral-900 border-white shadow-md ring-1 ring-white/20"
                        : "bg-neutral-950/60 border-white/10 hover:border-white/30 hover:bg-neutral-900/40"
                    }`}
                  >
                    {/* Swatch Pill with realistic shine */}
                    <div 
                      className="w-full h-12 rounded-sm relative overflow-hidden border border-black/30 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    >
                      {/* Metallic flake simulated highlight */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center text-white">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-medium text-white block truncate">
                        {color.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        {color.code} · {color.finish}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>* High-solids scratch-resistant ceramic clear coat standard</span>
              <span className="text-neutral-500">Dual-Campus Lineup</span>
            </div>
          </motion.div>

          {/* Active Color Preview & Technical Detail Card (5 Cols on large) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-neutral-950 border border-white/10 p-8 flex flex-col relative overflow-hidden"
          >
            {/* Color Accent Ambient Glow */}
            <div 
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: selectedColor.hex }}
            />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 block mb-1">
                  Active Formulation
                </span>
                <h4 className="text-2xl font-display font-bold text-white">
                  {selectedColor.name}
                </h4>
                <span className="text-xs font-mono text-neutral-400 mt-1 block">
                  Paint Code: {selectedColor.code} · {selectedColor.finish}
                </span>
              </div>

              {/* Large Color Circle preview */}
              <div 
                className="w-14 h-14 rounded-full border-2 border-white/20 shadow-xl relative overflow-hidden flex-shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-xs leading-relaxed mb-6 pb-6 border-b border-white/10 relative z-10">
              {selectedColor.description}
            </p>

            {/* Paint Specifications */}
            <div className="space-y-3 mb-8 text-xs font-mono relative z-10">
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">Hex Notation</span>
                <span className="text-white font-medium">{selectedColor.hex.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">Catalog Tier</span>
                <span className="text-white font-medium">{selectedColor.finish}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">Flagship Model Match</span>
                <span className="text-neutral-300">{selectedColor.popularModel}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-neutral-500">Coating Structure</span>
                <span className="text-neutral-300">Cathodic Primer + Basecoat + Nano-Clear</span>
              </div>
            </div>

            {/* Inquire Action Button */}
            <div className="mt-auto pt-4 relative z-10">
              <a
                href="#about"
                className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Sample Swatch in {selectedColor.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Full Campus Plaza Modal Dialog */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-lg"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-neutral-950 border border-white/20 p-4 md:p-6 shadow-2xl flex flex-col"
            >
              {/* Modal Top */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">
                    Official Colour Options Campus
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    BMW Colour Options (Left) · Mercedes-Benz Colour Options (Right)
                  </p>
                </div>
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="p-2 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image */}
              <div className="relative max-h-[70vh] overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img
                  src="/Requesting_car_color_options_20261006164041.jpg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/src/assets/images/car_colour_options_plaza_1791287157746.jpg";
                  }}
                  alt="High Resolution BMW and Mercedes Colour Options Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {/* Modal Footer Key */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                <div>
                  <span className="text-white font-semibold uppercase block mb-1">
                    Left: BMW Colour Options
                  </span>
                  <span>Alpine White · Phytonic Blue · Sunset Orange · Black Sapphire · Brooklyn Grey · Isle of Man Green · Tanzanite Blue</span>
                </div>
                <div>
                  <span className="text-white font-semibold uppercase block mb-1">
                    Right: Mercedes-Benz Colour Options
                  </span>
                  <span>Polar White · Obsidian Black · Patagonia Red · Iridium Silver · Selenite Grey · Emerald Green · Spectral Blue</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
