import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Scissors, 
  Sparkles, 
  Magnet, 
  SlidersHorizontal, 
  Tag, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Send, 
  DollarSign, 
  Clock, 
  User, 
  Check, 
  Layers,
  ArrowRight, 
  Info, 
  Award,
  Truck,
  MapPin,
  Phone,
  PackageCheck,
  ChevronRight,
  ExternalLink,
  X,
  AlertCircle
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import { AVAILABLE_ALTERATIONS, LOCAL_TAILORS, CATALOG_ITEMS } from '../data/garmentData'

export default function CustomizationPortal() {
  const { 
    userProfile, 
    selectedGarment, 
    setSelectedGarment,
    selectedAlterations, 
    toggleAlteration,
    customInstructions, 
    setCustomInstructions,
    assignedTailor, 
    setAssignedTailor,
    orderStatus, 
    submitOrder, 
    resetOrder,
    calculateOrderSummary,
    highContrast,
    setCurrentStep,
    setIsTrackingOpen,
    speak 
  } = useAccessibility()

  // Ensure fallback garment if navigated directly
  const activeGarment = selectedGarment || CATALOG_ITEMS[0]
  const summary = calculateOrderSummary()
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Reviews dataset
  const communityReviews = [
    {
      id: 'rev-1',
      author: 'Sarah M.',
      profile: 'Wheelchair User • Seated 8+ hrs/day',
      rating: 5,
      title: 'Easy to put on independently while seated',
      text: 'The side-seam zipper retrofit is a life saver. The City Adaptive Sewing Hub flattened the pelvic rise and added dual-pull rings. Takes zero effort to dress in the morning.',
      date: 'Verified Wearer • 2 days ago'
    },
    {
      id: 'rev-2',
      author: 'David K.',
      profile: 'Fine Motor Difficulty • Post-Stroke',
      rating: 5,
      title: 'Magnetic snaps withstand all-day movement with zero popping',
      text: 'Replaced standard shirt buttons with hidden neodymium snaps. Looks identical to a classic boardroom oxford, but closes effortlessly with one hand in 2 seconds.',
      date: 'Verified Wearer • 1 week ago'
    },
    {
      id: 'rev-3',
      author: 'Elena R.',
      profile: 'Sensory Sensitivity • Autism Spectrum',
      rating: 5,
      title: 'Zero neck scratches or raw red skin marks',
      text: 'Having the tags ultrasonically excised and the seams bonded with flat-lock tape completely eliminated sensory distress. Truly accessible engineering.',
      date: 'Verified Wearer • 2 weeks ago'
    }
  ]

  const handleSubmitCustomization = (e) => {
    e.preventDefault()
    submitOrder()
    setShowOrderModal(true)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Step Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl mb-8 border transition-all ${
        highContrast 
          ? 'bg-zinc-900 border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 text-white shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Step 4 of 4: Customization & Dispatch
              </span>
              <span className="text-xs text-emerald-200/80">Local Certified Tailor Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
              Customization Portal & Local Tailor Dispatch
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
              Review your pre-selected garment, modify intelligent pre-filled adaptive alterations tailored to your Step 1 profile, and dispatch directly to a verified local adaptive tailor with transparent pricing and 48-hour turnaround.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentStep(3)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border min-h-[48px] transition-colors focus:ring-4 focus:ring-emerald-400 ${
                highContrast 
                  ? 'border-zinc-700 bg-zinc-800 text-yellow-300 hover:bg-zinc-700' 
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Change Selected Garment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Garment Summary + Intelligent Alteration Request Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Pre-Selected Garment & Profile Summary */}
          <div className={`p-6 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 block">
              Pre-Selected Adaptive Garment
            </span>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-full sm:w-36 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-zinc-800">
                <img 
                  src={activeGarment.image} 
                  alt={activeGarment.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-black text-lg font-heading leading-tight">
                    {activeGarment.name}
                  </h2>
                  <span className={`text-base font-black shrink-0 ${
                    highContrast ? 'text-yellow-400' : 'text-slate-900'
                  }`}>
                    ${activeGarment.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 my-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    highContrast ? 'bg-zinc-800 text-yellow-300 border border-yellow-400' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {activeGarment.accessibilityScore}% Accessibility Score
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {activeGarment.category}
                  </span>
                </div>

                {/* Profile Summary Match Alert */}
                <div className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  highContrast 
                    ? 'bg-zinc-900 border-zinc-700 text-yellow-300' 
                    : 'bg-sky-50 border-sky-200 text-sky-900'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Active User Profile:</strong> {userProfile.mobility} • {userProfile.dexterity?.join(', ') || 'Standard dexterity'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Intelligent Pre-Filled Alteration Request Form */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="mb-4">
              <h3 className="font-black text-lg font-heading flex items-center gap-2">
                <Scissors className={highContrast ? 'text-yellow-400' : 'text-emerald-600'} />
                Intelligent Adaptive Alterations
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                Options automatically checked based on your Step 1 profile. Toggle additional custom retrofits as needed.
              </p>
            </div>

            <div className="space-y-3.5 mt-5">
              {AVAILABLE_ALTERATIONS.map(alt => {
                const isSelected = selectedAlterations.includes(alt.id)
                // Check if recommended by profile
                const isRecommended = alt.recommendedFor.some(need => 
                  userProfile.mobility === need || 
                  userProfile.dexterity?.includes(need) || 
                  userProfile.sensory?.includes(need)
                )

                return (
                  <div
                    key={alt.id}
                    onClick={() => toggleAlteration(alt.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') toggleAlteration(alt.id) }}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-start gap-3.5 focus:outline-none focus:ring-4 focus:ring-emerald-400 ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 ring-2 ring-yellow-400/40 text-white'
                          : 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-200 text-slate-900'
                        : highContrast
                          ? 'bg-zinc-900/60 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? highContrast ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-emerald-600 border-emerald-600 text-white'
                        : highContrast ? 'border-zinc-600 bg-zinc-800' : 'border-slate-400 bg-white'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                          <span>{alt.title}</span>
                          {isRecommended && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tight ${
                              highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-900'
                            }`}>
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="font-black text-sm text-emerald-600 dark:text-yellow-400 shrink-0">
                          +${alt.price.toFixed(2)}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                        {alt.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {alt.turnaroundHours}h tailoring time
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Custom Notes */}
            <div className="mt-5">
              <label htmlFor="custom-instructions" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Special Tailoring Notes (Optional)
              </label>
              <textarea
                id="custom-instructions"
                rows={2}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g., Extended zipper pull ring on left seam; user operates wheelchair primarily with left hand."
                className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm transition-all focus:ring-4 focus:ring-emerald-400 ${
                  highContrast 
                    ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* 3. Community Ratings & Reviews Section */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-lg font-heading flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  Community Functional Reviews
                </h3>
                <p className={`text-xs sm:text-sm mt-0.5 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Real wear-tester feedback on adaptive tailoring and mobility ease.
                </p>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                5.0 / 5.0 (420+ Reviews)
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {communityReviews.map(rev => (
                <div 
                  key={rev.id} 
                  className={`p-4 rounded-2xl border text-xs ${
                    highContrast ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span>{rev.author}</span>
                      <span className="text-slate-400 font-normal text-xs">• {rev.profile}</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="font-extrabold text-slate-800 dark:text-zinc-200 mb-1">
                    "{rev.title}"
                  </div>
                  <p className={`leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-Time Pricing Estimator & Assigned Local Adaptive Tailor */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-Time Pricing & Turnaround Estimator */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4 block">
              Pricing & Turnaround Estimator
            </span>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className={highContrast ? 'text-zinc-300' : 'text-slate-600'}>
                  Base Garment ({activeGarment.name})
                </span>
                <span className="font-bold">${summary.garmentPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={highContrast ? 'text-zinc-300' : 'text-slate-600'}>
                  Adaptive Alterations ({selectedAlterations.length} Selected)
                </span>
                <span className="font-bold text-emerald-600 dark:text-yellow-400">
                  +${summary.alterationsTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Tailor Routing & Inspection</span>
                <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-lg font-black">
                <span>Total Estimated Cost</span>
                <span className={highContrast ? 'text-yellow-400' : 'text-slate-900'}>
                  ${summary.totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Turnaround Badge */}
            <div className={`mt-5 p-3.5 rounded-2xl flex items-center gap-3 border ${
              highContrast 
                ? 'bg-zinc-900 border-yellow-400/40 text-yellow-300' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <Clock className="w-5 h-5 shrink-0" />
              <div className="text-xs">
                <div className="font-bold">{summary.turnaroundHours}-Hour Delivery Guarantee</div>
                <div className="text-[11px] opacity-80">Local courier pickup & return included</div>
              </div>
            </div>

            {/* Primary Action Button: 'Confirm & Place Customization Order' */}
            <button
              onClick={handleSubmitCustomization}
              id="confirm-place-order-btn"
              className={`w-full mt-6 py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all min-h-[52px] shadow-xl focus:ring-4 focus:ring-emerald-400 ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-4 ring-yellow-400/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
              }`}
            >
              <span>Confirm & Place Customization Order</span>
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Local Tailor Routing Network */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Assigned Local Adaptive Tailor
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                highContrast ? 'bg-yellow-400 text-black font-black' : 'bg-emerald-100 text-emerald-900'
              }`}>
                <ShieldCheck className="w-3 h-3" /> Verified Partner
              </span>
            </div>

            {/* Active Tailor Card */}
            <div className={`p-4 rounded-2xl border ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-black text-base leading-tight">
                    {assignedTailor.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{assignedTailor.address}</span>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 shrink-0">
                  {assignedTailor.distance}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{assignedTailor.rating} ({assignedTailor.reviews} adaptive orders)</span>
                </div>
                <span className="text-emerald-600 font-bold">
                  {assignedTailor.turnaround}
                </span>
              </div>

              {/* Specializations */}
              <div className="mt-3">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                  Verified Specializations:
                </div>
                <div className="flex flex-wrap gap-1">
                  {assignedTailor.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:text-zinc-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Alternate Tailors Selection */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                Select Alternative Nearby Hub:
              </span>
              <div className="space-y-2">
                {LOCAL_TAILORS.map(tailor => {
                  const isCur = assignedTailor.id === tailor.id

                  return (
                    <button
                      key={tailor.id}
                      type="button"
                      onClick={() => {
                        setAssignedTailor(tailor)
                        speak(`Selected ${tailor.name}, ${tailor.distance}.`)
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all min-h-[48px] focus:ring-4 focus:ring-emerald-400 ${
                        isCur 
                          ? highContrast 
                            ? 'bg-yellow-400 text-black font-black' 
                            : 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold'
                          : highContrast ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold truncate">{tailor.name}</div>
                        <div className="text-[10px] opacity-75">{tailor.verifiedBadge}</div>
                      </div>
                      <span className="text-xs font-bold shrink-0">{tailor.distance}</span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CONFIRMATION WORKFLOW: Success Modal with Order Status Tracker Pipeline */}
      <AnimatePresence>
        {showOrderModal && orderStatus && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-2xl w-full p-6 sm:p-8 rounded-3xl border-2 shadow-2xl transition-all relative ${
                highContrast 
                  ? 'bg-zinc-950 border-yellow-400 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowOrderModal(false)}
                aria-label="Close confirmation modal"
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Success Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 ${
                  highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <PackageCheck className="w-8 h-8" />
                </div>
                <h2 id="modal-title" className="text-2xl font-black font-heading">
                  Customization Request Dispatched!
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Your order has been routed to <strong>{assignedTailor.name}</strong>.
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-yellow-300">
                  Tracking ID: {orderStatus.orderId}
                </div>
              </div>

              {/* Status Indicator Pipeline: [Request Sent -> Customization Approved -> In Sewing -> Ready for Delivery] */}
              <div className="my-6">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 text-center">
                  Order Status Pipeline
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { step: 1, label: 'Request Sent', status: 'completed' },
                    { step: 2, label: 'Customization Approved', status: 'current' },
                    { step: 3, label: 'In Sewing', status: 'upcoming' },
                    { step: 4, label: 'Ready for Delivery', status: 'upcoming' }
                  ].map((pStep) => {
                    const isDone = pStep.status === 'completed'
                    const isCurr = pStep.status === 'current'

                    return (
                      <div key={pStep.step} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-1.5 ${
                          isDone 
                            ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                            : isCurr
                              ? highContrast ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40' : 'bg-sky-600 text-white ring-4 ring-sky-200 animate-pulse'
                              : highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : pStep.step}
                        </div>
                        <span className={`text-[11px] font-bold leading-tight ${
                          isCurr ? 'text-sky-600 dark:text-yellow-400 font-black' : 'text-slate-500'
                        }`}>
                          {pStep.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className={`p-4 rounded-2xl border text-xs space-y-2 mb-6 ${
                highContrast ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between">
                  <span className="text-slate-500">Item:</span>
                  <span className="font-bold">{activeGarment.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Tailor:</span>
                  <span className="font-bold">{assignedTailor.name} ({assignedTailor.distance})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alterations:</span>
                  <span className="font-bold">{selectedAlterations.length} items configured</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600 dark:text-yellow-400">Within 48 Hours</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-black text-sm">
                  <span>Total Paid:</span>
                  <span>${summary.totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowOrderModal(false)
                    setCurrentStep(5)
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm min-h-[48px] flex items-center justify-center gap-2 ${
                    highContrast ? 'bg-zinc-800 text-yellow-300 hover:bg-zinc-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  <PackageCheck className="w-4 h-4 text-emerald-500" />
                  <span>Go to My Orders & Tracker</span>
                </button>
                <button
                  onClick={() => {
                    setShowOrderModal(false)
                    setCurrentStep(1)
                    resetOrder()
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm min-h-[48px] ${
                    highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  Start New Customization
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
