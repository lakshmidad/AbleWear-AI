import React from 'react'
import { Sparkles, Eye, Mic, Volume2, ShieldCheck } from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Navbar() {
  const {
    currentStep,
    setCurrentStep,
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    isListening,
    toggleListening,
    isSpeaking,
    orderHistory
  } = useAccessibility()

  const navLinks = [
    { 
      id: 'home', 
      label: '🏠 Home', 
      action: () => setCurrentStep(0), 
      isActive: currentStep === 0 
    },
    { 
      id: 'wizard', 
      label: '🪄 Guided Wizard', 
      action: () => setCurrentStep(currentStep >= 1 && currentStep <= 4 ? currentStep : 1), 
      isActive: currentStep >= 1 && currentStep <= 4 
    },
    { 
      id: 'catalog', 
      label: '🛍️ Catalog', 
      action: () => setCurrentStep(3), 
      isActive: currentStep === 3 
    },
    { 
      id: 'orders', 
      label: '📦 My Orders', 
      badge: orderHistory?.length || 0,
      action: () => setCurrentStep(5), 
      isActive: currentStep === 5 
    },
  ]

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white shadow-lg' 
        : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Logo + Track 5 Badge */}
          <div 
            onClick={() => setCurrentStep(0)} 
            className="flex items-center space-x-2.5 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-sky-400 rounded-xl p-1 shrink-0"
            tabIndex={0}
            role="button"
            aria-label="AdaptiveStyle AI Home"
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setCurrentStep(0) }}
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm transition-transform group-hover:scale-105 ${
              highContrast 
                ? 'bg-yellow-400 text-black ring-2 ring-yellow-400/40' 
                : 'bg-gradient-to-br from-indigo-600 via-sky-600 to-teal-500 text-white shadow-sky-500/20'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight font-heading group-hover:underline whitespace-nowrap">
                AdaptiveStyle <span className={highContrast ? 'text-yellow-400' : 'text-sky-600'}>AI</span>
              </span>
              <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide shrink-0 ${
                highContrast 
                  ? 'bg-yellow-400 text-black border border-white' 
                  : 'bg-sky-100 text-sky-900 border border-sky-300'
              }`}>
                Track 5
              </span>
            </div>
          </div>

          {/* Center Links: [ 🏠 Home | 🪄 Guided Wizard | 🛍️ Catalog | 📦 My Orders ] */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={link.action}
                aria-current={link.isActive ? 'page' : undefined}
                className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-bold flex items-center gap-1.5 transition-all min-h-[42px] focus:ring-4 ${
                  link.isActive
                    ? highContrast
                      ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40 font-black shadow-sm'
                      : 'bg-sky-600 text-white shadow-sm shadow-sky-600/25 ring-2 ring-sky-300 font-extrabold'
                    : highContrast
                      ? 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    link.isActive
                      ? highContrast ? 'bg-black text-yellow-400' : 'bg-white text-sky-700'
                      : highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Controls: Minimal mic icon, Font Scaler (A-, A, A+), Contrast Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2" role="toolbar" aria-label="Accessibility controls">
            
            {/* Minimal Mic Icon for Voice Control */}
            <button
              onClick={toggleListening}
              id="voice-control-minimal-toggle"
              aria-pressed={isListening}
              aria-label={isListening ? "Voice Control Active. Click to pause." : "Activate Voice Control"}
              title={isListening ? "Voice Control Active: Listening. Click to pause." : "Click to activate Voice Control"}
              className={`relative p-2.5 rounded-xl transition-all min-h-[42px] min-w-[42px] flex items-center justify-center focus:ring-4 focus:ring-sky-400 ${
                isListening
                  ? highContrast
                    ? 'bg-yellow-400 text-black ring-2 ring-yellow-300'
                    : 'bg-rose-600 text-white shadow-md shadow-rose-500/40 ring-2 ring-rose-400'
                  : highContrast
                    ? 'bg-zinc-900 text-yellow-300 hover:bg-zinc-800 border border-zinc-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
              )}
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-current' : ''}`} />
            </button>

            {/* Font Size Scaler: A-, A, A+ */}
            <div className={`flex items-center rounded-xl p-0.5 border ${
              highContrast ? 'bg-zinc-900 border-yellow-400' : 'bg-slate-100 border-slate-200'
            }`} role="group" aria-label="Font size adjustment">
              <button
                onClick={() => setFontSize('normal')}
                aria-label="Normal font size"
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs min-h-[36px] transition-all ${
                  fontSize === 'normal'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Normal font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('large')}
                aria-label="Large font size"
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs min-h-[36px] transition-all ${
                  fontSize === 'large'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Large font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                aria-label="Extra large font size"
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs min-h-[36px] transition-all ${
                  fontSize === 'xlarge'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Extra large font"
              >
                A+
              </button>
            </div>

            {/* High-Contrast Mode Toggle */}
            <button
              onClick={toggleHighContrast}
              id="high-contrast-toggle"
              aria-pressed={highContrast}
              aria-label={highContrast ? "Disable High Contrast mode" : "Enable High Contrast mode"}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all min-h-[42px] focus:ring-4 focus:ring-yellow-400 ${
                highContrast
                  ? 'bg-yellow-400 text-black ring-2 ring-yellow-400/50 hover:bg-yellow-300 font-black'
                  : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-sm'
              }`}
              title="Toggle High Contrast Mode"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">
                {highContrast ? 'Contrast ON' : 'Contrast'}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Row (shows only on small screens) */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-zinc-800 overflow-x-auto no-scrollbar gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={link.action}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                link.isActive
                  ? highContrast
                    ? 'bg-yellow-400 text-black font-black'
                    : 'bg-sky-600 text-white font-extrabold'
                  : highContrast ? 'text-zinc-300' : 'text-slate-600'
              }`}
            >
              {link.label}
              {link.badge !== undefined && link.badge > 0 && ` (${link.badge})`}
            </button>
          ))}
        </div>

      </div>
    </header>
  )
}
