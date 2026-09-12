import React, { useState } from 'react'
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
  MessageSquare, 
  User, 
  Check, 
  Layers,
  ArrowRight,
  Info,
  Award
} from 'lucide-react'

// Adaptive Alterations Pricing and Details
const ALTERATIONS = [
  {
    id: 'alt-magnetic',
    label: 'Swap buttons to magnetic closures',
    desc: 'Replace traditional sewn buttons with hidden, high-strength auto-aligning magnetic snap sets.',
    cost: 18.00,
    turnaround: '2-3 Business Days',
    icon: Magnet,
    popularFor: 'Fine motor difficulty & arthritis'
  },
  {
    id: 'alt-zipper',
    label: 'Add side-seam zipper for wheelchair access',
    desc: 'Install discreet 2-way concealed zippers along both side seams to allow flat open dressing.',
    cost: 24.00,
    turnaround: '3-4 Business Days',
    icon: SlidersHorizontal,
    popularFor: 'Wheelchair / Seated dressing ease'
  },
  {
    id: 'alt-tags',
    label: 'Remove internal tags & smooth seams',
    desc: 'Ultrasonic tag excision followed by flatlock seam taping to eradicate abrasive friction points.',
    cost: 12.00,
    turnaround: '1-2 Business Days',
    icon: Tag,
    popularFor: 'Tactile sensory sensitivity'
  }
]

// Community Functional Ratings & Wear-Tester Reviews
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    userProfile: 'Wheelchair User • Seated 8+ hrs/day',
    rating: 5,
    title: 'Easy to put on independently while seated',
    comment: 'The side-seam zipper customization was a total game-changer. I don’t need assistance getting into these chinos in the morning anymore. Seams remain completely flat against my chair back.',
    garment: 'Seated-Cut Ergonomic Chino Trouser',
    verifiedTester: true,
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    author: 'David K.',
    userProfile: 'Fine Motor Difficulty • Post-Stroke',
    rating: 5,
    title: 'Magnetic snaps withstand all-day movement with zero popping',
    comment: 'I requested the magnetic button swap on my Oxford shirt. It snaps together effortlessly with one hand. Looks identical to a classic button-down, but takes me literally 5 seconds to dress.',
    garment: 'Everyday Adaptive Oxford Shirt',
    verifiedTester: true,
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    author: 'Elena R.',
    userProfile: 'Sensory Sensitivity • Autism Spectrum',
    rating: 5,
    title: 'Zero neck scratches or raw red skin marks',
    comment: 'Having the internal tags removed and the neckline seams smoothed by the tailor made this wearable straight out of the box. Absolutely frictionless and soothing against sensitive skin.',
    garment: 'Sensory Cloud Bamboo Lounger Shirt',
    verifiedTester: true,
    date: '2 weeks ago'
  }
]

