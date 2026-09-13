import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Magnet, 
  SlidersHorizontal, 
  Scissors, 
  Activity, 
  Tag, 
  Star, 
  Eye, 
  EyeOff,
  Check,
  Zap,
  Info
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import { CATALOG_ITEMS } from '../data/garmentData'

export default function AdaptiveCatalog() {
  const { 
    userProfile, 
    activeMatch, 
    setSelectedGarment, 
    setCurrentStep, 
    highContrast,
    speak 
  } = useAccessibility()

  // Category Filters requested: 'All Items', 'Magnetic Snaps', 'Seated Wheelchair Cut', 'Sensory Friendly'
  const filterTabs = [
    'All Items',
    'Magnetic Snaps',
    'Seated Wheelchair Cut',
    'Sensory Friendly'
  ]

  const [activeFilterTab, setActiveFilterTab] = useState('All Items')
  
  // Card-specific interactive Standing vs. Seated Fit Simulator toggle state
  const [cardFitPose, setCardFitPose] = useState({
    'cat-1': 'seated',
    'cat-2': 'seated',
    'cat-3': 'seated',
    'cat-4': 'seated',
    'cat-5': 'seated',
    'cat-6': 'seated'
  })

  // Dynamically rank catalog items based on Accessibility Match Score from Step 2 and user profile
  const scoredCatalog = useMemo(() => {
    return CATALOG_ITEMS.map(item => {
      let liveScore = item.accessibilityScore

      // Boost if user mobility matches seated cut
      if (userProfile.mobility?.includes('Wheelchair') && item.category?.includes('Seated')) {
        liveScore = Math.min(99, liveScore + 2)
      }
      // Boost if dexterity matches magnetic
      if (userProfile.dexterity?.some(d => d.includes('Fine Motor') || d.includes('Single-Hand')) && item.mechanisms?.some(m => m.includes('Magnetic'))) {
        liveScore = Math.min(99, liveScore + 3)
      }
      // Boost if sensory needs match
      if (userProfile.sensory?.includes('Tagless Inner Collar') && item.mechanisms?.some(m => m.includes('Tagless'))) {
        liveScore = Math.min(99, liveScore + 2)
      }

      return {
        ...item,
        liveScore
      }
    }).sort((a, b) => b.liveScore - a.liveScore) // Real-time rank by match score
  }, [userProfile, activeMatch])

  // Category Filters
  const filteredItems = useMemo(() => {
    if (activeFilterTab === 'All Items') return scoredCatalog
    if (activeFilterTab === 'Magnetic Snaps') {
      return scoredCatalog.filter(item => 
        item.mechanisms.some(m => m.toLowerCase().includes('magnetic')) ||
        item.category.toLowerCase().includes('magnetic') ||
        item.filterTag === 'magnetic'
      )
    }
    if (activeFilterTab === 'Seated Wheelchair Cut') {
      return scoredCatalog.filter(item => 
        item.mechanisms.some(m => m.toLowerCase().includes('seated') || m.toLowerCase().includes('rear rise')) ||
        item.category.toLowerCase().includes('seated') ||
        item.filterTag === 'seated'
      )
    }
    if (activeFilterTab === 'Sensory Friendly') {
      return scoredCatalog.filter(item => 
        item.mechanisms.some(m => m.toLowerCase().includes('tagless') || m.toLowerCase().includes('seams')) ||
        item.category.toLowerCase().includes('sensory') ||
        item.filterTag === 'sensory'
      )
    }
    return scoredCatalog
  }, [scoredCatalog, activeFilterTab])

  // Toggle pose for an individual card
  const toggleCardPose = (itemId, pose) => {
    setCardFitPose(prev => ({ ...prev, [itemId]: pose }))
    speak(`Simulating ${pose === 'seated' ? 'Seated Wheelchair Pose' : 'Standing Upright Pose'} on garment.`)
  }

  // Card Selection: pre-select item and auto-advance to Step 4 (Customization & Tailor Request)
  const handleSelectGarment = (garment) => {
    setSelectedGarment(garment)
    speak(`Selected ${garment.name} with ${garment.liveScore} percent match. Advancing to Step 4: Customization and Tailor Request.`)
    setCurrentStep(4)
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl mb-8 border transition-all ${
        highContrast 
          ? 'bg-zinc-900 border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 text-white shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Step 3 of 4: Matched Garment Catalog
              </span>
              <span className="text-xs text-indigo-200/80">3D Seated vs. Standing Biomechanics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
              Personalized Matched Catalog & Fit Simulator
            </h1>
            <p className="mt-2 text-sm sm:text-base text-indigo-100 max-w-2xl leading-relaxed">
              Items dynamically filtered and ranked by your Step 2 Accessibility Match Score. Toggle the interactive Seated vs. Standing Fit Simulator on any card to evaluate back length coverage, zero lap-bunching, and seam stretch.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 ${
              highContrast ? 'bg-zinc-800 text-yellow-300 border border-yellow-400' : 'bg-white/10 text-white border border-white/20'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Profile: {userProfile.mobility.split('/')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs: 'All Items', 'Magnetic Snaps', 'Seated Wheelchair Cut', 'Sensory Friendly' */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar mb-8" role="tablist" aria-label="Category Filters">
        {filterTabs.map(tab => {
          const isActive = activeFilterTab === tab

          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveFilterTab(tab)
                speak(`Filter applied: ${tab}. Showing ${
                  tab === 'All Items' ? 'all items' : `${tab} items`
                }.`)
              }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all min-h-[48px] focus:ring-4 focus:ring-indigo-400 ${
                isActive
                  ? highContrast
                    ? 'bg-yellow-400 text-black font-black ring-4 ring-yellow-400/50 shadow-md'
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                  : highContrast
                    ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => {
          const currentPose = cardFitPose[item.id] || 'seated'
          const isSeated = currentPose === 'seated'
          const scoreBadgeColor = item.liveScore >= 95
            ? highContrast ? 'bg-yellow-400 text-black font-black border-2 border-white' : 'bg-emerald-600 text-white'
            : highContrast ? 'bg-yellow-500 text-black font-black' : 'bg-sky-600 text-white'

          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl focus-within:ring-4 focus-within:ring-indigo-400 ${
                highContrast 
                  ? 'bg-zinc-950 border-yellow-400 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div>
                {/* Top Image Container with Badges */}
                <div 
                  className="relative aspect-[4/3] bg-slate-100 overflow-hidden group cursor-pointer"
                  onClick={() => handleSelectGarment(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleSelectGarment(item) }}
                  aria-label={`Select ${item.name} and advance to Step 4`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Left Category Tag */}
                  <span className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-black shadow-md ${
                    highContrast 
                      ? 'bg-black text-yellow-300 border border-yellow-400' 
                      : 'bg-slate-950/85 text-white backdrop-blur-md border border-white/20'
                  }`}>
                    {item.category}
                  </span>

                  {/* Top-Right Customized Accessibility Match Score Badge */}
                  <div className={`absolute top-3.5 right-3.5 px-3 py-1.5 rounded-xl font-black text-xs shadow-xl flex items-center gap-1.5 ${scoreBadgeColor}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{item.liveScore}% Match</span>
                  </div>

                  {/* Hover prompt overlay */}
                  <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 bg-white text-indigo-900 rounded-xl font-black text-xs shadow-2xl flex items-center gap-2">
                      Click to Customize in Step 4 <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 
                      onClick={() => handleSelectGarment(item)}
                      className="font-black text-lg font-heading leading-tight hover:underline cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <span className={`text-base font-black shrink-0 ${
                      highContrast ? 'text-yellow-400' : 'text-slate-900'
                    }`}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>

                  {/* Accessible Mechanisms Badges */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Adaptive Mechanisms:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.mechanisms.map((mech, idx) => (
                        <span 
                          key={idx}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                            highContrast 
                              ? 'bg-zinc-900 text-yellow-300 border-zinc-700' 
                              : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {mech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* INTERACTIVE 'STANDING VS. SEATED FIT SIMULATOR' TOGGLE */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-indigo-600 dark:text-yellow-400">
                        <Activity className="w-3.5 h-3.5" />
                        Fit Simulator
                      </span>

                      {/* Interactive Standing vs. Seated Switch */}
                      <div className={`flex items-center rounded-xl p-0.5 border ${
                        highContrast ? 'bg-black border-yellow-400/50' : 'bg-white border-slate-300'
                      }`} role="group" aria-label="Standing vs. Seated Fit Simulator toggle">
                        <button
                          type="button"
                          onClick={() => toggleCardPose(item.id, 'seated')}
                          aria-pressed={isSeated}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                            isSeated
                              ? highContrast
                                ? 'bg-yellow-400 text-black font-black'
                                : 'bg-indigo-600 text-white shadow-sm'
                              : highContrast ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Seated Pose
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCardPose(item.id, 'standing')}
                          aria-pressed={!isSeated}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                            !isSeated
                              ? highContrast
                                ? 'bg-yellow-400 text-black font-black'
                                : 'bg-indigo-600 text-white shadow-sm'
                              : highContrast ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Standing Pose
                        </button>
                      </div>
                    </div>

                    {/* Fit Details Rendering */}
                    {isSeated ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span>Seated Biomechanic Comfort</span>
                          <span>{item.fitSimulator.seatedScore}/100</span>
                        </div>
                        
                        {/* Seated Pose Highlights: back length coverage, zero lap-bunching, and seat seam stretch */}
                        <div className="space-y-2 pt-1">
                          <div className="flex items-start gap-1.5 text-[11px] leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className={highContrast ? 'text-zinc-200' : 'text-slate-700'}>
                              <strong>Back length coverage:</strong> +3" extended rear rise keeps lumbar fully covered seated.
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 text-[11px] leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className={highContrast ? 'text-zinc-200' : 'text-slate-700'}>
                              <strong>Zero lap-bunching:</strong> Calibrated shorter front pelvic cut prevents thigh fabric crumple.
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5 text-[11px] leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className={highContrast ? 'text-zinc-200' : 'text-slate-700'}>
                              <strong>Seat seam stretch:</strong> Friction-free, pocketless rear seat prevents pressure sores.
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
                          <span>Standing Vertical Drape</span>
                          <span>{item.fitSimulator.standingScore}/100</span>
                        </div>
                        <p className={`text-xs italic pt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                          Standard clothing drape: {item.fitSimulator.standingDrape}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Card Selection Action Button -> Auto-advances to Step 4 */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelectGarment(item)}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all min-h-[48px] shadow-md focus:ring-4 focus:ring-indigo-400 ${
                    highContrast
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-yellow-400/40'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <span>Select & Request Customization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
