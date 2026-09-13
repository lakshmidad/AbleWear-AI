import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Accessibility, 
  Activity, 
  Bed, 
  Hand, 
  Zap, 
  Magnet, 
  SlidersHorizontal, 
  Tag, 
  Scissors, 
  CheckCircle2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  Save,
  RotateCcw,
  Sparkle
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function ProfileBuilder() {
  const { 
    userProfile, 
    setUserProfile, 
    setCurrentStep, 
    highContrast,
    speak 
  } = useAccessibility()

  const [savedFeedback, setSavedFeedback] = useState(false)

  // 1. Mobility Needs Radio Group Options
  const mobilityOptions = [
    {
      id: 'Wheelchair / Seated Posture',
      label: 'Wheelchair / Seated Posture',
      badge: 'Seated Ergonomics',
      desc: 'Extended rear waistband rise, zero back pocket friction, and reduced pelvic lap bunching.',
      icon: Accessibility
    },
    {
      id: 'Crutches / Walker',
      label: 'Crutches / Walker',
      badge: 'Reinforced Underarms',
      desc: 'Reinforced high-wear underarm seams, abrasion-resistant side panels, and easy-reach utility pockets.',
      icon: Activity
    },
    {
      id: 'Bed-bound / Limited Range',
      label: 'Bed-bound / Limited Range',
      badge: 'Zero-Lift Dressing',
      desc: 'Full-back overlap breakaway closures, seamless rear surfaces, and friction-free bamboo fabric.',
      icon: Bed
    }
  ]

  // 2. Dexterity Requirements Checkbox Grid Options
  const dexterityOptions = [
    {
      id: 'Fine Motor Difficulty',
      label: 'Fine Motor Difficulty',
      desc: 'Difficulty pinching traditional shirt buttons or miniature cuff clasps.',
      icon: Hand
    },
    {
      id: 'Reduced Hand Strength',
      label: 'Reduced Hand Strength',
      desc: 'Low grip strength; requires loop-assisted ring pull tabs and light pressure closures.',
      icon: Zap
    },
    {
      id: 'Single-Hand Operation Only',
      label: 'Single-Hand Operation Only',
      desc: 'Fasteners that self-align and lock with one-handed downward or lateral contact.',
      icon: Hand
    },
    {
      id: 'Tremors',
      label: 'Tremors',
      desc: 'Magnetic self-guiding plackets and wide openings that do not require exact alignment.',
      icon: Activity
    }
  ]

  // 3. Preferred Closure Mechanisms (Multi-Select Tags)
  const closureOptions = [
    'Magnetic Snaps',
    'Easy-Pull Side Zippers',
    'Heavy-Duty Velcro',
    'Elastic Waistband',
    'Hook-and-Loop'
  ]

  // 4. Sensory Comfort (Multi-Select Tags)
  const sensoryOptions = [
    'Tagless Inner Collar',
    'Flat-Felled Soft Seams',
    'Wide Neck Opening',
    'Non-Restrictive Armholes'
  ]

  // Handlers
  const handleMobilitySelect = (id) => {
    setUserProfile(prev => ({ ...prev, mobility: id }))
  }

  const handleDexterityToggle = (id) => {
    setUserProfile(prev => {
      const exists = prev.dexterity?.includes(id)
      const updated = exists 
        ? prev.dexterity.filter(item => item !== id)
        : [...(prev.dexterity || []), id]
      return { ...prev, dexterity: updated }
    })
  }

  const handleClosureToggle = (closure) => {
    setUserProfile(prev => {
      const exists = prev.closures?.includes(closure)
      const updated = exists 
        ? prev.closures.filter(c => c !== closure)
        : [...(prev.closures || []), closure]
      return { ...prev, closures: updated }
    })
  }

  const handleSensoryToggle = (sensoryItem) => {
    setUserProfile(prev => {
      const exists = prev.sensory?.includes(sensoryItem)
      const updated = exists 
        ? prev.sensory.filter(s => s !== sensoryItem)
        : [...(prev.sensory || []), sensoryItem]
      return { ...prev, sensory: updated }
    })
  }

  const handleSaveAndContinue = () => {
    setSavedFeedback(true)
    speak('Accessibility profile saved. Continuing to AI Garment Scanner.')
    setTimeout(() => {
      setCurrentStep(2)
    }, 450)
  }

  const handleResetDefaults = () => {
    setUserProfile({
      mobility: 'Wheelchair / Seated Posture',
      dexterity: ['Fine Motor Difficulty', 'Reduced Hand Strength'],
      closures: ['Magnetic Snaps', 'Easy-Pull Side Zippers'],
      sensory: ['Tagless Inner Collar', 'Flat-Felled Soft Seams']
    })
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl mb-8 border transition-all ${
        highContrast 
          ? 'bg-zinc-900 border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Step 1 of 4: Profile Configuration
              </span>
              <span className="text-xs text-sky-200/80">WCAG 2.1 AA Compliant Form</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
              Accessibility Profile Builder
            </h1>
            <p className="mt-2 text-sm sm:text-base text-sky-100 max-w-2xl leading-relaxed">
              Configure your specific mobility, dexterity, fastener, and tactile sensory preferences. Our computer vision AI uses this profile to calculate personalized functional fit scores.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleResetDefaults}
              aria-label="Reset to recommended defaults"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border min-h-[48px] transition-colors focus:ring-4 focus:ring-sky-400 ${
                highContrast 
                  ? 'border-zinc-700 bg-zinc-800 text-yellow-300 hover:bg-zinc-700' 
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              <RotateCcw className="w-4 h-4" /> Reset Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <div className="space-y-10">
        
        {/* SECTION 1: Mobility Needs */}
        <section aria-labelledby="mobility-heading" className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="mobility-heading" className="text-lg sm:text-xl font-black font-heading flex items-center gap-2.5">
                <Accessibility className={highContrast ? 'text-yellow-400' : 'text-sky-600'} />
                1. Mobility Needs (Posture & Ergonomics)
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                Select your primary daily posture to calculate proper front-to-back fabric balance.
              </p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800'
            }`}>
              Required
            </span>
          </div>

          <div role="radiogroup" aria-label="Mobility Needs" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {mobilityOptions.map(option => {
              const isSelected = userProfile.mobility === option.id
              const IconComp = option.icon

              return (
                <div
                  key={option.id}
                  onClick={() => handleMobilitySelect(option.id)}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleMobilitySelect(option.id) }}
                  className={`p-5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between min-h-[140px] focus:outline-none focus:ring-4 focus:ring-sky-400 ${
                    isSelected
                      ? highContrast
                        ? 'bg-zinc-900 border-yellow-400 ring-4 ring-yellow-400/40 text-white'
                        : 'bg-sky-50/80 border-sky-600 ring-4 ring-sky-100 text-slate-900 shadow-md'
                      : highContrast
                        ? 'bg-zinc-900/60 border-zinc-700 hover:border-yellow-400/60 text-zinc-300'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${
                        isSelected 
                          ? highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white'
                          : highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-200 text-slate-600'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? highContrast ? 'border-yellow-400 bg-yellow-400' : 'border-sky-600 bg-sky-600'
                          : highContrast ? 'border-zinc-600' : 'border-slate-400'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="font-black text-sm sm:text-base leading-snug">{option.label}</div>
                    <span className={`inline-block text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                      isSelected 
                        ? highContrast ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/40' : 'bg-sky-200/60 text-sky-900'
                        : highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {option.badge}
                    </span>
                  </div>
                  <p className={`text-xs mt-3 leading-relaxed ${
                    highContrast ? 'text-zinc-300' : 'text-slate-600'
                  }`}>
                    {option.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 2: Dexterity Requirements */}
        <section aria-labelledby="dexterity-heading" className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="mb-4">
            <h2 id="dexterity-heading" className="text-lg sm:text-xl font-black font-heading flex items-center gap-2.5">
              <Hand className={highContrast ? 'text-yellow-400' : 'text-sky-600'} />
              2. Dexterity Requirements (Hand & Finger Mobility)
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
              Check all that apply. This filters garments for magnetic snaps, loop pulls, and non-pinching hardware.
            </p>
          </div>

          <div role="group" aria-label="Dexterity Requirements" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {dexterityOptions.map(option => {
              const isChecked = userProfile.dexterity?.includes(option.id)
              const IconComp = option.icon

              return (
                <div
                  key={option.id}
                  onClick={() => handleDexterityToggle(option.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleDexterityToggle(option.id) }}
                  className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-start gap-3.5 min-h-[56px] focus:outline-none focus:ring-4 focus:ring-sky-400 ${
                    isChecked
                      ? highContrast
                        ? 'bg-zinc-900 border-yellow-400 ring-2 ring-yellow-400/40 text-white'
                        : 'bg-sky-50/70 border-sky-600 ring-2 ring-sky-200 text-slate-900'
                      : highContrast
                        ? 'bg-zinc-900/60 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? highContrast ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-sky-600 border-sky-600 text-white'
                      : highContrast ? 'border-zinc-600 bg-zinc-800' : 'border-slate-400 bg-white'
                  }`}>
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-sky-500" />
                      {option.label}
                    </div>
                    <p className={`text-xs mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                      {option.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 3: Preferred Closure Mechanisms */}
        <section aria-labelledby="closures-heading" className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="mb-4">
            <h2 id="closures-heading" className="text-lg sm:text-xl font-black font-heading flex items-center gap-2.5">
              <Magnet className={highContrast ? 'text-yellow-400' : 'text-sky-600'} />
              3. Preferred Closure Mechanisms (Fasteners)
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
              Multi-select tags. We match clothes built with these intuitive fasteners.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label="Preferred Closure Mechanisms">
            {closureOptions.map(closure => {
              const isSelected = userProfile.closures?.includes(closure)

              return (
                <button
                  key={closure}
                  type="button"
                  onClick={() => handleClosureToggle(closure)}
                  aria-pressed={isSelected}
                  className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all min-h-[48px] focus:ring-4 focus:ring-sky-400 ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black font-black ring-4 ring-yellow-400/50'
                        : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-300'
                      : highContrast
                        ? 'bg-zinc-900 text-zinc-200 border-2 border-zinc-700 hover:border-yellow-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? highContrast ? 'border-black bg-black text-yellow-400' : 'border-white bg-white text-indigo-700'
                      : highContrast ? 'border-zinc-500' : 'border-slate-400'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  {closure}
                </button>
              )
            })}
          </div>
        </section>

        {/* SECTION 4: Sensory Comfort */}
        <section aria-labelledby="sensory-heading" className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="mb-4">
            <h2 id="sensory-heading" className="text-lg sm:text-xl font-black font-heading flex items-center gap-2.5">
              <Tag className={highContrast ? 'text-yellow-400' : 'text-sky-600'} />
              4. Sensory Comfort & Tactile Sensitivity
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
              Multi-select tags for neurodivergent sensory relief and skin tissue protection.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label="Sensory Comfort Options">
            {sensoryOptions.map(sensory => {
              const isSelected = userProfile.sensory?.includes(sensory)

              return (
                <button
                  key={sensory}
                  type="button"
                  onClick={() => handleSensoryToggle(sensory)}
                  aria-pressed={isSelected}
                  className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all min-h-[48px] focus:ring-4 focus:ring-sky-400 ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black font-black ring-4 ring-yellow-400/50'
                        : 'bg-teal-700 text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-300'
                      : highContrast
                        ? 'bg-zinc-900 text-zinc-200 border-2 border-zinc-700 hover:border-yellow-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? highContrast ? 'border-black bg-black text-yellow-400' : 'border-white bg-white text-teal-800'
                      : highContrast ? 'border-zinc-500' : 'border-slate-400'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  {sensory}
                </button>
              )
            })}
          </div>
        </section>

        {/* Action Bar */}
        <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
          highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-slate-900 text-white shadow-xl'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-500 text-white'
            }`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm">Profile Configured</div>
              <div className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-300'}`}>
                {userProfile.mobility} • {userProfile.dexterity?.length || 0} dexterity rules • {userProfile.closures?.length || 0} closures
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveAndContinue}
            id="save-profile-btn"
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all min-h-[52px] shadow-lg focus:ring-4 focus:ring-yellow-400 ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-4 ring-yellow-400/40'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white'
            }`}
          >
            <span>Save Profile & Continue to AI Scanner</span>
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </button>
        </div>

      </div>
    </div>
  )
}
