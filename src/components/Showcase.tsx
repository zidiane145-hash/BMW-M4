import { useState, useRef, useEffect, useCallback } from "react";
import { 
  ArrowUpRight, Gauge, Zap, Shield, Volume2, VolumeX, X, Check, 
  RotateCw, Play, Pause, ZoomIn, ZoomOut, Compass, Info, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CarDetail {
  brand: string;
  model: string;
  tagline: string;
  image: string;
  engine: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  transmission: string;
  price: string;
  tags: string[];
  soundType: "v8" | "inline6";
}

interface ViewerModel360 {
  id: "mercedes" | "bmw";
  name: string;
  subtitle: string;
  frontImage: string;
  sideRearImage: string;
  badge: string;
  hotspots: {
    id: string;
    label: string;
    angleRange: [number, number]; // active angle range in degrees
    title: string;
    description: string;
    top: string;
    left: string;
  }[];
}

const VIEWER_MODELS: Record<"mercedes" | "bmw", ViewerModel360> = {
  mercedes: {
    id: "mercedes",
    name: "Mercedes-Benz S 580 4MATIC",
    subtitle: "High-Gloss Obsidian & High-Reflectivity Chrome Architecture",
    frontImage: "/src/assets/images/mercedes_s_class_front_1791285322441.jpg",
    sideRearImage: "/src/assets/images/mercedes_s_class_side_1791287679667.jpg",
    badge: "Stuttgart Flagship",
    hotspots: [
      {
        id: "mb-lights",
        label: "Digital Light",
        angleRange: [315, 45],
        title: "Digital Light HD Projection",
        description: "1.3 million micro-mirrors per headlight with active topographical beam guidance.",
        top: "46%",
        left: "32%"
      },
      {
        id: "mb-wheels",
        label: "Forged Monoblock",
        angleRange: [45, 135],
        title: "21\" AMG Multispoke Forged Alloys",
        description: "Precision-milled lightweight alloys with integrated rear-axle steering (up to 10°).",
        top: "62%",
        left: "48%"
      },
      {
        id: "mb-exhaust",
        label: "Dual Exhaust",
        angleRange: [135, 225],
        title: "Flush Integrated Chrome Tailpipes",
        description: "Acoustically tuned valved exhaust calibrated for imperceptible executive cruising.",
        top: "54%",
        left: "68%"
      },
      {
        id: "mb-profile",
        label: "Seamless Handles",
        angleRange: [225, 315],
        title: "Flush Retractable Door Handles",
        description: "Electrically extending handles preserving a drag coefficient of just 0.22 Cd.",
        top: "48%",
        left: "42%"
      }
    ]
  },
  bmw: {
    id: "bmw",
    name: "BMW M4 Competition Coupe",
    subtitle: "Aerodynamic Carbon Fiber Bodywork & Twin-Turbo Stance",
    frontImage: "/src/assets/images/bmw_m4_front_1791285334672.jpg",
    sideRearImage: "/src/assets/images/bmw_m4_rear_1791287692178.jpg",
    badge: "Munich Motorsport",
    hotspots: [
      {
        id: "bmw-laser",
        label: "Laserlight",
        angleRange: [315, 45],
        title: "BMW Laserlight & Frameless Kidney Grille",
        description: "Iconic vertical cooling ducts channel immense ram-air to twin turbochargers.",
        top: "48%",
        left: "35%"
      },
      {
        id: "bmw-carbon",
        label: "Carbon Roof",
        angleRange: [45, 135],
        title: "CFRP Lightweight Carbon Roof",
        description: "Lowers the center of gravity while optimizing aerodynamic airflow over the rear spoiler.",
        top: "32%",
        left: "52%"
      },
      {
        id: "bmw-exhaust",
        label: "Quad Tailpipes",
        angleRange: [135, 225],
        title: "100mm Quad Black Chrome Exhaust",
        description: "Electronically controlled flaps deliver raw uninhibited S58 inline-6 bark on demand.",
        top: "58%",
        left: "64%"
      },
      {
        id: "bmw-brakes",
        label: "Carbon Ceramic",
        angleRange: [225, 315],
        title: "M Carbon Ceramic Brakes",
        description: "6-piston fixed calipers with gold-painted finish offering fade-free track stopping power.",
        top: "60%",
        left: "45%"
      }
    ]
  }
};

const CAR_DETAILS: Record<"mercedes" | "bmw", CarDetail> = {
  mercedes: {
    brand: "Mercedes-Benz",
    model: "S 580 4MATIC Sedan",
    tagline: "The Zenith of Executive Opulence & Whisper-Quiet Power",
    image: "/src/assets/images/mercedes_s_class_front_1791285322441.jpg",
    engine: "4.0L V8 Biturbo with Mild Hybrid Drive",
    power: "496 HP @ 5,500 RPM",
    acceleration: "0–60 mph in 4.4s",
    topSpeed: "155 mph (Electronically Limited)",
    transmission: "9G-TRONIC 9-Speed Automatic",
    price: "From $128,400",
    tags: ["Airmatic Suspension", "Burmester® 4D High-End", "MBUX Hyperscreen", "Drive Pilot Level 3"],
    soundType: "v8"
  },
  bmw: {
    brand: "BMW M-Series",
    model: "M4 Competition M xDrive",
    tagline: "Pure Motorsport Adrenaline Formed for the Open Highway",
    image: "/src/assets/images/bmw_m4_front_1791285334672.jpg",
    engine: "3.0L BMW M TwinPower Turbo S58 Inline-6",
    power: "503 HP @ 6,250 RPM",
    acceleration: "0–60 mph in 3.4s",
    topSpeed: "180 mph (M Driver's Package)",
    transmission: "8-Speed M Steptronic with Drivelogic",
    price: "From $86,300",
    tags: ["M Carbon Ceramic Brakes", "Adaptive M Suspension", "Active M Differential", "Carbon Fiber Roof"],
    soundType: "inline6"
  }
};

const PRESET_ANGLES = [
  { label: "Front", angle: 0 },
  { label: "Quarter", angle: 45 },
  { label: "Profile", angle: 90 },
  { label: "Rear 3/4", angle: 135 },
  { label: "Rear", angle: 180 },
  { label: "Rear-L", angle: 225 },
  { label: "Profile-L", angle: 270 },
  { label: "Front-L", angle: 315 }
];

export function Showcase() {
  const [selectedCar, setSelectedCar] = useState<CarDetail | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // 360 Viewer State Management
  const [active360Model, setActive360Model] = useState<"mercedes" | "bmw">("mercedes");
  const [rotationAngle, setRotationAngle] = useState(25); // degrees 0-359
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<ViewerModel360["hotspots"][0] | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Auto-rotate loop using requestAnimationFrame
  useEffect(() => {
    if (!autoRotate) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let lastTimestamp = performance.now();
    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      setRotationAngle((prev) => (prev + (delta * 0.04)) % 360);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoRotate]);

  // Pointer drag event handlers for 360 rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartAngle(rotationAngle);
    setAutoRotate(false);
    setHasInteracted(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 1 pixel drag = ~0.6 degrees of rotation
    const newAngle = ((startAngle - (deltaX * 0.6)) % 360 + 360) % 360;
    setRotationAngle(newAngle);
  }, [isDragging, startX, startAngle]);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  // Synthesize realistic luxury exhaust sound using Web Audio API
  const playEngineSound = (type: "v8" | "inline6") => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(type === "v8" ? 180 : 320, audioCtx.currentTime);

      osc1.type = "sawtooth";
      osc2.type = "triangle";

      const baseFreq = type === "v8" ? 45 : 62;
      osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq * 1.5, audioCtx.currentTime);

      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 3.2, audioCtx.currentTime + 0.6);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 4.5, audioCtx.currentTime + 0.6);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, audioCtx.currentTime + 1.8);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, audioCtx.currentTime + 1.8);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      setIsPlayingSound(true);

      setTimeout(() => {
        osc1.stop();
        osc2.stop();
        audioCtx.close();
        setIsPlayingSound(false);
      }, 2300);
    } catch {
      setIsPlayingSound(false);
    }
  };

  const currentViewer = VIEWER_MODELS[active360Model];

  // Perspective calculation based on rotationAngle (0 - 360)
  // 0° is Front, 90° is Right Profile, 180° is Rear, 270° is Left Profile
  const normalizedAngle = Math.floor(rotationAngle);
  
  // Decide which image perspective to emphasize based on current angle
  const isFrontPerspective = (normalizedAngle >= 315 || normalizedAngle < 45) || (normalizedAngle >= 45 && normalizedAngle < 70) || (normalizedAngle >= 290 && normalizedAngle < 315);
  const isRearPerspective = (normalizedAngle >= 110 && normalizedAngle <= 250);
  const isMirrored = normalizedAngle >= 180 && normalizedAngle < 360;

  // 3D CSS tilt angle within the current quadrant
  const quadrantAngle = ((normalizedAngle % 90) - 45);
  const dynamicCarTilt = quadrantAngle * 0.45; // gentle perspective tilt in degrees
  const lightReflectionAngle = (normalizedAngle * 1.5) % 360;

  return (
    <section id="brands" className="py-32 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-neutral-500 uppercase tracking-[0.2em] text-xs font-semibold mb-4 flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-neutral-400" />
              Interactive Studio Turntable
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
              360° Vehicle Exploration.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
            Drag horizontally or use the turntable controls below to rotate each vehicle through a complete 360-degree rotation. Inspect aerodynamic contours, wheel configurations, and laser light geometries.
          </p>
        </motion.div>

        {/* 360-DEGREE INTERACTIVE VEHICLE VIEWER CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 bg-neutral-950 border border-white/10 relative overflow-hidden"
        >
          {/* Top Viewer Control Bar */}
          <div className="p-6 md:px-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-neutral-950/90 backdrop-blur-md z-30 relative">
            {/* Model Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-white/10">
              <button
                onClick={() => { setActive360Model("mercedes"); setSelectedHotspot(null); }}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  active360Model === "mercedes"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Mercedes-Benz S 580
              </button>
              <button
                onClick={() => { setActive360Model("bmw"); setSelectedHotspot(null); }}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  active360Model === "bmw"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                BMW M4 Competition
              </button>
            </div>

            {/* Turntable Telemetry & Toggles */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
                <Compass className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-white font-bold tabular-nums">{Math.round(rotationAngle)}°</span>
                <span className="text-neutral-500 uppercase text-[10px]">Heading</span>
              </div>

              {/* Auto-Rotate Play/Pause */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-2 px-3.5 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors ${
                  autoRotate 
                    ? "bg-white text-black border-white font-semibold" 
                    : "bg-neutral-900 border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-800"
                }`}
                title={autoRotate ? "Pause auto-rotation" : "Start continuous 360 spin"}
              >
                {autoRotate ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Spin</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto-Rotate</span>
                  </>
                )}
              </button>

              {/* Zoom Toggle */}
              <button
                onClick={() => setZoomLevel(zoomLevel === 1 ? 1.2 : 1)}
                className="p-2 bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                title={zoomLevel === 1 ? "Zoom in (1.2x)" : "Zoom out (1.0x)"}
              >
                {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
              </button>

              {/* Hotspots Toggle */}
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className={`p-2 border transition-colors ${
                  showHotspots 
                    ? "bg-white/15 border-white/30 text-white" 
                    : "bg-neutral-900 border-white/10 text-neutral-500"
                }`}
                title="Toggle engineering hotspots"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 360 INTERACTIVE VIEWPORT STAGE */}
          <div
            ref={viewerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className={`relative w-full h-[450px] md:h-[600px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            style={{ perspective: "1200px" }}
          >
            {/* Studio Environment Ambient Background */}
            <div className="absolute inset-0 bg-radial-gradient from-neutral-900/60 via-neutral-950 to-black pointer-events-none" />
            
            {/* Top Studio Overhead Softbox Strip */}
            <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-white/5 blur-3xl rounded-full pointer-events-none" />

            {/* 3D TURNTABLE FLOOR BASE WITH CSS TRANSFORMS */}
            <div 
              className="absolute bottom-6 md:bottom-12 w-[650px] md:w-[900px] h-[320px] md:h-[420px] rounded-full pointer-events-none transition-transform duration-75"
              style={{
                transform: `rotateX(68deg) rotateZ(${rotationAngle}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Outer Turntable Ring with Degree Ticks */}
              <div className="absolute inset-0 rounded-full border border-white/15 shadow-[0_0_80px_rgba(255,255,255,0.06)]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              
              {/* Cardinal Markers on Turntable Floor */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400">0° FRONT</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-neutral-400">180° REAR</div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-neutral-400">270° LEFT</div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-neutral-400">90° RIGHT</div>

              {/* Turntable Core Glow */}
              <div className="absolute inset-24 rounded-full bg-neutral-900/80 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]" />
            </div>

            {/* ROTATING VEHICLE CONTAINER WITH CSS 3D TRANSFORMS */}
            <div
              className="relative z-10 w-full max-w-4xl h-[340px] md:h-[480px] flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `perspective(1200px) rotateY(${dynamicCarTilt}deg) scale(${zoomLevel})`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Vehicle Underbody Shadow */}
              <div 
                className="absolute bottom-6 w-3/4 h-12 bg-black/85 rounded-full blur-xl pointer-events-none transition-transform duration-100"
                style={{
                  transform: `scaleX(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.15})`
                }}
              />

              {/* Dynamic Image Layer (Blends between Front and Side/Rear angles) */}
              <div className="relative w-full h-full max-w-3xl flex items-center justify-center p-4">
                
                {/* Front Perspective Image */}
                <img
                  src={currentViewer.frontImage}
                  alt={`${currentViewer.name} Front View`}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none ${
                    isFrontPerspective ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: isMirrored ? "scaleX(-1)" : "none"
                  }}
                />

                {/* Side / Rear Perspective Image */}
                <img
                  src={currentViewer.sideRearImage}
                  alt={`${currentViewer.name} Side / Rear View`}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none ${
                    !isFrontPerspective ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: isMirrored ? "scaleX(-1)" : "none"
                  }}
                />

                {/* DYNAMIC METALLIC LIGHT REFLECTION OVERLAY */}
                {/* Sweeps across the body as angle changes using CSS transforms */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 transition-all duration-75"
                  style={{
                    background: `linear-gradient(${lightReflectionAngle}deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)`
                  }}
                />
              </div>

              {/* INTERACTIVE ENGINEERING HOTSPOTS */}
              {showHotspots && currentViewer.hotspots.map((hotspot) => {
                const [minA, maxA] = hotspot.angleRange;
                const isHotspotActiveAngle = minA > maxA 
                  ? (normalizedAngle >= minA || normalizedAngle <= maxA)
                  : (normalizedAngle >= minA && normalizedAngle <= maxA);

                if (!isHotspotActiveAngle) return null;

                return (
                  <motion.div
                    key={hotspot.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute z-30"
                    style={{ top: hotspot.top, left: hotspot.left }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(hotspot);
                    }}
                  >
                    <button
                      className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-black/80 border border-white/40 text-white hover:bg-white hover:text-black transition-all shadow-lg"
                      title={hotspot.label}
                    >
                      <span className="w-2 h-2 rounded-full bg-white group-hover:bg-black animate-ping absolute" />
                      <span className="w-2 h-2 rounded-full bg-white group-hover:bg-black" />
                      
                      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white border border-white/20 text-[11px] font-mono px-2 py-1 whitespace-nowrap shadow-xl">
                        {hotspot.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Drag Prompt Hint (Fades out once user interacts) */}
            <AnimatePresence>
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider"
                >
                  <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>Drag Horizontally to Rotate 360°</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM ROTATION ANGLE CONTROLLER & PRESET DIAL */}
          <div className="p-6 md:px-8 border-t border-white/10 bg-neutral-950 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Quick Angle Preset Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase text-neutral-500 mr-2 hidden lg:inline-block">
                Preset Views:
              </span>
              {PRESET_ANGLES.map((preset) => {
                const isCurrentAngle = Math.abs(normalizedAngle - preset.angle) < 15 || 
                  (preset.angle === 0 && normalizedAngle > 345);

                return (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setRotationAngle(preset.angle);
                      setAutoRotate(false);
                      setHasInteracted(true);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase transition-colors border ${
                      isCurrentAngle
                        ? "bg-white text-black font-semibold border-white"
                        : "bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    {preset.label} ({preset.angle}°)
                  </button>
                );
              })}
            </div>

            {/* Scrub Slider for Precision Degree Positioning */}
            <div className="w-full md:w-80 flex items-center gap-3">
              <button
                onClick={() => setRotationAngle((prev) => (prev - 15 + 360) % 360)}
                className="w-7 h-7 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white bg-neutral-900 text-xs font-mono"
                title="Rotate counter-clockwise 15°"
              >
                -15°
              </button>

              <div className="flex-grow flex flex-col gap-1">
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={normalizedAngle}
                  onChange={(e) => {
                    setRotationAngle(Number(e.target.value));
                    setAutoRotate(false);
                    setHasInteracted(true);
                  }}
                  className="w-full accent-white h-1.5 bg-neutral-800 rounded-none cursor-ew-resize"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>0° Front</span>
                  <span>90° Right</span>
                  <span>180° Rear</span>
                  <span>270° Left</span>
                </div>
              </div>

              <button
                onClick={() => setRotationAngle((prev) => (prev + 15) % 360)}
                className="w-7 h-7 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white bg-neutral-900 text-xs font-mono"
                title="Rotate clockwise 15°"
              >
                +15°
              </button>
            </div>

          </div>

          {/* Active Hotspot Engineering Detail Callout */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="p-5 bg-neutral-900 border-t border-white/15 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-display font-semibold text-white">
                      {selectedHotspot.title}
                    </h5>
                    <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                      {selectedHotspot.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-neutral-400 hover:text-white p-1 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2-Column Car Showroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mercedes Card with Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden bg-neutral-950/80 border border-white/10 flex flex-col h-[650px] cursor-pointer"
            onClick={() => { setSelectedCar(CAR_DETAILS.mercedes); setBookingSubmitted(false); }}
          >
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 z-10 flex-shrink-0 flex justify-between items-start"
            >
              <div>
                <span className="text-xs text-neutral-400 font-mono tracking-wider uppercase block mb-1">
                  Stuttgart, Germany
                </span>
                <h3 className="text-3xl font-display font-semibold text-white mb-2">Mercedes-Benz</h3>
                <p className="text-neutral-400 text-sm tracking-wide">S-Class 580 4MATIC Executive</p>
              </div>
              <button 
                type="button"
                aria-label="View Mercedes specifications"
                className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
            
            {/* Car Image with Scale & Fade Entrance Animation */}
            <div className="relative flex-grow mt-auto overflow-hidden">
              <motion.img 
                src="/src/assets/images/mercedes_s_class_front_1791285322441.jpg" 
                alt="Mercedes S-Class Front Grille and Headlights" 
                referrerPolicy="no-referrer"
                initial={{ scale: 1.15, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>
            
            {/* Bottom Metadata & Specs bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10 bg-gradient-to-t from-black/95 to-transparent">
               <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-white/10 text-xs">
                 <div>
                   <span className="text-neutral-500 block uppercase">Output</span>
                   <span className="text-white font-mono font-medium">496 HP</span>
                 </div>
                 <div>
                   <span className="text-neutral-500 block uppercase">0–60 mph</span>
                   <span className="text-white font-mono font-medium">4.4s</span>
                 </div>
                 <div>
                   <span className="text-neutral-500 block uppercase">Engine</span>
                   <span className="text-white font-mono font-medium truncate block">4.0L V8</span>
                 </div>
               </div>
               <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Opulence</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>Acoustic Comfort</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>Executive Luxury</span>
                  </div>
                  <span className="text-white group-hover:underline underline-offset-4 font-mono text-[11px]">
                    Inspect Specs →
                  </span>
               </div>
            </div>
          </motion.div>

          {/* BMW Card with Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden bg-neutral-950/80 border border-white/10 flex flex-col h-[650px] cursor-pointer"
            onClick={() => { setSelectedCar(CAR_DETAILS.bmw); setBookingSubmitted(false); }}
          >
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="p-10 z-10 flex-shrink-0 flex justify-between items-start"
            >
              <div>
                <span className="text-xs text-neutral-400 font-mono tracking-wider uppercase block mb-1">
                  Munich, Germany
                </span>
                <h3 className="text-3xl font-display font-semibold text-white mb-2">BMW M-Series</h3>
                <p className="text-neutral-400 text-sm tracking-wide">M4 Competition M xDrive Coupe</p>
              </div>
              <button 
                type="button"
                aria-label="View BMW specifications"
                className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
            
            {/* Car Image with Scale & Fade Entrance Animation */}
            <div className="relative flex-grow mt-auto overflow-hidden">
              <motion.img 
                src="/src/assets/images/bmw_m4_front_1791285334672.jpg" 
                alt="BMW M4 Laser Headlights and Kidney Grille" 
                referrerPolicy="no-referrer"
                initial={{ scale: 1.15, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>
            
            {/* Bottom Metadata & Specs bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10 bg-gradient-to-t from-black/95 to-transparent">
               <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-white/10 text-xs">
                 <div>
                   <span className="text-neutral-500 block uppercase">Output</span>
                   <span className="text-white font-mono font-medium">503 HP</span>
                 </div>
                 <div>
                   <span className="text-neutral-500 block uppercase">0–60 mph</span>
                   <span className="text-white font-mono font-medium">3.4s</span>
                 </div>
                 <div>
                   <span className="text-neutral-500 block uppercase">Engine</span>
                   <span className="text-white font-mono font-medium truncate block">3.0L S58 TwinTurbo</span>
                 </div>
               </div>
               <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-white">Motorsport</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>Track Agility</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>M Dynamics</span>
                  </div>
                  <span className="text-white group-hover:underline underline-offset-4 font-mono text-[11px]">
                    Inspect Specs →
                  </span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Interactive Modal for Selected Car Details with Exhaust Sound & Test Drive */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 overflow-hidden max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCar(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 bg-black/60 border border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Preview & Sound Trigger */}
              <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden bg-black flex-shrink-0">
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.model} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-neutral-950" />
                
                {/* Audio Engine Button */}
                <div className="absolute bottom-6 left-6 z-10">
                  <button 
                    onClick={() => playEngineSound(selectedCar.soundType)}
                    disabled={isPlayingSound}
                    className="flex items-center gap-2.5 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                  >
                    {isPlayingSound ? (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>Revving Engine...</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Audition Exhaust Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Details & Specs content */}
              <div className="p-8 md:p-10 md:w-1/2 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                    {selectedCar.brand}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    {selectedCar.model}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {selectedCar.tagline}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="space-y-3 mb-6 py-4 border-y border-white/10 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-neutral-400" /> Powertrain
                    </span>
                    <span className="text-white font-mono font-medium text-right">{selectedCar.engine}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500 flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-neutral-400" /> Max Output
                    </span>
                    <span className="text-white font-mono font-medium">{selectedCar.power}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500">Acceleration (0–60)</span>
                    <span className="text-emerald-400 font-mono font-medium">{selectedCar.acceleration}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500">Top Speed</span>
                    <span className="text-white font-mono font-medium">{selectedCar.topSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-neutral-400" /> MSRP Baseline
                    </span>
                    <span className="text-white font-mono font-bold text-sm">{selectedCar.price}</span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-2">
                    Factory Equipment
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCar.tags.map((tag) => (
                      <span key={tag} className="text-xs text-neutral-300 bg-neutral-900 border border-white/10 px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking or Test Drive Call to Action */}
                <div className="mt-auto pt-4">
                  {bookingSubmitted ? (
                    <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Viewing request confirmed. Our concierge will call within 15 minutes.</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setBookingSubmitted(true)}
                      className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                    >
                      Reserve VIP Test Drive
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


