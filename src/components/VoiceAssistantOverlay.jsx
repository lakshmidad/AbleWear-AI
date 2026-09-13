import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Scan, 
  Scissors, 
  X, 
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  PackageCheck
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function VoiceAssistantOverlay() {
  const {
    isListening,
    toggleListening,
    voiceFeedback,
    isSpeaking,
    highContrast,
    setCurrentStep,
    currentStep,
    activeMatch,
    speak
  } = useAccessibility()

  // Collapsible state: default closed (only small floating button)
  const [isOpen, setIsOpen] = useState(false)

  // Automatically open card when listening or speaking starts so user sees live feedback
  useEffect(() => {
    if (isListening || isSpeaking) {
      setIsOpen(true)
    }
  }, [isListening, isSpeaking])

  // Quick Voice Shortcuts
  const shortcuts = [
    { 
      label: 'Start wizard', 
      icon: Sparkles,
      action: () => {
        setCurrentStep(1)
        speak('Navigating to Step 1: Profile Builder.')
      }
    },
    { 
      label: 'Next step', 
      icon: ArrowRight,
      action: () => {
        setCurrentStep(prev => Math.min(4, prev + 1))
        speak(`Moving to step ${Math.min(4, currentStep + 1)}`)
      }
    },
    { 
      label: 'Scan garment', 
      icon: Scan,
      action: () => {
        setCurrentStep(2)
        speak('Opening dynamic AI garment scanner.')
      }
    },
    { 
      label: 'Matched catalog', 
      icon: ShoppingBag,
      action: () => {
        setCurrentStep(3)
        speak('Opening matched catalog and fit simulator.')
      }
    },
    { 
      label: 'My orders', 
      icon: PackageCheck,
      action: () => {
        setCurrentStep(5)
        speak('Opening live order tracking.')
      }
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {/* Full Overlay Card (only when clicked or active) */}
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`w-[calc(100vw-3rem)] max-w-sm rounded-2xl border shadow-2xl overflow-hidden ${
              highContrast
                ? 'bg-black border-yellow-400 text-white ring-4 ring-yellow-400/30'
                : 'bg-slate-950/95 backdrop-blur-xl border-slate-700 text-white shadow-sky-950/40'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              highContrast ? 'border-zinc-800 bg-zinc-900' : 'border-slate-800 bg-slate-900/80'
            }`}>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={toggleListening}
                  aria-label={isListening ? "Pause speech listening" : "Activate speech listening"}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isListening
                      ? highContrast 
                        ? 'bg-yellow-400 text-black font-black' 
                        : 'bg-rose-500 text-white shadow-md shadow-rose-500/50'
                      : highContrast
                        ? 'bg-zinc-800 text-zinc-300'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 animate-bounce" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                </button>

                <div>
                  <div className="font-black text-xs flex items-center gap-1.5">
                    <span>Voice Assistant</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                      isListening
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isListening ? 'Live' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {isListening ? 'Listening for speech...' : 'Click mic to speak'}
                  </p>
                </div>
              </div>

              {/* Minimize / Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Collapse Voice Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Collapse Voice Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              {/* Feedback bubble */}
              <div className={`p-2.5 rounded-xl border text-xs ${
                highContrast 
                  ? 'bg-zinc-900 border-zinc-700 text-yellow-300' 
                  : 'bg-slate-900/80 border-slate-800 text-sky-200'
              }`}>
                <div className="flex items-start gap-2">
                  {isSpeaking ? (
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{voiceFeedback}</span>
                </div>
              </div>

              {/* Quick shortcut pills */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex justify-between">
                  <span>Quick Voice Commands</span>
                  <span className="text-slate-500">(Tap or Speak)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {shortcuts.map((sc, i) => {
                    const Icon = sc.icon
                    return (
                      <button
                        key={i}
                        onClick={sc.action}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border text-left transition-all flex items-center gap-1.5 min-h-[30px] ${
                          highContrast
                            ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-yellow-400 hover:text-yellow-300'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3 h-3 text-sky-400" />
                        <span>"{sc.label}"</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Small Collapsible Floating Button (when closed) */
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open Hands-Free Voice Assistant"
            title="Open Hands-Free Voice Assistant"
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all focus:ring-4 focus:ring-sky-400 relative ${
              highContrast
                ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40 font-black'
                : 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-slate-950/40'
            }`}
          >
            {isListening && (
              <span className="absolute -inset-1 rounded-full bg-rose-400/50 animate-ping pointer-events-none" />
            )}

            <Mic className={`w-6 h-6 ${isListening ? 'animate-bounce text-rose-500 dark:text-black' : 'text-sky-400'}`} />

            {/* Sound indicator badge */}
            {isSpeaking && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
