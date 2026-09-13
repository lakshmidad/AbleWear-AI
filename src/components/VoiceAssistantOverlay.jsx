import React, { useState, useEffect } from 'react'
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
  Radio,
  VolumeX
} from 'lucide-react'

export default function VoiceAssistantOverlay({
  isListening,
  onToggleListening,
  lastHeardTranscript,
  statusMessage,
  isSpeaking,
  onExecuteCommand,
  highContrast,
  largeText
}) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // Quick Command Shortcut Simulation Pills
  const quickCommands = [
    { text: 'Filter magnetic shirts', icon: SlidersHorizontal, desc: 'Applies magnetic filter in catalog' },
    { text: 'Scan clothing', icon: Scan, desc: 'Opens AI Garment Scanner' },
    { text: 'Request customization', icon: Scissors, desc: 'Opens tailor alteration portal' },
    { text: 'Read accessibility score', icon: Volume2, desc: 'Speaks out loud garment rating' },
  ]

  return (
    <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 max-w-sm w-full ${
      largeText ? 'text-base' : 'text-xs'
    }`}>
      
      {/* Voice Assistant Floating HUD Box */}
      <div className={`rounded-2xl border shadow-2xl transition-all overflow-hidden ${
        highContrast
          ? 'bg-black border-yellow-400 text-white ring-2 ring-yellow-400/40'
          : 'bg-slate-900/95 backdrop-blur-xl border-slate-700 text-white shadow-sky-950/40'
      }`}>
        
        {/* HUD Top Bar */}
        <div className={`px-4 py-3 border-b flex items-center justify-between ${
          highContrast ? 'border-zinc-800 bg-zinc-950' : 'border-slate-800 bg-slate-950/60'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`relative flex items-center justify-center w-7 h-7 rounded-lg ${
              isListening
                ? highContrast 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                : highContrast
                  ? 'bg-zinc-800 text-zinc-300'
                  : 'bg-slate-800 text-slate-400'
            }`}>
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 animate-pulse" />
                  <span className="absolute -inset-1 rounded-lg bg-red-400/40 animate-ping pointer-events-none" />
                </>
              ) : (
                <MicOff className="w-4 h-4" />
              )}
            </div>

            <div>
              <div className="font-extrabold text-xs font-heading flex items-center gap-1.5">
                <span>Hands-Free Voice HUD</span>
                {isListening && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                    Live
                  </span>
                )}
                {isSpeaking && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1">
                    <Volume2 className="w-2.5 h-2.5" /> Speaking
                  </span>
                )}
              </div>
              <p className={`text-[10px] ${highContrast ? 'text-zinc-400' : 'text-slate-400'}`}>
                Web Speech API &bull; Severe Dexterity Mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="p-1 rounded-md text-slate-400 hover:text-white"
              title="Voice Commands Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-slate-400 hover:text-white"
              title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* HUD Expanded Content */}
        {!isMinimized && (
          <div className="p-4 space-y-3.5">
            
            {/* Status / Transcript Monitor */}
            <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-[64px] ${
              highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-950/80 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                <span>{isListening ? 'Awaiting Voice Input...' : 'Voice Recognition Paused'}</span>
                {isListening && (
                  <div className="flex items-center gap-0.5">
                    <span className="w-1 h-3 bg-red-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1 h-4 bg-red-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    <span className="w-1 h-5 bg-red-400 rounded-full animate-bounce [animation-delay:75ms]" />
                  </div>
                )}
              </div>

              <div className="font-semibold text-xs leading-snug">
                {lastHeardTranscript ? (
                  <span className={highContrast ? 'text-yellow-300' : 'text-sky-300'}>
                    "{lastHeardTranscript}"
                  </span>
                ) : (
                  <span className="text-slate-500 italic">
                    {isListening ? 'Speak any command (e.g. "Scan clothing")' : 'Click Mic in Navbar to speak'}
                  </span>
                )}
              </div>

              {statusMessage && (
                <div className="text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Test Voice Commands (Immediate Hands-Free Simulation) */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                <span>Say or Click Command:</span>
                <span className="text-[10px] text-sky-400 font-normal">Instant Action</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickCommands.map((cmd, idx) => {
                  const IconComp = cmd.icon
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onExecuteCommand(cmd.text)}
                      className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        highContrast
                          ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400 text-zinc-200'
                          : 'bg-slate-800/80 border-slate-700 hover:border-sky-400 hover:bg-slate-800 text-slate-200'
                      }`}
                      title={cmd.desc}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-[11px] text-sky-400 mb-1">
                        <IconComp className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">"{cmd.text}"</span>
                      </div>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {cmd.desc}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mic Toggle Action in HUD */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onToggleListening}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isListening
                    ? highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                    : highContrast
                      ? 'bg-zinc-800 text-white border border-zinc-700 hover:border-yellow-400'
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Stop Listening</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Start Voice Control</span>
                  </>
                )}
              </button>
            </div>

            {/* Voice Help Dialog / Cheat-Sheet */}
            {showHelp && (
              <div className={`p-3 rounded-xl border text-[11px] space-y-1.5 animate-fade-in ${
                highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-slate-950 border-sky-500/40'
              }`}>
                <div className="font-bold text-sky-400 flex items-center justify-between">
                  <span>Supported Voice Vocabulary:</span>
                  <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-1 text-slate-300">
                  <li>&bull; <strong>"Filter magnetic shirts"</strong> &rarr; Catalog with magnetic filter</li>
                  <li>&bull; <strong>"Scan clothing"</strong> &rarr; Open AI Garment Scanner</li>
                  <li>&bull; <strong>"Request customization"</strong> &rarr; Open Tailor Request Portal</li>
                  <li>&bull; <strong>"Read accessibility score"</strong> &rarr; Speaks match score via TTS</li>
                  <li>&bull; <strong>"Go to profile"</strong> &rarr; Open Profile Builder</li>
                  <li>&bull; <strong>"Toggle high contrast"</strong> &rarr; Toggle WCAG AAA mode</li>
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}
