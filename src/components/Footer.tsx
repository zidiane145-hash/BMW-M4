import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xs">
            <a href="/" className="flex items-center gap-2 mb-6">
              <Car className="w-6 h-6 text-white" />
              <span className="text-xl font-display font-bold tracking-tight text-white uppercase">
                Apex Motors
              </span>
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              The premier destination for high-end luxury vehicles and bespoke automotive experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="text-xs font-medium">IG</span>
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="text-xs font-medium">X</span>
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="text-xs font-medium">YT</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">Vehicles</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Mercedes-Benz</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">BMW</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Certified Pre-Owned</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">Services</h4>
              <ul className="space-y-4">
                <li><a href="#colours" className="text-neutral-400 hover:text-white text-sm transition-colors">Bespoke Paint Studio</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Service Center</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">Financing</a></li>
                <li><a href="#about" className="text-neutral-400 hover:text-white text-sm transition-colors">Private Concierge</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-xs">Showroom</h4>
              <address className="not-italic text-neutral-400 text-sm space-y-2">
                <p>1245 Luxury Boulevard</p>
                <p>Beverly Hills, CA 90210</p>
                <p className="mt-4 pt-4 border-t border-white/10">contact@apexmotors.example</p>
                <p>+1 (800) 555-0198</p>
              </address>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-neutral-500 font-medium tracking-wide">
          <p>© 2026 Apex Motors. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
