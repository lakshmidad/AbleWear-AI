import React, { useState, useRef, useEffect } from 'react'
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  Eye, 
  Magnet, 
  SlidersHorizontal, 
  Tag, 
  Scissors, 
  Layers, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Cpu,
  Image as ImageIcon,
  Check,
  X
} from 'lucide-react'

// Sample Curated Adaptive Garments
const SAMPLE_GARMENTS = [
  {
    id: 'sample-shirt',
    name: 'Adaptive Magnetic Oxford Shirt',
    category: 'Tops & Shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Classic crisp white button-down secretly powered by hidden front magnetic snap fasteners and a tagless interior collar.',
    detectedFeatures: [
      {
        id: 'feat-1',
        label: 'Magnetic Snap Detected',
        category: 'Fasteners',
        confidence: 98,
        x: 48, // percentage for visual overlay on photo
        y: 42,
        icon: Magnet,
        details: 'Hidden neo-magnet closures behind decorative resin faux-buttons. 1-second closure.'
      },
      {
        id: 'feat-2',
        label: 'Tagless Neck',
        category: 'Sensory',
        confidence: 99,
        x: 50,
        y: 18,
        icon: Tag,
        details: 'Thermal printed sizing and care instruction matrix. Zero scratchy nylon.'
      },
      {
        id: 'feat-3',
        label: 'Easy-Pull Side Zipper',
        category: 'Mobility & Dressing',
        confidence: 92,
        x: 74,
        y: 65,
        icon: SlidersHorizontal,
        details: 'Discreet 10-inch side seam zipper with loop pull for overhead dressing ease.'
      },
      {
        id: 'feat-4',
        label: 'Flat Seams',
        category: 'Sensory',
        confidence: 94,
        x: 28,
        y: 32,
        icon: Scissors,
        details: 'Ultra-flat soft-stitch shoulder and armhole construction.'
      }
    ]
  },
  {
    id: 'sample-pants',
    name: 'Seated-Cut Adaptive Ergonomic Chino',
    category: 'Bottoms & Trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored trousers engineered with high-rise back coverage, seamless seat, and full-length side-zip leg openings.',
    detectedFeatures: [
      {
        id: 'feat-5',
        label: 'Easy-Pull Side Zipper',
        category: 'Fasteners',
        confidence: 97,
        x: 68,
        y: 50,
        icon: SlidersHorizontal,
        details: 'Full-length 2-way side zippers allowing the pant legs to open flat.'
      },
      {
        id: 'feat-6',
        label: 'Magnetic Snap Detected',
        category: 'Fasteners',
        confidence: 95,
        x: 48,
        y: 18,
        icon: Magnet,
        details: 'Reinforced magnetic waistband closure with faux-button aesthetic.'
      },
      {
        id: 'feat-7',
        label: 'Tagless Neck / Waist',
        category: 'Sensory',
        confidence: 96,
        x: 35,
        y: 15,
        icon: Tag,
        details: 'Printed inner waistband eliminates irritating brand labels.'
      },
      {
        id: 'feat-8',
        label: 'Flat Seams & Pocketless Seat',
        category: 'Mobility',
        confidence: 98,
        x: 50,
        y: 70,
        icon: ShieldCheck,
        details: 'Zero rear pockets and ultra-flat seams to prevent pressure sores while seated.'
      }
    ]
  },
  {
    id: 'sample-tee',
    name: 'Sensory Cloud Adaptive Everyday Tee',
    category: 'Loungewear & Tees',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: '100% organic combed cotton with magnetic shoulder opening and completely flat inner seams.',
    detectedFeatures: [
      {
        id: 'feat-9',
        label: 'Tagless Neck',
        category: 'Sensory',
        confidence: 99,
        x: 50,
        y: 20,
        icon: Tag,
        details: 'Direct heat-transfer collar label. 0% skin irritation.'
      },
      {
        id: 'feat-10',
        label: 'Magnetic Snap Detected',
        category: 'Fasteners',
        confidence: 93,
        x: 32,
        y: 26,
        icon: Magnet,
        details: 'Left shoulder magnetic seam opening for easy slip-on without neck stretching.'
      },
      {
        id: 'feat-11',
        label: 'Flat Seams',
        category: 'Sensory',
        confidence: 97,
        x: 48,
        y: 55,
        icon: Scissors,
        details: 'Seamless sides and bonded seams preventing pressure points.'
      }
    ]
  }
]

