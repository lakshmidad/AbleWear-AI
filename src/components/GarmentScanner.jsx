import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Zap,
  Target,
  Loader2,
  FileCheck,
  Maximize2,
  Info
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'
import { SAMPLE_GARMENTS } from '../data/garmentData'

export default function GarmentScanner() {
  const { 
    userProfile, 
    scannedGarment, 
    setScannedGarment,
    isScanning,
    scanProgress,
    scanCompleted,
    detectionTags,
    activeMatch,
    triggerGarmentScan,
    setCurrentStep,
    highContrast,
    speak 
  } = useAccessibility()

  const [activeTagHover, setActiveTagHover] = useState(null)
  const [isProcessingAdvance, setIsProcessingAdvance] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadFileDetails, setUploadFileDetails] = useState(null)
  const fileInputRef = useRef(null)

  // Handle sample selection
  const handleSelectSample = (sample) => {
    setUploadFileDetails(null)
    triggerGarmentScan(sample)
    speak(`Selected ${sample.name}. Scanning for adaptive mechanisms.`)
  }

  // Handle custom file upload via input
  const processUploadedFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target.result
      const customGarment = {
        id: `upload-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, "") || 'Custom Uploaded Garment',
        category: 'Custom Device Upload',
        image: dataUrl,
        description: 'Uploaded clothing item processed through computer vision neural network for adaptive closures.',
        features: ['Magnetic Snaps', 'Tagless Inner Collar', 'Flat-Felled Soft Seams', 'Easy-Pull Side Zippers'],
        detectionTags: [
          { id: 'ct1', label: 'Magnetic Closure Zone Detected', x: 50, y: 44, confidence: 0.98, type: 'dexterity' },
          { id: 'ct2', label: 'Tagless Neck', x: 50, y: 16, confidence: 0.96, type: 'sensory' },
          { id: 'ct3', label: 'Side Seam Zipper', x: 74, y: 56, confidence: 0.94, type: 'dexterity' },
          { id: 'ct4', label: 'Flat Low-Friction Seams', x: 28, y: 62, confidence: 0.91, type: 'sensory' }
        ]
      }

      setUploadFileDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type
      })

      triggerGarmentScan(customGarment)
      speak(`Uploaded ${file.name}. Computer vision scanner detecting magnetic closures and seams.`)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processUploadedFile(file)
    }
  }

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processUploadedFile(file)
    }
  }

  // Auto-advance button: 'Continue to Matched Catalog'
  const handleContinueToCatalog = () => {
    setIsProcessingAdvance(true)
    speak('Continuing to Matched Catalog.')
    setTimeout(() => {
      setIsProcessingAdvance(false)
      setCurrentStep(3)
    }, 1200)
  }

  const scoreBadgeColor = activeMatch.score >= 85 
    ? highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-emerald-600 text-white'
    : highContrast ? 'bg-yellow-500 text-black' : 'bg-amber-500 text-white'

  return (
    <div className="w-full max-w-[1200px] mx-auto py-2 px-0 sm:px-2">
      {/* Header Card */}
      <div className={`p-6 sm:p-7 rounded-2xl mb-8 border transition-all ${
        highContrast 
          ? 'bg-zinc-950 border-yellow-400 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-teal-100 text-teal-800 border border-teal-200'
              }`}>
                Step 2 of 4
              </span>
              <span className={`text-xs ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>
                Computer Vision Detection Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Dynamic AI Garment Scanner
            </h1>
            <p className={`mt-1.5 text-sm max-w-2xl leading-relaxed ${
              highContrast ? 'text-zinc-300' : 'text-slate-600'
            }`}>
              Drag and drop ANY custom clothing image from your device or select sample garments. The computer vision engine renders real-time interactive bounding box overlays and dynamically computes your Functional Accessibility Match Score.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => triggerGarmentScan(scannedGarment)}
              disabled={isScanning}
              aria-label="Re-run scanner"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border min-h-[44px] transition-colors focus:ring-4 focus:ring-teal-400 ${
                highContrast 
                  ? 'border-zinc-700 bg-zinc-800 text-yellow-300 hover:bg-zinc-700' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              Re-Scan Elements
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Scanner & Uploader | Right Dynamic Match Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Dynamic Image Renderer & Upload Zone */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visualizer Card */}
          <div className={`p-6 rounded-3xl border relative overflow-hidden transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scan className={highContrast ? 'text-yellow-400' : 'text-teal-600'} />
                <h2 className="text-base sm:text-lg font-black font-heading">
                  Interactive CV Inspection Canvas
                </h2>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                isScanning 
                  ? highContrast ? 'bg-yellow-400 text-black font-black' : 'bg-teal-100 text-teal-800'
                  : highContrast ? 'bg-zinc-800 text-yellow-300' : 'bg-slate-100 text-slate-700'
              }`}>
                {isScanning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    CV Analysis: {scanProgress}%
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {detectionTags.length} Adaptive Zones Detected
                  </>
                )}
              </span>
            </div>

            {/* Garment Image Canvas with Laser Radar Beam Animation */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border-2 transition-all group ${
                isDragging 
                  ? 'border-cyan-400 ring-4 ring-cyan-400/40 scale-[1.01]' 
                  : highContrast ? 'border-yellow-400/60' : 'border-slate-800'
              }`}
            >
              <img 
                src={scannedGarment.image} 
                alt={scannedGarment.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isScanning ? 'opacity-75 filter saturate-150 contrast-125' : 'opacity-95'
                }`} 
              />

              {/* Grid / Tech Scanning Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              
              {/* Scanning Laser / Radar Beam Animation */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Horizontal Laser Line */}
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] z-30"
                  />
                  
                  {/* Radar Sweep Effect */}
                  <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[1px] animate-pulse" />
                  
                  {/* High-Tech Reticle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 border-2 border-cyan-400/60 rounded-full animate-ping" />
                    <div className="absolute w-36 h-36 border border-dashed border-cyan-300/40 rounded-full animate-spin" />
                    <div className="text-cyan-300 text-[11px] font-black uppercase tracking-widest mt-16 bg-black/80 px-2 py-0.5 rounded">
                      Scanning Matrix...
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Interactive Bounding Box Overlays */}
              {!isScanning && detectionTags.map((tag) => {
                const isHovered = activeTagHover === tag.id

                return (
                  <div
                    key={tag.id}
                    style={{ top: `${tag.y}%`, left: `${tag.x}%` }}
                    onMouseEnter={() => setActiveTagHover(tag.id)}
                    onMouseLeave={() => setActiveTagHover(null)}
                    onClick={() => speak(`Detected ${tag.label} with ${Math.round(tag.confidence * 100)}% confidence.`)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`${tag.label}: ${Math.round(tag.confidence * 100)}% confidence`}
                  >
                    {/* Bounding Box Outline */}
                    <div className={`w-14 h-14 -translate-x-1/2 -translate-y-1/2 absolute border-2 rounded-xl transition-all ${
                      isHovered
                        ? 'border-yellow-400 bg-yellow-400/30 scale-110 shadow-[0_0_15px_#facc15]'
                        : highContrast 
                          ? 'border-yellow-400 bg-yellow-400/20' 
                          : 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                    }`} />

                    {/* Pin Target Dot */}
                    <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-transform ${
                      highContrast ? 'bg-yellow-400' : 'bg-cyan-500'
                    } group-hover:scale-125`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>

                    {/* Interactive Label Badge */}
                    <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-black shadow-xl transition-all pointer-events-none ${
                      isHovered
                        ? 'bg-yellow-400 text-black border-2 border-black scale-105'
                        : highContrast
                          ? 'bg-yellow-400 text-black border border-black'
                          : 'bg-slate-950/90 text-cyan-300 border border-cyan-400/60 backdrop-blur-md'
                    }`}>
                      {tag.label}
                    </div>
                  </div>
                )
              })}

              {/* Drag-and-drop file upload overlay bar */}
              <div className={`absolute bottom-3 left-3 right-3 rounded-xl p-3 flex items-center justify-between text-xs transition-all border ${
                isDragging 
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200' 
                  : 'bg-black/75 backdrop-blur-md text-slate-200 border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <UploadCloud className={`w-4 h-4 ${isDragging ? 'animate-bounce text-cyan-300' : 'text-cyan-400'}`} />
                  <span>
                    {isDragging ? 'Drop custom clothing photo here!' : 'Drop any custom clothing image here to scan'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold text-[11px] transition-colors min-h-[36px]"
                >
                  Upload From Device
                </button>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInputChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Garment Title, Upload Feedback & Description */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">
                    {scannedGarment.name}
                  </h3>
                  {uploadFileDetails && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 flex items-center gap-1">
                      <FileCheck className="w-3 h-3" /> Custom File ({uploadFileDetails.size})
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {scannedGarment.description}
                </p>
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-lg shrink-0 ${
                highContrast ? 'bg-zinc-800 text-yellow-400 border border-yellow-400' : 'bg-slate-100 text-slate-800'
              }`}>
                ${scannedGarment.basePrice || 48}.00 MSRP
              </span>
            </div>
          </div>

          {/* Sample Clothing Selector Cards (Fallback / Demonstration) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Or Select Pre-Loaded Adaptive Sample:
              </span>
              <span className="text-xs text-slate-400">Click to switch scan target</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_GARMENTS.map(sample => {
                const isSelected = scannedGarment.id === sample.id

                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    aria-pressed={isSelected}
                    className={`p-2.5 rounded-2xl border-2 text-left transition-all min-h-[120px] flex flex-col justify-between focus:ring-4 focus:ring-teal-400 ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 ring-4 ring-yellow-400/40 text-white'
                          : 'bg-teal-50/70 border-teal-600 ring-2 ring-teal-200 text-slate-900 shadow-md'
                        : highContrast
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-slate-100">
                      <img 
                        src={sample.image} 
                        alt={sample.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs line-clamp-1">{sample.name}</div>
                      <span className={`text-[10px] font-bold block mt-0.5 ${
                        isSelected 
                          ? highContrast ? 'text-yellow-400' : 'text-teal-700'
                          : 'text-slate-500'
                      }`}>
                        {sample.features[0]}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Match Score Engine & Algorithmic Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Match Score Badge Card */}
          <div className={`p-6 sm:p-7 rounded-3xl border transition-all ${
            highContrast ? 'bg-zinc-950 border-yellow-400 text-white' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Match Score Engine
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                highContrast ? 'bg-zinc-800 text-yellow-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                Step 1 Profile: {userProfile.mobility.split('/')[0]}
              </span>
            </div>

            {/* Big Score Header */}
            <div className="flex items-center gap-5 my-2">
              <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl shadow-lg shrink-0 ${scoreBadgeColor}`}>
                <span>{activeMatch.score}%</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-90">Match</span>
              </div>
              <div>
                <h3 className="text-xl font-black font-heading leading-tight">
                  {activeMatch.score >= 85 ? 'High Accessibility Fit' : 'Moderate Compatibility'}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Cross-referenced with your Step 1 dexterity, posture, and sensory parameters.
                </p>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>Functional Accessibility Match</span>
                <span>{activeMatch.score} / 100%</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-slate-200 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${activeMatch.score}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    activeMatch.score >= 85 
                      ? highContrast ? 'bg-yellow-400' : 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Detected Computer Vision Features */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-500" />
                Detected Adaptive Zones
              </h4>
              <div className="space-y-2.5">
                {detectionTags.map(tag => (
                  <div 
                    key={tag.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                      highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-500" />
                      <span>{tag.label}</span>
                    </div>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded ${
                      highContrast ? 'bg-zinc-800 text-yellow-300' : 'bg-cyan-100 text-cyan-900'
                    }`}>
                      {Math.round(tag.confidence * 100)}% Confidence
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Match Breakdown Bullets */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                Algorithmic Match Breakdown
              </h4>
              <ul className="space-y-2.5">
                {activeMatch.breakdown.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                      highContrast ? 'text-yellow-400' : 'text-emerald-600'
                    }`} />
                    <span className={highContrast ? 'text-zinc-200' : 'text-slate-700'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Auto-Advance Button: 'Continue to Matched Catalog' */}
            <div className="mt-7">
              <button
                onClick={handleContinueToCatalog}
                id="continue-to-matched-catalog-btn"
                disabled={isProcessingAdvance}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all min-h-[52px] shadow-xl focus:ring-4 focus:ring-teal-400 ${
                  highContrast
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-4 ring-yellow-400/40'
                    : 'bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white'
                }`}
              >
                {isProcessingAdvance ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading Matched Catalog...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Matched Catalog</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
