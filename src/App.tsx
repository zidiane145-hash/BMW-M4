/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Showcase } from "./components/Showcase";
import { Inventory } from "./components/Inventory";
import { ColorStudio } from "./components/ColorStudio";
import { Features } from "./components/Features";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Inventory />
        <ColorStudio />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