export default function GarmentScanner({ userProfile, highContrast, largeText, onNavigateToProfile }) {
  // State
  const [selectedGarment, setSelectedGarment] = useState(SAMPLE_GARMENTS[0])
  const [customImage, setCustomImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStageText, setScanStageText] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [activeTag, setActiveTag] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Trigger initial scan for default garment
  useEffect(() => {
    runScanSimulation(SAMPLE_GARMENTS[0])
  }, [])

  // Calculate Match Score dynamically against userProfile from Feature 1
  const calculateMatchScore = (garment, profile) => {
    if (!profile) return { score: 94, breakdown: [] }

    let totalWeight = 0
    let matchedWeight = 0
    const breakdown = []

    // 1. Check Fastener Preferences
    if (profile.fasteners && profile.fasteners.length > 0) {
      const fastenerFeatures = garment.detectedFeatures.filter(f => 
        f.label.includes('Magnetic') || f.label.includes('Zipper') || f.label.includes('Velcro')
      )
      profile.fasteners.forEach(userPref => {
        totalWeight += 25
        const matched = fastenerFeatures.some(f => 
          (userPref === 'Magnetic snaps' && f.label.includes('Magnetic')) ||
          (userPref === 'Side zippers' && f.label.includes('Zipper')) ||
          (userPref === 'Velcro' && f.label.includes('Velcro'))
        )
        if (matched) {
          matchedWeight += 25
          breakdown.push({ criteria: `Fastener: ${userPref}`, matched: true, detail: `Garment features compatible ${userPref.toLowerCase()}` })
        } else {
          // partial credit if garment has other adaptive fasteners
          if (fastenerFeatures.length > 0) matchedWeight += 12
          breakdown.push({ criteria: `Fastener: ${userPref}`, matched: false, detail: `Requested ${userPref}, but garment provides alternative adaptive closures` })
        }
      })
    } else {
      totalWeight += 25
      matchedWeight += 25
      breakdown.push({ criteria: 'Fasteners', matched: true, detail: 'No special fastener restrictions configured' })
    }

    // 2. Check Sensory Needs
    if (profile.sensory && profile.sensory.length > 0) {
      profile.sensory.forEach(sensoryPref => {
        totalWeight += 25
        const matched = garment.detectedFeatures.some(f => 
          (sensoryPref === 'Tagless' && f.label.includes('Tagless')) ||
          (sensoryPref === 'Flat seams' && f.label.includes('Flat Seams'))
        )
        if (matched) {
          matchedWeight += 25
          breakdown.push({ criteria: `Sensory: ${sensoryPref}`, matched: true, detail: `Detected verified ${sensoryPref.toLowerCase()}` })
        } else {
          matchedWeight += 10
          breakdown.push({ criteria: `Sensory: ${sensoryPref}`, matched: false, detail: `Could not verify ${sensoryPref.toLowerCase()} from surface scan` })
        }
      })
    } else {
      totalWeight += 25
      matchedWeight += 25
      breakdown.push({ criteria: 'Sensory Comfort', matched: true, detail: 'Standard tactile construction' })
    }

    // 3. Check Mobility Type
    totalWeight += 25
    if (profile.mobility === 'Wheelchair/Seated') {
      const hasSeatedFeature = garment.detectedFeatures.some(f => 
        f.label.includes('Seat') || f.label.includes('Side Zipper') || garment.name.includes('Seated') || garment.name.includes('Shirt')
      )
      if (hasSeatedFeature) {
        matchedWeight += 25
        breakdown.push({ criteria: 'Mobility: Seated Fit', matched: true, detail: 'Non-restrictive cut compatible with seated posture' })
      } else {
        matchedWeight += 15
        breakdown.push({ criteria: 'Mobility: Seated Fit', matched: false, detail: 'Standard cut; may bunch slightly when seated' })
      }
    } else if (profile.mobility === 'Crutches') {
      matchedWeight += 23
      breakdown.push({ criteria: 'Mobility: Crutches', matched: true, detail: 'Comfortable underarm & sleeve range of motion' })
    } else if (profile.mobility === 'Bed-bound') {
      matchedWeight += 22
      breakdown.push({ criteria: 'Mobility: Bed-bound', matched: true, detail: 'Smooth back design with low friction points' })
    } else {
      matchedWeight += 25
      breakdown.push({ criteria: 'Mobility: General', matched: true, detail: 'Universal adaptive compatibility' })
    }

    // 4. Check Dexterity
    totalWeight += 25
    const hasLowEffortFasteners = garment.detectedFeatures.some(f => 
      f.label.includes('Magnetic') || f.label.includes('Easy-Pull')
    )
    if (profile.dexterity && profile.dexterity.length > 0) {
      if (hasLowEffortFasteners) {
        matchedWeight += 25
        breakdown.push({ criteria: 'Dexterity Compatibility', matched: true, detail: 'No small pinching buttons required; low-force closures' })
      } else {
        matchedWeight += 12
        breakdown.push({ criteria: 'Dexterity Compatibility', matched: false, detail: 'Requires moderate finger dexterity' })
      }
    } else {
      matchedWeight += 25
      breakdown.push({ criteria: 'Dexterity Compatibility', matched: true, detail: 'Accessible for diverse manual dexterity levels' })
    }

    // Calculate normalized percentage (typically between 85% and 98% for adaptive clothing)
    let score = Math.round((matchedWeight / totalWeight) * 100)
    if (score > 98) score = 98
    if (score < 68) score = 68

    return { score, breakdown }
  }

  // Execute AI Scan Simulation
  const runScanSimulation = (garmentData) => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResult(null)
    setActiveTag(null)

    const stages = [
      { progress: 20, text: 'Calibrating computer vision neural model...' },
      { progress: 45, text: 'Detecting fasteners: scanning plackets, zippers & snaps...' },
      { progress: 70, text: 'Analyzing collar & seam typography for tagless profile...' },
      { progress: 90, text: 'Cross-referencing with your Accessibility Profile...' },
      { progress: 100, text: 'Accessibility feature extraction complete!' }
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < stages.length) {
        setScanProgress(stages[stepIndex].progress)
        setScanStageText(stages[stepIndex].text)
        stepIndex++
      } else {
        clearInterval(interval)
        setIsScanning(false)
        const matchData = calculateMatchScore(garmentData, userProfile)
        setScanResult({
          garment: garmentData,
          matchScore: matchData.score,
          breakdown: matchData.breakdown
        })
      }
    }, 450)
  }

  // File Upload Handlers
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const objectUrl = URL.createObjectURL(file)
    const customGarment = {
      id: `custom-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, "") || 'Uploaded Custom Garment',
      category: 'User Uploaded Image',
      image: objectUrl,
      description: 'Custom photo analyzed using AbleWear-AI visual inspection pipeline.',
      detectedFeatures: [
        {
          id: 'feat-custom-1',
          label: 'Magnetic Snap Detected',
          category: 'Fasteners',
          confidence: 96,
          x: 50,
          y: 38,
          icon: Magnet,
          details: 'Detected magnetic closure mechanism along garment opening.'
        },
        {
          id: 'feat-custom-2',
          label: 'Easy-Pull Side Zipper',
          category: 'Fasteners',
          confidence: 91,
          x: 72,
          y: 62,
          icon: SlidersHorizontal,
          details: 'Discreet side entry zipper with oversized slider.'
        },
        {
          id: 'feat-custom-3',
          label: 'Tagless Neck',
          category: 'Sensory',
          confidence: 98,
          x: 50,
          y: 18,
          icon: Tag,
          details: 'Collar displays printed regulatory labels with no raised nylon tags.'
        }
      ]
    }
    setSelectedGarment(customGarment)
    setCustomImage(objectUrl)
    runScanSimulation(customGarment)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  return (
    <div className={`space-y-10 ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Feature Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-slate-950/20'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-indigo-500/20 text-indigo-300 border-indigo-400/40">
              <Scan className="w-3.5 h-3.5" /> Feature 2: Computer Vision Pipeline
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
              AI Garment Scanner & Analyzer
            </h1>
            <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
              Upload a garment photograph or choose a sample to run our computer vision accessibility detection. 
              Our neural model detects adaptive closures, tagless interiors, and calculates an instant 
              <strong> Functional Accessibility Match Score</strong> based on your profile from Feature 1.
            </p>
          </div>

          <div className={`p-4 rounded-xl border flex flex-col gap-2 min-w-[240px] ${
            highContrast ? 'bg-zinc-900 border-yellow-400' : 'bg-slate-800/80 border-slate-700'
          }`}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Active User Profile:</span>
              <button 
                onClick={onNavigateToProfile}
                className="text-sky-400 hover:text-sky-300 underline font-semibold normal-case"
              >
                Edit Step 1
              </button>
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {userProfile?.mobility || 'Wheelchair/Seated'}
            </div>
            <div className="text-xs text-slate-300 truncate">
              Fasteners: {userProfile?.fasteners?.join(', ') || 'Magnetic snaps, Side zippers'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Sample Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Zone + Sample Selector */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Drag and Drop Card */}
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-6 sm:p-7 rounded-2xl border-2 border-dashed transition-all text-center relative ${
              isDragOver 
                ? highContrast 
                  ? 'border-yellow-400 bg-zinc-900' 
                  : 'border-sky-500 bg-sky-50/80 scale-[1.01]' 
                : highContrast
                  ? 'bg-black border-zinc-700 hover:border-yellow-400 text-white'
                  : 'bg-white border-slate-300 hover:border-sky-400 text-slate-700 shadow-sm'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />

            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-md ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-600'
            }">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="font-extrabold text-lg mb-1 font-heading">
              Upload Garment Photo
            </h3>
            <p className={`text-xs max-w-xs mx-auto mb-4 ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
              Drag and drop an image file here, or click to browse (PNG, JPG, WebP supported).
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-all shadow-sm ${
                highContrast 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-yellow-400' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Browse Photo
            </button>
          </div>

          {/* Quick Select Preset Samples */}
          <div className={`p-6 rounded-2xl border ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base font-heading">
                  Or Test Curated Adaptive Samples
                </h3>
                <p className={`text-xs mt-0.5 ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                  Select any adaptive garment to trigger an instant AI scan
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-3">
              {SAMPLE_GARMENTS.map((garment) => {
                const isSelected = selectedGarment.id === garment.id
                return (
                  <button
                    key={garment.id}
                    type="button"
                    onClick={() => {
                      setSelectedGarment(garment)
                      runScanSimulation(garment)
                    }}
                    disabled={isScanning}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400'
                          : 'bg-sky-50/80 border-sky-600 text-slate-900 shadow-md ring-2 ring-sky-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <img 
                      src={garment.image} 
                      alt={garment.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                          {garment.category}
                        </span>
                        {isSelected && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white'
                          }`}>
                            Active
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm truncate font-heading">{garment.name}</h4>
                      <p className={`text-xs truncate ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>
                        {garment.detectedFeatures.map(f => f.label).join(' • ')}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Garment Visualizer & AI Detection Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visualizer Container */}
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast 
              ? 'bg-black border-yellow-400 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/40'
          }`}>
            
            {/* Visualizer Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-0.5">
                  Computer Vision Scan View
                </span>
                <h3 className="font-black text-xl font-heading flex items-center gap-2">
                  {selectedGarment.name}
                </h3>
              </div>

              <button
                onClick={() => runScanSimulation(selectedGarment)}
                disabled={isScanning}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start ${
                  highContrast
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-yellow-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Re-Scan Garment</span>
              </button>
            </div>

            {/* Photo Canvas with Overlay Tags */}
            <div className="relative mt-6 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center min-h-[380px] max-h-[480px] border border-slate-800">
              
              {/* Garment Image */}
              <img 
                src={selectedGarment.image} 
                alt={selectedGarment.name}
                className={`w-full h-full object-cover max-h-[480px] transition-all duration-500 ${
                  isScanning ? 'brightness-75 contrast-125' : 'brightness-100'
                }`}
              />

              {/* Computer Vision Scanning Animation Laser */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden">
                  <div className="absolute left-0 right-0 h-1.5 bg-sky-400 shadow-[0_0_20px_4px_rgba(56,189,248,0.9)] animate-pulse"
                    style={{
                      top: `${scanProgress}%`,
                      transition: 'top 0.4s ease-out'
                    }}
                  />
                  {/* Grid Overlay Matrix */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
                  {/* Scanning HUD Overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-sky-400 text-sky-400 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2">
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>AI Model: CV-Adaptive-V2</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-sky-500 text-white p-4 rounded-xl">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-sky-300">{scanStageText}</span>
                      <span className="font-mono text-sky-400">{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Highlighted Visual Tags on the Clothing Photo */}
              {!isScanning && selectedGarment.detectedFeatures.map((feat) => {
                const IconComponent = feat.icon
                const isActive = activeTag?.id === feat.id
                return (
                  <div
                    key={feat.id}
                    style={{ left: `${feat.x}%`, top: `${feat.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    {/* Visual Pulse Pin */}
                    <button
                      type="button"
                      onClick={() => setActiveTag(isActive ? null : feat)}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 ${
                        highContrast
                          ? 'bg-yellow-400 text-black ring-4 ring-black border border-white'
                          : isActive
                            ? 'bg-sky-500 text-white ring-4 ring-sky-300 shadow-sky-500/50'
                            : 'bg-slate-900/90 backdrop-blur-md text-white border border-sky-400/60 hover:bg-sky-600'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
                      <IconComponent className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                      <span className="whitespace-nowrap tracking-tight">{feat.label}</span>
                    </button>

                    {/* Quick Tooltip on Hover / Click */}
                    {isActive && (
                      <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-3 rounded-xl border text-xs z-30 shadow-2xl animate-fade-in ${
                        highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-slate-900/95 backdrop-blur-md text-white border-slate-700'
                      }`}>
                        <div className="flex items-center justify-between font-bold text-sky-400 mb-1">
                          <span>{feat.category}</span>
                          <span className="text-[10px] text-emerald-400 font-mono">{feat.confidence}% Conf.</span>
                        </div>
                        <p className="text-slate-300 leading-snug">{feat.details}</p>
                      </div>
                    )}
                  </div>
                )
              })}

            </div>

            {/* AI Scan Results: Functional Accessibility Match Score Card */}
            {scanResult && !isScanning && (
              <div className="mt-6 space-y-5">
                
                {/* Score Hero Banner */}
                <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-5 ${
                  highContrast 
                    ? 'bg-zinc-900 border-yellow-400 text-white' 
                    : 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-sky-950/80 border-emerald-500/40 text-white shadow-lg'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl border ${
                      highContrast 
                        ? 'bg-yellow-400 text-black border-white' 
                        : 'bg-emerald-500 text-white border-emerald-300 shadow-lg shadow-emerald-500/30'
                    }`}>
                      {scanResult.matchScore}%
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                          Profile Match Verified
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                        Functional Accessibility Match Score
                      </h4>
                      <p className={`text-xs mt-0.5 ${highContrast ? 'text-zinc-300' : 'text-slate-300'}`}>
                        Calculated against active profile: <strong>{userProfile?.mobility || 'Wheelchair/Seated'}</strong>
                      </p>
                    </div>
                  </div>

                  <div className={`text-xs px-3 py-1.5 rounded-full font-bold self-center sm:self-auto ${
                    highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {scanResult.matchScore >= 90 ? 'Excellent Match' : 'High Compatibility'}
                  </div>
                </div>

                {/* Detected Feature Badges Grid */}
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                    highContrast ? 'text-yellow-300' : 'text-slate-500'
                  }`}>
                    Highlighted Visual Features Detected on Photo:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedGarment.detectedFeatures.map((feat) => {
                      const IconComp = feat.icon
                      return (
                        <div 
                          key={feat.id}
                          onClick={() => setActiveTag(feat)}
                          className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                            activeTag?.id === feat.id
                              ? highContrast 
                                ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400' 
                                : 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                              : highContrast
                                ? 'bg-black border-zinc-800 text-zinc-300 hover:border-yellow-400/50'
                                : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-0.5 ${
                            highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-100 text-sky-700'
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-sm">{feat.label}</span>
                              <span className="text-[10px] font-mono text-emerald-600 font-bold">{feat.confidence}%</span>
                            </div>
                            <p className={`text-xs mt-0.5 leading-snug ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>
                              {feat.details}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Profile Compatibility Matrix */}
                <div className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                  highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="font-bold flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="uppercase tracking-wider text-[11px]">Feature 1 Profile Compatibility Breakdown</span>
                    <span className="text-sky-600 font-bold">{scanResult.breakdown.filter(b => b.matched).length} of {scanResult.breakdown.length} Criteria Fulfilled</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {scanResult.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {item.matched ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="leading-snug">
                          <strong>{item.criteria}:</strong> {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}
