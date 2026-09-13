import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PackageCheck, 
  Search, 
  Check, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Scissors, 
  Truck, 
  Phone, 
  ArrowRight, 
  Download, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  X, 
  FileText, 
  Printer, 
  ChevronRight,
  Sparkles,
  SearchCheck,
  Ban
} from 'lucide-react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function MyOrdersPage() {
  const { 
    orderHistory, 
    setOrderHistory, 
    setCurrentStep, 
    highContrast, 
    speak 
  } = useAccessibility()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all' | 'active' | 'delivered' | 'cancelled'
  
  // Modals state
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null)
  const [activeContactTailor, setActiveContactTailor] = useState(null)
  const [cancelConfirmationOrder, setCancelConfirmationOrder] = useState(null)
  const [cancellationReason, setCancellationReason] = useState('Change of requirements')

  // 5-Stage Step Tracker Bar (Flipkart Style)
  const flipkartStages = [
    { step: 1, title: 'Order Placed', emoji: '✅', desc: 'Verified on AdaptiveStyle AI' },
    { step: 2, title: 'Tailor Accepted', emoji: '✅', desc: 'Fabric & patterns isolated' },
    { step: 3, title: 'In Alteration', emoji: '🧵', desc: 'Custom retrofitting underway' },
    { step: 4, title: 'Quality Check', emoji: '🔍', desc: 'Tension & seam stress tested' },
    { step: 5, title: 'Out for Delivery', emoji: '🚚', desc: 'Courier en route to doorstep' }
  ]

  // Filtered Orders
  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = 
      order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.selectedGarment?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.assignedTailor?.name?.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (filterStatus === 'all') return true
    if (filterStatus === 'active') return order.status !== 'Delivered' && order.status !== 'Cancelled'
    if (filterStatus === 'delivered') return order.status === 'Delivered'
    if (filterStatus === 'cancelled') return order.status === 'Cancelled'
    return true
  })

  // Cancel order handler
  const handleConfirmCancel = () => {
    if (!cancelConfirmationOrder) return

    setOrderHistory(prev => prev.map(o => {
      if (o.orderId === cancelConfirmationOrder.orderId) {
        return {
          ...o,
          status: 'Cancelled',
          trackingStep: 0,
          cancelledReason: cancellationReason
        }
      }
      return o
    }))

    speak(`Order ${cancelConfirmationOrder.orderId} has been cancelled successfully. Full refund initiated.`)
    setCancelConfirmationOrder(null)
  }

  // Download Invoice action
  const handlePrintInvoice = (order) => {
    speak(`Generating invoice receipt for Order ${order.orderId}.`)
    window.print()
  }

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        highContrast 
          ? 'bg-zinc-900 border-yellow-400 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
              }`}>
                Flipkart/Amazon-Style Live Order Hub
              </span>
              <span className="text-xs text-sky-200/80">Track 5: Fashion for People</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
              My Orders & Live Order Tracker
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              Real-time Flipkart-style 5-stage tracking pipeline for your custom adaptive clothing requests. Monitor alteration progress, download tax invoices, or contact your assigned local tailor.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all min-h-[48px] shadow-lg focus:ring-4 focus:ring-sky-400 ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-white'
                  : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white'
              }`}
            >
              <span>Create New Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        highContrast ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Item, or Tailor..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:ring-4 focus:ring-sky-400 ${
              highContrast 
                ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500' 
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar" role="tablist">
          {[
            { id: 'all', label: `All Orders (${orderHistory.length})` },
            { id: 'active', label: 'Active Alterations' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[40px] ${
                filterStatus === tab.id
                  ? highContrast
                    ? 'bg-yellow-400 text-black font-black'
                    : 'bg-slate-900 text-white shadow-sm'
                  : highContrast
                    ? 'bg-zinc-900 text-zinc-400 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const isCancelled = order.status === 'Cancelled'
            const currentStageStep = order.trackingStep || 3

            // Price calculation fallback
            const basePrice = order.selectedGarment?.price || 48.00
            const alterationsTotal = order.alterations?.reduce((acc, a) => acc + (a.price || 0), 0) || 15.00
            const shippingFee = 0.00
            const totalPaid = order.totalFee || (basePrice + alterationsTotal)

            return (
              <div 
                key={order.orderId}
                className={`rounded-3xl border-2 overflow-hidden transition-all shadow-sm hover:shadow-md ${
                  highContrast 
                    ? 'bg-zinc-950 border-yellow-400 text-white' 
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Flipkart-Style Order Top Banner */}
                <div className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 text-xs ${
                  highContrast ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Order Placed</span>
                      <span className="font-extrabold">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Total Amount</span>
                      <span className="font-extrabold text-emerald-600 dark:text-yellow-400">${totalPaid.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase font-bold text-[10px] block">Assigned Local Tailor</span>
                      <span className="font-extrabold">{order.assignedTailor?.name || 'City Adaptive Sewing Studio'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black px-3 py-1 rounded-lg bg-slate-200 dark:bg-zinc-800">
                      ID: {order.orderId}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-black text-xs uppercase tracking-wider ${
                      isCancelled
                        ? 'bg-rose-500 text-white'
                        : order.status === 'Delivered'
                          ? 'bg-emerald-600 text-white'
                          : highContrast ? 'bg-yellow-400 text-black' : 'bg-sky-600 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="p-6 sm:p-7 space-y-6">
                  
                  {/* Top Section: Item Thumbnail, Title, Specs & Price Breakdown */}
                  <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
                    
                    {/* Left: Image & Specs */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-zinc-800">
                        <img 
                          src={order.selectedGarment?.image} 
                          alt={order.selectedGarment?.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      <div>
                        <h2 className="text-lg sm:text-xl font-black font-heading leading-tight">
                          {order.selectedGarment?.name}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{order.assignedTailor?.name} • {order.assignedTailor?.distance}</span>
                        </div>

                        {/* Customization Specs Summary Pills */}
                        <div className="mt-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                            Customization Specs Summary:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {order.alterations?.map((alt, aIdx) => (
                              <span 
                                key={aIdx} 
                                className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                                  highContrast 
                                    ? 'bg-zinc-900 border-yellow-400/50 text-yellow-300' 
                                    : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                                }`}
                              >
                                <Scissors className="w-3 h-3 text-indigo-500" />
                                {alt.title}
                              </span>
                            ))}
                            {(!order.alterations || order.alterations.length === 0) && (
                              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                                Magnetic Snaps Installed, Tags Removed
                              </span>
                            )}
                          </div>
                        </div>

                        {order.notes && (
                          <div className="text-xs text-slate-500 dark:text-zinc-400 mt-2 italic">
                            Special Instructions: "{order.notes}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Transparent Price Breakdown Box */}
                    <div className={`p-4 rounded-2xl border w-full lg:w-72 text-xs space-y-2 shrink-0 ${
                      highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider mb-2">
                        Price Breakdown
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Base Garment:</span>
                        <span className="font-bold">${basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Adaptive Alteration Fee:</span>
                        <span className="font-bold text-emerald-600 dark:text-yellow-400">+${alterationsTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Shipping Courier:</span>
                        <span className="font-bold text-emerald-600 uppercase text-[11px]">Free</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-black text-sm">
                        <span>Total Paid:</span>
                        <span className={highContrast ? 'text-yellow-400' : 'text-slate-900'}>${totalPaid.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>

                  {/* VISUAL 5-STAGE STEP TRACKER BAR (FLIPKART STYLE) */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    highContrast ? 'bg-black border-zinc-800' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-indigo-600 dark:text-yellow-400">
                        <Truck className="w-4 h-4" />
                        Live 5-Stage Step Tracker (Flipkart Style)
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        {order.turnaround || '48-hour delivery'}
                      </span>
                    </div>

                    {!isCancelled ? (
                      <div className="relative py-2">
                        {/* Connecting Line */}
                        <div className="absolute top-6 left-6 right-6 h-1 bg-slate-200 dark:bg-zinc-800 -translate-y-1/2 z-0 hidden sm:block">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(0, ((currentStageStep - 1) / 4) * 100))}%` }}
                          />
                        </div>

                        {/* 5 Stages Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
                          {flipkartStages.map((stage) => {
                            const isCompleted = stage.step < currentStageStep
                            const isCurrent = stage.step === currentStageStep
                            const isUpcoming = stage.step > currentStageStep

                            return (
                              <div key={stage.step} className="flex flex-col items-center text-center">
                                {/* Stage Circle Icon */}
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black mb-2 transition-all shadow-sm ${
                                  isCompleted
                                    ? highContrast ? 'bg-yellow-400 text-black font-black' : 'bg-emerald-600 text-white shadow-emerald-600/30'
                                    : isCurrent
                                      ? highContrast 
                                        ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40' 
                                        : 'bg-sky-600 text-white ring-4 ring-sky-300 animate-pulse shadow-sky-600/30'
                                      : highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-400'
                                }`}>
                                  {isCompleted ? (
                                    <Check className="w-5 h-5 stroke-[3]" />
                                  ) : (
                                    <span>{stage.emoji}</span>
                                  )}
                                </div>

                                <div className={`text-xs font-black leading-tight ${
                                  isCurrent ? 'text-sky-600 dark:text-yellow-400' : isCompleted ? 'text-slate-800 dark:text-white' : 'text-slate-400'
                                }`}>
                                  Step {stage.step}: {stage.title}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                  {stage.desc}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                        <Ban className="w-4 h-4" />
                        <span>This order was cancelled ({order.cancelledReason || 'User requested cancellation'}). Refund has been processed.</span>
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS: Download Invoice, Contact Adaptive Tailor, Cancel Order */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    
                    {/* 1. Download Invoice */}
                    <button
                      type="button"
                      onClick={() => setActiveInvoiceOrder(order)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border min-h-[44px] transition-all focus:ring-4 focus:ring-sky-400 ${
                        highContrast
                          ? 'border-zinc-700 bg-zinc-900 text-yellow-300 hover:bg-zinc-800'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Download className="w-4 h-4 text-sky-500" />
                      <span>Download Invoice</span>
                    </button>

                    {/* 2. Contact Adaptive Tailor */}
                    <button
                      type="button"
                      onClick={() => setActiveContactTailor(order.assignedTailor)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border min-h-[44px] transition-all focus:ring-4 focus:ring-emerald-400 ${
                        highContrast
                          ? 'border-zinc-700 bg-zinc-900 text-emerald-300 hover:bg-zinc-800'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span>Contact Adaptive Tailor</span>
                    </button>

                    {/* 3. Cancel Order */}
                    {!isCancelled && (
                      <button
                        type="button"
                        onClick={() => setCancelConfirmationOrder(order)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border min-h-[44px] transition-all focus:ring-4 focus:ring-rose-400 ${
                          highContrast
                            ? 'border-rose-900 bg-zinc-900 text-rose-400 hover:bg-rose-950'
                            : 'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700'
                        }`}
                      >
                        <X className="w-4 h-4 text-rose-500" />
                        <span>Cancel Order</span>
                      </button>
                    )}

                  </div>

                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-16 space-y-4">
            <PackageCheck className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold">No orders found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any orders matching your filter criteria. Start a new adaptive garment customization from the catalog.
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold text-xs shadow-md"
            >
              Start Guided Wizard
            </button>
          </div>
        )}
      </div>

      {/* MODAL 1: INVOICE DOWNLOAD & PRINT PREVIEW */}
      <AnimatePresence>
        {activeInvoiceOrder && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-title"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className={`max-w-xl w-full p-6 sm:p-8 rounded-3xl border-2 shadow-2xl relative transition-all ${
                highContrast ? 'bg-zinc-950 border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-sky-500" />
                <div>
                  <h2 id="invoice-title" className="text-xl font-black font-heading">
                    Tax Invoice & Customization Specs
                  </h2>
                  <p className="text-xs text-slate-500">Order ID: {activeInvoiceOrder.orderId}</p>
                </div>
              </div>

              {/* Invoice Printable Section */}
              <div className="p-4 rounded-2xl border text-xs space-y-3 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Date:</span>
                  <span>{activeInvoiceOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Item:</span>
                  <span>{activeInvoiceOrder.selectedGarment?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Assigned Tailor:</span>
                  <span>{activeInvoiceOrder.assignedTailor?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Customization Specs:</span>
                  <span className="text-right font-medium">
                    {activeInvoiceOrder.alterations?.map(a => a.title).join(', ') || 'Magnetic Snaps Installed, Tags Removed'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t font-black text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="text-emerald-600 dark:text-yellow-400">${(activeInvoiceOrder.totalFee || 63.00).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handlePrintInvoice(activeInvoiceOrder)}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 ${
                    highContrast ? 'bg-yellow-400 text-black' : 'bg-slate-900 text-white'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setActiveInvoiceOrder(null)}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CONTACT ADAPTIVE TAILOR */}
      <AnimatePresence>
        {activeContactTailor && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-tailor-title"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border-2 shadow-2xl relative transition-all ${
                highContrast ? 'bg-zinc-950 border-yellow-400 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setActiveContactTailor(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-7 h-7 text-emerald-500" />
                <div>
                  <h3 id="contact-tailor-title" className="text-lg font-black font-heading">
                    {activeContactTailor.name}
                  </h3>
                  <p className="text-xs text-slate-500">{activeContactTailor.verifiedBadge}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs p-3.5 rounded-2xl border bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{activeContactTailor.address}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-emerald-600">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Direct Line: {activeContactTailor.phone || '(555) 349-2910'}</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Hours: Mon-Sat, 9:00 AM - 6:00 PM • Wheelchair Accessible Entrance
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`tel:${activeContactTailor.phone || '5553492910'}`}
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-center bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  Call Tailor Now
                </a>
                <button
                  onClick={() => setActiveContactTailor(null)}
                  className="px-4 py-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-zinc-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: CANCEL ORDER CONFIRMATION */}
      <AnimatePresence>
        {cancelConfirmationOrder && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border-2 shadow-2xl relative transition-all ${
                highContrast ? 'bg-zinc-950 border-rose-500 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setCancelConfirmationOrder(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4 text-rose-600">
                <AlertCircle className="w-7 h-7" />
                <h3 id="cancel-title" className="text-lg font-black font-heading">
                  Cancel Customization Request?
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                Are you sure you want to cancel order <strong>{cancelConfirmationOrder.orderId}</strong>? The tailor will halt alteration work immediately and a full refund will be processed within 2-3 business days.
              </p>

              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">
                  Select Reason:
                </label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                >
                  <option value="Change of requirements">Change of requirements</option>
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Need different adaptive mechanism">Need different adaptive mechanism</option>
                  <option value="Alternative tailor chosen">Alternative tailor chosen</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                >
                  Confirm Cancellation
                </button>
                <button
                  onClick={() => setCancelConfirmationOrder(null)}
                  className="px-4 py-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200"
                >
                  Keep Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
