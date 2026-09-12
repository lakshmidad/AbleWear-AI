import React from 'react'
import { Heart, Users, Award } from 'lucide-react'

export default function Footer({ highContrast }) {
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
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg font-black font-heading ${highContrast ? 'text-yellow-400' : 'text-white'}`}>
                AbleWear-AI
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                Track 5: Fashion for People
              </span>
            </div>
            <p className="text-sm font-medium">
              Developed for Track 5 by <strong className={highContrast ? 'text-yellow-300 underline' : 'text-white'}>Team KalVibers</strong>:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {teamMembers.map((member, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                    highContrast 
                      ? 'bg-zinc-900 border border-yellow-400 text-yellow-300' 
                      : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-medium mb-1">
              <span>Made with care for inclusive accessibility</span>
              <Heart className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-400' : 'text-rose-500'} fill-current`} />
            </div>
            <p className="text-[11px] text-slate-500">
              Compliant with WCAG 2.1 AA/AAA Contrast Standards & Touch Targets
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
