import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { SAMPLE_GARMENTS, CATALOG_ITEMS, AVAILABLE_ALTERATIONS, LOCAL_TAILORS } from '../data/garmentData'

const AccessibilityContext = createContext(null)

export function AccessibilityProvider({ children }) {
  // 1. Wizard Pipeline State: Step 0 is Landing Page, Steps 1-4 are Guided Pipeline
  const [currentStep, setCurrentStep] = useState(0)

  // 2. Global Accessibility Settings (WCAG 2.1 AA)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState('normal') // 'normal', 'large', 'xlarge'
  
  // 3. User Accessibility Profile (Step 1)
  const [userProfile, setUserProfile] = useState({
    mobility: 'Wheelchair / Seated Posture',
    dexterity: ['Fine Motor Difficulty', 'Reduced Hand Strength'],
    closures: ['Magnetic Snaps', 'Easy-Pull Side Zippers'],
    sensory: ['Tagless Inner Collar', 'Flat-Felled Soft Seams']
  })

  // 4. Automated AI Garment Scanner State (Step 2)
  const [scannedGarment, setScannedGarment] = useState(SAMPLE_GARMENTS[0])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanCompleted, setScanCompleted] = useState(true)
  const [detectionTags, setDetectionTags] = useState(SAMPLE_GARMENTS[0].detectionTags)
  
  // 5. Selected Garment for Catalog & Customization (Step 3 & 4)
  const [selectedGarment, setSelectedGarment] = useState(CATALOG_ITEMS[0])
  const [catalogFilter, setCatalogFilter] = useState('All Matched Items')

  // 6. Customization Alterations & Local Tailor Dispatch (Step 4)
  const [selectedAlterations, setSelectedAlterations] = useState(['alt-magnetic-snaps', 'alt-tagless-seams'])
  const [customInstructions, setCustomInstructions] = useState('')
  const [assignedTailor, setAssignedTailor] = useState(LOCAL_TAILORS[0])
  
  // Order Tracking State
  const [isTrackingOpen, setIsTrackingOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState({
    orderId: 'ADAPT-849201',
    date: 'Sep 13, 2026',
    status: 'In Sewing',
    trackingStep: 3, // 1: Request Sent, 2: Customization Approved, 3: In Sewing, 4: Ready for Delivery
    totalFee: 63.00,
    turnaround: '48-hour delivery',
    assignedTailor: LOCAL_TAILORS[0],
    selectedGarment: CATALOG_ITEMS[0],
    alterations: [AVAILABLE_ALTERATIONS[0], AVAILABLE_ALTERATIONS[2]],
    notes: 'Magnetic snap conversion on front placket; smooth neckline seam tape.'
  })

  // 7. Voice Assistant State (Hands-free control)
  const [isListening, setIsListening] = useState(false)
  const [voiceFeedback, setVoiceFeedback] = useState('Ready for speech command. Say "Help" for options.')
  const [lastCommand, setLastCommand] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef(null)

  // Dynamic Functional Accessibility Match Score Algorithm
  const calculateMatchScore = (garment, profile) => {
    if (!garment) return { score: 94, breakdown: [] }

    let totalWeight = 0
    let earnedWeight = 0
    const breakdown = []

    // 1. Mobility criteria (weight: 35)
    totalWeight += 35
    if (profile.mobility === 'Wheelchair / Seated Posture') {
      const hasSeatedFeature = garment.features?.some(f => 
        f.toLowerCase().includes('seated') || 
        f.toLowerCase().includes('rise') || 
        f.toLowerCase().includes('elastic') ||
        f.toLowerCase().includes('gusset') ||
        f.toLowerCase().includes('sleeves')
      )
      if (hasSeatedFeature) {
        earnedWeight += 35
        breakdown.push('100% Mobility Match: Zero lap-bunching & extended rear coverage optimized for seated posture.')
      } else {
        earnedWeight += 26
        breakdown.push('75% Mobility Match: Relaxed cut accommodates chair armrests.')
      }
    } else {
      earnedWeight += 33
      breakdown.push('94% Mobility Match: Freedom of movement with no restrictive underarm pinching.')
    }

    // 2. Dexterity criteria (weight: 35)
    totalWeight += 35
    const hasDexterityMatch = profile.dexterity?.some(d => {
      if (d === 'Fine Motor Difficulty' || d === 'Reduced Hand Strength' || d === 'Single-Hand Operation Only') {
        return garment.features?.some(f => 
          f.toLowerCase().includes('magnetic') || 
          f.toLowerCase().includes('zipper') || 
          f.toLowerCase().includes('elastic')
        )
      }
      return false
    })

    if (hasDexterityMatch) {
      earnedWeight += 35
      breakdown.push('100% Dexterity Match: Replaces traditional tiny buttons with fast-clicking concealed magnetic snaps.')
    } else {
      earnedWeight += 28
      breakdown.push('80% Dexterity Match: Smooth closure slide with low tactile resistance.')
    }

    // 3. Sensory Comfort criteria (weight: 30)
    totalWeight += 30
    let sensoryMatches = 0
    profile.sensory?.forEach(s => {
      if (garment.features?.some(f => f.toLowerCase().includes(s.toLowerCase().slice(0, 7)))) {
        sensoryMatches++
      }
    })

    if (sensoryMatches >= 2) {
      earnedWeight += 30
      breakdown.push('100% Sensory Match: 100% Tagless neck construction with hypoallergenic flat-felled soft seams.')
    } else if (sensoryMatches === 1) {
      earnedWeight += 25
      breakdown.push('83% Sensory Match: Soft friction-minimized inner neckline.')
    } else {
      earnedWeight += 22
      breakdown.push('73% Sensory Match: Breathable woven natural fiber fabric.')
    }

    const calculatedScore = Math.min(99, Math.round((earnedWeight / totalWeight) * 100))
    return { score: calculatedScore, breakdown }
  }

  const activeMatch = calculateMatchScore(scannedGarment, userProfile)

  // Intelligent Pre-Filling of Alterations when User Profile changes
  useEffect(() => {
    const recommendedIds = []
    if (userProfile.dexterity?.includes('Fine Motor Difficulty') || userProfile.dexterity?.includes('Tremors') || userProfile.dexterity?.includes('Single-Hand Operation Only')) {
      recommendedIds.push('alt-magnetic-snaps')
    }
    if (userProfile.mobility === 'Wheelchair / Seated Posture') {
      recommendedIds.push('alt-side-zippers')
      recommendedIds.push('alt-back-rise')
    }
    if (userProfile.sensory?.includes('Tagless Inner Collar') || userProfile.sensory?.includes('Flat-Felled Soft Seams')) {
      recommendedIds.push('alt-tagless-seams')
    }
    if (userProfile.dexterity?.includes('Reduced Hand Strength')) {
      recommendedIds.push('alt-pull-loops')
    }

    const unique = [...new Set(recommendedIds)]
    setSelectedAlterations(unique.length > 0 ? unique : ['alt-magnetic-snaps', 'alt-tagless-seams'])
  }, [userProfile])

  // Text-To-Speech helper (Web Speech API)
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.0
        utterance.pitch = 1.0
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
      } catch (e) {
        console.warn('Speech synthesis error:', e)
        setIsSpeaking(false)
      }
    }
  }

  // Voice Command Execution Router
  const handleVoiceCommand = (rawText) => {
    const text = (rawText || '').toLowerCase().trim()
    setLastCommand(rawText)

    // "Start 4-Step Guided Wizard" / "Start wizard"
    if (text.includes('start wizard') || text.includes('guided wizard') || text.includes('start')) {
      setCurrentStep(1)
      const msg = 'Starting 4-Step Guided Wizard with Step 1: Accessibility Profile Builder.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Track my orders" / "Track orders"
    if (text.includes('track my orders') || text.includes('track order') || text.includes('tracking')) {
      setIsTrackingOpen(true)
      const msg = 'Opening active order tracking.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Home" / "Landing page"
    if (text.includes('home') || text.includes('landing') || text.includes('overview')) {
      setCurrentStep(0)
      const msg = 'Returning to AdaptiveStyle AI Home Landing Page.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Next step"
    if (text.includes('next step') || text.includes('continue') || text.includes('go forward')) {
      setCurrentStep(prev => Math.min(4, prev + 1))
      const msg = `Navigating to Step ${Math.min(4, currentStep + 1)}.`
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Previous step" / "Back"
    if (text.includes('previous step') || text.includes('go back') || text.includes('last step')) {
      setCurrentStep(prev => Math.max(0, prev - 1))
      const msg = `Returning to Step ${Math.max(0, currentStep - 1)}.`
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Scan garment" / "Scan clothing"
    if (text.includes('scan garment') || text.includes('scan clothing') || text.includes('ai scanner') || text.includes('scan')) {
      setCurrentStep(2)
      triggerGarmentScan(SAMPLE_GARMENTS[0])
      const msg = 'Initiating AI computer vision scan on adaptive garment.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "Read accessibility score out loud" / "read score"
    if (text.includes('read accessibility score') || text.includes('read score') || text.includes('accessibility score out loud') || text.includes('match score')) {
      const scoreMsg = `Your Functional Accessibility Match Score is ${activeMatch.score} percent. ${activeMatch.breakdown[0] || 'High compatibility with your mobility profile.'}`
      setVoiceFeedback(scoreMsg)
      speak(scoreMsg)
      return
    }

    // "Select magnetic shirt" / "magnetic oxford"
    if (text.includes('select magnetic shirt') || text.includes('magnetic shirt') || text.includes('oxford shirt')) {
      const oxford = CATALOG_ITEMS.find(i => i.id === 'cat-1') || CATALOG_ITEMS[0]
      setSelectedGarment(oxford)
      setCurrentStep(4)
      const msg = 'Selected Pro-Adaptive Magnetic Oxford Shirt. Advancing to Customization & Dispatch.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // "High contrast"
    if (text.includes('high contrast') || text.includes('contrast mode') || text.includes('dark mode')) {
      setHighContrast(prev => !prev)
      const msg = 'Toggled high-contrast visual display.'
      setVoiceFeedback(msg)
      speak(msg)
      return
    }

    // Fallback feedback
    setVoiceFeedback(`Heard: "${rawText}". Try: "Start wizard", "Track orders", or "Scan garment".`)
  }

  // Web Speech Recognition Lifecycle
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        handleVoiceCommand(transcript)
      }

      recognition.onerror = (e) => {
        console.warn('Speech recognition warning:', e.error)
        if (e.error === 'not-allowed') {
          setVoiceFeedback('Microphone permission blocked. You can still use interactive buttons.')
          setIsListening(false)
        }
      }

      recognition.onend = () => {
        if (isListening) {
          try {
            recognition.start()
          } catch (err) {}
        }
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {}
      }
    }
  }, [isListening])

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {}
      }
      setVoiceFeedback('Voice Assistant paused. Tap microphone to resume.')
      speak('Voice assistant stopped.')
    } else {
      setIsListening(true)
      setVoiceFeedback('Listening... Say "Start wizard", "Track orders", or "Scan garment".')
      speak('Speech assistant active. Listening for commands.')
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
        } catch (err) {
          console.warn('Recognition start caught:', err)
        }
      }
    }
  }

  const triggerGarmentScan = (garmentOrFile) => {
    setIsScanning(true)
    setScanProgress(0)
    setScanCompleted(false)

    const matchedSample = SAMPLE_GARMENTS.find(s => s.id === garmentOrFile?.id) || SAMPLE_GARMENTS[0]
    setScannedGarment(matchedSample)
    setDetectionTags([])

    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setScanProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsScanning(false)
        setScanCompleted(true)
        setDetectionTags(matchedSample.detectionTags)
      }
    }, 280)
  }

  const toggleAlteration = (altId) => {
    setSelectedAlterations(prev => 
      prev.includes(altId) ? prev.filter(id => id !== altId) : [...prev, altId]
    )
  }

  const calculateOrderSummary = () => {
    const selectedAltsList = AVAILABLE_ALTERATIONS.filter(a => selectedAlterations.includes(a.id))
    const alterationsTotal = selectedAltsList.reduce((acc, curr) => acc + curr.price, 0)
    const baseGarmentPrice = selectedGarment ? selectedGarment.price : 48.00
    const maxTurnaroundHours = selectedAltsList.reduce((acc, curr) => Math.max(acc, curr.turnaroundHours), 24)

    return {
      alterationsTotal,
      garmentPrice: baseGarmentPrice,
      totalCost: baseGarmentPrice + alterationsTotal,
      turnaroundHours: maxTurnaroundHours,
      estimatedDeliveryDays: Math.ceil(maxTurnaroundHours / 24)
    }
  }

  const submitOrder = () => {
    const summary = calculateOrderSummary()
    const orderId = `ADAPT-${Math.floor(100000 + Math.random() * 900000)}`
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Request Sent',
      trackingStep: 1,
      totalFee: summary.totalCost,
      turnaround: `${summary.turnaroundHours}-hour delivery`,
      assignedTailor: assignedTailor,
      selectedGarment: selectedGarment,
      alterations: AVAILABLE_ALTERATIONS.filter(a => selectedAlterations.includes(a.id)),
      notes: customInstructions
    }
    setOrderStatus(newOrder)
    speak(`Customization request submitted successfully with Order ID ${orderId}. Matched with ${assignedTailor.name}.`)
    return newOrder
  }

  const resetOrder = () => {
    setOrderStatus(null)
  }

  const value = {
    currentStep,
    setCurrentStep,
    highContrast,
    setHighContrast,
    toggleHighContrast: () => setHighContrast(prev => !prev),
    fontSize,
    setFontSize,
    userProfile,
    setUserProfile,
    scannedGarment,
    setScannedGarment,
    uploadedImage,
    setUploadedImage,
    isScanning,
    scanProgress,
    scanCompleted,
    detectionTags,
    activeMatch,
    triggerGarmentScan,
    selectedGarment,
    setSelectedGarment,
    catalogFilter,
    setCatalogFilter,
    selectedAlterations,
    setSelectedAlterations,
    toggleAlteration,
    customInstructions,
    setCustomInstructions,
    assignedTailor,
    setAssignedTailor,
    orderStatus,
    setOrderStatus,
    isTrackingOpen,
    setIsTrackingOpen,
    submitOrder,
    resetOrder,
    calculateOrderSummary,
    isListening,
    toggleListening,
    voiceFeedback,
    lastCommand,
    isSpeaking,
    speak
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
