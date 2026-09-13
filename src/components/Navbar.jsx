import React from 'react'
import { Sparkles, Sun, Moon, Eye, Type, ShieldCheck, Mic, MicOff } from 'lucide-react'

export default function Navbar({ 
  highContrast, 
  setHighContrast, 
  largeText, 
  setLargeText,
  isListening,
  onToggleListening
}) {
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Team Info */}
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm ${
              highContrast ? 'bg-yellow-400 text-black ring-2 ring-white' : 'bg-gradient-to-br from-sky-600 to-indigo-700 text-white'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-heading">
                  AbleWear<span className={highContrast ? 'text-yellow-400' : 'text-sky-600'}>-AI</span>
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  highContrast 
                    ? 'bg-yellow-400 text-black font-extrabold' 
                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                }`}>
                  Team KalVibers
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className={`text-xs font-semibold ${highContrast ? 'text-yellow-300' : 'text-slate-600'}`}>
                  Track 5: Fashion for People
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium inline-flex items-center gap-1 ${
                  highContrast ? 'border-green-400 text-green-300' : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                }`}>
                  <ShieldCheck className="w-3 h-3" /> WCAG 2.1 Ready
                </span>
              </div>
            </div>
          </div>

          {/* Accessibility Quick Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Voice Control Mic Toggle with Pulsing Animation */}
            <button
              onClick={onToggleListening}
              id="voice-control-toggle"
              className={`relative px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all min-h-[44px] min-w-[44px] ${
                isListening
                  ? highContrast
                    ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/50 font-black'
                    : 'bg-red-600 text-white shadow-lg shadow-red-500/40 ring-4 ring-red-400/40'
                  : highContrast
                    ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
              title={isListening ? "Voice Control Active: Listening for commands. Click to pause." : "Enable Voice-Guided Hands-Free Control"}
              aria-label={isListening ? "Voice control active" : "Enable voice control"}
            >
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}

              {isListening ? (
                <Mic className="w-4 h-4 animate-pulse text-current" />
              ) : (
                <Mic className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
              )}
              
              <span className="hidden md:inline">
                {isListening ? 'Voice: Listening...' : 'Voice Control'}
              </span>
            </button>

            {/* Text Zoom / Large Text Toggle */}
            <button
              onClick={() => setLargeText(!largeText)}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all min-h-[44px] min-w-[44px] ${
                largeText
                  ? highContrast 
                    ? 'bg-yellow-400 text-black ring-2 ring-white' 
                    : 'bg-slate-900 text-white'
                  : highContrast
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
              title="Toggle Larger Text Size for readability"
              aria-label="Toggle larger text size"
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">{largeText ? 'Large: ON' : 'Default Text'}</span>
            </button>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              id="high-contrast-toggle"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all min-h-[44px] min-w-[44px] shadow-sm ${
                highContrast
                  ? 'bg-yellow-400 text-black ring-4 ring-yellow-300/40 hover:bg-yellow-300'
                  : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-800'
              }`}
              title="Toggle High Contrast Mode (WCAG AAA)"
              aria-label="Toggle high contrast accessibility mode"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{highContrast ? 'Contrast: ON' : 'High Contrast'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
