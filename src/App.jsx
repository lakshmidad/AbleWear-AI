import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import ProfileBuilder from './components/ProfileBuilder'
import GarmentScanner from './components/GarmentScanner'
import AdaptiveCatalog from './components/AdaptiveCatalog'
import CustomizationPortal from './components/CustomizationPortal'
import FitSimulator from './components/FitSimulator'
import TailorDispatchHub from './components/TailorDispatchHub'
import VoiceAssistantOverlay from './components/VoiceAssistantOverlay'
import Footer from './components/Footer'
import { Sliders, Sparkles, ShoppingBag, Scissors, ArrowRight, Scan, Activity, Truck } from 'lucide-react'

export default function App() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [currentStep, setCurrentStep] = useState(6) // Default to Step 6 so user directly sees Feature 7 output!
  const [preselectedGarment, setPreselectedGarment] = useState(null)
  const [catalogFilter, setCatalogFilter] = useState('All Items')

  // Voice Assistant State
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const [lastHeardTranscript, setLastHeardTranscript] = useState('')
  const [voiceFeedbackMessage, setVoiceFeedbackMessage] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef(null)

  // Centralized Accessibility Profile State across all Features
  const [profile, setProfile] = useState({
    mobility: 'Wheelchair/Seated',
    dexterity: ['Fine motor difficulty', 'Limited hand strength'],
    fasteners: ['Magnetic snaps', 'Side zippers', 'Velcro'],
    sensory: ['Tagless', 'Flat seams']
  })

  const steps = [
    { 
      id: 1, 
      name: 'Profile Builder', 
      available: true, 
      icon: Sliders, 
      desc: 'Set Adaptive Needs' 
    },
    { 
      id: 2, 
      name: 'AI Garment Scanner', 
      available: true, 
      icon: Scan, 
      desc: 'CV Feature Detection & Match' 
    },
    { 
      id: 3, 
      name: 'Adaptive Catalog', 
      available: true, 
      icon: ShoppingBag, 
      desc: '6 Items with Functional Filters' 
    },
    { 
      id: 4, 
      name: 'Tailor Customization', 
      available: true, 
      icon: Scissors, 
      desc: 'Alteration Portal & Community' 
    },
    { 
      id: 5, 
      name: '3D Fit Simulator', 
      available: true, 
      icon: Activity, 
      desc: 'Seated vs Standing Posture' 
    },
    { 
      id: 6, 
      name: 'Tailor Hub', 
      available: true, 
      icon: Truck, 
      desc: 'Smart Local Dispatch Network' 
    }
  ]

  // Text-To-Speech (SpeechSynthesis)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.98
        utterance.pitch = 1.0
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
      } catch (err) {
        console.warn('Speech synthesis error:', err)
        setIsSpeaking(false)
      }
    }
  }

  // Voice Command Dispatcher
  const executeVoiceCommand = (rawText) => {
    const text = (rawText || '').toLowerCase().trim()
    setLastHeardTranscript(rawText)

    // 1. "Filter magnetic shirts" / "magnetic closures"
    if (
      text.includes('filter magnetic') || 
      text.includes('magnetic shirts') || 
      text.includes('magnetic closures') ||
      text.includes('magnetic')
    ) {
      setCurrentStep(3)
      setCatalogFilter('Magnetic Closures')
      setVoiceFeedbackMessage('Applied "Magnetic Closures" catalog filter.')
      speak('Filtering catalog to magnetic closure garments.')
      return
    }

    // 2. "Scan clothing" / "ai scanner"
    if (
      text.includes('scan clothing') || 
      text.includes('scan garment') || 
      text.includes('ai scanner') || 
      text.includes('scanner') ||
      text.includes('scan')
    ) {
      setCurrentStep(2)
      setVoiceFeedbackMessage('Opened AI Garment Scanner.')
      speak('Opening AI Garment Scanner and computer vision analyzer.')
      return
    }

    // 3. "Request customization" / "tailor"
    if (
      text.includes('request customization') || 
      text.includes('customization') || 
      text.includes('modification') ||
      text.includes('alteration')
    ) {
      setCurrentStep(4)
      setVoiceFeedbackMessage('Opened Tailor Customization Portal.')
      speak('Opening tailor customization and alteration request portal.')
      return
    }

    // 4. "Read accessibility score" / "match score"
    if (
      text.includes('read accessibility score') || 
      text.includes('accessibility score') || 
      text.includes('read score') || 
      text.includes('match score') ||
      text.includes('what is my score')
    ) {
      setVoiceFeedbackMessage('Speaking accessibility match score...')
      speak(
        'Your Functional Accessibility Match Score is 94 percent. Detected features include magnetic snap closures, tagless interior collar, and flat soft seams, which fully satisfy your active mobility profile.'
      )
      return
    }

    // 5. "Fit Simulator" / "Seated Simulator"
    if (
      text.includes('fit simulator') || 
      text.includes('seated simulator') || 
      text.includes('posture simulator') || 
      text.includes('posture') ||
      text.includes('seated fit')
    ) {
      setCurrentStep(5)
      setVoiceFeedbackMessage('Opened 3D Posture Fit Simulator.')
      speak('Opening 3D seated versus standing body posture simulator.')
      return
    }

    // 6. "Tailor Hub" / "Local Tailors" / "Tailor Dispatch"
    if (
      text.includes('tailor hub') || 
      text.includes('local tailors') || 
      text.includes('tailor dispatch') || 
      text.includes('dispatch') ||
      text.includes('routing network')
    ) {
      setCurrentStep(6)
      setVoiceFeedbackMessage('Opened Smart Local Tailor Dispatch Hub.')
      speak('Opening smart local adaptive tailor routing network and dispatch hub.')
      return
    }

    // Helper: "Go to Profile"
    if (text.includes('profile') || text.includes('accessibility profile') || text.includes('step 1')) {
      setCurrentStep(1)
      setVoiceFeedbackMessage('Navigated to Accessibility Profile Builder.')
      speak('Opening Accessibility Profile Builder.')
      return
    }

    // Helper: "High Contrast"
    if (text.includes('contrast') || text.includes('high contrast')) {
      setHighContrast(prev => {
        const next = !prev
        speak(next ? 'High contrast accessibility mode activated.' : 'Default color mode activated.')
        return next
      })
      setVoiceFeedbackMessage('Toggled High Contrast Mode.')
      return
    }

    // Helper: "All Items" / "Reset Filter"
    if (text.includes('all items') || text.includes('reset filter') || text.includes('clear filter')) {
      setCurrentStep(3)
      setCatalogFilter('All Items')
      setVoiceFeedbackMessage('Reset catalog to All Items.')
      speak('Showing all adaptive clothing items.')
      return
    }

    // Unrecognized Command
    setVoiceFeedbackMessage(`Recognized: "${rawText}". Say "Help" for options.`)
  }

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        executeVoiceCommand(transcript)
      }

      recognition.onerror = (event) => {
        console.warn('Speech recognition event error:', event.error)
        if (event.error === 'not-allowed') {
          setVoiceFeedbackMessage('Microphone permission blocked. Use click shortcuts on HUD.')
          setIsVoiceListening(false)
        }
      }

      recognition.onend = () => {
        if (isVoiceListening) {
          try {
            recognition.start()
          } catch (e) {}
        }
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {}
      }
    }
  }, [isVoiceListening])

  // Toggle Voice Listening State
  const handleToggleListening = () => {
    if (isVoiceListening) {
      setIsVoiceListening(false)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {}
      }
      setVoiceFeedbackMessage('Voice control paused.')
      speak('Voice recognition paused.')
    } else {
      setIsVoiceListening(true)
      setVoiceFeedbackMessage('Listening... Speak a command.')
      speak('Voice navigation enabled. Listening for your command.')
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
        } catch (e) {
          console.warn('Recognition start caught error:', e)
        }
      }
    }
  }

  const handleNavigateToCustomization = (garment) => {
    setPreselectedGarment(garment)
    setCurrentStep(4)
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast ? 'high-contrast bg-black text-white' : 'bg-slate-50 text-slate-900'
    } ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Accessible High-Contrast Navbar with Microphone Toggle */}
      <Navbar 
        highContrast={highContrast} 
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
        isListening={isVoiceListening}
        onToggleListening={handleToggleListening}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Prototype Stepper with Instant Switching across all Main Screens */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[980px] justify-between gap-3">
            {steps.map((step, idx) => {
              const IconComp = step.icon
              const isCurrent = currentStep === step.id
              const isClickable = step.available

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && setCurrentStep(step.id)}
                    className={`text-left flex items-center gap-3 p-3.5 rounded-xl border flex-1 transition-all ${
                      isCurrent
                        ? highContrast
                          ? 'bg-yellow-400 text-black border-white font-bold ring-4 ring-yellow-400/50'
                          : 'bg-white border-sky-500 shadow-md shadow-sky-500/15 ring-2 ring-sky-500/20'
                        : isClickable
                          ? highContrast
                            ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-yellow-400/50'
                            : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 shadow-sm'
                          : highContrast
                            ? 'bg-zinc-950 border-zinc-900 text-zinc-600 cursor-not-allowed opacity-50'
                            : 'bg-slate-100/60 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isCurrent
                        ? highContrast ? 'bg-black text-yellow-400' : 'bg-sky-600 text-white'
                        : isClickable
                          ? highContrast ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-100 text-slate-600'
                          : highContrast ? 'bg-zinc-900 text-zinc-700' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wider truncate flex items-center gap-1.5">
                        <span>Step {step.id}: {step.name}</span>
                        {isClickable && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                            isCurrent
                              ? highContrast ? 'bg-black text-yellow-400' : 'bg-sky-100 text-sky-800'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}>
                            Live
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-medium opacity-80 truncate">
                        {step.desc}
                      </div>
                    </div>
                  </button>
                  {idx < steps.length - 1 && (
                    <ArrowRight className={`w-4 h-4 mx-2 flex-shrink-0 ${
                      highContrast ? 'text-zinc-700' : 'text-slate-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Screen 1: Accessibility Profile Builder */}
        {currentStep === 1 && (
          <ProfileBuilder 
            profile={profile}
            setProfile={setProfile}
            highContrast={highContrast} 
            largeText={largeText}
            onProceedToScanner={() => setCurrentStep(2)}
          />
        )}

        {/* Screen 2: AI Garment Scanner & Analyzer */}
        {currentStep === 2 && (
          <GarmentScanner 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
            onNavigateToProfile={() => setCurrentStep(1)}
          />
        )}

        {/* Screen 3: Adaptive Clothing Catalog & Search Filters */}
        {currentStep === 3 && (
          <AdaptiveCatalog 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
            onNavigateToScanner={() => setCurrentStep(2)}
            onNavigateToCustomization={handleNavigateToCustomization}
            onNavigateToSimulator={() => setCurrentStep(5)}
            activeFilter={catalogFilter}
            onFilterChange={setCatalogFilter}
          />
        )}

        {/* Screen 4: Garment Customization Portal & Community Ratings */}
        {currentStep === 4 && (
          <CustomizationPortal 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
            preselectedGarment={preselectedGarment}
            onNavigateToCatalog={() => setCurrentStep(3)}
          />
        )}

        {/* Screen 5: 3D Seated vs. Standing Body Posture Simulator */}
        {currentStep === 5 && (
          <FitSimulator 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
            onNavigateToCustomization={handleNavigateToCustomization}
          />
        )}

        {/* Screen 6: Smart Local Adaptive Tailor Network (Tailor Hub) */}
        {currentStep === 6 && (
          <TailorDispatchHub 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
          />
        )}

      </main>

      {/* Visual Voice Assistant HUD Overlay at Bottom-Right */}
      <VoiceAssistantOverlay 
        isListening={isVoiceListening}
        onToggleListening={handleToggleListening}
        lastHeardTranscript={lastHeardTranscript}
        statusMessage={voiceFeedbackMessage}
        isSpeaking={isSpeaking}
        onExecuteCommand={executeVoiceCommand}
        highContrast={highContrast}
        largeText={largeText}
      />

      {/* Visible Footer on All Pages */}
      <Footer highContrast={highContrast} />

    </div>
  )
}
