import React from 'react'
import { Heart, ShieldCheck, Sparkles, Accessibility } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Footer() {
  const { highContrast } = useAccessibility()

  const teamMembers = [
    "M. Venkata Durga Lakshmi",
    "M. Lakshmi Pavani",
    "Godasu Sai Vardhan",
    "Y. Divya Sri"
  ]

  return (
    <footer className={`mt-20 border-t transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-slate-950 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xl font-black font-heading ${highContrast ? 'text-yellow-400' : 'text-white'}`}>
                AdaptiveStyle AI
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              }`}>
                Track 5: Fashion for People
              </span>
            </div>

            {/* Exact required text specification */}
            <p className="text-sm font-bold mt-1">
              Track 5: Fashion for People | Developed by Team KalVibers: M. Venkata Durga Lakshmi, M. Lakshmi Pavani, Godasu Sai Vardhan, Y. Divya Sri
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {teamMembers.map((member, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-3 py-1 rounded-lg font-bold ${
                    highContrast 
                      ? 'bg-zinc-900 border border-yellow-400 text-yellow-300' 
                      : 'bg-slate-800/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <span>Universal Inclusivity & Adaptive Fit</span>
              <Heart className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-400' : 'text-rose-500'} fill-current`} />
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              WCAG 2.1 AA Compliance • Min 48px Touch Targets • Accessible Screen Reader Ready
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
