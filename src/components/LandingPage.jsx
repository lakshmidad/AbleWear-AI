import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Magnet, 
  SlidersHorizontal, 
  Scissors, 
  Activity, 
  Tag, 
  Truck, 
  Clock, 
  Heart, 
  Eye, 
  Zap, 
  PackageCheck, 
  Search,
  Scan,
  Check,
  X
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function LandingPage({ onTrackOrders }) {
  const { setCurrentStep, highContrast, speak, orderStatus } = useAccessibility()
  
  // Interactive Before & After Toggle State: 'standard' | 'adaptive'
  const [clothingMode, setClothingMode] = useState('adaptive')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'closures' | 'fit' | 'sensory'

  const comparisonData = [
    {
      id: 'closures',
      category: 'Fasteners & Closures',
      icon: Magnet,
      standard: {
        title: 'Rigid Tiny Buttons & Stiff Zippers',
        description: 'Standard 10mm plastic buttons and stiff metal teeth require high pinch force, fine finger coordination, and two hands.',
        painPoint: 'Causes fatigue, joint pain, or requires carer assistance for individuals with tremors, arthritis, or stroke paralysis.',
        barrierScore: 'High Barrier (78% dressing difficulty)'
      },
      adaptive: {
        title: 'Concealed Neodymium Magnetic Snaps',
        description: 'Hidden magnetic snap plackets that guide themselves together and snap shut with a gentle one-handed touch.',
        benefit: 'Enables 2-second independent dressing with zero grip strength required. Looks like a classic sewn button-down.',
        barrierScore: 'Zero Barrier (99% independent dressing rate)'
      }
    },
    {
      id: 'fit',
      category: 'Posture & Ergonomic Cut',
      icon: Activity,
      standard: {
        title: 'Vertical Upright Drape (Standing Only)',
        description: 'Pants and shirts cut strictly for standing upright. Low back rise pulls down 2-3 inches when seated, exposing the spine.',
        painPoint: 'Excess fabric bunches painfully across thighs; thick rear pockets and heavy rivets create pressure sore hazards on wheelchairs.',
        barrierScore: 'Skin Pressure & Draft Risk'
      },
      adaptive: {
        title: 'Seated Ergonomic Wheelchair Cut',
        description: 'Engineered with +3" higher back waistband rise, flattened pelvic front to eliminate lap bunching, and pocketless rear.',
        benefit: 'Full lumbar spine coverage during transfers, zero fabric crumple at the groin, and stitchless smooth contact against seat cushions.',
        barrierScore: '100% Seated Comfort & Tissue Safety'
      }
    },
    {
      id: 'sensory',
      category: 'Seams & Sensory Comfort',
      icon: Tag,
      standard: {
        title: 'Scratchy Woven Labels & Bulky Seams',
        description: 'Stiff synthetic nylon tags stitched into necklines, with thick overlock seams that rub against delicate skin tissue.',
        painPoint: 'Triggers cutaneous irritation, sensory overload in autistic individuals, and raw abrasions under armpits and braces.',
        barrierScore: 'Sensory Friction & Chafing'
      },
      adaptive: {
        title: '100% Tagless & Flat-Felled Soft Seams',
        description: 'Thermal heat-transfer care labeling and silk-bonded flatlock seams that sit totally flush against sensitive skin.',
        benefit: 'Hypoallergenic, frictionless comfort that eliminates sensory distress and prevents skin breakdown beneath mobility harnesses.',
        barrierScore: 'Frictionless All-Day Sensory Ease'
      }
    }
  ]

  const handleStartWizard = () => {
    speak('Starting 4-Step Guided Wizard. Beginning with Step 1: Accessibility Profile Builder.')
    setCurrentStep(1)
  }

  const handleOpenTracking = () => {
    speak('Opening Order Tracking.')
    if (onTrackOrders) {
      onTrackOrders()
    } else {
      setCurrentStep(4)
    }
  }

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* 1. HERO SECTION */}
      <section 
        aria-labelledby="hero-heading"
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 border transition-all ${
          highContrast 
            ? 'bg-zinc-950 border-yellow-400 text-white shadow-2xl shadow-yellow-400/10' 
            : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 text-white shadow-2xl border-slate-800'
        }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Track 5 & Compliance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
              highContrast 
                ? 'bg-yellow-400 text-black border-2 border-white' 
                : 'bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-sm'
            }`}>
              Track 5: Fashion for People
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              highContrast 
                ? 'bg-black text-emerald-300 border border-emerald-400' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" /> WCAG 2.1 AA Compliant
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              highContrast ? 'text-yellow-300' : 'text-slate-300'
            }`}>
              By Team KalVibers
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            id="hero-heading" 
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.15]"
          >
            Fashion Without Barriers —{' '}
            <span className={`bg-clip-text text-transparent ${
              highContrast 
                ? 'text-yellow-400' 
                : 'bg-gradient-to-r from-sky-300 via-teal-300 to-indigo-300'
            }`}>
              AI-Driven Adaptive Clothing
            </span>{' '}
            for Every Body
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed">
            Restoring dressing independence, dignity, and personalized style for individuals with physical disabilities, mobility devices, limited dexterity, and neurodivergent sensory needs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartWizard}
              id="start-wizard-hero-btn"
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all min-h-[52px] shadow-2xl focus:ring-4 focus:ring-sky-400 ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-4 ring-yellow-400/50'
                  : 'bg-gradient-to-r from-sky-500 via-indigo-600 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white shadow-sky-500/25'
              }`}
            >
              <span>Start 4-Step Guided Wizard</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>

            <button
              onClick={handleOpenTracking}
              id="track-orders-hero-btn"
              className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all min-h-[52px] border focus:ring-4 focus:ring-yellow-400 ${
                highContrast
                  ? 'bg-zinc-900 border-yellow-400 text-yellow-300 hover:bg-zinc-800'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md'
              }`}
            >
              <PackageCheck className="w-5 h-5 text-emerald-400" />
              <span>Track My Orders</span>
            </button>
          </div>

          {/* Key Feature Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-sky-400">1-Second</div>
              <div className="text-xs text-slate-400">Magnetic Dressing</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-teal-400">+3 Inches</div>
              <div className="text-xs text-slate-400">Seated Rear Rise</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-indigo-400">100% Tagless</div>
              <div className="text-xs text-slate-400">Hypoallergenic Seams</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">48-Hour</div>
              <div className="text-xs text-slate-400">Local Tailor Dispatch</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE-AND-AFTER COMPARISON COMPONENT */}
      <section 
        aria-labelledby="comparison-heading"
        className={`p-6 sm:p-10 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400 text-white' : 'bg-white border-slate-200 shadow-xl'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 bg-indigo-50 dark:bg-zinc-900 text-indigo-700 dark:text-yellow-400 border border-indigo-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Innovation Showcase
          </div>
          <h2 id="comparison-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
            Before & After: The Adaptive Advantage
          </h2>
          <p className={`text-xs sm:text-sm mt-2 max-w-2xl mx-auto ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
            Toggle between standard off-the-rack clothing vs. AdaptiveStyle AI solutions to explore how universal design removes physical dressing barriers.
          </p>

          {/* Interactive Dual-Mode Switch */}
          <div className="flex items-center justify-center mt-6">
            <div className={`p-1.5 rounded-2xl border flex items-center gap-1 shadow-inner ${
              highContrast ? 'bg-black border-yellow-400' : 'bg-slate-100 border-slate-200'
            }`} role="group" aria-label="Toggle between Standard Clothing and AdaptiveStyle AI">
              <button
                type="button"
                onClick={() => {
                  setClothingMode('standard')
                  speak('Showing Standard Clothing barriers.')
                }}
                aria-pressed={clothingMode === 'standard'}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 min-h-[48px] ${
                  clothingMode === 'standard'
                    ? highContrast
                      ? 'bg-zinc-800 text-yellow-300 ring-2 ring-yellow-400'
                      : 'bg-rose-600 text-white shadow-md'
                    : highContrast ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Standard Clothing (The Problem)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setClothingMode('adaptive')
                  speak('Showing AdaptiveStyle AI solutions.')
                }}
                aria-pressed={clothingMode === 'adaptive'}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 min-h-[48px] ${
                  clothingMode === 'adaptive'
                    ? highContrast
                      ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/50 shadow-md font-black'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-300'
                    : highContrast ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Adaptive Clothing (The Solution)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {comparisonData.map((item) => {
            const isAdaptive = clothingMode === 'adaptive'
            const content = isAdaptive ? item.adaptive : item.standard
            const IconComp = item.icon

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between transition-all ${
                  isAdaptive
                    ? highContrast
                      ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400/30'
                      : 'bg-emerald-50/60 border-emerald-500/60 text-slate-900 shadow-md'
                    : highContrast
                      ? 'bg-zinc-950 border-rose-500/50 text-zinc-300'
                      : 'bg-rose-50/50 border-rose-300 text-slate-800'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isAdaptive
                        ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-200 text-emerald-900'
                        : highContrast ? 'bg-rose-950 text-rose-300' : 'bg-rose-200 text-rose-900'
                    }`}>
                      {item.category}
                    </span>

                    <div className={`p-2 rounded-xl ${
                      isAdaptive
                        ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                        : highContrast ? 'bg-zinc-800 text-rose-400' : 'bg-rose-200 text-rose-700'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Feature Title */}
                  <h3 className="font-black text-lg font-heading leading-snug mb-2">
                    {content.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed mb-4 ${
                    highContrast ? 'text-zinc-300' : 'text-slate-600'
                  }`}>
                    {content.description}
                  </p>

                  {/* Impact Highlight */}
                  <div className={`p-3 rounded-2xl text-xs border ${
                    isAdaptive
                      ? highContrast
                        ? 'bg-zinc-950 border-yellow-400/50 text-yellow-300'
                        : 'bg-white border-emerald-200 text-emerald-900'
                      : highContrast
                        ? 'bg-zinc-900 border-rose-900 text-rose-300'
                        : 'bg-white border-rose-200 text-rose-900'
                  }`}>
                    <div className="font-extrabold flex items-center gap-1.5 mb-1">
                      {isAdaptive ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                      )}
                      <span>{isAdaptive ? 'Adaptive Advantage:' : 'Accessibility Barrier:'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {isAdaptive ? content.benefit : content.painPoint}
                    </p>
                  </div>
                </div>

                {/* Bottom Status Score */}
                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-zinc-800 text-right">
                  <span className={`text-[11px] font-black uppercase tracking-tight ${
                    isAdaptive 
                      ? highContrast ? 'text-yellow-400' : 'text-emerald-700'
                      : 'text-rose-600'
                  }`}>
                    {content.barrierScore}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Bar below Comparison */}
        <div className="max-w-xl mx-auto text-center mt-10">
          <button
            onClick={handleStartWizard}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 mx-auto transition-all shadow-md focus:ring-4 focus:ring-sky-400 ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <span>Experience the Difference — Start Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. GUIDED 4-STEP PIPELINE OVERVIEW */}
      <section 
        aria-labelledby="pipeline-heading"
        className={`p-6 sm:p-10 rounded-3xl border transition-all ${
          highContrast ? 'bg-zinc-950 border-yellow-400 text-white' : 'bg-slate-50 border-slate-200 shadow-sm'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            How AdaptiveStyle AI Works
          </span>
          <h2 id="pipeline-heading" className="text-2xl sm:text-3xl font-black font-heading mt-1">
            The 4-Step Guided Wizard
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl mx-auto ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
            A seamless journey designed for complete independence and verified garment fit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            {
              step: 1,
              title: '1. Profile Builder',
              desc: 'Select mobility posture, fine motor needs, and sensory comfort criteria to build your unique accessibility profile.',
              action: () => setCurrentStep(1)
            },
            {
              step: 2,
              title: '2. AI CV Scanner',
              desc: 'Our computer vision engine scans clothing photos, identifies magnetic snaps and flat seams, and calculates match score.',
              action: () => setCurrentStep(2)
            },
            {
              step: 3,
              title: '3. Matched Catalog',
              desc: 'Explore garments dynamically ranked by your match rating, with built-in Seated vs. Standing 3D fit simulation.',
              action: () => setCurrentStep(3)
            },
            {
              step: 4,
              title: '4. Tailor Dispatch',
              desc: 'Select custom retrofits and automatically route your garment to a verified nearby adaptive tailor in 48 hours.',
              action: () => setCurrentStep(4)
            }
          ].map((pipeline) => (
            <div
              key={pipeline.step}
              onClick={pipeline.action}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between min-h-[160px] ${
                highContrast 
                  ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400 text-white' 
                  : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md text-slate-800'
              }`}
            >
              <div>
                <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center mb-3 ${
                  highContrast ? 'bg-yellow-400 text-black' : 'bg-indigo-600 text-white'
                }`}>
                  {pipeline.step}
                </div>
                <div className="font-extrabold text-sm mb-1">{pipeline.title}</div>
                <p className={`text-xs leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {pipeline.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-yellow-400 mt-3">
                <span>Launch Step</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
