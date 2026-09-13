import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PackageCheck, 
  X, 
  Search, 
  Check, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Scissors, 
  Truck, 
  Phone,
  ArrowRight
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function OrderTrackingModal() {
  const { 
    isTrackingOpen, 
    setIsTrackingOpen, 
    orderStatus, 
    orderHistory,
    setCurrentStep, 
    highContrast,
    speak 
  } = useAccessibility()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeOrderIndex, setActiveOrderIndex] = useState(0)

  if (!isTrackingOpen) return null

  const ordersList = orderHistory && orderHistory.length > 0 ? orderHistory : [orderStatus]
  const currentOrder = ordersList[activeOrderIndex] || orderStatus

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const matchIndex = ordersList.findIndex(o => 
        o.orderId.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (matchIndex !== -1) {
        setActiveOrderIndex(matchIndex)
        speak(`Found and loaded Order ID ${ordersList[matchIndex].orderId}.`)
      } else {
        speak('No order matched that ID.')
      }
    }
  }

  const order = currentOrder

  const pipelineStages = [
    { step: 1, label: 'Request Sent', desc: 'Order transmitted to tailor' },
    { step: 2, label: 'Customization Approved', desc: 'Pattern & materials prepared' },
    { step: 3, label: 'In Sewing', desc: 'Active tailoring & seam bonding' },
    { step: 4, label: 'Ready for Delivery', desc: 'Courier dispatch to user' }
  ]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracking-modal-title"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className={`max-w-2xl w-full p-6 sm:p-8 rounded-3xl border-2 shadow-2xl relative transition-all max-h-[90vh] overflow-y-auto ${
          highContrast
            ? 'bg-zinc-950 border-yellow-400 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsTrackingOpen(false)}
          aria-label="Close tracking modal"
          className="absolute top-4 right-4 p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-100 text-emerald-700'
          }`}>
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="tracking-modal-title" className="text-xl sm:text-2xl font-black font-heading leading-tight">
              Adaptive Garment Order Tracking
            </h2>
            <p className={`text-xs ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>
              Real-time tailoring progress and courier dispatch tracking
            </p>
          </div>
        </div>

        {/* Search / Lookup Bar */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Enter Tracking ID (e.g., ${order?.orderId || 'ADAPT-849201'})`}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:ring-4 focus:ring-emerald-400 ${
                highContrast 
                  ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
          <button
            type="submit"
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm min-h-[48px] shrink-0 transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 font-black'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Track Order
          </button>
        </form>

        {/* Order Details Card */}
        {order ? (
          <div className="space-y-6">
            {/* Top Status Card */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              highContrast ? 'bg-zinc-900 border-yellow-400/50' : 'bg-emerald-50/70 border-emerald-200'
            }`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Tracking Reference
                </span>
                <div className="text-base sm:text-lg font-black">{order.orderId}</div>
                <div className="text-xs text-slate-500">Ordered on {order.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  highContrast 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-emerald-600 text-white shadow-md'
                }`}>
                  Status: {order.status}
                </span>
              </div>
            </div>

            {/* Interactive 4-Stage Status Pipeline */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 text-center">
                Tailoring & Delivery Progress
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {pipelineStages.map((stage) => {
                  const isDone = stage.step < (order.trackingStep || 3)
                  const isCurrent = stage.step === (order.trackingStep || 3)

                  return (
                    <div key={stage.step} className="p-3 rounded-2xl border flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-1.5 ${
                        isDone
                          ? highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-white'
                          : isCurrent
                            ? highContrast ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40' : 'bg-sky-600 text-white ring-4 ring-sky-200 animate-pulse'
                            : highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : stage.step}
                      </div>
                      <div className={`text-xs font-black leading-tight ${
                        isCurrent ? 'text-sky-600 dark:text-yellow-400' : 'text-slate-700 dark:text-zinc-300'
                      }`}>
                        {stage.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                        {stage.desc}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Garment & Tailor Summary */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
              highContrast ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Garment:</span>
                <span className="font-bold">{order.selectedGarment?.name || 'Pro-Adaptive Oxford Shirt'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Tailor:</span>
                <span className="font-bold">{order.assignedTailor?.name || 'City Adaptive Sewing Hub'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tailor Address:</span>
                <span className="font-medium text-slate-600 dark:text-zinc-300">{order.assignedTailor?.address || '142 Independence Blvd'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-black text-emerald-600 dark:text-yellow-400">Within 48 Hours</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-black text-sm">
                <span>Total Paid:</span>
                <span>${(order.totalFee || 63.00).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setIsTrackingOpen(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm min-h-[48px] ${
                  highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                Close Tracking
              </button>
              <button
                onClick={() => {
                  setIsTrackingOpen(false)
                  setCurrentStep(1)
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[48px] ${
                  highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <span>Customize Another Garment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            No active order found for this query.
          </div>
        )}
      </motion.div>
    </div>
  )
}
