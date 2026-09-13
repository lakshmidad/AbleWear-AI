import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  SlidersHorizontal, 
  Scan, 
  Scissors, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  X,
  VolumeX,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function VoiceAssistantOverlay() {
  const {
    isListening,
    toggleListening,
    voiceFeedback,
    lastCommand,
    isSpeaking,
    highContrast,
    setCurrentStep,
    currentStep,
    triggerGarmentScan,
    setSelectedGarment,
    activeMatch,
    speak
  } = useAccessibility()

  const [isMinimized, setIsMinimized] = useState(false)
  const [showQuickPills, setShowQuickPills] = useState(true)

  // Quick Command Shortcut Simulation Pills
  const voiceShortcuts = [
    { 
      label: 'Next step', 
      icon: ArrowRight,
      action: () => {
        setCurrentStep(prev => Math.min(4, prev + 1))
        speak(`Moving to step ${Math.min(4, currentStep + 1)}`)
      }
    },
    { 
      label: 'Previous step', 
      icon: ArrowLeft,
      action: () => {
        setCurrentStep(prev => Math.max(1, prev - 1))
        speak(`Returning to step ${Math.max(1, currentStep - 1)}`)
      }
    },
    { 
      label: 'Scan garment', 
      icon: Scan,
      action: () => {
        setCurrentStep(2)
        speak('Scanning garment features.')
      }
    },
    { 
      label: 'Read accessibility score out loud', 
      icon: Volume2,
      action: () => {
        speak(`Your Functional Accessibility Match Score is ${activeMatch.score} percent.`)
      }
    },
    { 
      label: 'Select magnetic shirt', 
      icon: Scissors,
      action: () => {
        setCurrentStep(4)
        speak('Selected Pro-Adaptive Magnetic Oxford Shirt.')
      }
    }
  ]

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full transition-all">
      <div className={`rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        highContrast
          ? 'bg-black border-yellow-400 text-white ring-4 ring-yellow-400/30'
          : 'bg-slate-950/95 backdrop-blur-xl border-slate-700 text-white shadow-sky-950/50'
      }`}>
        {/* HUD Header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between ${
          highContrast ? 'border-zinc-800 bg-zinc-900' : 'border-slate-800 bg-slate-900/60'
        }`}>
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleListening}
              aria-label={isListening ? "Pause speech assistant" : "Activate speech assistant"}
              className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                isListening
                  ? highContrast 
                    ? 'bg-yellow-400 text-black ring-2 ring-white' 
                    : 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'
                  : highContrast
                    ? 'bg-zinc-800 text-zinc-300'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 animate-bounce" />
                  <span className="absolute -inset-1 rounded-xl bg-rose-400/40 animate-ping pointer-events-none" />
                </>
              ) : (
                <MicOff className="w-4 h-4" />
              )}
            </button>

            <div>
              <div className="font-extrabold text-xs font-heading flex items-center gap-1.5">
                <span>Voice Assistant</span>
                {isListening ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                    Live
                  </span>
                ) : (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-800 text-slate-400">
                    Paused
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
                {isListening ? 'Listening for speech...' : 'Click mic to speak'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? "Expand voice HUD" : "Minimize voice HUD"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* HUD Body */}
        {!isMinimized && (
          <div className="p-4 space-y-3">
            {/* Live Feedback Message */}
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

            {/* Quick Voice Command Chips */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span>Supported Voice Commands</span>
                <span className="text-slate-500">(Say or Tap)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {voiceShortcuts.map((sc, i) => {
                  const IconComp = sc.icon

                  return (
                    <button
                      key={i}
                      onClick={sc.action}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border text-left transition-all flex items-center gap-1.5 min-h-[32px] ${
                        highContrast
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-yellow-400 hover:text-yellow-300'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <IconComp className="w-3 h-3 text-sky-400" />
                      <span>"{sc.label}"</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
