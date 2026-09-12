import React, { useState } from 'react'
import Navbar from './components/Navbar'
import ProfileBuilder from './components/ProfileBuilder'
import GarmentScanner from './components/GarmentScanner'
import Footer from './components/Footer'
import { Sliders, Sparkles, ShoppingBag, Scissors, ArrowRight, Scan } from 'lucide-react'

export default function App() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [currentStep, setCurrentStep] = useState(2) // Default to 2 so user directly sees Feature 2 output!

  // Centralized Accessibility Profile State (Feature 1 -> Feature 2)
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
      available: false, 
      icon: ShoppingBag, 
      desc: 'Coming in Step 3' 
    },
    { 
      id: 4, 
      name: 'Tailor Request', 
      available: false, 
      icon: Scissors, 
      desc: 'Coming in Step 4' 
    }
  ]

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast ? 'high-contrast bg-black text-white' : 'bg-slate-50 text-slate-900'
    } ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Accessible Navbar */}
      <Navbar 
        highContrast={highContrast} 
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Prototype Interactive Stepper */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[640px] justify-between gap-3">
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

        {/* Dynamic View: Step 1 vs Step 2 */}
        {currentStep === 1 && (
          <ProfileBuilder 
            profile={profile}
            setProfile={setProfile}
            highContrast={highContrast} 
            largeText={largeText}
            onProceedToScanner={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <GarmentScanner 
            userProfile={profile}
            highContrast={highContrast}
            largeText={largeText}
            onNavigateToProfile={() => setCurrentStep(1)}
          />
        )}

      </main>

      {/* Accessible Footer */}
      <Footer highContrast={highContrast} />

    </div>
  )
}
