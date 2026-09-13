import React from 'react'
import { Check, CheckCircle2, ChevronRight, User, Scan, ShoppingBag, Scissors, Sparkles } from 'lucide-react'

export default function WizardStepper({ currentStep, setCurrentStep, highContrast }) {
  const steps = [
    { id: 1, label: '1. Profile', sublabel: 'Mobility & Needs', icon: User },
    { id: 2, label: '2. AI Scanner', sublabel: 'Feature Detection', icon: Scan },
    { id: 3, label: '3. Catalog', sublabel: 'Fit Simulator', icon: ShoppingBag },
    { id: 4, label: '4. Customization', sublabel: 'Local Tailor', icon: Scissors }
  ]

  // Calculate percentage: Step 1 = 25%, 2 = 50%, 3 = 75%, 4 = 100%
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / 3) * 100))

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-4 pb-2">
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-zinc-950 border-yellow-400 text-white' 
          : 'bg-white border-slate-200 shadow-sm text-slate-800'
      }`}>
        
        {/* Header summary info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800 border border-sky-200'
            }`}>
              Guided Wizard
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-bold">
              Step {currentStep} of 4: {steps.find(s => s.id === currentStep)?.sublabel || ''}
            </span>
          </div>

          <span className="text-xs font-extrabold text-sky-600 dark:text-yellow-400">
            {Math.round(progressPercent)}% Complete
          </span>
        </div>

        {/* Horizontal Progress Bar Track */}
        <div className="relative mb-4">
          <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                highContrast ? 'bg-yellow-400' : 'bg-gradient-to-r from-sky-500 to-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Interactive Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3" role="tablist" aria-label="Guided Wizard Steps">
          {steps.map((step) => {
            const isCurrent = currentStep === step.id
            const isCompleted = currentStep > step.id
            const Icon = step.icon

            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl text-left transition-all border min-h-[48px] focus:ring-4 ${
                  isCurrent
                    ? highContrast
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md'
                      : 'bg-sky-50 border-sky-300 text-sky-900 ring-2 ring-sky-200 font-extrabold shadow-sm'
                    : isCompleted
                      ? highContrast
                        ? 'bg-zinc-900 text-yellow-300 border-zinc-700 hover:bg-zinc-800'
                        : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                      : highContrast
                        ? 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {/* Step Circle Indicator */}
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                  isCurrent
                    ? highContrast ? 'bg-black text-yellow-400' : 'bg-sky-600 text-white'
                    : isCompleted
                      ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                      : highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </span>

                <div className="min-w-0">
                  <div className="text-xs font-extrabold truncate">
                    {step.label}
                  </div>
                  <div className={`text-[10px] truncate ${
                    isCurrent 
                      ? highContrast ? 'text-black/80' : 'text-sky-700' 
                      : isCompleted
                        ? highContrast ? 'text-zinc-400' : 'text-emerald-700'
                        : 'text-slate-400'
                  }`}>
                    {step.sublabel}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}
