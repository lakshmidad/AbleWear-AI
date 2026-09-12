import React, { useState } from 'react'
import Navbar from './components/Navbar'
import ProfileBuilder from './components/ProfileBuilder'
import Footer from './components/Footer'
import { Sliders, Sparkles, ShoppingBag, Scissors, ArrowRight } from 'lucide-react'

export default function App() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)

  const steps = [
    { id: 1, name: 'Profile Builder', active: true, icon: Sliders, desc: 'Set Adaptive Needs' },
    { id: 2, name: 'AI Garment Scanner', active: false, icon: Sparkles, desc: 'Coming in Step 2' },
    { id: 3, name: 'Adaptive Catalog', active: false, icon: ShoppingBag, desc: 'Coming in Step 3' },
    { id: 4, name: 'Tailor Request', active: false, icon: Scissors, desc: 'Coming in Step 4' }
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
        
        {/* Prototype Progress Stepper */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[640px] justify-between gap-3">
            {steps.map((step, idx) => {
              const IconComp = step.icon
              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className={`flex items-center gap-3 p-3 rounded-xl border flex-1 transition-all ${
                    step.active
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-white font-bold ring-2 ring-yellow-400'
                        : 'bg-white border-sky-500 shadow-md shadow-sky-500/10'
                      : highContrast
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 opacity-60'
                        : 'bg-white/60 border-slate-200 text-slate-400 opacity-70'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      step.active
                        ? highContrast ? 'bg-black text-yellow-400' : 'bg-sky-600 text-white'
                        : highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">
                        Step {step.id}: {step.name}
                      </div>
                      <div className="text-[11px] font-medium opacity-80">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <ArrowRight className={`w-4 h-4 mx-2 flex-shrink-0 ${
                      highContrast ? 'text-zinc-600' : 'text-slate-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Accessibility Profile Builder (Feature 1) */}
        <ProfileBuilder 
          highContrast={highContrast} 
          largeText={largeText}
        />

      </main>

      {/* Accessible Footer */}
      <Footer highContrast={highContrast} />

    </div>
  )
}
