import React, { useState } from 'react'
import { 
  MapPin, 
  Navigation, 
  Scissors, 
  Magnet, 
  SlidersHorizontal, 
  Tag, 
  ShieldCheck, 
  Star, 
  Clock, 
  DollarSign, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Phone, 
  Send, 
  Calendar,
  AlertCircle,
  Package,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react'

// Verified Local Adaptive Tailor Network Data
const LOCAL_TAILORS = [
  {
    id: 'tailor-1',
    name: 'Master Stitch Adaptive Studio',
    distance: '1.4 miles away',
    address: '428 Fashion Blvd, Suite 2B',
    specialization: 'Specialist in Magnetic Snap Conversions & Side-Seam Zipper Retrofits',
    rating: 4.9,
    completedJobs: 142,
    avgTurnaround: '2-3 Business Days',
    certifiedSince: '2023',
    phone: '(555) 234-5678',
    mapCoords: { x: 38, y: 35 },
    tags: ['Magnetic Snaps', 'Side Zippers', 'Same-Day Pickup']
  },
  {
    id: 'tailor-2',
    name: 'ErgoSeam Wheelchair Tailors',
    distance: '2.8 miles away',
    address: '109 West Mobility Way',
    specialization: 'Wheelchair Seated Pattern Alterations & Pressure Sore Relief Smoothing',
    rating: 5.0,
    completedJobs: 118,
    avgTurnaround: '3-4 Business Days',
    certifiedSince: '2022',
    phone: '(555) 876-5432',
    mapCoords: { x: 65, y: 55 },
    tags: ['Seated Rise', 'Flat Seams', 'Zero Pressure Pockets']
  },
  {
    id: 'tailor-3',
    name: 'SensorySafe Alterations Lab',
    distance: '3.9 miles away',
    address: '77 Comfort Lane, District 4',
    specialization: 'Sensory-Safe Garment Taping, Ultrasonic Tag Excision & Frictionless Seams',
    rating: 4.8,
    completedJobs: 96,
    avgTurnaround: '1-2 Business Days',
    certifiedSince: '2024',
    phone: '(555) 432-1098',
    mapCoords: { x: 25, y: 70 },
    tags: ['Ultrasonic Tag Removal', 'Bamboo Seam Taping', 'Hypoallergenic']
  }
]

// Alteration Services Pricing Catalog
const ALTERATION_SERVICES = [
  {
    id: 'srv-magnetic',
    title: 'Magnetic Snap Conversion',
    desc: 'Replace standard buttons with concealed auto-aligning neo-magnets.',
    cost: 18.00,
    days: 2,
    icon: Magnet
  },
  {
    id: 'srv-zipper',
    title: 'Side-Seam Zipper Retrofit',
    desc: 'Install discreet 2-way zippers along outer leg or shirt side seams.',
    cost: 24.00,
    days: 3,
    icon: SlidersHorizontal
  },
  {
    id: 'srv-seated-rise',
    title: 'Seated Rise Expansion (+2.0")',
    desc: 'Extend back rise curve by 2 inches to ensure coverage in wheelchair.',
    cost: 22.00,
    days: 3,
    icon: Scissors
  },
  {
    id: 'srv-tag-smoothing',
    title: 'Ultrasonic Tag Removal & Seam Taping',
    desc: 'Eradicate abrasive nylon neck tags and tape inner seams for friction relief.',
    cost: 12.00,
    days: 1,
    icon: Tag
  }
]

export default function TailorDispatchHub({ userProfile, highContrast, largeText }) {
  // Active Tailor & Booking State
  const [selectedTailor, setSelectedTailor] = useState(LOCAL_TAILORS[0])
  const [selectedGarment, setSelectedGarment] = useState('Everyday Adaptive Oxford Shirt')
  const [selectedServices, setSelectedServices] = useState([
    'Magnetic Snap Conversion',
    'Ultrasonic Tag Removal & Seam Taping'
  ])
  const [bookingStep, setBookingStep] = useState(1) // 1: Tailor & Garment, 2: Alterations, 3: Pickup Confirmation
  const [pickupAddress, setPickupAddress] = useState('142 Oakridge Avenue, Apt 4B (Wheelchair Accessible Ramp)')
  const [pickupNotes, setPickupNotes] = useState('Please ring lower accessibility buzzer at front entrance.')
  
  // Active Order & Admin Tracking Status Bar State
  // Tracking stages: 'Request Received' -> 'In Alteration' -> 'Delivered'
  const [orderTracking, setOrderTracking] = useState({
    orderId: 'DISPATCH-84291',
    status: 'In Alteration', // 'Request Received' | 'In Alteration' | 'Delivered'
    tailor: 'Master Stitch Adaptive Studio',
    courier: 'Metro Accessible Logistics #14',
    garment: 'Everyday Adaptive Oxford Shirt',
    services: ['Magnetic Snap Conversion', 'Ultrasonic Tag Removal'],
    estimatedDelivery: 'Tomorrow, 3:30 PM',
    progressPercent: 65
  })

  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Toggle alteration service
  const toggleService = (title) => {
    setSelectedServices(prev => 
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  // Calculate pricing & turnaround
  const alterationCost = selectedServices.reduce((acc, title) => {
    const srv = ALTERATION_SERVICES.find(s => s.title === title)
    return acc + (srv ? srv.cost : 0)
  }, 0)

  const maxTurnaroundDays = selectedServices.reduce((max, title) => {
    const srv = ALTERATION_SERVICES.find(s => s.title === title)
    return srv && srv.days > max ? srv.days : max
  }, 2)

  const courierFee = 0.00 // Complimentary accessibility pickup
  const totalPrice = alterationCost + courierFee

  // Handle Booking Form Submit
  const handleConfirmPickup = (e) => {
    e.preventDefault()
    if (selectedServices.length === 0) return

    const newOrderId = `DISPATCH-${Math.floor(10000 + Math.random() * 90000)}`
    setOrderTracking({
      orderId: newOrderId,
      status: 'Request Received',
      tailor: selectedTailor.name,
      courier: 'Assigned upon tailor acceptance',
      garment: selectedGarment,
      services: [...selectedServices],
      estimatedDelivery: `In ${maxTurnaroundDays} Business Days`,
      progressPercent: 25
    })
    setBookingConfirmed(true)
  }

  // Helper to switch admin tracking stages for demonstration & testing
  const setAdminStage = (stage) => {
    let percent = 25
    if (stage === 'In Alteration') percent = 65
    if (stage === 'Delivered') percent = 100

    setOrderTracking(prev => ({
      ...prev,
      status: stage,
      progressPercent: percent
    }))
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
            <Truck className="w-3.5 h-3.5" /> Feature 7: Tailor Dispatch & Routing
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mb-3">
            Smart Local Adaptive Tailor Network (Tailor Hub)
          </h1>
          <p className={`font-medium ${highContrast ? 'text-zinc-200' : 'text-slate-300'} text-base sm:text-lg leading-relaxed`}>
            Connect with verified local adaptive tailor specialists for magnetic snap conversions, 
            seated rise modifications, and tagless seam taping with free door-to-door courier pickup.
          </p>
        </div>
      </div>

      {/* ADMIN TRACKING STATUS BAR (Prompt Requirement: 'Request Received' -> 'In Alteration' -> 'Delivered') */}
      <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
        highContrast 
          ? 'bg-black border-yellow-400 text-white ring-2 ring-yellow-400/30' 
          : 'bg-white border-slate-200 shadow-lg text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600">
                Live Dispatch Tracking Telemetry
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded font-black bg-sky-100 dark:bg-zinc-800 text-sky-800 dark:text-sky-300">
                {orderTracking.orderId}
              </span>
            </div>
            <h3 className="font-extrabold text-lg font-heading flex items-center gap-2">
              <Package className="w-5 h-5 text-sky-600" />
              Active Order: {orderTracking.garment} &bull; Tailor: {orderTracking.tailor}
            </h3>
          </div>

          {/* Admin Stage Switcher Buttons (Interactive Test Controls) */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1">Admin Simulator:</span>
            {['Request Received', 'In Alteration', 'Delivered'].map((stg) => (
              <button
                key={stg}
                type="button"
                onClick={() => setAdminStage(stg)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  orderTracking.status === stg
                    ? highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Stage Visual Pipeline */}
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-extrabold">
            
            {/* Stage 1: Request Received */}
            <div className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 ${
              orderTracking.status === 'Request Received'
                ? highContrast ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300' : 'bg-sky-50 border-sky-500 text-sky-900'
                : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-400'
            }`}>
              <CheckCircle2 className={`w-5 h-5 ${
                orderTracking.progressPercent >= 25 ? 'text-emerald-500' : 'text-slate-300'
              }`} />
              <span>1. Request Received</span>
              <span className="text-[10px] font-normal opacity-80">Tailor Dispatched</span>
            </div>

            {/* Stage 2: In Alteration */}
            <div className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 ${
              orderTracking.status === 'In Alteration'
                ? highContrast ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300 ring-2 ring-yellow-400' : 'bg-sky-50 border-sky-500 text-sky-900 ring-2 ring-sky-300'
                : orderTracking.progressPercent > 65
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-400'
            }`}>
              <Scissors className={`w-5 h-5 ${
                orderTracking.progressPercent >= 65 ? 'text-sky-600 animate-spin' : 'text-slate-300'
              }`} />
              <span>2. In Alteration</span>
              <span className="text-[10px] font-normal opacity-80">Retrofit in progress</span>
            </div>

            {/* Stage 3: Delivered */}
            <div className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 ${
              orderTracking.status === 'Delivered'
                ? highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-emerald-500 border-emerald-300 text-white shadow-md'
                : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-400'
            }`}>
              <Truck className={`w-5 h-5 ${
                orderTracking.status === 'Delivered' ? 'text-white' : 'text-slate-300'
              }`} />
              <span>3. Delivered</span>
              <span className="text-[10px] font-normal opacity-80">Signed & Fitted</span>
            </div>

          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-slate-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                orderTracking.status === 'Delivered' 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600'
              }`}
              style={{ width: `${orderTracking.progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 pt-1">
            <span>Estimated Hand-off: <strong>{orderTracking.estimatedDelivery}</strong></span>
            <span>Courier: <strong>{orderTracking.courier}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map/List (Left) + Interactive Booking Flow (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Map & Verified Tailors List */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className={`p-6 rounded-2xl border ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-xl font-heading flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  Verified Local Adaptive Tailors Near You
                </h3>
                <p className={`text-xs mt-0.5 ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                  Showing 3 certified adaptive studios within a 5-mile radius
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-mono font-bold bg-emerald-100 dark:bg-zinc-800 text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Network Active
              </span>
            </div>

            {/* Interactive Simulated Map Canvas */}
            <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 h-52 mb-6 flex items-center justify-center">
              
              {/* Radar Grid Circles */}
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf825_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-64 h-64 rounded-full border border-sky-500/20 absolute" />
              <div className="w-40 h-40 rounded-full border border-sky-500/30 absolute" />
              <div className="w-16 h-16 rounded-full border border-sky-500/40 absolute animate-ping" />

              {/* User Location Center Pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-sky-400 ring-4 ring-sky-400/40 shadow-lg shadow-sky-500" />
                <span className="text-[9px] font-black uppercase tracking-wider text-sky-200 mt-1 bg-black/80 px-1.5 py-0.2 rounded">
                  Your Location
                </span>
              </div>

              {/* Tailor Pins */}
              {LOCAL_TAILORS.map((tailor) => {
                const isSelected = selectedTailor.id === tailor.id
                return (
                  <button
                    key={tailor.id}
                    type="button"
                    onClick={() => setSelectedTailor(tailor)}
                    style={{ left: `${tailor.mapCoords.x}%`, top: `${tailor.mapCoords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform transform hover:scale-125 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shadow-xl ${
                      isSelected
                        ? highContrast
                          ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/50'
                          : 'bg-rose-600 text-white ring-4 ring-rose-400/40'
                        : 'bg-slate-800/90 text-white border border-slate-700'
                    }`}
                  >
                    <Scissors className="w-3 h-3" />
                    <span>{tailor.name.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>

            {/* Tailors List Cards */}
            <div className="space-y-3.5">
              {LOCAL_TAILORS.map((tailor) => {
                const isSelected = selectedTailor.id === tailor.id
                return (
                  <div
                    key={tailor.id}
                    onClick={() => setSelectedTailor(tailor)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? highContrast
                          ? 'bg-zinc-900 border-yellow-400 text-white ring-2 ring-yellow-400'
                          : 'bg-sky-50/80 border-sky-600 text-slate-900 shadow-md ring-2 ring-sky-500/20'
                        : highContrast
                          ? 'bg-black border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base font-heading">{tailor.name}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            Verified Adaptive
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-2 mt-1">
                          <span>{tailor.distance}</span>
                          <span>&bull;</span>
                          <span>{tailor.address}</span>
                        </div>
                        
                        {/* SPECIALIZATION HIGHLIGHT (Crucial Requirement) */}
                        <div className={`mt-2.5 p-2.5 rounded-lg border text-xs font-semibold ${
                          isSelected
                            ? highContrast ? 'bg-black border-yellow-400/60 text-yellow-300' : 'bg-white border-sky-300 text-sky-950'
                            : highContrast ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          <span className="text-sky-600 font-bold block text-[11px] uppercase tracking-wider mb-0.5">
                            Specialization:
                          </span>
                          {tailor.specialization}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 flex-shrink-0">
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{tailor.rating}</span>
                          <span className="text-slate-400 font-normal">({tailor.completedJobs} jobs)</span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                          {tailor.avgTurnaround}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>

        {/* Right Column: 4-Step Interactive Booking Flow */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
          }`}>
            
            <div className="pb-4 border-b border-slate-200 mb-5">
              <span className="text-xs font-black uppercase tracking-wider text-sky-600 block mb-0.5">
                4-Step Dispatch Flow
              </span>
              <h3 className="text-xl font-black font-heading flex items-center gap-2">
                <Scissors className="w-5 h-5 text-sky-600" />
                Book Adaptive Alteration
              </h3>
              <p className={`text-xs mt-1 ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
                Booking with: <strong>{selectedTailor.name}</strong>
              </p>
            </div>

            {bookingConfirmed ? (
              <div className={`p-5 rounded-2xl border text-center space-y-4 ${
                highContrast ? 'bg-zinc-900 border-yellow-400 text-white' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}>
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">Pickup Request Confirmed!</h4>
                  <p className="text-xs mt-1 opacity-90">
                    A courier has been dispatched to collect <strong>{selectedGarment}</strong> from your address.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/70 dark:bg-black/40 border text-xs font-mono">
                  <div>Pickup Window: <strong>Today, 4:00 PM - 5:30 PM</strong></div>
                  <div>Estimated Delivery: <strong>In {maxTurnaroundDays} Business Days</strong></div>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="text-xs font-bold underline hover:opacity-80"
                >
                  Book Another Garment
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPickup} className="space-y-5">
                
                {/* Step 1: Select Garment */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                    highContrast ? 'text-yellow-300' : 'text-slate-600'
                  }`}>
                    1. Select Garment:
                  </label>
                  <select
                    value={selectedGarment}
                    onChange={(e) => setSelectedGarment(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold ${
                      highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Everyday Adaptive Oxford Shirt">Everyday Adaptive Oxford Shirt</option>
                    <option value="Seated-Cut Ergonomic Chino Trouser">Seated-Cut Ergonomic Chino Trouser</option>
                    <option value="Dual-Zip Easy-Open Commuter Pant">Dual-Zip Easy-Open Commuter Pant</option>
                    <option value="Magnetic All-Weather City Parka">Magnetic All-Weather City Parka</option>
                    <option value="Personal Mail-In Clothing Piece">Personal Mail-In Garment</option>
                  </select>
                </div>

                {/* Step 2: Select Alteration Types */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider ${
                      highContrast ? 'text-yellow-300' : 'text-slate-600'
                    }`}>
                      2. Select Alterations:
                    </label>
                    <span className="text-[11px] text-sky-600 font-bold">
                      {selectedServices.length} Selected
                    </span>
                  </div>

                  <div className="space-y-2">
                    {ALTERATION_SERVICES.map((srv) => {
                      const isSelected = selectedServices.includes(srv.title)
                      const IconComp = srv.icon
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.title)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isSelected
                              ? highContrast
                                ? 'bg-zinc-900 border-yellow-400 text-white'
                                : 'bg-sky-50 border-sky-500 text-slate-900 font-semibold shadow-sm'
                              : highContrast
                                ? 'bg-black border-zinc-800 text-zinc-300'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComp className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                            <span>{srv.title}</span>
                          </div>
                          <span className="font-mono font-bold text-sky-600">+${srv.cost.toFixed(2)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Transparent Pricing & Turnaround Calculation */}
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-1">
                    3. Turnaround & Pricing Calculation:
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Alterations Subtotal ({selectedServices.length} services):</span>
                    <span className="font-mono font-bold">${alterationCost.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Adaptive Courier Pickup & Delivery:</span>
                    <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE (Accessible Transit)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Ready Turnaround:</span>
                    <span className="font-bold text-sky-600">{maxTurnaroundDays} Business Days</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-300 flex items-center justify-between font-extrabold text-sm">
                    <span>Total Alteration Fee:</span>
                    <span className={`font-mono text-base ${highContrast ? 'text-yellow-400' : 'text-slate-900'}`}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Step 4: Confirm Pickup Request */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                    highContrast ? 'text-yellow-300' : 'text-slate-600'
                  }`}>
                    4. Home Pickup Address:
                  </label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs mb-2 ${
                      highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Accessibility delivery notes (e.g. Ramp, Doorbell height)..."
                    value={pickupNotes}
                    onChange={(e) => setPickupNotes(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs ${
                      highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={selectedServices.length === 0}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    highContrast
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Confirm Free Pickup Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}
