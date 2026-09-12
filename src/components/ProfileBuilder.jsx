import React, { useState } from 'react'
import { 
  Accessibility, 
  Hand, 
  Zap, 
  Magnet, 
  Layers, 
  Tag, 
  Scissors, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Save, 
  SlidersHorizontal,
  Activity,
  HeartPulse,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'

export default function ProfileBuilder({ highContrast, largeText }) {
  // Profile State
  const [profile, setProfile] = useState({
    mobility: 'Wheelchair/Seated', // Wheelchair/Seated, Crutches, Bed-bound
    dexterity: ['Fine motor difficulty'], // Fine motor difficulty, Limited hand strength
    fasteners: ['Magnetic snaps', 'Side zippers'], // Magnetic snaps, Side zippers, Velcro, Elastic waist
    sensory: ['Tagless', 'Flat seams'] // Tagless, Flat seams
  })

  // Visual Confirmation State
  const [lastUpdatedField, setLastUpdatedField] = useState(null)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [saveTimestamp, setSaveTimestamp] = useState(null)

  // Options Definitions
  const mobilityOptions = [
    {
      id: 'Wheelchair/Seated',
      title: 'Wheelchair / Seated',
      badge: 'Ergonomic Seated Cut',
      desc: 'Optimized for prolonged sitting: higher back rise, reduced front bunching, and knee-friendly tailoring.',
      icon: Accessibility
    },
    {
      id: 'Crutches',
      title: 'Crutches',
      badge: 'Reinforced Underarms',
      desc: 'Reinforced underarm seam points, non-slip friction zones, and easy-reach accessible pockets.',
      icon: Activity
    },
    {
      id: 'Bed-bound',
      title: 'Bed-bound',
      badge: 'Zero-Pressure Design',
      desc: 'Full-back snap openings, breathable pressure-relief fabrics, and zero rear buttons or zippers.',
      icon: HeartPulse
    }
  ]

  const dexterityOptions = [
    {
      id: 'Fine motor difficulty',
      title: 'Fine motor difficulty',
      desc: 'Replaces tiny buttons and tricky clasps with effortless guided closure systems.',
      icon: Hand
    },
    {
      id: 'Limited hand strength',
      title: 'Limited hand strength',
      desc: 'Features loop-assisted pulls, low-resistance slide fasteners, and one-touch closures.',
      icon: Zap
    }
  ]

  const fastenerOptions = [
    {
      id: 'Magnetic snaps',
      title: 'Magnetic snaps',
      desc: 'Snap together automatically with minimal guidance; ideal for quick independent dressing.',
      icon: Magnet
    },
    {
      id: 'Side zippers',
      title: 'Side zippers',
      desc: 'Discreet side-seam zippers that allow wide openings without twisting or lifting arms.',
      icon: SlidersHorizontal
    },
    {
      id: 'Velcro',
      title: 'Velcro',
      desc: 'Soft-touch micro-Velcro with pull tabs that close securely with a gentle press.',
      icon: Layers
    },
    {
      id: 'Elastic waist',
      title: 'Elastic waist',
      desc: 'Stretchable soft waistband providing comfort, easy pulling on, and no restrictive belt loops.',
      icon: Sparkles
    }
  ]

  const sensoryOptions = [
    {
      id: 'Tagless',
      title: 'Tagless',
      desc: 'Direct-printed care and size labels instead of abrasive, itchy woven tags.',
      icon: Tag
    },
    {
      id: 'Flat seams',
      title: 'Flat seams',
      desc: 'Ultra-flat overlock stitching preventing friction points, chafing, and skin irritation.',
      icon: Scissors
    }
  ]

  // Handlers
  const handleMobilitySelect = (id) => {
    setProfile(prev => ({ ...prev, mobility: id }))
    triggerInstantFeedback(`Mobility updated to ${id}`)
  }

  const toggleDexterity = (id) => {
    setProfile(prev => {
      const exists = prev.dexterity.includes(id)
      const updated = exists 
        ? prev.dexterity.filter(item => item !== id)
        : [...prev.dexterity, id]
      return { ...prev, dexterity: updated }
    })
    triggerInstantFeedback(`Dexterity preferences updated`)
  }

  const toggleFastener = (id) => {
    setProfile(prev => {
      const exists = prev.fasteners.includes(id)
      const updated = exists 
        ? prev.fasteners.filter(item => item !== id)
        : [...prev.fasteners, id]
      return { ...prev, fasteners: updated }
    })
    triggerInstantFeedback(`Fastener preferences updated`)
  }

  const toggleSensory = (id) => {
    setProfile(prev => {
      const exists = prev.sensory.includes(id)
      const updated = exists 
        ? prev.sensory.filter(item => item !== id)
        : [...prev.sensory, id]
      return { ...prev, sensory: updated }
    })
    triggerInstantFeedback(`Sensory needs updated`)
  }

  const triggerInstantFeedback = (msg) => {
    setLastUpdatedField(msg)
    setSavedSuccess(false)
    setTimeout(() => {
      setLastUpdatedField(null)
    }, 2800)
  }

  const handleSaveProfile = (e) => {
    e?.preventDefault()
    setSavedSuccess(true)
    setSaveTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
  }

  const handleReset = () => {
    setProfile({
      mobility: '',
      dexterity: [],
      fasteners: [],
      sensory: []
    })
    setSavedSuccess(false)
    triggerInstantFeedback('Profile reset to blank')
  }

  const handleQuickPreset = () => {
    setProfile({
      mobility: 'Wheelchair/Seated',
      dexterity: ['Fine motor difficulty', 'Limited hand strength'],
      fasteners: ['Magnetic snaps', 'Side zippers', 'Velcro'],
      sensory: ['Tagless', 'Flat seams']
    })
    setSavedSuccess(true)
    setSaveTimestamp(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
  }

  // Calculate completeness score
  const completeness = (
    (profile.mobility ? 25 : 0) +
    (profile.dexterity.length > 0 ? 25 : 0) +
    (profile.fasteners.length > 0 ? 25 : 0) +
    (profile.sensory.length > 0 ? 25 : 0)
  )

  return (
    <div className={`space-y-10 ${largeText ? 'text-lg' : 'text-base'}`}>
      {/* Intro Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white shadow-xl shadow-sky-900/10'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-sky-500/20 text-sky-200 border-sky-400/40">
            <Sparkles className="w-3.5 h-3.5" /> Feature 1: Core Foundation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
            Accessibility Profile Builder
          </h1>
          <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
            Configure your personalized adaptive preferences. Our AI will automatically align garment patterns, 
            fastener selections, and seam ergonomics to match your exact physical needs.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleQuickPreset}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all min-h-[44px] ${
                highContrast 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                  : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Load Recommended Adaptive Preset
            </button>
            <button
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all min-h-[44px] border ${
                highContrast 
                  ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-900' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <RotateCcw className="w-4 h-4" /> Reset Form
            </button>
          </div>
        </div>
      </div>

      {/* Floating Instant Feedback Banner */}
      {lastUpdatedField && (
        <div 
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all animate-bounce ${
            highContrast 
              ? 'bg-yellow-400 text-black font-black border-white' 
              : 'bg-slate-900 text-white border-sky-500/40'
          }`}
        >
          <Sparkles className="w-5 h-5 text-sky-400 animate-spin" />
          <span className="text-sm font-bold">
            {lastUpdatedField} &bull; <span className="opacity-80">Saved to React state</span>
          </span>
        </div>
      )}

      {/* Main Form + Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Questionnaire */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SECTION 1: MOBILITY TYPE */}
          <section className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-1">
                  Step 1 of 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
                  <Accessibility className="w-6 h-6 text-sky-500" />
                  Mobility Type
                </h2>
                <p className={`text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Choose your primary mobility need so our pattern cuts conform comfortably to your posture.
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                profile.mobility 
                  ? highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {profile.mobility ? 'Selected' : 'Required'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {mobilityOptions.map((opt) => {
                const isSelected = profile.mobility === opt.id
                const IconComponent = opt.icon
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleMobilitySelect(opt.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all relative flex flex-col justify-between min-h-[140px] ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400 shadow-lg'
                          : 'bg-sky-50/80 border-sky-600 text-slate-900 shadow-md ring-2 ring-sky-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-700 text-zinc-300 hover:border-yellow-400/70 hover:bg-zinc-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-lg ${
                          isSelected 
                            ? highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white'
                            : highContrast ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? highContrast ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-base mb-1 font-heading">{opt.title}</h3>
                      <p className={`text-xs leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                        {opt.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-dashed border-slate-200/50">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSelected 
                          ? highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-200/70 text-sky-900'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* SECTION 2: DEXTERITY NEEDS */}
          <section className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-1">
                  Step 2 of 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
                  <Hand className="w-6 h-6 text-indigo-500" />
                  Dexterity Needs
                </h2>
                <p className={`text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Select any hand movement or grip considerations (choose all that apply).
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                profile.dexterity.length > 0 
                  ? highContrast ? 'bg-yellow-400 text-black' : 'bg-indigo-100 text-indigo-800'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {profile.dexterity.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {dexterityOptions.map((opt) => {
                const isSelected = profile.dexterity.includes(opt.id)
                const IconComponent = opt.icon
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleDexterity(opt.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all relative flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400 shadow-lg'
                          : 'bg-indigo-50/80 border-indigo-600 text-slate-900 shadow-md ring-2 ring-indigo-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-700 text-zinc-300 hover:border-yellow-400/70 hover:bg-zinc-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-lg ${
                          isSelected 
                            ? highContrast ? 'bg-yellow-400 text-black' : 'bg-indigo-600 text-white'
                            : highContrast ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? highContrast ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-base mb-1 font-heading">{opt.title}</h3>
                      <p className={`text-xs leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* SECTION 3: FASTENER PREFERENCES */}
          <section className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-1">
                  Step 3 of 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
                  <Magnet className="w-6 h-6 text-emerald-500" />
                  Fastener Preferences
                </h2>
                <p className={`text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Indicate which closure mechanisms are easiest and most intuitive for you to use.
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                profile.fasteners.length > 0 
                  ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {profile.fasteners.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {fastenerOptions.map((opt) => {
                const isSelected = profile.fasteners.includes(opt.id)
                const IconComponent = opt.icon
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleFastener(opt.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all relative flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400 shadow-lg'
                          : 'bg-emerald-50/80 border-emerald-600 text-slate-900 shadow-md ring-2 ring-emerald-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-700 text-zinc-300 hover:border-yellow-400/70 hover:bg-zinc-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-lg ${
                          isSelected 
                            ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                            : highContrast ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? highContrast ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-base mb-1 font-heading">{opt.title}</h3>
                      <p className={`text-xs leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* SECTION 4: SENSORY NEEDS */}
          <section className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-1">
                  Step 4 of 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
                  <Scissors className="w-6 h-6 text-rose-500" />
                  Sensory Needs
                </h2>
                <p className={`text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Ensure tactile comfort and eliminate scratchy friction or irritating inner elements.
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                profile.sensory.length > 0 
                  ? highContrast ? 'bg-yellow-400 text-black' : 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {profile.sensory.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {sensoryOptions.map((opt) => {
                const isSelected = profile.sensory.includes(opt.id)
                const IconComponent = opt.icon
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleSensory(opt.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all relative flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400 shadow-lg'
                          : 'bg-rose-50/80 border-rose-600 text-slate-900 shadow-md ring-2 ring-rose-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-700 text-zinc-300 hover:border-yellow-400/70 hover:bg-zinc-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-lg ${
                          isSelected 
                            ? highContrast ? 'bg-yellow-400 text-black' : 'bg-rose-600 text-white'
                            : highContrast ? 'bg-zinc-800 text-zinc-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                          isSelected
                            ? highContrast ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-rose-600 bg-rose-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-base mb-1 font-heading">{opt.title}</h3>
                      <p className={`text-xs leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Action Trigger / Save Profile */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleSaveProfile}
              id="save-profile-button"
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-black text-base flex items-center justify-center gap-3 transition-all min-h-[50px] shadow-lg ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-4 ring-yellow-400/40'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
              }`}
            >
              <Save className="w-5 h-5" />
              Save & Lock In Accessibility Profile
            </button>
            <span className={`text-xs ${highContrast ? 'text-zinc-400' : 'text-slate-500'} flex items-center gap-1.5`}>
              <Info className="w-4 h-4" /> Changes update live in React state
            </span>
          </div>

        </div>

        {/* Right Column: Live Adaptive Profile Summary Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white ring-2 ring-yellow-400/30' 
              : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-700'}`}>
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg font-heading">Adaptive Summary</h3>
                  <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>Live React Profile State</p>
                </div>
              </div>
              <div className={`text-xs px-2.5 py-1 rounded-full font-black ${
                completeness === 100 
                  ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {completeness}% Complete
              </div>
            </div>

            {/* Instant Confirmation Alert if Saved */}
            {savedSuccess && (
              <div 
                id="saved-confirmation-alert"
                className={`mt-4 p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  highContrast 
                    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  highContrast ? 'text-yellow-400' : 'text-emerald-600'
                }`} />
                <div>
                  <div className="font-extrabold text-sm">Profile Saved Successfully!</div>
                  <div className="text-xs opacity-90 mt-0.5">
                    Locked at {saveTimestamp}. Ready for AI Garment Scanner (Step 2).
                  </div>
                </div>
              </div>
            )}

            {/* Active Preferences Breakdown */}
            <div className="space-y-4 mt-5">
              {/* Mobility Card */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Mobility Posture
                </label>
                {profile.mobility ? (
                  <div className={`p-3 rounded-lg border font-semibold text-sm flex items-center justify-between ${
                    highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-sky-50/70 border-sky-200 text-sky-900'
                  }`}>
                    <span>{profile.mobility}</span>
                    <Check className="w-4 h-4 text-sky-600" />
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs italic">
                    None selected
                  </div>
                )}
              </div>

              {/* Dexterity Needs */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Dexterity Needs ({profile.dexterity.length})
                </label>
                {profile.dexterity.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {profile.dexterity.map((item, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          highContrast ? 'bg-zinc-900 border border-yellow-400 text-yellow-300' : 'bg-indigo-50 border border-indigo-200 text-indigo-800'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs italic">
                    No dexterity limits specified
                  </div>
                )}
              </div>

              {/* Fastener Preferences */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Fasteners ({profile.fasteners.length})
                </label>
                {profile.fasteners.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {profile.fasteners.map((item, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          highContrast ? 'bg-zinc-900 border border-yellow-400 text-yellow-300' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs italic">
                    No fasteners chosen
                  </div>
                )}
              </div>

              {/* Sensory Needs */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Sensory Needs ({profile.sensory.length})
                </label>
                {profile.sensory.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {profile.sensory.map((item, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          highContrast ? 'bg-zinc-900 border border-yellow-400 text-yellow-300' : 'bg-rose-50 border border-rose-200 text-rose-800'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-300 text-slate-400 text-xs italic">
                    No sensory needs chosen
                  </div>
                )}
              </div>
            </div>

            {/* AI Recommendation Engine Note */}
            <div className={`mt-6 pt-5 border-t text-xs ${
              highContrast ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-500'
            }`}>
              <div className="flex items-center gap-1.5 font-bold mb-1 text-sky-600">
                <Sparkles className="w-3.5 h-3.5" /> Next Steps in Flow:
              </div>
              <p className="leading-relaxed">
                These settings directly inform the <strong>AI Garment Scanner</strong> (Step 2) and 
                <strong> Accessible Catalog Filters</strong> (Step 3).
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
