import React, { useState, useMemo } from 'react'
import { 
  ShoppingBag, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Magnet, 
  Scissors, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Eye, 
  ArrowRight, 
  Info,
  X,
  Tag
} from 'lucide-react'

// 6 Curated Adaptive Items across Shirts, Pants, and Outerwear
const CATALOG_ITEMS = [
  {
    id: 'item-1',
    name: 'Everyday Adaptive Oxford Shirt',
    category: 'Shirts',
    filterTags: ['Magnetic Closures'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: Flat seams + Magnetic buttons',
    functionalFeatures: [
      { name: 'Magnetic Button Placket', detail: 'Concealed magnetic snaps behind faux resin buttons for effortless 1-second dressing.' },
      { name: 'Tagless Collar', detail: 'Direct heat-transfer labeling preventing neck chafing.' },
      { name: 'Expanded Armhole Gusset', detail: 'Extra underarm stretch for limited shoulder rotation.' },
      { name: 'Ultra-Flat Seams', detail: 'Zero inner friction lines to protect sensitive skin.' }
    ],
    mobilityMatch: 'Seated & Ambulatory',
    dexterityRating: 'High Ease (One-hand or weak grip)',
    price: '$64.00'
  },
  {
    id: 'item-2',
    name: 'Seated-Cut Ergonomic Chino Trouser',
    category: 'Pants',
    filterTags: ['Seated Cut', 'Easy-Open Pants'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: Seated high back + Pocketless smooth seat',
    functionalFeatures: [
      { name: 'Ergonomic Seated Rise', detail: '3-inch higher back waistband prevents gapping and bunching in wheelchairs.' },
      { name: 'Seamless Pressure-Free Seat', detail: 'Eliminated rear pockets and thick rivets to prevent pressure sores.' },
      { name: 'Front-Angle Slip Pockets', detail: 'Accessible thigh-level zip pockets reachable while sitting.' },
      { name: 'Elastic Internal Adjusters', detail: 'Hidden buttonhole elastic allows up to 4 inches of waist flex.' }
    ],
    mobilityMatch: 'Wheelchair / Prolonged Sitting',
    dexterityRating: 'Medium Ease (Assisted pull tabs)',
    price: '$78.00'
  },
  {
    id: 'item-3',
    name: 'Dual-Zip Easy-Open Commuter Pant',
    category: 'Pants',
    filterTags: ['Easy-Open Pants'],
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: Full-length side zippers + Elastic waistband',
    functionalFeatures: [
      { name: 'Full-Length 2-Way Side Zips', detail: 'Opens completely flat from hip to ankle for easy dressing without standing.' },
      { name: 'Oversized Ring Pulls', detail: 'Generous zipper pulls compatible with limited finger grasp or prosthetic hooks.' },
      { name: 'Reinforced Inner Knee Panels', detail: 'Durable abrasion patches resistant to transfer friction.' },
      { name: 'Soft French Terry Blend', detail: 'Breathable, temperature-regulating athletic fleece.' }
    ],
    mobilityMatch: 'Crutches, Prosthetics & Wheelchair',
    dexterityRating: 'Max Ease (One-touch glide)',
    price: '$82.00'
  },
  {
    id: 'item-4',
    name: 'Magnetic All-Weather City Parka',
    category: 'Outerwear',
    filterTags: ['Magnetic Closures'],
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: Magnetic storm flap + Loop cuff fasteners',
    functionalFeatures: [
      { name: 'Auto-Aligning Magnetic Storm Flap', detail: 'Dual magnetic tracks snap shut automatically without zipper fumbling.' },
      { name: 'Extended Back Draft Shield', detail: 'Longer rear drape protects against cold drafts when seated.' },
      { name: 'Easy-Grip Cuff Straps', detail: 'Loop wrist straps tightened with a simple pull of the forearm.' },
      { name: 'Microfleece Warmth Pockets', detail: 'Insulated kangaroo-style hand warmers placed at lap level.' }
    ],
    mobilityMatch: 'All Mobility Profiles',
    dexterityRating: 'Max Ease (Zero pinching needed)',
    price: '$145.00'
  },
  {
    id: 'item-5',
    name: 'Sensory Cloud Bamboo Lounger Shirt',
    category: 'Shirts',
    filterTags: ['Magnetic Closures'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: 100% Tagless + Magnetic shoulder seam',
    functionalFeatures: [
      { name: 'Magnetic Left Shoulder Seam', detail: 'Overhead slip-on without tight neck stretching or head snagging.' },
      { name: 'Silky Bonded Flatlock Seams', detail: 'Completely smooth interior stitching against hypersensitive skin.' },
      { name: 'Printed Sensory Care Mark', detail: 'No abrasive fabric or wash tags.' },
      { name: 'Bamboo-Viscose Fabric', detail: 'Naturally hypoallergenic and cooling for hyperhidrosis prevention.' }
    ],
    mobilityMatch: 'Bed-bound, Seated & Ambulatory',
    dexterityRating: 'Max Ease (Slip-on / Snap)',
    price: '$52.00'
  },
  {
    id: 'item-6',
    name: 'Seated Storm Shield Wheelchair Cape',
    category: 'Outerwear',
    filterTags: ['Seated Cut', 'Magnetic Closures'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    primaryFeatureSummary: 'Features: Wheelchair-safe crop hem + Magnetic neck latch',
    functionalFeatures: [
      { name: 'Wheelchair-Safe Front & Back Ratio', detail: 'Full front coverage with cropped back to avoid wheel entanglement.' },
      { name: 'Magnetic Chin Storm Latch', detail: 'Snaps shut magnetically under the chin with zero finger strength.' },
      { name: 'Reflective Safety Trims', detail: '360-degree high-visibility bands for nighttime street navigation.' },
      { name: 'Waterproof Breathable Shell', detail: 'DWR-coated windproof fabric with quick-dry moisture evacuation.' }
    ],
    mobilityMatch: 'Wheelchair & Seated Mobility',
    dexterityRating: 'High Ease (Drape & snap)',
    price: '$110.00'
  }
]

export default function AdaptiveCatalog({ 
  userProfile, 
  highContrast, 
  largeText, 
  onNavigateToScanner,
  onNavigateToCustomization
}) {
  // State
  const [selectedFilter, setSelectedFilter] = useState('All Items')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Filter Buttons Specification:
  // 'All Items', 'Seated Cut', 'Magnetic Closures', 'Easy-Open Pants'
  const filterOptions = [
    { id: 'All Items', label: 'All Items', icon: Filter },
    { id: 'Seated Cut', label: 'Seated Cut', icon: ShieldCheck },
    { id: 'Magnetic Closures', label: 'Magnetic Closures', icon: Magnet },
    { id: 'Easy-Open Pants', label: 'Easy-Open Pants', icon: SlidersHorizontal }
  ]

  // Filter Logic
  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      // 1. Tag Filter
      const matchesFilter = selectedFilter === 'All Items' 
        ? true 
        : item.filterTags.includes(selectedFilter)

      // 2. Search Query
      const query = searchQuery.toLowerCase().trim()
      const matchesQuery = query === '' 
        ? true 
        : (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.primaryFeatureSummary.toLowerCase().includes(query) ||
          item.functionalFeatures.some(f => f.name.toLowerCase().includes(query) || f.detail.toLowerCase().includes(query))
        )

      return matchesFilter && matchesQuery
    })
  }, [selectedFilter, searchQuery])

  // Calculate Profile Compatibility with Item
  const checkCompatibility = (item) => {
    if (!userProfile) return { isMatch: true, note: 'Universal compatibility' }
    
    // Check if item fulfills user's selected preferences
    const fulfillsFastener = userProfile.fasteners?.some(f => 
      (f === 'Magnetic snaps' && item.filterTags.includes('Magnetic Closures')) ||
      (f === 'Side zippers' && item.primaryFeatureSummary.toLowerCase().includes('zipper')) ||
      (f === 'Elastic waist' && item.primaryFeatureSummary.toLowerCase().includes('elastic'))
    )

    const fulfillsMobility = userProfile.mobility === 'Wheelchair/Seated'
      ? item.filterTags.includes('Seated Cut') || item.mobilityMatch.toLowerCase().includes('seated')
      : true

    if (fulfillsFastener || fulfillsMobility) {
      return { isMatch: true, note: 'Matches Your Step 1 Profile' }
    }
    return { isMatch: false, note: 'Alternative Adaptive Cut' }
  }

  return (
    <div className={`space-y-10 ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white shadow-xl shadow-slate-950/20'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-sky-500/20 text-sky-300 border-sky-400/40">
            <ShoppingBag className="w-3.5 h-3.5" /> Feature 3: Adaptive Clothing Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
            Functional Adaptive Garment Catalog
          </h1>
          <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
            Browse our curated collection of shirts, pants, and outerwear. Unlike traditional clothing stores, 
            every card highlights <strong>physical functional engineering features</strong> — from flat seams and magnetic plackets 
            to seated rise cuts and dual side-opening zippers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Functional Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider mr-1 ${
              highContrast ? 'text-yellow-300' : 'text-slate-500'
            }`}>
              Filters:
            </span>
            {filterOptions.map((filter) => {
              const IconComp = filter.icon
              const isSelected = selectedFilter === filter.id
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all min-h-[42px] ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black ring-2 ring-white shadow-md'
                        : 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-500/20'
                      : highContrast
                        ? 'bg-zinc-900 text-zinc-300 hover:border-yellow-400 border border-zinc-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{filter.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              )
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[260px]">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              highContrast ? 'text-yellow-400' : 'text-slate-400'
            }`} />
            <input 
              type="text"
              placeholder="Search functional features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                highContrast 
                  ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-400' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-sky-500'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Active Filter Metrics */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
          <span className={highContrast ? 'text-zinc-300' : 'text-slate-600'}>
            Showing <strong>{filteredItems.length}</strong> of 6 adaptive garments
            {selectedFilter !== 'All Items' && <span> &bull; Filtered by <strong>"{selectedFilter}"</strong></span>}
          </span>
          {selectedFilter !== 'All Items' && (
            <button
              onClick={() => setSelectedFilter('All Items')}
              className="text-sky-600 hover:text-sky-500 font-bold underline"
            >
              Reset to All
            </button>
          )}
        </div>
      </div>

      {/* Responsive 6-Item Adaptive Apparel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredItems.map((item) => {
          const compat = checkCompatibility(item)
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between group ${
                highContrast 
                  ? 'bg-black border-zinc-800 hover:border-yellow-400 text-white' 
                  : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-xl hover:shadow-slate-200/60 text-slate-900'
              }`}
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    highContrast ? 'bg-yellow-400 text-black' : 'bg-slate-900/80 backdrop-blur-md text-white'
                  }`}>
                    {item.category}
                  </span>

                  {/* Profile Match Badge */}
                  {compat.isMatch && (
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md ${
                      highContrast 
                        ? 'bg-black text-yellow-300 border border-yellow-400' 
                        : 'bg-emerald-600 text-white'
                    }`}>
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      {compat.note}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  
                  {/* Item Title & Price */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-lg font-heading leading-snug">
                      {item.name}
                    </h3>
                    <span className={`font-mono font-black text-base flex-shrink-0 ${
                      highContrast ? 'text-yellow-400' : 'text-slate-800'
                    }`}>
                      {item.price}
                    </span>
                  </div>

                  {/* HIGHLIGHTED PHYSICAL FUNCTIONAL FEATURES (Crucial Requirement) */}
                  <div className={`mt-3 p-3 rounded-xl border ${
                    highContrast 
                      ? 'bg-zinc-900 border-yellow-400 text-yellow-300' 
                      : 'bg-sky-50/80 border-sky-200 text-sky-900'
                  }`}>
                    <div className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      Physical Functional Features:
                    </div>
                    <div className="font-bold text-xs sm:text-sm tracking-tight">
                      {item.primaryFeatureSummary}
                    </div>
                  </div>

                  {/* Quick Feature Bullet Points */}
                  <div className="mt-4 space-y-1.5 text-xs">
                    {item.functionalFeatures.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          highContrast ? 'text-yellow-400' : 'text-emerald-600'
                        }`} />
                        <span className={highContrast ? 'text-zinc-300' : 'text-slate-600'}>
                          <strong>{feat.name}:</strong> {feat.detail}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className={`p-6 pt-0 border-t mt-4 ${
                highContrast ? 'border-zinc-800' : 'border-slate-100'
              }`}>
                <div className="pt-4 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className={`flex-1 min-w-[100px] py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                      highContrast
                        ? 'bg-zinc-900 text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-black'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>

                  <button
                    type="button"
                    onClick={onNavigateToScanner}
                    className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                      highContrast
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100'
                    }`}
                    title="Send item into AI Scanner to verify fit"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateToCustomization && onNavigateToCustomization(item)}
                    className={`flex-1 min-w-[120px] py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                      highContrast
                        ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                    }`}
                    title="Request custom adaptive modifications by certified tailors"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Alterations</span>
                  </button>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* Functional Specifications Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className={`max-w-xl w-full rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all relative ${
              highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg border text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-800'
              }`}>
                {activeModalItem.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Mobility: {activeModalItem.mobilityMatch}
              </span>
            </div>

            <h3 className="text-2xl font-black font-heading mb-2">
              {activeModalItem.name}
            </h3>

            <div className={`p-3 rounded-xl border mb-5 ${
              highContrast ? 'bg-zinc-900 border-yellow-400 text-yellow-300' : 'bg-sky-50 border-sky-200 text-sky-900'
            }`}>
              <div className="text-[11px] font-black uppercase tracking-wider mb-1">
                Engineering Focus:
              </div>
              <div className="font-bold text-sm">
                {activeModalItem.primaryFeatureSummary}
              </div>
            </div>

            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Complete Physical Functional Breakdown:
            </h4>
            
            <div className="space-y-3">
              {activeModalItem.functionalFeatures.map((feat, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-xs ${
                    highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm text-sky-600 mb-0.5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feat.name}
                  </div>
                  <p className={`leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="font-mono text-xl font-black">{activeModalItem.price}</span>
              <button
                type="button"
                onClick={() => {
                  setActiveModalItem(null)
                  if (onNavigateToScanner) onNavigateToScanner()
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 ${
                  highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white hover:bg-sky-500'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Run AI Garment Scan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
