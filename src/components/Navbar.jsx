import React from 'react'
import { Sparkles, Eye, Mic, ShieldCheck, CheckCircle2, ChevronRight, Volume2, Home, PackageCheck, Wand2, ShoppingBag } from 'lucide-react'
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
    setIsTrackingOpen,
    orderHistory
  } = useAccessibility()

  const primaryNavItems = [
    { id: 0, label: 'Home Landing', emoji: '🏠', action: () => setCurrentStep(0), isActive: currentStep === 0 },
    { id: 'wizard', label: '🪄 4-Step Wizard', emoji: '', action: () => setCurrentStep(currentStep >= 1 && currentStep <= 4 ? currentStep : 1), isActive: currentStep >= 1 && currentStep <= 4 },
    { id: 3, label: '🛍️ Matched Catalog', emoji: '', action: () => setCurrentStep(3), isActive: currentStep === 3 },
    { id: 5, label: '📦 My Orders', emoji: '', badge: orderHistory?.length || 0, action: () => setCurrentStep(5), isActive: currentStep === 5 },
  ]

  const wizardSteps = [
    { id: 0, name: 'Home', label: 'Home', desc: 'Creative Landing' },
    { id: 1, name: 'Profile', label: '1. Profile', desc: 'Mobility & Needs' },
    { id: 2, name: 'AI Scanner', label: '2. AI Scanner', desc: 'Feature Detection' },
    { id: 3, name: 'Matched Catalog', label: '3. Matched Catalog', desc: 'Fit Simulator' },
    { id: 4, name: 'Customization & Dispatch', label: '4. Customization & Dispatch', desc: 'Local Tailor' },
    { id: 5, name: 'My Orders', label: '5. My Orders & Tracker', desc: 'Flipkart Live Status' }
  ]

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white shadow-lg' 
        : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top Banner: Logo + Primary Nav Header + Global Accessibility Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-2 lg:h-20 gap-3">
          
          {/* Header Logo: "AdaptiveStyle AI" with Track 5 badge */}
          <div 
            onClick={() => setCurrentStep(0)} 
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-sky-400 rounded-2xl p-1 shrink-0"
            tabIndex={0}
            role="button"
            aria-label="AdaptiveStyle AI Home Landing Page"
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setCurrentStep(0) }}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-transform group-hover:scale-105 ${
              highContrast 
                ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40' 
                : 'bg-gradient-to-br from-indigo-600 via-sky-600 to-teal-500 text-white ring-2 ring-indigo-200'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight font-heading group-hover:underline">
                  AdaptiveStyle <span className={highContrast ? 'text-yellow-400' : 'text-sky-600'}>AI</span>
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide ${
                  highContrast 
                    ? 'bg-yellow-400 text-black border border-white' 
                    : 'bg-sky-100 text-sky-900 border border-sky-300'
                }`}>
                  Track 5
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[11px] font-semibold ${highContrast ? 'text-yellow-300' : 'text-slate-500'}`}>
                  Team KalVibers
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold inline-flex items-center gap-1 ${
                  highContrast ? 'border border-emerald-400 text-emerald-300 bg-black' : 'border border-emerald-300 bg-emerald-50 text-emerald-800'
                }`}>
                  <ShieldCheck className="w-2.5 h-2.5" /> WCAG 2.1 AA
                </span>
              </div>
            </div>
          </div>

          {/* Seamless Navigation Header: [ Home Landing | 🪄 4-Step Wizard | 🛍️ Matched Catalog | 📦 My Orders ] */}
          <nav aria-label="Main Navigation" className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
            {primaryNavItems.map(item => (
              <button
                key={item.id}
                onClick={item.action}
                aria-current={item.isActive ? 'page' : undefined}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all min-h-[44px] focus:ring-4 ${
                  item.isActive
                    ? highContrast
                      ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40 font-black shadow-md'
                      : 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-2 ring-sky-300'
                    : highContrast
                      ? 'bg-zinc-900 text-yellow-300 hover:bg-zinc-800 border border-yellow-400/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    item.isActive
                      ? highContrast ? 'bg-black text-yellow-400' : 'bg-white text-sky-700'
                      : highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Global Accessibility Toolbar: [ 🗣️ Voice Control Toggle | Font Scaler | High Contrast ] */}
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-2.5" role="toolbar" aria-label="Accessibility controls">
            
            {/* 🗣️ Voice Control Toggle */}
            <button
              onClick={toggleListening}
              id="voice-control-toggle"
              aria-pressed={isListening}
              aria-label={isListening ? "Voice Control Active: Listening. Click to pause." : "Enable 🗣️ Voice Control Toggle"}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all min-h-[44px] focus:ring-4 focus:ring-sky-400 ${
                isListening
                  ? highContrast
                    ? 'bg-yellow-400 text-black ring-4 ring-yellow-300'
                    : 'bg-rose-600 text-white shadow-lg shadow-rose-500/50 ring-4 ring-rose-400/40'
                  : highContrast
                    ? 'bg-zinc-900 text-yellow-300 hover:bg-zinc-800 border border-yellow-400'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
              title="🗣️ Voice Commands: 'Start wizard', 'Matched catalog', 'My orders', 'Next step', 'High contrast', 'Scan garment'"
            >
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
                </span>
              )}

              <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-current' : 'text-slate-600 dark:text-zinc-300'}`} />
              
              <span className="font-extrabold whitespace-nowrap">
                {isListening ? '🗣️ Listening...' : '🗣️ Voice Control'}
              </span>

              {isSpeaking && (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse hidden sm:inline" />
              )}
            </button>

            {/* Font Size Scaler: A-, A, A+ */}
            <div className={`flex items-center rounded-xl p-1 border min-h-[48px] ${
              highContrast ? 'bg-zinc-900 border-yellow-400' : 'bg-slate-100 border-slate-300'
            }`} role="group" aria-label="Font size adjustment">
              <button
                onClick={() => setFontSize('normal')}
                aria-label="Normal font size"
                className={`px-3 py-2 rounded-lg font-bold text-xs min-h-[40px] transition-all ${
                  fontSize === 'normal'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black ring-2 ring-white'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Default font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('large')}
                aria-label="Large font size"
                className={`px-3 py-2 rounded-lg font-bold text-sm min-h-[40px] transition-all ${
                  fontSize === 'large'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black ring-2 ring-white'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Large font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                aria-label="Extra large font size"
                className={`px-3 py-2 rounded-lg font-bold text-base min-h-[40px] transition-all ${
                  fontSize === 'xlarge'
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black ring-2 ring-white'
                      : 'bg-white text-slate-900 shadow-sm font-black'
                    : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Extra large font size"
              >
                A+
              </button>
            </div>

            {/* High-Contrast Mode Toggle */}
            <button
              onClick={toggleHighContrast}
              id="high-contrast-toggle"
              aria-pressed={highContrast}
              aria-label={highContrast ? "High Contrast dark mode enabled. Click to disable." : "Enable High Contrast WCAG mode"}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all min-h-[48px] min-w-[48px] focus:ring-4 focus:ring-yellow-400 ${
                highContrast
                  ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/50 hover:bg-yellow-300'
                  : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-sm'
              }`}
              title="Toggle High Contrast Mode"
            >
              <Eye className="w-5 h-5" />
              <span className="hidden sm:inline">
                {highContrast ? 'Contrast: ON' : 'High Contrast'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Stepper Progress Bar: [Home -> 1. Profile -> 2. AI Scanner -> 3. Matched Catalog -> 4. Customization & Dispatch] */}
      <nav aria-label="Wizard Pipeline Progress" className={`border-t py-2 px-4 sm:px-6 lg:px-8 transition-colors ${
        highContrast ? 'bg-zinc-950 border-yellow-400/40' : 'bg-slate-50/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 no-scrollbar gap-2">
          {wizardSteps.map((s, index) => {
            const isActive = currentStep === s.id
            const isCompleted = currentStep > s.id && s.id > 0

            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setCurrentStep(s.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[48px] focus:ring-4 ${
                    isActive
                      ? highContrast
                        ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40 font-black shadow-md'
                        : 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md'
                      : isCompleted
                        ? highContrast
                          ? 'bg-zinc-800 text-yellow-300 hover:bg-zinc-700 border border-yellow-400/30'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                        : highContrast
                          ? 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                    isActive
                      ? highContrast ? 'bg-black text-yellow-400' : 'bg-white text-sky-700'
                      : isCompleted
                        ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                        : highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {s.id === 0 ? <Home className="w-3.5 h-3.5" /> : isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                  </span>
                  <div className="text-left">
                    <div className="font-extrabold whitespace-nowrap">{s.label}</div>
                    <div className={`text-[10px] hidden sm:block ${
                      isActive 
                        ? highContrast ? 'text-black/80' : 'text-white/80' 
                        : highContrast ? 'text-zinc-400' : 'text-slate-500'
                    }`}>
                      {s.desc}
                    </div>
                  </div>
                </button>
                {index < wizardSteps.length - 1 && (
                  <ChevronRight className={`w-4 h-4 shrink-0 ${
                    highContrast ? 'text-yellow-400/50' : 'text-slate-400'
                  }`} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
