import React from 'react'
import { Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Footer() {
  const { highContrast } = useAccessibility()

  return (
    <footer className={`mt-16 border-t transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-slate-950 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Brand & Team Specification */}
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className={`text-base font-black font-heading ${highContrast ? 'text-yellow-400' : 'text-white'}`}>
                AdaptiveStyle AI
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              }`}>
                Track 5: Fashion for People
              </span>
            </div>

            {/* Exact Required Specification */}
            <p className="text-xs sm:text-sm font-semibold text-slate-300 dark:text-zinc-300">
              Track 5: Fashion for People | Team KalVibers: M. Venkata Durga Lakshmi, M. Lakshmi Pavani, Godasu Sai Vardhan, Y. Divya Sri
            </p>
          </div>

          {/* Compliance & Inclusivity */}
          <div className="flex flex-col items-center sm:items-end text-xs text-slate-400 gap-1 shrink-0">
            <div className="flex items-center gap-1.5 font-bold">
              <span>Universal Inclusivity & Adaptive Fit</span>
              <Heart className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-400' : 'text-rose-500'} fill-current`} />
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              WCAG 2.1 AA Compliant • Screen Reader Ready
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
