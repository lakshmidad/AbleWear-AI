import React, { useState } from 'react'
import { 
  Accessibility, 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal, 
  Scissors, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  RotateCcw,
  Zap,
  HelpCircle,
  Eye
} from 'lucide-react'

export default function FitSimulator({ 
  userProfile, 
  highContrast, 
  largeText, 
  onNavigateToCustomization 
}) {
  // State
  const [pose, setPose] = useState('seated') // 'standing' | 'seated'
  const [cutType, setCutType] = useState('adaptive') // 'adaptive' | 'standard'
  const [selectedGarment, setSelectedGarment] = useState('chinos') // 'chinos' | 'shirt' | 'parka'
  const [activeHotspot, setActiveHotspot] = useState(null)

  // Data per Pose and Cut Type
  const fitData = {
    standing: {
      standard: {
        score: 88,
        label: 'Neutral Standing Fit',
        backPulling: 'Minimal (Neutral vertical gravity)',
        lapBunching: 'None (Legs vertical)',
        seamStretch: 'Standard 2% mechanical stretch',
        adjustments: [
          { label: 'Waist Alignment', val: 'Standard alignment at natural waist' },
          { label: 'Hem Length', val: 'Standard standing break over shoe' }
        ]
      },
      adaptive: {
        score: 92,
        label: 'Optimized Standing Fit',
        backPulling: 'Zero tension (Contoured waistband)',
        lapBunching: 'Zero bunching',
        seamStretch: 'Balanced 4-way flexibility',
        adjustments: [
          { label: 'Comfort Fit', val: 'Discreet stretch zones concealed within seams' }
        ]
      }
    },
    seated: {
      standard: {
        score: 58,
        label: 'Severe Seated Strain Detected',
        backPulling: 'High (Waist pulls down 2.5 inches, exposing lower back)',
        lapBunching: 'Excessive (3 thick fabric folds bunch across lower abdomen & groin)',
        seamStretch: 'Critical (High friction & knee seam pulling)',
        adjustments: [
          { label: 'Back Length Needed', val: '+2.0 to +2.5 inches back rise needed to prevent gap' },
          { label: 'Front Lap Reduction', val: '-1.5 inches excess lap fabric reduction recommended' },
          { label: 'Knee Flex Ease', val: '+15% lateral seam elasticity needed for 90° knee angle' },
          { label: 'Rear Pocket Relief', val: 'Remove rear pockets and thick seams to prevent pressure sores' }
        ]
      },
      adaptive: {
        score: 96,
        label: 'Optimal Adaptive Seated Fit',
        backPulling: 'Zero (3-inch high-rise back keeps lower spine covered)',
        lapBunching: 'Zero (Curved seated belly cut eliminates excess bulk)',
        seamStretch: 'Smooth (Articulated knees with 4-way lateral expansion)',
        adjustments: [
          { label: 'Ergonomic Seated Rise', val: '+2.0 inches integrated permanent back rise' },
          { label: 'Front Flat Silhouette', val: 'Sculpted lap panel lies completely flat when sitting' },
          { label: 'Full Seated Coverage', val: 'Zero waistband creep; stays securely anchored' },
          { label: 'Pocketless Pressure-Free Seat', val: 'Zero rear seams or rivets against wheelchair back' }
        ]
      }
    }
  }

  const currentMetrics = fitData[pose][cutType]

  // Hotspots for visual simulation
  const hotspots = pose === 'seated' ? [
    {
      id: 'back-pull',
      title: 'Back Fabric Pulling',
      type: cutType === 'standard' ? 'danger' : 'success',
      x: 32,
      y: 38,
      status: cutType === 'standard' ? 'High Tension / Exposure' : 'Contoured Full Coverage',
      detail: cutType === 'standard' 
        ? 'Standard pants pull down 2+ inches when hips flex to 90°, exposing lower back.' 
        : 'AbleWear 3-inch extended rear rise stays anchored, preventing draft and skin exposure.'
    },
    {
      id: 'lap-bunch',
      title: 'Lap Fabric Bunching',
      type: cutType === 'standard' ? 'danger' : 'success',
      x: 52,
      y: 45,
      status: cutType === 'standard' ? 'Bulky Folds & Discomfort' : 'Sculpted Flat Fit',
      detail: cutType === 'standard'
        ? 'Straight-cut trousers fold into thick, uncomfortable rolls across the lower abdomen and groin.'
        : 'Curved abdominal contour removes excess fabric, keeping lap smooth and comfortable.'
    },
    {
      id: 'knee-strain',
      title: 'Knee & Quadricep Seam Stretch',
      type: cutType === 'standard' ? 'warning' : 'success',
      x: 74,
      y: 48,
      status: cutType === 'standard' ? 'Tightly Stretched' : 'Articulated Flex Panels',
      detail: cutType === 'standard'
        ? 'Rigid denim or twill tightens across knees, pulling cuffs 3 inches up the shins.'
        : 'Patterned articulated knee darts and 4-way lateral stretch maintain full ankle coverage.'
    },
    {
      id: 'seat-pressure',
      title: 'Pressure Sore Prevention Zone',
      type: cutType === 'standard' ? 'danger' : 'success',
      x: 38,
      y: 52,
      status: cutType === 'standard' ? 'High Pressure Seams' : 'Zero-Seam Smooth Seat',
      detail: cutType === 'standard'
        ? 'Rear wallet pockets and thick back yokes create high-risk ischemic pressure ulcers.'
        : 'Completely seamless, flat rear construction eliminating all pressure points.'
    }
  ] : [
    {
      id: 'standing-waist',
      title: 'Waistband Position',
      type: 'success',
      x: 48,
      y: 36,
      status: 'Standard Neutral',
      detail: 'Neutral fabric drape with gravity pulling fabric straight down.'
    },
    {
      id: 'standing-hem',
      title: 'Ankle Break',
      type: 'success',
      x: 50,
      y: 85,
      status: 'Even Hem Line',
      detail: 'Trouser hem breaks evenly over shoes in upright posture.'
    }
  ]

  const handleSendToTailor = () => {
    if (onNavigateToCustomization) {
      onNavigateToCustomization({
        name: 'Seated-Cut Ergonomic Chino Trouser',
        customNotes: 'Automated 3D Simulator Adjustment: +2.0 inches back rise length, -1.5 inches lap fabric reduction'
      })
    }
  }

  return (
    <div className={`space-y-10 ${largeText ? 'text-lg' : 'text-base'}`}>
      
      {/* Feature Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white shadow-xl shadow-slate-950/20'
      }`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border bg-sky-500/20 text-sky-300 border-sky-400/40">
            <Activity className="w-3.5 h-3.5" /> Feature 6: Ergonomic Biomechanical Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
            3D Seated vs. Standing Body Posture Simulator
          </h1>
          <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
            Clothing tailored for standing posture fails when seated in a wheelchair. 
            Toggle between <strong>Standing</strong> and <strong>Seated Wheelchair</strong> poses to visualize 
            back fabric pulling, lap bunching, and seam strain heatmaps, complete with our dynamic 
            <strong> Seated Comfort Score</strong> and tailoring adjustments.
          </p>
        </div>
      </div>

      {/* Main Interactive Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Posture & Strain Heatmap Canvas */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            {/* Controls Bar: Pose Toggle + Pattern Cut Comparison */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-4">
              
              {/* Pose Switcher */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Select Body Posture:
                </label>
                <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setPose('standing')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      pose === 'standing'
                        ? highContrast
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400'
                    }`}
                  >
                    Standing Pose
                  </button>
                  <button
                    type="button"
                    onClick={() => setPose('seated')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      pose === 'seated'
                        ? highContrast
                          ? 'bg-yellow-400 text-black'
                          : 'bg-sky-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400'
                    }`}
                  >
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>Seated Wheelchair Pose</span>
                  </button>
                </div>
              </div>

              {/* Pattern Comparison Toggle */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  highContrast ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  Pattern Cut:
                </label>
                <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setCutType('standard')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      cutType === 'standard'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400'
                    }`}
                  >
                    Off-the-Rack Cut
                  </button>
                  <button
                    type="button"
                    onClick={() => setCutType('adaptive')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      cutType === 'adaptive'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AbleWear Adaptive</span>
                  </button>
                </div>
              </div>

            </div>

            {/* 3D Visual Rendering Canvas */}
            <div className="relative mt-6 rounded-2xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center min-h-[420px] p-6 border border-slate-800">
              
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Mode Badge HUD */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  pose === 'seated' ? 'bg-sky-950 border-sky-500 text-sky-300' : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}>
                  Pose: {pose.toUpperCase()} (90° Flexion)
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  cutType === 'adaptive' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
                }`}>
                  Pattern: {cutType.toUpperCase()}
                </span>
              </div>

              {/* Graphical Body Silhouette + Biomechanical Strain Visualization */}
              <div className="relative w-full max-w-md h-[340px] flex items-center justify-center">
                
                {pose === 'standing' ? (
                  /* Standing Silhouette Graphic */
                  <svg className="w-48 h-full transition-all duration-500" viewBox="0 0 100 200" fill="none">
                    {/* Head */}
                    <circle cx="50" cy="20" r="10" stroke="#94a3b8" strokeWidth="2.5" fill="#1e293b" />
                    {/* Torso */}
                    <path d="M40 32 L60 32 L56 75 L44 75 Z" stroke="#38bdf8" strokeWidth="2.5" fill="#0369a1" fillOpacity="0.2" />
                    {/* Spine Alignment */}
                    <line x1="50" y1="32" x2="50" y2="75" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    {/* Arms */}
                    <path d="M38 34 L30 70 M62 34 L70 70" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Trousers Legs */}
                    <path d="M44 75 L42 165 L36 165 L40 75" stroke="#38bdf8" strokeWidth="2" fill="#0284c7" fillOpacity="0.15" />
                    <path d="M56 75 L58 165 L64 165 L60 75" stroke="#38bdf8" strokeWidth="2" fill="#0284c7" fillOpacity="0.15" />
                    {/* Shoes */}
                    <path d="M33 165 L43 165 M57 165 L67 165" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : (
                  /* Seated Wheelchair Silhouette Graphic */
                  <svg className="w-64 h-full transition-all duration-500" viewBox="0 0 200 200" fill="none">
                    {/* Wheelchair Geometry */}
                    <circle cx="85" cy="135" r="42" stroke="#475569" strokeWidth="3" strokeDasharray="6 3" />
                    <circle cx="85" cy="135" r="34" stroke="#334155" strokeWidth="1.5" />
                    <line x1="85" y1="135" x2="85" y2="93" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="85" y1="135" x2="120" y2="150" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="85" y1="135" x2="55" y2="150" stroke="#64748b" strokeWidth="1.5" />
                    {/* Wheelchair Frame & Seat */}
                    <path d="M55 70 L65 130 L115 130 M115 130 L125 165 M115 165 L135 165" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Front Caster Wheel */}
                    <circle cx="125" cy="165" r="8" stroke="#64748b" strokeWidth="2" fill="#1e293b" />
                    
                    {/* Human Head */}
                    <circle cx="82" cy="35" r="11" stroke="#cbd5e1" strokeWidth="2.5" fill="#1e293b" />
                    
                    {/* Torso Leaning into Backrest */}
                    <path d="M72 48 L94 48 L90 95 L68 95 Z" stroke="#38bdf8" strokeWidth="2.5" fill="#0284c7" fillOpacity="0.2" />
                    
                    {/* Seated Thighs (Horizontal) */}
                    <path d="M68 95 L140 95 L140 115 L68 115 Z" stroke={cutType === 'standard' ? '#f43f5e' : '#10b981'} strokeWidth="2.5" fill={cutType === 'standard' ? '#f43f5e' : '#10b981'} fillOpacity="0.25" />
                    
                    {/* Lower Legs (Vertical 90°) */}
                    <path d="M140 100 L140 160 L122 160 L122 115" stroke="#38bdf8" strokeWidth="2.5" fill="#0284c7" fillOpacity="0.2" />
                    {/* Foot on Footrest */}
                    <path d="M120 162 L150 162" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />

                    {/* Biomechanical Tension Markers */}
                    {cutType === 'standard' ? (
                      <>
                        {/* Back Waist Gap Tension Arc */}
                        <path d="M65 92 Q60 85 64 78" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray="3 3" className="animate-pulse" />
                        {/* Lap Bunching Folds Tension */}
                        <path d="M98 90 Q106 82 114 90 Q122 82 130 90" stroke="#fbbf24" strokeWidth="3" className="animate-bounce" />
                        {/* Knee Strain Arrow */}
                        <path d="M142 98 L150 106" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        {/* High-Rise Extended Back Cover */}
                        <path d="M68 95 L65 72 L72 72 L72 95 Z" stroke="#10b981" strokeWidth="2.5" fill="#10b981" fillOpacity="0.4" />
                        {/* Smooth Flat Lap Indicator */}
                        <line x1="88" y1="94" x2="135" y2="94" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
                      </>
                    )}
                  </svg>
                )}

                {/* Hotspot Pulse Pins Overlaid on Graphic */}
                {hotspots.map((spot) => {
                  const isSelected = activeHotspot?.id === spot.id
                  return (
                    <div
                      key={spot.id}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(isSelected ? null : spot)}
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full font-black text-xs transition-transform transform hover:scale-125 ${
                          spot.type === 'danger'
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/60 ring-2 ring-rose-300'
                            : spot.type === 'warning'
                              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/60 ring-2 ring-amber-200'
                              : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/60 ring-2 ring-emerald-200'
                        }`}
                        title={spot.title}
                      >
                        <span className="animate-ping absolute inset-0 rounded-full bg-current opacity-40" />
                        <span>!</span>
                      </button>
                    </div>
                  )
                })}

              </div>

              {/* Active Hotspot Inspector Card */}
              {activeHotspot && (
                <div className={`mt-4 p-4 rounded-xl border text-xs max-w-md w-full animate-fade-in ${
                  highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-slate-900/90 backdrop-blur-md border-slate-700 text-white shadow-xl'
                }`}>
                  <div className="flex items-center justify-between font-extrabold text-sm mb-1">
                    <span className={activeHotspot.type === 'danger' ? 'text-rose-400' : 'text-emerald-400'}>
                      {activeHotspot.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                      {activeHotspot.status}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeHotspot.detail}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Seated Comfort Score & Recommended Pattern Adjustments */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            {/* Score Banner */}
            <div className="pb-5 border-b border-slate-200">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-1">
                Biomechanical Ergonomic Metric
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black font-heading">
                  Seated Comfort Score
                </h3>
                <div className={`text-2xl font-black font-mono px-3 py-1 rounded-xl border ${
                  currentMetrics.score >= 90
                    ? highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-rose-50 text-rose-700 border-rose-300'
                }`}>
                  {currentMetrics.score}/100
                </div>
              </div>
              <div className={`text-xs font-bold mt-2 flex items-center gap-1.5 ${
                currentMetrics.score >= 90 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {currentMetrics.score >= 90 ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{currentMetrics.label}</span>
              </div>
            </div>

            {/* Pressure & Fit Points Breakdown (Prompt Requirement) */}
            <div className="space-y-4 my-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${
                highContrast ? 'text-yellow-300' : 'text-slate-500'
              }`}>
                Visual Pressure & Fit Points:
              </h4>

              {/* 1. Back Fabric Pulling */}
              <div className={`p-3.5 rounded-xl border ${
                highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Back Fabric Pulling
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    cutType === 'adaptive' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {cutType === 'adaptive' ? 'Contoured' : 'Gapping Strain'}
                  </span>
                </div>
                <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {currentMetrics.backPulling}
                </p>
              </div>

              {/* 2. Lap Bunching */}
              <div className={`p-3.5 rounded-xl border ${
                highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                    <Layers className="w-3.5 h-3.5" />
                    Lap Fabric Bunching
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    cutType === 'adaptive' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cutType === 'adaptive' ? 'Flat Contour' : 'Fold Bulk'}
                  </span>
                </div>
                <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {currentMetrics.lapBunching}
                </p>
              </div>

              {/* 3. Seam Stretch */}
              <div className={`p-3.5 rounded-xl border ${
                highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400">
                    <Activity className="w-3.5 h-3.5" />
                    Extra Seam Stretch
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                    cutType === 'adaptive' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {cutType === 'adaptive' ? '4-Way Stretch' : 'High Friction'}
                  </span>
                </div>
                <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {currentMetrics.seamStretch}
                </p>
              </div>
            </div>

            {/* Recommended Tailoring Adjustments (Prompt Requirement) */}
            <div className={`p-4 rounded-xl border ${
              highContrast ? 'bg-zinc-950 border-yellow-400/50' : 'bg-sky-50/80 border-sky-200'
            }`}>
              <div className="font-extrabold text-xs uppercase tracking-wider text-sky-800 dark:text-sky-300 mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Recommended Adjustments:</span>
              </div>
              <ul className="space-y-1.5 text-xs">
                {currentMetrics.adjustments.map((adj, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-bold flex-shrink-0">&bull;</span>
                    <span>
                      <strong>{adj.label}:</strong> {adj.val}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Action into Step 4 Customization */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSendToTailor}
                className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  highContrast
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Send +2" Back Rise Adjustments to Tailor (Step 4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