export default function CustomizationPortal({ 
  userProfile, 
  highContrast, 
  largeText,
  preselectedGarment,
  onNavigateToCatalog
}) {
  // Alteration Form State
  const [selectedGarmentName, setSelectedGarmentName] = useState(
    preselectedGarment?.name || 'Everyday Adaptive Oxford Shirt'
  )
  const [selectedAlterations, setSelectedAlterations] = useState([
    'Swap buttons to magnetic closures',
    'Remove internal tags & smooth seams'
  ])
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [submittedOrder, setSubmittedOrder] = useState(null)

  // Community Ratings State
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [newReview, setNewReview] = useState({
    author: '',
    userProfile: 'Wheelchair User',
    rating: 5,
    title: '',
    comment: '',
    garment: selectedGarmentName
  })
  const [showReviewSuccess, setShowReviewSuccess] = useState(false)

  // Toggle Alteration Checkbox
  const toggleAlteration = (label) => {
    setSelectedAlterations(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  // Cost Calculator
  const baseGarmentPrice = 64.00
  const alterationsCost = selectedAlterations.reduce((sum, label) => {
    const found = ALTERATIONS.find(a => a.label === label)
    return sum + (found ? found.cost : 0)
  }, 0)
  const estimatedTotal = baseGarmentPrice + alterationsCost

  // Submit Alteration Request Handler
  const handleSubmitAlteration = (e) => {
    e.preventDefault()
    if (selectedAlterations.length === 0) return

    const orderId = `TAILOR-${Math.floor(100000 + Math.random() * 900000)}`
    setSubmittedOrder({
      id: orderId,
      garment: selectedGarmentName,
      alterations: selectedAlterations,
      cost: alterationsCost,
      total: estimatedTotal,
      specialInstructions,
      estimatedReady: 'In 3-4 Business Days',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  }

  // Submit Functional Review Handler
  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!newReview.author || !newReview.title || !newReview.comment) return

    const created = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      userProfile: newReview.userProfile,
      rating: Number(newReview.rating),
      title: newReview.title,
      comment: newReview.comment,
      garment: newReview.garment,
      verifiedTester: true,
      date: 'Just now'
    }

    setReviews([created, ...reviews])
    setShowReviewSuccess(true)
    setNewReview({
      author: '',
      userProfile: 'Wheelchair User',
      rating: 5,
      title: '',
      comment: '',
      garment: selectedGarmentName
    })

    setTimeout(() => {
      setShowReviewSuccess(false)
    }, 4000)
  }

  return (
    <div className={`space-y-12 ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Feature Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-slate-950/20'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-indigo-500/20 text-indigo-300 border-indigo-400/40">
            <Scissors className="w-3.5 h-3.5" /> Feature 4: Tailor Customization & Community
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
            Garment Customization Portal & Community Ratings
          </h1>
          <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
            Request bespoke adaptive alterations by certified tailors to transform any piece of clothing. 
            View real-time modification pricing and explore authentic functional feedback from our community of adaptive wear-testers.
          </p>
        </div>
      </div>

      {/* Main Grid: Customization Studio (Left) + Community Ratings (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Customization Request Studio & Live Cost Calculator */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-0.5">
                  Adaptive Alteration Request
                </span>
                <h2 className="text-2xl font-black font-heading flex items-center gap-2">
                  <Scissors className="w-6 h-6 text-sky-600" />
                  Customization Portal
                </h2>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800'
              }`}>
                Certified Tailor Network
              </span>
            </div>

            {/* Success Feedback Alert */}
            {submittedOrder && (
              <div className={`mb-6 p-5 rounded-2xl border transition-all animate-fade-in ${
                highContrast 
                  ? 'bg-zinc-900 border-yellow-400 text-yellow-300' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-md'
              }`}>
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-base">Customization Request Submitted Successfully!</h4>
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900">
                        {submittedOrder.id}
                      </span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed opacity-95">
                      Your tailoring order for <strong>{submittedOrder.garment}</strong> has been routed to our certified adaptive studio. 
                      Estimated turnaround: <strong>{submittedOrder.estimatedReady}</strong>. Total alteration fee: <strong>${submittedOrder.cost.toFixed(2)}</strong>.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSubmittedOrder(null)}
                        className="text-xs font-bold underline hover:opacity-80"
                      >
                        Submit Another Customization
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitAlteration} className="space-y-6">
              
              {/* Garment Selection Dropdown */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-600'
                }`}>
                  Select Garment to Modify:
                </label>
                <select
                  value={selectedGarmentName}
                  onChange={(e) => setSelectedGarmentName(e.target.value)}
                  className={`w-full p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                    highContrast 
                      ? 'bg-zinc-900 border-zinc-700 text-white' 
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="Everyday Adaptive Oxford Shirt">Everyday Adaptive Oxford Shirt</option>
                  <option value="Seated-Cut Ergonomic Chino Trouser">Seated-Cut Ergonomic Chino Trouser</option>
                  <option value="Dual-Zip Easy-Open Commuter Pant">Dual-Zip Easy-Open Commuter Pant</option>
                  <option value="Magnetic All-Weather City Parka">Magnetic All-Weather City Parka</option>
                  <option value="Sensory Cloud Bamboo Lounger Shirt">Sensory Cloud Bamboo Lounger Shirt</option>
                  <option value="Seated Storm Shield Wheelchair Cape">Seated Storm Shield Wheelchair Cape</option>
                  <option value="User Own Uploaded Garment (Mail-In)">User Own Garment (Mail-In Tailoring)</option>
                </select>
              </div>

              {/* Specific Alterations List (3 required options) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${
                    highContrast ? 'text-yellow-300' : 'text-slate-600'
                  }`}>
                    Choose Adaptive Alterations:
                  </label>
                  <span className="text-xs text-sky-600 font-bold">
                    {selectedAlterations.length} Selected
                  </span>
                </div>

                <div className="space-y-3">
                  {ALTERATIONS.map((alt) => {
                    const isSelected = selectedAlterations.includes(alt.label)
                    const IconComp = alt.icon
                    return (
                      <div
                        key={alt.id}
                        onClick={() => toggleAlteration(alt.label)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? highContrast
                              ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400'
                              : 'bg-sky-50/90 border-sky-600 text-slate-900 shadow-sm'
                            : highContrast
                              ? 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-600'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-lg mt-0.5 ${
                            isSelected 
                              ? highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white'
                              : highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm font-heading">{alt.label}</h4>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                                isSelected ? 'bg-sky-200/80 text-sky-900' : 'bg-slate-100 text-slate-500'
                              }`}>
                                +${alt.cost.toFixed(2)}
                              </span>
                            </div>
                            <p className={`text-xs mt-1 leading-relaxed ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>
                              {alt.desc}
                            </p>
                            <span className="text-[11px] font-semibold text-sky-600 mt-1 block">
                              Target need: {alt.popularFor} &bull; {alt.turnaround}
                            </span>
                          </div>
                        </div>

                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-1 ${
                          isSelected
                            ? highContrast ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custom Measurements / Instructions */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-600'
                }`}>
                  Special Tailor Notes or Measurement Needs:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Left side zipper preferred; wheelchair back cushion requires extra 2-inch back rise..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs transition-all ${
                    highContrast 
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* LIVE COST CALCULATOR */}
              <div className={`p-4 rounded-xl border ${
                highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs mb-1 text-slate-500">
                  <span>Base Garment ({selectedGarmentName}):</span>
                  <span>${baseGarmentPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs mb-2 text-slate-500">
                  <span>Selected Alteration Services ({selectedAlterations.length}):</span>
                  <span className="font-semibold text-sky-600">+${alterationsCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-dashed border-slate-300 flex items-center justify-between font-extrabold text-base">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Estimated Tailored Total:
                  </span>
                  <span className={`font-mono text-xl ${highContrast ? 'text-yellow-400' : 'text-slate-900'}`}>
                    ${estimatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-customization-btn"
                disabled={selectedAlterations.length === 0}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  highContrast
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Submit Adaptive Modification Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>

        </div>

        {/* RIGHT: Community Rating System & Functional Wear-Tester Feedback */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-500 block mb-0.5">
                  Wear-Tester Community
                </span>
                <h3 className="text-xl font-black font-heading flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  Functional Ratings
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-black text-base">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Write Functional Review Accordion/Form */}
            <div className={`p-4 rounded-xl border mb-6 ${
              highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-extrabold text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Add Your Functional Review</span>
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
              </div>

              {showReviewSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Thank you! Your functional review has been published.
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Alex T.)"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newReview.userProfile}
                    onChange={(e) => setNewReview({ ...newReview, userProfile: e.target.value })}
                    className="p-2 rounded-lg border text-xs bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 font-medium"
                  >
                    <option value="Wheelchair User">Wheelchair User</option>
                    <option value="Fine Motor Difficulty">Fine Motor Difficulty</option>
                    <option value="Sensory Sensitive">Sensory Sensitive</option>
                    <option value="Caregiver / Assister">Caregiver / Assister</option>
                  </select>

                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="p-2 rounded-lg border text-xs bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 font-bold"
                  >
                    <option value="5">5 / 5 Stars</option>
                    <option value="4">4 / 5 Stars</option>
                    <option value="3">3 / 5 Stars</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Functional Headline (e.g. Easy to put on independently)"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe how the garment performed physically (e.g., seated comfort, snaps strength)..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    highContrast ? 'bg-yellow-400 text-black' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <Send className="w-3 h-3" /> Post Community Review
                </button>
              </form>
            </div>

            {/* List of Community Functional Reviews */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className={`p-4 rounded-xl border transition-all ${
                    highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm">{rev.author}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800'
                        }`}>
                          Verified Wear-Tester
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {rev.userProfile} &bull; {rev.date}
                      </div>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h5 className="font-bold text-xs mt-2 font-heading text-sky-700 dark:text-sky-400">
                    "{rev.title}"
                  </h5>
                  <p className={`text-xs mt-1 leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {rev.comment}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 italic">
                    Referenced Garment: {rev.garment}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
