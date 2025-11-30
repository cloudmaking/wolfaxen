import { useState } from "preact/hooks";
import VoiceAssistant from "./VoiceAssistant.tsx";
import ContactForm from "./ContactForm.tsx";
import MagneticCard from "./MagneticCard.tsx";
import GlowingBorder from "./GlowingBorder.tsx";
import Sheen from "../components/Sheen.tsx";

export default function ContactPageTabs() {
  const [activeTab, setActiveTab] = useState<"voice" | "form">("voice");

  return (
    <div class="w-full">
      {/* Tab Switcher */}
      <div class="flex justify-center mb-10">
        <div class="bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full inline-flex relative">
          <button
            type="button"
            onClick={() => setActiveTab("voice")}
            class={`relative z-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "voice"
                ? "text-oreo-black"
                : "text-warm-beige/60 hover:text-warm-beige"
            }`}
          >
            Talk to AI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            class={`relative z-10 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "form"
                ? "text-oreo-black"
                : "text-warm-beige/60 hover:text-warm-beige"
            }`}
          >
            Write to Us
          </button>

          {/* Sliding Background */}
          <div
            class={`absolute top-1 bottom-1 rounded-full bg-muted-gold transition-all duration-300 ease-out ${
              activeTab === "voice"
                ? "left-1 w-[calc(50%-4px)]"
                : "left-[calc(50%+4px)] w-[calc(50%-8px)]"
            }`}
          />
        </div>
      </div>

      {/* Content Area */}
      <div class="min-h-[600px] transition-all duration-500">
        {activeTab === "voice"
          ? (
            <div class="animate-fade-in">
              <VoiceAssistant />
            </div>
          )
          : (
            <div class="animate-fade-in">
              <MagneticCard intensity={5} glowColor="rgba(255,255,255,0.05)">
                <GlowingBorder className="rounded-3xl" color="#B9B07B">
                  <div class="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md shadow-2xl relative h-full">
                    <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none">
                    </div>
                    <div class="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none group">
                      <Sheen />
                    </div>

                    <ContactForm />
                  </div>
                </GlowingBorder>
              </MagneticCard>
            </div>
          )}
      </div>
    </div>
  );
}
